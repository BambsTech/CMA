import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/Parallax";
import { Pending } from "@/components/Pending";
import { ArrowRight } from "@/components/Icons";

type Props = {
  name: string;
  firstName: string;
  role: string;
  bio: readonly string[];
  oab: string | null;
  education: readonly string[] | null;
  portrait: string | null;
  label: string;
  /** Panel title (default "A sócia."); the homepage uses "A equipe." to keep the institution first. */
  title?: string;
  link?: { href: string; label: string };
  /** Official artwork shown instead of the large first name (team page: CAROLINA MEIRELLES logotype). */
  nameMark?: React.ReactNode;
  /** Page heading set in the photograph's top-left corner, above the panel (team page). */
  heading?: string;
};

/**
 * Founder — composed after the agency's "A sócia." layout (manual p. 30):
 * an architectural photograph, a wide glass panel with the title and two narrow
 * columns, a rounded portrait card overlapping the panel's edge, and the first name
 * set large in the lower right. The portrait remains an explicit placeholder until an
 * authentic photograph is supplied.
 */
export function FounderPanel({ name, firstName, role, bio, oab, education, portrait, label, title = "A sócia.", link = { href: "/carolina-meirelles", label: "Perfil completo" }, nameMark, heading }: Props) {
  return (
    <section className="partner on-dark" aria-labelledby="partner-title">
      <div className="partner__media" aria-hidden="true">
        <Parallax speed={0.12}>
          <Image src="/assets/architecture/corridor.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 60%" }} />
        </Parallax>
        <div className="partner__veil" />
      </div>

      <div className="container partner__inner">
        {label && <span className="label label--rule partner__label">{label}</span>}
        {heading && (
          <h1 className="partner__heading" data-reveal="">
            {heading}
          </h1>
        )}

        <div className="partner__glass" data-reveal="">
          <div className="partner__card">
            {portrait ? (
              <Image src={portrait} alt={`Retrato de ${name}`} fill sizes="(min-width: 1024px) 18vw, 60vw" style={{ objectFit: "cover" }} />
            ) : (
              <div className="partner__placeholder" role="img" aria-label={`Espaço reservado para o retrato oficial de ${name}`}>
                <span className="label">Retrato oficial</span>
                <span className="caption">A ser fornecido pelo escritório</span>
              </div>
            )}
          </div>

          <div className="partner__text">
            <h2 id="partner-title" className="partner__title">
              {title}
            </h2>
            <div className="partner__cols">
              {bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <dl className="partner__facts">
              <div>
                <dt className="label">Inscrição</dt>
                <dd>{oab ?? <Pending>OAB/DF a confirmar</Pending>}</dd>
              </div>
              <div>
                <dt className="label">Formação</dt>
                <dd>{education?.length ? education.join(" · ") : <Pending />}</dd>
              </div>
              <div>
                <dt className="label">Atuação</dt>
                <dd>{role}</dd>
              </div>
            </dl>
            <Link href={link.href} className="link-line partner__link">
              {link.label}
              <ArrowRight />
            </Link>
          </div>
        </div>

        {nameMark ? (
          <div className="partner__name partner__name--mark" aria-hidden="true" data-reveal="">
            {nameMark}
          </div>
        ) : (
          <p className="partner__name" aria-hidden="true" data-reveal="">
            {firstName}.
          </p>
        )}
      </div>
    </section>
  );
}
