import { PageSection } from "@/components/page-section";
import { StatusCard } from "@/components/status-card";
import { ChoiceCard } from "@/components/ui/choice-card";
import { Tag } from "@/components/ui/tag";

export default function MatchResultPage() {
  return (
    <div className="space-y-4">
      <PageSection
        eyebrow="匹配结果"
        title="这是为你匹配到的队友"
        description="你们的在线时间、打法和配合方式更合拍。"
      >
        <ChoiceCard
          meta="匹配对象"
          title="夜色残局王"
          description="一位更偏补位与残局处理的玩家，适合和更主动的节奏型队友配合。"
          badge="已撮合"
          selected
          footer={
            <div className="flex flex-wrap gap-2">
              <Tag tone="accent">超凡先锋 / A+</Tag>
              <Tag tone="neutral">工作日 20:00 - 23:00</Tag>
              <Tag tone="neutral">控场位 / 稳定补位</Tag>
            </div>
          }
        />
        <div className="space-y-3">
          <StatusCard label="对方昵称" value="夜色残局王" />
          <StatusCard label="段位" value="超凡先锋 / A+" />
          <StatusCard label="在线时间" value="工作日 20:00 - 23:00" />
          <StatusCard label="主位置 / 打法" value="控场位 / 稳定补位" />
          <StatusCard
            label="匹配理由"
            value="你的前压节奏强，他更擅长补位与残局，组合更均衡。"
          />
          <StatusCard
            label="复制游戏 ID"
            value="PaiGG#9527"
            hint="复制后即可去游戏内添加。"
          />
        </div>
      </PageSection>
    </div>
  );
}
