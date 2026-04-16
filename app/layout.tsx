import type { Metadata } from "next";

import "./globals.css";

import { AppShell } from "@/components/app-shell";
import { siteMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteMeta.name} | ${siteMeta.enName}`,
  description: siteMeta.subtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
