/**
 * Marks information that must be confirmed by the client before publication.
 * Rendered discreetly so layouts can be reviewed with their final structure.
 */
export function Pending({ children = "A confirmar", note }: { children?: React.ReactNode; note?: string }) {
  return (
    <span className="pending" data-pending="true" title={note ?? "Informação pendente de confirmação pelo escritório"}>
      {children}
    </span>
  );
}
