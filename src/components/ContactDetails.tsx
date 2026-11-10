import { firm, whatsappHref } from "@/content/site";
import { Pending } from "./Pending";

/** Contact routes. Unconfirmed values render as discreet placeholders — never as invented data. */
export function ContactDetails({ className }: { className?: string }) {
  const wa = whatsappHref("Olá. Gostaria de falar com o escritório Carolina Meirelles & Advogados.");
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "E-mail",
      value: firm.email ? (
        <a className="inline-link" href={`mailto:${firm.email}`}>
          {firm.email}
        </a>
      ) : (
        <Pending />
      ),
    },
    {
      label: "Telefone",
      value: firm.phone ? (
        <a className="inline-link" href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>
          {firm.phone}
        </a>
      ) : (
        <Pending />
      ),
    },
    {
      label: "WhatsApp",
      value: wa ? (
        <a className="inline-link" href={wa} target="_blank" rel="noopener noreferrer">
          Iniciar conversa<span className="sr-only"> (abre em nova janela)</span>
        </a>
      ) : (
        <Pending />
      ),
    },
    {
      label: "Endereço",
      value: firm.address ? <span>{firm.address}</span> : <span>{firm.city}, {firm.state} <Pending>endereço a confirmar</Pending></span>,
    },
  ];
  return (
    <dl className={["contact-details", className].filter(Boolean).join(" ")}>
      {rows.map((r) => (
        <div key={r.label} className="contact-details__row">
          <dt className="label">{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
