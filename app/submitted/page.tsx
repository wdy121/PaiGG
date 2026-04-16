import { PageSection } from "@/components/page-section";
import { StatusCard } from "@/components/status-card";
import { ActionLink } from "@/components/ui/action-link";
import { StatStrip } from "@/components/ui/stat-strip";
import { Tag } from "@/components/ui/tag";

export default function SubmittedPage() {
  return (
    <div className="space-y-4">
      <PageSection
        eyebrow="已入池"
        title="你已进入匹配池"
        description="我们会根据你的资料安排匹配，完成后通知你查看结果。"
      >
        <div className="ui-card rounded-[28px] border border-success/35 bg-gradient-to-br from-success/12 via-white/[0.02] to-transparent p-5 shadow-glow">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-success">
                Matching Pool
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-text">已完成入池</h3>
            </div>
            <Tag tone="success">匹配中</Tag>
          </div>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <StatStrip label="当前状态" value="等待人工撮合" />
            <StatStrip label="结果通知" value="完成后提醒查看" />
          </div>
          <StatusCard
            label="接下来"
            value="匹配完成后，你会收到查看结果的提醒。"
            hint="你也可以先看看结果页会展示哪些信息。"
          />
        </div>
      </PageSection>

      <PageSection
        eyebrow="下一步"
        title="查看结果页"
        description="提前看看匹配成功后会展示哪些内容。"
      >
        <ActionLink href="/match-result">查看结果示例</ActionLink>
      </PageSection>
    </div>
  );
}
