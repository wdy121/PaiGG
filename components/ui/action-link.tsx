import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary";
};

export function ActionLink({
  href,
  children,
  tone = "primary",
}: ActionLinkProps) {
  const toneClass =
    tone === "primary"
      ? "border-brandStrong/50 bg-gradient-to-r from-brand to-brandStrong text-white shadow-[0_18px_40px_rgba(255,90,111,0.26)]"
      : "border-lineStrong/70 bg-white/[0.03] text-text";

  return (
    <Link
      href={href}
      className={`tap-target hover-lift inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold tracking-[0.04em] ${toneClass}`}
    >
      {children}
    </Link>
  );
}
