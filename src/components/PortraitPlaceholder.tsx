/**
 * Temporary portrait placement. An authentic, client-approved photograph of Carolina Meirelles
 * must replace this — never a stock image of another person.
 */
export function PortraitPlaceholder({ name }: { name: string }) {
  return (
    <div className="portrait-ph" role="img" aria-label={`Espaço reservado para o retrato oficial de ${name}`}>
      <svg className="portrait-ph__art" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="0.75">
          {/* Arched opening, echoing modernist colonnades */}
          <path d="M120 500V250a80 80 0 0 1 160 0v250" />
          <path d="M140 500V252a60 60 0 0 1 120 0v248" opacity="0.5" />
          {/* Column rhythm */}
          {[30, 60, 340, 370].map((x) => (
            <path key={x} d={`M${x} 90V500`} opacity="0.6" />
          ))}
          <path d="M0 90H400" opacity="0.6" />
          <path d="M0 410 400 410" opacity="0.35" />
          {/* Light falling across the floor */}
          <path d="M0 470 180 410M60 500 260 410M160 500 330 410" opacity="0.3" />
        </g>
      </svg>
      <div className="portrait-ph__note">
        <span className="label">Retrato oficial</span>
        <span className="caption">A ser fornecido pelo escritório</span>
      </div>
    </div>
  );
}
