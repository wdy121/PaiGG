import type { ReactNode } from "react";

import { Tag } from "@/components/ui/tag";

type ChoiceCardProps = {
  title: string;
  description: string;
  meta?: string;
  selected?: boolean;
  badge?: string;
  actionLabel?: string;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  compact?: boolean;
  media?: ReactNode;
};

export function ChoiceCard({
  title,
  description,
  meta,
  selected = false,
  badge,
  actionLabel,
  footer,
  onClick,
  className,
  disabled = false,
  compact = false,
  media,
}: ChoiceCardProps) {
  const baseClass = `ui-card surface-card hover-lift rounded-3xl p-4 text-left ${
    selected
      ? "border-accent bg-accent/[0.08] shadow-[0_0_0_1px_rgba(98,230,199,0.35),0_22px_48px_rgba(98,230,199,0.14)] scale-[1.01]"
      : "border-line/70"
  } ${
    disabled ? "cursor-not-allowed opacity-45 saturate-50" : onClick ? "tap-target cursor-pointer active:scale-[0.99]" : ""
  } ${compact ? "p-3" : "p-4"} ${className ?? ""}`;

  const content = (
    <div className="relative z-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          {meta ? (
            <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
              {meta}
            </p>
          ) : null}
          <h3 className={`mt-2 font-semibold leading-6 text-text ${compact ? "text-base" : "text-lg"}`}>
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {selected ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/70 bg-accent/15 text-sm text-accent">
              ✓
            </span>
          ) : null}
          {badge ? <Tag tone={selected ? "accent" : "neutral"}>{badge}</Tag> : null}
        </div>
      </div>
      {media ? (
        <div
          className={`mt-3 overflow-hidden rounded-2xl border ${
            selected ? "border-accent/45 bg-accent/10" : "border-line/60 bg-white/[0.03]"
          } ${compact ? "h-20" : "h-24"}`}
        >
          {media}
        </div>
      ) : null}
      <p className={`mt-3 leading-6 text-muted ${compact ? "text-[13px]" : "text-sm"}`}>{description}</p>
      {footer ? <div className="mt-4">{footer}</div> : null}
      {actionLabel ? (
        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4 text-sm">
          <span className={selected ? "text-accent" : "text-muted"}>
            {disabled ? "当前不可选" : selected ? "已选中" : "点击选择"}
          </span>
          <span className="font-medium text-text">{actionLabel}</span>
        </div>
      ) : null}
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} className={baseClass}>
        {content}
      </button>
    );
  }

  return <div className={baseClass}>{content}</div>;
}
