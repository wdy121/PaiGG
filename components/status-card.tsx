import type { ReactNode } from "react";

type StatusCardProps = {
  label: string;
  value: string;
  hint?: string;
  action?: ReactNode;
};

export function StatusCard({ label, value, hint, action }: StatusCardProps) {
  return (
    <div className="ui-card surface-card rounded-3xl p-4">
      <div className="relative z-10">
        <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
          {label}
        </p>
        <p className="mt-2 text-lg font-semibold leading-7 text-text">{value}</p>
        {hint ? <p className="mt-2 text-sm leading-6 text-muted">{hint}</p> : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}
