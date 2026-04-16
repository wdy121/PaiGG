type TagProps = {
  children: string;
  tone?: "neutral" | "brand" | "accent" | "success";
};

const toneMap: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral:
    "border-line/70 bg-white/[0.03] text-muted",
  brand:
    "border-brand/35 bg-brand/10 text-brand",
  accent:
    "border-accent/35 bg-accent/10 text-accent",
  success:
    "border-success/35 bg-success/10 text-success",
};

export function Tag({ children, tone = "neutral" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}
