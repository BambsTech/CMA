import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ContactDetails } from "@/components/ContactDetails";
import { practices } from "@/content/practices";
import { firm } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: "Entre em contato com Carolina Meirelles & Advogados, escritório de Direito Imobiliário em Brasília/DF.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHero
        label="Contato"
        title={["Fale com o", "escritório."]}
        intro="Descreva brevemente a situação. O escritório analisará a mensagem e retornará para entender a demanda e indicar os próximos passos."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />
      <section className="section section--paper contact" aria-label="Formulário e canais de contato">
        <div className="container grid">
          <div className="contact__form" data-reveal="">
            <h2 className="label label--rule">Mensagem</h2>
            <ContactForm areas={practices.map((p) => ({ value: p.slug, label: p.title }))} />
          </div>
          <aside className="contact__aside" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
            <h2 className="label label--rule">Canais diretos</h2>
            <ContactDetails />
            <p className="t-small contact__note">
              {firm.officeHours ? `${firm.officeHours} ` : ""}O primeiro contato não estabelece relação de
              patrocínio nem implica análise do caso.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
