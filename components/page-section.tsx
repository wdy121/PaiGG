import type { ReactNode } from "react";

type PageSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageSection({
  eyebrow,
  title,
  description,
  children,
}: PageSectionProps) {
  return (
    <section className="ui-card surface-panel rounded-[28px] p-5 backdrop-blur">
      {eyebrow ? (
        <p className="font-display text-xs uppercase tracking-[0.26em] text-accent/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 max-w-[18rem] text-[25px] font-semibold leading-8 text-text">
        {title}
      </h2>
      <p className="mt-3 max-w-[28rem] text-sm leading-6 text-muted">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}
