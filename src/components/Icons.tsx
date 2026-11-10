type IconProps = { className?: string };

export function ArrowRight({ className = "arrow" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      <path d="M3 12h17.5M14 5.5 20.5 12 14 18.5" />
    </svg>
  );
}

export function ArrowDown({ className = "arrow" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      <path d="M12 3v17.5M5.5 14 12 20.5 18.5 14" />
    </svg>
  );
}

export function ArrowUpRight({ className = "arrow" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      <path d="M6 18 18 6M8.5 6H18v9.5" />
    </svg>
  );
}
