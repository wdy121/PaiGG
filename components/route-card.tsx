import Link from "next/link";

import { Tag } from "@/components/ui/tag";

type RouteCardProps = {
  href: string;
  title: string;
  description: string;
};

export function RouteCard({ href, title, description }: RouteCardProps) {
  return (
    <Link
      href={href}
      className="ui-card surface-card hover-lift group block rounded-3xl p-4"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text">{title}</h3>
          <Tag tone="accent">进入</Tag>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        <div className="mt-4 border-t border-white/8 pt-4 text-sm text-text">
          查看此页结构
        </div>
      </div>
    </Link>
  );
}
