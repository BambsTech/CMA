"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight } from "./Icons";

type Option = { value: string; label: string };
type Props = { areas: Option[] };

type Errors = Partial<Record<"nome" | "email" | "mensagem" | "consentimento", string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "unavailable" }
  | { kind: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const e: Errors = {};
  const nome = String(data.get("nome") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const mensagem = String(data.get("mensagem") ?? "").trim();
  if (nome.length < 2) e.nome = "Informe seu nome.";
  if (!EMAIL.test(email)) e.email = "Informe um e-mail válido.";
  if (mensagem.length < 20) e.mensagem = "Descreva brevemente a situação (mínimo de 20 caracteres).";
  if (mensagem.length > 4000) e.mensagem = "A mensagem deve ter no máximo 4.000 caracteres.";
  if (!data.get("consentimento")) e.consentimento = "É necessário concordar com o tratamento dos dados para o envio.";
  return e;
}

/**
 * Contact form with real validation and honest delivery states.
 * It only reports success when the server confirms the message was handed to the e-mail provider.
 */
export function ContactForm({ areas }: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (res.ok) {
        setStatus({ kind: "sent" });
        form.reset();
      } else if (res.status === 503) {
        setStatus({ kind: "unavailable" });
      } else {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setStatus({ kind: "error", message: body.message ?? "Não foi possível enviar a mensagem. Tente novamente em instantes." });
      }
    } catch {
      setStatus({ kind: "error", message: "Falha de conexão. Verifique sua internet e tente novamente." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p className="field__error" id={`${id}-${name}-err`}>
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-err` : undefined,
  });

  if (status.kind === "sent") {
    return (
      <div className="form-done" ref={statusRef} tabIndex={-1} role="status">
        <p className="label">Mensagem enviada</p>
        <p className="t-h3">Obrigado pelo contato.</p>
        <p className="t-body">Sua mensagem foi recebida pelo escritório, que retornará pelo e-mail informado.</p>
        <button type="button" className="link-line" onClick={() => setStatus({ kind: "idle" })}>
          Enviar outra mensagem
          <ArrowRight />
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="contact-form" noValidate onSubmit={onSubmit} aria-describedby={`${id}-note`}>
      <div className="contact-form__grid">
        <div className="field">
          <label htmlFor={`${id}-nome`}>Nome</label>
          <input id={`${id}-nome`} name="nome" type="text" autoComplete="name" required maxLength={120} {...aria("nome")} />
          {err("nome")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`}>E-mail</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={160} {...aria("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-telefone`}>Telefone (opcional)</label>
          <input id={`${id}-telefone`} name="telefone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-perfil`}>Você é</label>
          <select id={`${id}-perfil`} name="perfil" defaultValue="">
            <option value="">Selecione (opcional)</option>
            <option>Empresa ou empreendimento</option>
            <option>Investidor</option>
            <option>Proprietário de imóvel</option>
            <option>Outro</option>
          </select>
        </div>
        <div className="field field--wide">
          <label htmlFor={`${id}-assunto`}>Assunto</label>
          <select id={`${id}-assunto`} name="assunto" defaultValue="">
            <option value="">Selecione (opcional)</option>
            {areas.map((a) => (
              <option key={a.value} value={a.label}>
                {a.label}
              </option>
            ))}
            <option>Não sei ao certo</option>
          </select>
        </div>
        <div className="field field--wide">
          <label htmlFor={`${id}-mensagem`}>Mensagem</label>
          <textarea id={`${id}-mensagem`} name="mensagem" required rows={6} maxLength={4000} {...aria("mensagem")} />
          {err("mensagem")}
        </div>
        {/* Honeypot — hidden from people, tempting for bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Não preencha este campo</label>
          <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <p className="t-small contact-form__note" id={`${id}-note`}>
        Por segurança, não envie documentos ou informações sensíveis neste primeiro contato.
      </p>

      <div className="field">
        <label className="checkbox" htmlFor={`${id}-consentimento`} style={{ textTransform: "none", letterSpacing: 0, fontFamily: "var(--font-body)", fontSize: "var(--fs-small)" }}>
          <input id={`${id}-consentimento`} name="consentimento" type="checkbox" value="sim" {...aria("consentimento")} />
          <span>
            Concordo com o tratamento dos dados informados para resposta a este contato, conforme a{" "}
            <Link href="/privacidade" className="inline-link">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {err("consentimento")}
      </div>

      {(status.kind === "unavailable" || status.kind === "error") && (
        <div className="form-status" role="alert" ref={statusRef} tabIndex={-1}>
          {status.kind === "unavailable" ? (
            <>
              <strong>O envio pelo formulário ainda não está ativo.</strong> Sua mensagem não foi enviada. Por favor, utilize
              um dos canais de contato indicados nesta página.
            </>
          ) : (
            status.message
          )}
        </div>
      )}

      <button type="submit" className="action contact-form__submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Enviando…" : "Enviar mensagem"}
        <ArrowRight />
      </button>
    </form>
  );
}
