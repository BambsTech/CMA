import { firm, founder, SITE_URL } from "@/content/site";
import { practices } from "@/content/practices";

/**
 * Structured data built ONLY from verified facts. Pending values (address, phone, OAB, e-mail)
 * are added automatically once they are filled in content/site.ts — never guessed.
 */
export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#escritorio`,
    name: firm.name,
    alternateName: firm.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/icons/icon-512.png`,
    image: `${SITE_URL}/assets/og/cma-og-default.jpg`,
    description: `Escritório de advocacia especializado em ${firm.specialty}, em ${firm.city}/${firm.state}.`,
    areaServed: { "@type": "City", name: "Brasília", containedInPlace: { "@type": "State", name: "Distrito Federal" } },
    knowsAbout: ["Direito Imobiliário", ...practices.map((p) => p.title)],
    founder: { "@type": "Person", name: founder.name, jobTitle: "Advogada" },
  };
  if (firm.email) data.email = firm.email;
  if (firm.phone) data.telephone = firm.phone;
  if (firm.address) data.address = firm.address;
  const sameAs = [firm.instagram, firm.linkedin].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}
