"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PageSection } from "@/components/page-section";
import { ChoiceCard } from "@/components/ui/choice-card";
import { StatStrip } from "@/components/ui/stat-strip";
import { Tag } from "@/components/ui/tag";
import { profileSteps } from "@/lib/site";

type Game = "CS2" | "VALORANT";
type StepIndex = 0 | 1 | 2 | 3 | 4;

type FormState = {
  game?: Game;
  rank?: string;
  platform?: string;
  time?: string;
  mic?: string;
  style?: string;
  defense?: string;
  pace?: string;
  mainRole?: string;
  subRole?: string;
  flex?: string;
  agents?: string;
  phone: string;
};

type BaseSubstep = 0 | 1 | 2;

const STEP_LABELS = ["选择游戏", "选择段位", "基础条件", "互补偏好", "填写手机"] as const;

const GAME_OPTIONS = [
  {
    value: "CS2" as const,
    title: "CS2",
    description: "更偏枪法、节奏与残局处理的互补匹配。",
    badge: "竞技",
  },
  {
    value: "VALORANT" as const,
    title: "瓦罗兰特",
    description: "更偏定位、补位意愿与角色池的互补匹配。",
    badge: "战术",
  },
];

const RANK_OPTIONS: Record<Game, string[]> = {
  CS2: ["C-", "C", "C+", "B", "B+", "A", "A+", "S"],
  VALORANT: ["黑铁到白银", "黄金到铂金", "钻石", "超凡", "神话", "赋能战魂"],
};

const PLATFORM_OPTIONS = ["国服", "完美平台", "Steam", "港服 / 亚服"];
const TIME_OPTIONS = ["工作日晚上", "工作日下午", "周末白天", "周末深夜"];
const MIC_OPTIONS = ["默认开麦", "看熟悉度开麦", "更习惯听队友"];

const CS2_STYLE = ["突破手", "信息位", "补枪位", "残局位"];
const CS2_DEFENSE = ["守默认", "偏前顶", "偏协防", "灵活换位"];
const CS2_PACE = ["稳一点", "正常节奏", "喜欢提速", "看队友配合"];

const VAL_MAIN_ROLE = ["决斗", "控场", "先锋", "哨卫"];
const VAL_SUB_ROLE = ["补决斗", "补控场", "补先锋", "补哨卫"];
const VAL_FLEX = ["愿意补位", "视阵容补位", "尽量不补位"];
const VAL_AGENTS = ["捷风 / 雷兹", "欧门 / 蝰蛇", "斯凯 / 猎枭", "奇乐 / 贤者"];

function StepChip({
  label,
  index,
  current,
  done,
}: {
  label: string;
  index: number;
  current: boolean;
  done: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-2 py-2 ${
        current
          ? "border-accent/75 bg-accent/12 text-accent shadow-glow"
          : done
            ? "border-success/45 bg-success/10 text-success"
            : "border-line/70 bg-white/[0.03] text-muted"
      }`}
    >
      <p className="font-display text-[10px] uppercase tracking-[0.22em]">
        0{index + 1}
      </p>
      <p className="mt-1 text-[11px] font-medium leading-4">{label}</p>
    </div>
  );
}

function PlaceholderArt({
  title,
  accent = "text-accent",
}: {
  title: string;
  accent?: string;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute -left-6 top-3 h-20 w-20 rounded-full border border-white/10 bg-white/[0.03]" />
      <div className="absolute -right-4 bottom-2 h-14 w-14 rounded-2xl border border-white/10 bg-white/[0.03]" />
      <div className={`relative z-10 font-display text-xs uppercase tracking-[0.28em] ${accent}`}>
        {title}
      </div>
    </div>
  );
}

function StepActions({
  showBack,
  canContinue,
  continueLabel,
  onBack,
  onContinue,
  onSkip,
  optional,
}: {
  showBack: boolean;
  canContinue: boolean;
  continueLabel: string;
  onBack: () => void;
  onContinue: () => void;
  onSkip?: () => void;
  optional?: boolean;
}) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onContinue}
        disabled={!canContinue}
        className={`tap-target inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold tracking-[0.04em] transition ${
          canContinue
            ? "border-brandStrong/50 bg-gradient-to-r from-brand to-brandStrong text-white shadow-[0_18px_40px_rgba(255,90,111,0.26)]"
            : "border-line/70 bg-white/[0.04] text-muted"
        }`}
      >
        {continueLabel}
      </button>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={!showBack}
          className={`tap-target rounded-2xl border px-4 py-3 text-sm font-medium ${
            showBack
              ? "border-lineStrong/70 bg-white/[0.03] text-text"
              : "border-line/50 bg-white/[0.02] text-muted"
          }`}
        >
          上一步
        </button>
        {optional ? (
          <button
            type="button"
            onClick={onSkip}
            className="tap-target rounded-2xl border border-lineStrong/70 bg-white/[0.03] px-4 py-3 text-sm font-medium text-text"
          >
            跳过这一步
          </button>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-line/50 bg-white/[0.02] px-4 py-3 text-sm text-muted">
            当前步骤需完成
          </div>
        )}
      </div>
    </div>
  );
}

function AutoAdvanceHint({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-accent/35 bg-accent/10 px-3 py-2 text-sm text-accent">
      选择后将自动进入{label}
    </div>
  );
}

export function ProfileFlow() {
  const [stepIndex, setStepIndex] = useState<StepIndex>(0);
  const [baseSubstep, setBaseSubstep] = useState<BaseSubstep>(0);
  const [transitioning, setTransitioning] = useState(false);
  const [form, setForm] = useState<FormState>({
    phone: "",
  });

  const currentStep = profileSteps[stepIndex];

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    if (stepIndex < 4) {
      setStepIndex((prev) => (prev + 1) as StepIndex);
      if (stepIndex === 2) {
        setBaseSubstep(0);
      }
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => (prev - 1) as StepIndex);
    }
  };

  const goToStep = (index: StepIndex) => {
    setStepIndex(index);
    if (index !== 2) {
      setBaseSubstep(0);
    }
  };

  const autoAdvance = (callback: () => void) => {
    callback();
    setTransitioning(true);
    window.setTimeout(() => {
      goNext();
      window.setTimeout(() => setTransitioning(false), 140);
    }, 170);
  };

  const updateGame = (game: Game) => {
    autoAdvance(() =>
      setForm((prev) => ({
        ...prev,
        game,
        rank: undefined,
        style: undefined,
        defense: undefined,
        pace: undefined,
        mainRole: undefined,
        subRole: undefined,
        flex: undefined,
        agents: undefined,
      })),
    );
  };

  const updateRank = (rank: string) => {
    autoAdvance(() => updateField("rank", rank));
  };

  const goNextBase = () => {
    if (baseSubstep < 2) {
      setBaseSubstep((prev) => (prev + 1) as BaseSubstep);
    } else {
      goNext();
    }
  };

  const goPrevBase = () => {
    if (baseSubstep > 0) {
      setBaseSubstep((prev) => (prev - 1) as BaseSubstep);
    } else {
      goBack();
    }
  };

  const canContinue = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return Boolean(form.game);
      case 1:
        return Boolean(form.rank);
      case 2:
        return Boolean(form.platform && form.time && form.mic);
      case 3:
        return true;
      case 4:
        return form.phone.trim().length >= 11;
      default:
        return false;
    }
  }, [form, stepIndex]);

  const selectedCount = [
    form.game,
    form.rank,
    form.platform && form.time && form.mic ? "base" : undefined,
    form.style || form.defense || form.pace || form.mainRole || form.subRole || form.flex || form.agents
      ? "style"
      : undefined,
    form.phone ? "phone" : undefined,
  ].filter(Boolean).length;

  const summaryTitle = form.game
    ? `${form.game === "CS2" ? "CS2" : "瓦罗兰特"} 玩家名片`
    : "等待选择游戏";

  const summaryRole =
    form.game === "CS2"
      ? form.style ?? "待选择打法"
      : form.mainRole ?? "待选择主定位";

  const summaryTrait =
    form.game === "CS2"
      ? form.pace ?? "待选择节奏偏好"
      : form.flex ?? "待选择补位意愿";

  return (
    <div className="space-y-4 pb-4">
      <div className="sticky top-4 z-20 space-y-3">
        <PageSection
          eyebrow="玩家名片"
          title="你的玩家身份卡"
          description="已选信息会实时更新。"
        >
          <div className="ui-card surface-card rounded-[28px] p-4">
            <div className="relative z-10 grid grid-cols-[110px_1fr] gap-4">
              <div className="overflow-hidden rounded-3xl border border-lineStrong/70 bg-white/[0.03]">
                <PlaceholderArt
                  title={form.game ? (form.game === "CS2" ? "ENTRY" : "ROLE") : "CARD"}
                  accent={form.game ? "text-accent" : "text-muted"}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone={form.game ? "accent" : "neutral"}>
                    {form.game ? (form.game === "CS2" ? "CS2" : "瓦罗兰特") : "未选游戏"}
                  </Tag>
                  <Tag tone={selectedCount >= 3 ? "success" : "neutral"}>
                    {`已完成 ${selectedCount} / 5`}
                  </Tag>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-7 text-text">
                  {summaryTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {form.rank ?? "待选择段位"} · {form.platform ?? "待选择平台"} ·{" "}
                  {form.time ?? "待选择在线时段"}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <StatStrip label="当前角色" value={summaryRole} />
                  <StatStrip label="互补标签" value={summaryTrait} />
                </div>
                <p className="mt-3 text-xs leading-5 text-muted">
                  {form.phone
                    ? `通知手机号：${form.phone}`
                    : "手机号将在最后一步填写。"}
                </p>
              </div>
            </div>
          </div>
        </PageSection>

        <div className="ui-card surface-panel rounded-[24px] p-3">
          <div className="relative z-10 grid grid-cols-5 gap-2">
            {profileSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => goToStep(index as StepIndex)}
                className="min-w-0 text-left"
              >
                <StepChip
                  label={STEP_LABELS[index]}
                  index={index}
                  current={index === stepIndex}
                  done={index < stepIndex}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <PageSection
        eyebrow={`步骤 0${currentStep.step}`}
        title={currentStep.title}
        description=""
      >
        <div
          key={stepIndex}
          className={`space-y-4 transition duration-200 ${transitioning ? "translate-y-1 opacity-70" : "translate-y-0 opacity-100"}`}
        >
          {stepIndex === 0 ? (
            <div className="space-y-3">
              <AutoAdvanceHint label="下一步" />
              <div className="grid grid-cols-2 gap-3">
                {GAME_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    meta="游戏"
                    title={option.title}
                    description={option.description}
                    badge={option.badge}
                    selected={form.game === option.value}
                    actionLabel={form.game === option.value ? "即将进入下一步" : "点击选择"}
                    compact
                    media={<PlaceholderArt title={option.title} />}
                    onClick={() => updateGame(option.value)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {stepIndex === 1 && form.game ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Tag tone="accent">{form.game === "CS2" ? "CS2" : "瓦罗兰特"}</Tag>
                <Tag tone="neutral">当前常用段位</Tag>
              </div>
              <AutoAdvanceHint label="基础条件" />
              <div className="grid grid-cols-2 gap-3">
                {RANK_OPTIONS[form.game].map((rank) => (
                  <ChoiceCard
                    key={rank}
                    meta="段位"
                    title={rank}
                    description="用于完成基础匹配。"
                    badge={form.game === "CS2" ? "枪法强度" : "排位水平"}
                    selected={form.rank === rank}
                    actionLabel={form.rank === rank ? "即将进入下一步" : "点击选择"}
                    compact
                    onClick={() => updateRank(rank)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {stepIndex === 2 ? (
            <div className="space-y-4">
              <div className="ui-card surface-card rounded-[26px] p-4">
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      基础条件
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-text">
                      {baseSubstep === 0
                        ? "先确认你主要在哪玩"
                        : baseSubstep === 1
                          ? "再看你通常什么时候在线"
                          : "最后确认沟通方式"}
                    </h3>
                  </div>
                  <Tag tone="neutral">{`0${baseSubstep + 1} / 03`}</Tag>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "平台", done: Boolean(form.platform) },
                    { label: "在线", done: Boolean(form.time) },
                    { label: "开麦", done: Boolean(form.mic) },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`rounded-2xl border px-3 py-2 text-center text-xs ${
                        index === baseSubstep
                          ? "border-accent/70 bg-accent/10 text-accent"
                          : item.done
                            ? "border-success/40 bg-success/10 text-success"
                            : "border-line/70 bg-white/[0.03] text-muted"
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
              {baseSubstep === 0 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {PLATFORM_OPTIONS.map((platform) => (
                      <ChoiceCard
                        key={platform}
                        title={platform}
                        description="你主要在哪玩。"
                        selected={form.platform === platform}
                        actionLabel={form.platform === platform ? "已选择" : "点击选择"}
                        compact
                        onClick={() => updateField("platform", platform)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {baseSubstep === 1 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_OPTIONS.map((time) => (
                      <ChoiceCard
                        key={time}
                        title={time}
                        description="你常在线的时间。"
                        selected={form.time === time}
                        actionLabel={form.time === time ? "已选择" : "点击选择"}
                        compact
                        onClick={() => updateField("time", time)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {baseSubstep === 2 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    {MIC_OPTIONS.map((mic) => (
                      <ChoiceCard
                        key={mic}
                        title={mic}
                        description="确定沟通方式。"
                        selected={form.mic === mic}
                        actionLabel={form.mic === mic ? "已选择" : "点击选择"}
                        compact
                        onClick={() => updateField("mic", mic)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={goNextBase}
                  disabled={
                    (baseSubstep === 0 && !form.platform) ||
                    (baseSubstep === 1 && !form.time) ||
                    (baseSubstep === 2 && !form.mic)
                  }
                  className={`tap-target inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold tracking-[0.04em] ${
                    (baseSubstep === 0 && form.platform) ||
                    (baseSubstep === 1 && form.time) ||
                    (baseSubstep === 2 && form.mic)
                      ? "border-brandStrong/50 bg-gradient-to-r from-brand to-brandStrong text-white shadow-[0_18px_40px_rgba(255,90,111,0.26)]"
                      : "border-line/70 bg-white/[0.04] text-muted"
                  }`}
                >
                  {baseSubstep === 2 ? currentStep.cta : "下一项"}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={goPrevBase}
                    className="tap-target rounded-2xl border border-lineStrong/70 bg-white/[0.03] px-4 py-3 text-sm font-medium text-text"
                  >
                    {baseSubstep === 0 ? "上一步" : "上一项"}
                  </button>
                  <div className="flex items-center justify-center rounded-2xl border border-line/50 bg-white/[0.02] px-4 py-3 text-sm text-muted">
                    {baseSubstep === 0
                      ? form.platform ?? "选择平台"
                      : baseSubstep === 1
                        ? form.time ?? "选择在线时段"
                        : form.mic ?? "选择开麦方式"}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {stepIndex === 3 ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Tag tone="neutral">这一步可跳过</Tag>
                <Tag tone="accent">{form.game === "CS2" ? "CS2 互补信息" : "瓦罗兰特互补信息"}</Tag>
              </div>

              {form.game === "CS2" ? (
                <>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      打法
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {CS2_STYLE.map((style) => (
                        <ChoiceCard
                          key={style}
                          title={style}
                          description="你在进攻中的惯常职责。"
                          selected={form.style === style}
                          actionLabel={form.style === style ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="STYLE" />}
                          onClick={() => updateField("style", style)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      防守偏好
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {CS2_DEFENSE.map((defense) => (
                        <ChoiceCard
                          key={defense}
                          title={defense}
                          description="更适合你的守方习惯。"
                          selected={form.defense === defense}
                          actionLabel={form.defense === defense ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="HOLD" />}
                          onClick={() => updateField("defense", defense)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      节奏偏好
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {CS2_PACE.map((pace) => (
                        <ChoiceCard
                          key={pace}
                          title={pace}
                          description="你更舒服的对局节奏。"
                          selected={form.pace === pace}
                          actionLabel={form.pace === pace ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="PACE" />}
                          onClick={() => updateField("pace", pace)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      主定位
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {VAL_MAIN_ROLE.map((role) => (
                        <ChoiceCard
                          key={role}
                          title={role}
                          description="你最常承担的职责。"
                          selected={form.mainRole === role}
                          actionLabel={form.mainRole === role ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="ROLE" />}
                          onClick={() => updateField("mainRole", role)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      副定位
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {VAL_SUB_ROLE.map((role) => (
                        <ChoiceCard
                          key={role}
                          title={role}
                          description="队伍需要时你能补什么位。"
                          selected={form.subRole === role}
                          actionLabel={form.subRole === role ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="ALT" />}
                          onClick={() => updateField("subRole", role)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      补位意愿
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {VAL_FLEX.map((flex) => (
                        <ChoiceCard
                          key={flex}
                          title={flex}
                          description="影响互补匹配的重要条件。"
                          selected={form.flex === flex}
                          actionLabel={form.flex === flex ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="FLEX" />}
                          onClick={() => updateField("flex", flex)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-display text-xs uppercase tracking-[0.22em] text-accent/85">
                      常玩角色
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {VAL_AGENTS.map((agents) => (
                        <ChoiceCard
                          key={agents}
                          title={agents}
                          description="当前先作为角色池占位。"
                          selected={form.agents === agents}
                          actionLabel={form.agents === agents ? "已选择" : "点击选择"}
                          compact
                          media={<PlaceholderArt title="AGENT" />}
                          onClick={() => updateField("agents", agents)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <StepActions
                showBack
                canContinue
                continueLabel={currentStep.cta}
                onBack={goBack}
                onContinue={goNext}
                onSkip={goNext}
                optional
              />
            </div>
          ) : null}

          {stepIndex === 4 ? (
            <div className="space-y-4">
              <ChoiceCard
                meta="手机号"
                title="填写手机号，用于后续匹配结果通知"
                description="匹配完成后，我们会提醒你回来查看结果。"
                badge="通知"
                selected={form.phone.trim().length >= 11}
                media={<PlaceholderArt title="NOTIFY" />}
                footer={
                  <label className="block">
                    <span className="mb-2 block text-sm text-muted">手机号</span>
                    <input
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="请输入手机号"
                      className="tap-target w-full rounded-2xl border border-lineStrong/70 bg-white/[0.04] px-4 py-3 text-base text-text outline-none placeholder:text-muted"
                    />
                  </label>
                }
              />
              <div className="space-y-3">
                <Link
                  href={canContinue ? "/submitted" : "#"}
                  className={`tap-target inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold tracking-[0.04em] ${
                    canContinue
                      ? "border-brandStrong/50 bg-gradient-to-r from-brand to-brandStrong text-white shadow-[0_18px_40px_rgba(255,90,111,0.26)]"
                      : "pointer-events-none border-line/70 bg-white/[0.04] text-muted"
                  }`}
                >
                  进入匹配池
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    className="tap-target rounded-2xl border border-lineStrong/70 bg-white/[0.03] px-4 py-3 text-sm font-medium text-text"
                  >
                    上一步
                  </button>
                  <div className="flex items-center justify-center rounded-2xl border border-line/50 bg-white/[0.02] px-4 py-3 text-sm text-muted">
                    结果通知
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </PageSection>
    </div>
  );
}
