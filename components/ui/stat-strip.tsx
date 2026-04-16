type StatStripProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatStrip({ label, value, hint }: StatStripProps) {
  return (
    <div className="ui-card surface-card rounded-2xl p-4">
      <div className="relative z-10">
        <p className="font-display text-[11px] uppercase tracking-[0.22em] text-muted">
          {label}
        </p>
        <p className="mt-2 text-xl font-semibold leading-7 text-text">{value}</p>
        {hint ? <p className="mt-2 text-sm leading-6 text-muted">{hint}</p> : null}
      </div>
    </div>
  );
}
