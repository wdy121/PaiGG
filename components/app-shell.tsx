import type { ReactNode } from "react";

import { siteMeta } from "@/lib/site";
import { Tag } from "@/components/ui/tag";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-6 sm:max-w-lg sm:px-6">
      <header className="mb-6">
        <div className="ui-card surface-panel noise-grid rounded-[28px] p-4 backdrop-blur">
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.32em] text-accent/85">
                {siteMeta.enName}
              </p>
              <h1 className="font-display mt-2 text-[30px] leading-none text-text">
                {siteMeta.name}
              </h1>
            </div>
            <Tag tone="brand">H5 验证版</Tag>
          </div>
          <p className="relative z-10 mt-3 max-w-[24rem] text-sm leading-6 text-muted">
            {siteMeta.subtitle}
          </p>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
