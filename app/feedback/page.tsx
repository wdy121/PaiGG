import { PageSection } from "@/components/page-section";
import { ChoiceCard } from "@/components/ui/choice-card";
import { Tag } from "@/components/ui/tag";

export default function FeedbackPage() {
  return (
    <div className="space-y-4">
      <PageSection
        eyebrow="反馈"
        title="用 10 秒告诉我们这次匹配有没有帮助"
        description="你的反馈会帮助我们把下一次匹配做得更准。"
      >
        <div className="space-y-3">
          <ChoiceCard
            meta="反馈 1"
            title="这次匹配对你有帮助吗？"
            description="选一个最接近你感受的答案。"
            badge="必填"
            selected
            actionLabel="提交反馈"
            footer={
              <div className="flex gap-2">
                <Tag tone="accent">有帮助</Tag>
                <Tag tone="neutral">一般</Tag>
              </div>
            }
          />
          <ChoiceCard
            meta="反馈 2"
            title="你还想补充一句什么？"
            description="有想法的话，简单告诉我们。"
            badge="可跳过"
            actionLabel="跳过"
          />
        </div>
      </PageSection>
    </div>
  );
}
