type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Carregando conteúdo" }: LoadingStateProps) {
  return (
    <div className="state state--loading" role="status" aria-label={label}>
      <span className="state__skeleton" />
      <span className="state__skeleton state__skeleton--short" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
