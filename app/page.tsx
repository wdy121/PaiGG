import { PageSection } from "@/components/page-section";
import { ActionLink } from "@/components/ui/action-link";
import { Tag } from "@/components/ui/tag";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <PageSection
        eyebrow="PaiGG"
        title="别再硬找同类队友，先配一个更互补的"
        description="配局会根据你的游戏、段位、在线时间和打法偏好，帮你进入匹配池，寻找更适合一起上分的队友。"
      >
        <div className="ui-card surface-card rounded-[30px] p-5">
          <div className="relative z-10 overflow-hidden rounded-[24px] border border-lineStrong/70 bg-[linear-gradient(135deg,rgba(98,230,199,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-5">
            <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/45" />
            <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-brand/35" />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/12" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/12" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone="accent">CS2</Tag>
                <Tag tone="accent">瓦罗兰特</Tag>
                <Tag tone="neutral">匹配入口</Tag>
              </div>
              <div className="mt-5 grid grid-cols-[1fr_88px] gap-4">
                <div className="min-w-0">
                  <p className="font-display text-xs uppercase tracking-[0.24em] text-accent/80">
                    Queue Lobby
                  </p>
                </div>
                <div className="ui-card rounded-[24px] border border-lineStrong/70 bg-white/[0.03] p-3">
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted">
                      Rank Card
                    </p>
                    <div className="rounded-2xl border border-accent/30 bg-accent/10 px-3 py-4 text-center">
                      <p className="font-display text-xs uppercase tracking-[0.2em] text-accent">
                        Ready
                      </p>
                      <p className="mt-2 text-lg font-semibold text-text">01</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <ActionLink href="/profile">开始创建</ActionLink>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-xs text-muted">
                <span>移动端优先</span>
                <span>快速填写</span>
                <span>进入匹配池</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
