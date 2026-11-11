import Image from "next/image";
import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { Pending } from "@/components/Pending";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Nossa História",
  description: "A história do escritório Carolina Meirelles & Advogados, dedicado ao Direito Imobiliário em Brasília/DF.",
  path: "/nossa-historia",
});

/**
 * Nossa História (manual p. 31): espresso field with the title low on the left, a
 * photograph on the right carrying a glass panel. The page ends with the contact call.
 */
export default function NossaHistoriaPage() {
  return (
    <>
      <section className="story on-dark" aria-labelledby="story-title">
        <div className="story__field">
          <h1 id="story-title" className="story__title" data-reveal="">
            {home.story.title[0]}
            <br />
            {home.story.title[1]}
          </h1>
        </div>
        <div className="story__media" data-tone="dark">
          <Image
            src="/assets/architecture/pavilion.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "50% 55%" }}
          />
          <div className="story__glass" data-reveal="">
            <span className="story__tag">{home.story.label}</span>
            <h2 className="story__heading">
              {home.story.heading[0]}
              <br />
              {home.story.heading[1]}
            </h2>
            <div className="story__text">
              {home.story.text.length > 0 ? home.story.text.map((t, i) => <p key={i}>{t}</p>) : <Pending>História do escritório a confirmar</Pending>}
            </div>
          </div>
        </div>
      </section>

      <Closing />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Nossa História", path: "/nossa-historia" },
        ])}
      />
    </>
  );
}
