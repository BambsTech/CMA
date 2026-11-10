import { NextResponse } from "next/server";

/**
 * Contact form delivery via Resend (https://resend.com) using plain fetch — no SDK dependency.
 * Requires RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (a verified sender domain).
 * Without them, responds 503 so the UI can tell the visitor honestly that nothing was sent.
 * Messages are not stored by the website.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, { n: number; t: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5;
}

const clean = (v: unknown, max: number) => String(v ?? "").replace(/\s+\n/g, "\n").trim().slice(0, max);
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot: pretend nothing happened for bots, but never claim delivery to a person.
  if (clean(body.website, 200)) return NextResponse.json({ message: "Requisição inválida." }, { status: 400 });

  const data = {
    nome: clean(body.nome, 120),
    email: clean(body.email, 160),
    telefone: clean(body.telefone, 40),
    perfil: clean(body.perfil, 80),
    assunto: clean(body.assunto, 120),
    mensagem: clean(body.mensagem, 4000),
    consentimento: body.consentimento === "sim",
  };

  if (data.nome.length < 2 || !EMAIL.test(data.email) || data.mensagem.length < 20 || !data.consentimento) {
    return NextResponse.json({ message: "Verifique os campos obrigatórios e tente novamente." }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos." }, { status: 429 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ message: "Envio não configurado." }, { status: 503 });
  }

  const rows = [
    ["Nome", data.nome],
    ["E-mail", data.email],
    ["Telefone", data.telefone || "—"],
    ["Perfil", data.perfil || "—"],
    ["Assunto", data.assunto || "—"],
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#301206">
<p><strong>Nova mensagem pelo site</strong></p>
<table cellpadding="4">${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`).join("")}</table>
<p style="white-space:pre-wrap">${escape(data.mensagem)}</p>
<p style="color:#382C23;font-size:12px">Consentimento para tratamento de dados: sim (${new Date().toISOString()}).</p></div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Contato pelo site — ${data.assunto || "mensagem"} — ${data.nome}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contato] provider error", res.status);
      return NextResponse.json({ message: "Não foi possível enviar agora. Tente novamente mais tarde." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contato] network error", e);
    return NextResponse.json({ message: "Não foi possível enviar agora. Tente novamente mais tarde." }, { status: 502 });
  }
}
