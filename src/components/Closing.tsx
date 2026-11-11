import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import { Logo } from "./brand/Logo";
import { Pending } from "./Pending";
import { firm, whatsappHref } from "@/content/site";

type Props = { heading?: string[]; text?: string; showAction?: boolean };

/**
 * Closing — after the agency's "Obrigado," layout (manual p. 32): a centred title,
 * a small photograph, contact details in small capitals at the two edges, and the
 * signature beneath. Unconfirmed details appear as discreet placeholders.
 */
export function Closing({
  heading = ["Vamos conversar."],
  text = "Cada situação imobiliária tem documentos, prazos e interesses próprios. Conte-nos o contexto e o escritório retornará para entender a demanda e indicar os próximos passos.",
  showAction = true,
}: Props) {
  const wa = whatsappHref("Olá. Gostaria de falar com o escritório Carolina Meirelles & Advogados.");
  const item = (label: string, value: React.ReactNode) => (
    <li>
      <span className="closing2__k">{label}</span>
      <span className="closing2__v">{value}</span>
    </li>
  );
  return (
    <section className="closing2" aria-labelledby="closing-title">
      <div className="container closing2__inner">
        <h2 id="closing-title" className="closing2__title" data-reveal="">
          {heading.join(" ")}
        </h2>
        <p className="closing2__text" data-reveal="">
          {text}
        </p>

        <ul className="closing2__edge closing2__edge--l" role="list" aria-label="Telefone e endereço">
          {item("Telefone", firm.phone ? <a href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>{firm.phone}</a> : <Pending />)}
          {item("WhatsApp", wa ? <a href={wa} target="_blank" rel="noopener noreferrer">Iniciar conversa</a> : <Pending />)}
          {item("Endereço", firm.address ?? `${firm.city}, ${firm.state}`)}
        </ul>

        <div className="closing2__photo" data-reveal="mask">
          <Image
            src="/assets/editorial/leather-case.webp"
            alt="Pasta de couro com a assinatura Carolina Meirelles & Advogados gravada."
            fill
            sizes="(min-width: 1024px) 34vw, 80vw"
            style={{ objectFit: "cover", objectPosition: "40% 88%" }}
          />
        </div>

        <ul className="closing2__edge closing2__edge--r" role="list" aria-label="E-mail">
          {item("E-mail", firm.email ? <a href={`mailto:${firm.email}`}>{firm.email}</a> : <Pending />)}
          {item("Atendimento", firm.officeHours ?? <Pending />)}
        </ul>

        {showAction && (
          <Link href="/contato" className="action closing2__action">
            Entre em contato
            <ArrowRight />
          </Link>
        )}

        <div className="closing2__mark" aria-hidden="true">
          <Logo variant="completo-horizontal" title={null} />
        </div>
      </div>
    </section>
  );
}
