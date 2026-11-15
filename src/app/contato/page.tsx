import type { Metadata } from "next";
import { PageHead } from "@/components/v3/PageHead";
import { ContactForm } from "@/components/ContactForm";
import { ContactDetails } from "@/components/ContactDetails";
import { areas } from "@/lib/content";
import { firm } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: "Fale com a CMA Advogados, em Brasília/DF.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHead
        label="Contato"
        title="Fale com a CMA."
        lead="Descreva brevemente a situação. O escritório analisará a mensagem e retornará para entender a demanda e indicar os próximos passos."
      />
      <section className="section section--paper contact" aria-label="Formulário e canais de contato">
        <div className="container grid">
          <div className="contact__form" data-reveal="">
            <h2 className="label">Mensagem</h2>
            <ContactForm areas={areas().map((a) => ({ value: a.slug, label: a.titulo }))} />
          </div>
          <aside className="contact__aside" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
            <h2 className="label">Canais diretos</h2>
            <ContactDetails />
            <p className="t-small contact__note">
              {firm.officeHours ? `${firm.officeHours} ` : ""}O primeiro contato não estabelece relação de patrocínio nem implica análise do caso.
            </p>
          </aside>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }])} />
    </>
  );
}
