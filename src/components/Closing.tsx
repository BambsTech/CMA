import Link from "next/link";
import { ArrowRight } from "./Icons";
import { ContactDetails } from "./ContactDetails";
import { Lines } from "./Lines";

type Props = { heading?: string[]; text?: string; showAction?: boolean };

/** Section 08 — the espresso closing that flows directly into the footer. */
export function Closing({
  heading = ["Vamos", "conversar."],
  text = "Cada situação imobiliária tem documentos, prazos e interesses próprios. Conte-nos o contexto e o escritório retornará para entender a demanda e indicar os próximos passos.",
  showAction = true,
}: Props) {
  return (
    <section className="closing on-dark" aria-labelledby="closing-title">
      <div className="container">
        <div className="closing__head">
          <span className="label label--rule" data-reveal="fade">
            Contato
          </span>
          <Lines as="h2" id="closing-title" className="t-mega closing__title" lines={heading} />
        </div>
        <div className="grid closing__body">
          <div className="closing__intro" data-reveal="">
            <p className="t-lead">{text}</p>
            {showAction && (
              <Link href="/contato" className="action closing__action">
                Entre em contato
                <ArrowRight />
              </Link>
            )}
          </div>
          <div className="closing__details" data-reveal="" style={{ ["--delay" as string]: "120ms" }}>
            <ContactDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
