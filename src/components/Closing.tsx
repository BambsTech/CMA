import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import { Pending } from "./Pending";
import { firm, whatsappHref } from "@/content/site";

type Props = { heading?: string[]; text?: string; showAction?: boolean };

/**
 * Closing — "Vamos conversar." (client reference, Nov 2026): the title large on the left
 * with an arrow to the contact page on the right; beneath it, a small photograph and the
 * contact details as label/value rows (no rules), then a short note and the links.
 * Unconfirmed details appear as discreet "a confirmar" placeholders.
 */
export function Closing({
  heading = ["Vamos conversar."],
  text = "Cada situação tem documentos, prazos e interesses próprios. Conte-nos o contexto e o escritório retornará para entender a demanda e indicar os próximos passos.",
  showAction = true,
}: Props) {
  const wa = whatsappHref("Olá. Gostaria de falar com a CMA Advogados.");
  const rows: { k: string; v: React.ReactNode }[] = [
    { k: "Telefone", v: firm.phone ? <a href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>{firm.phone}</a> : <Pending /> },
    { k: "WhatsApp", v: wa ? <a href={wa} target="_blank" rel="noopener noreferrer">Iniciar conversa</a> : <Pending /> },
    { k: "E-mail", v: firm.email ? <a href={`mailto:${firm.email}`}>{firm.email}</a> : <Pending /> },
    { k: "Endereço", v: firm.address ?? `${firm.city} · ${firm.state}` },
    { k: "Atendimento", v: firm.officeHours ?? <Pending /> },
  ];
  const links = [
    { label: "Contato", href: "/contato" },
    { label: "Serviços", href: "/areas-de-atuacao" },
    { label: "Equipe", href: "/equipe" },
    ...(firm.instagram ? [{ label: "Instagram", href: firm.instagram }] : []),
    ...(firm.linkedin ? [{ label: "LinkedIn", href: firm.linkedin }] : []),
  ];

  return (
    <section className="cl3" aria-labelledby="closing-title">
      <div className="container cl3__inner">
        <div className="cl3__head">
          <h2 id="closing-title" className="cl3__title" data-reveal="">
            {heading.join(" ")}
          </h2>
          {showAction && (
            <Link href="/contato" className="cl3__arrow" aria-label="Ir para a página de contato">
              <ArrowRight />
            </Link>
          )}
        </div>

        <div className="cl3__photo" data-reveal="mask">
          <Image
            src="/assets/editorial/leather-case.webp"
            alt="Pasta de couro com a assinatura do escritório gravada."
            fill
            sizes="(min-width: 1024px) 14vw, 40vw"
            style={{ objectFit: "cover", objectPosition: "40% 88%" }}
          />
        </div>

        <dl className="cl3__rows" data-reveal="">
          {rows.map((r) => (
            <div key={r.k} className="cl3__row">
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>

        <div className="cl3__foot">
          <p className="cl3__text">{text}</p>
          <ul className="cl3__links" role="list">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>/ {l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
