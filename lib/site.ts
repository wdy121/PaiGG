export const siteMeta = {
  name: "配局",
  enName: "PaiGG",
  subtitle: "为 CS2 / 瓦罗兰特玩家匹配更互补的队友",
};

export const pageList = [
  {
    href: "/",
    title: "首页",
    description: "3 秒内讲清楚产品价值，并引导用户开始创建游戏名片。",
  },
  {
    href: "/profile",
    title: "资料填写页",
    description: "拆成清晰的小步骤，每一步只做一个核心决策。",
  },
  {
    href: "/submitted",
    title: "提交成功页",
    description: "确认已入池，并解释接下来会发生什么。",
  },
  {
    href: "/match-result",
    title: "匹配结果页",
    description: "只展示验证版需要的最小匹配信息。",
  },
  {
    href: "/feedback",
    title: "反馈页",
    description: "用极简方式收集这次配对体验是否有帮助。",
  },
] as const;

export const homeSections = [
  {
    eyebrow: "首屏",
    title: "一句话价值",
    description: "为 CS2 / 瓦罗兰特玩家匹配更互补的队友。",
  },
  {
    eyebrow: "怎么运作",
    title: "三步完成",
    description: "创建游戏名片，进入匹配池，等通知查看结果。",
  },
  {
    eyebrow: "你会填什么",
    title: "不是长问卷",
    description: "只会问和匹配直接相关的几项信息，多数用卡片点选完成。",
  },
  {
    eyebrow: "开始入口",
    title: "立刻进入资料流程",
    description: "从选择游戏开始，逐步完成入池。",
  },
] as const;

export const profileSteps = [
  {
    step: 1,
    title: "先选你现在想配哪款游戏",
    cta: "下一步：选段位",
    optional: false,
    fields: ["游戏"],
    hint: "这是整个流程的起点，先决定后面展示哪套字段。",
  },
  {
    step: 2,
    title: "告诉我们你大概在哪个水平段",
    cta: "下一步：补充开黑时间",
    optional: false,
    fields: ["段位"],
    hint: "只保留一个核心决策，避免一上来就填很多信息。",
  },
  {
    step: 3,
    title: "补齐开黑基础条件",
    cta: "下一步：选择打法",
    optional: false,
    fields: ["主打平台", "在线时段", "是否开麦"],
    hint: "这一步只回答能不能一起玩，不进入打法细节。",
  },
  {
    step: 4,
    title: "再说你的打法与互补偏好",
    cta: "下一步：确认入池",
    optional: true,
    fields: [
      "CS2：打法 / 防守偏好 / 节奏偏好",
      "瓦罗兰特：主定位 / 副定位 / 补位意愿 / 常玩角色",
    ],
    hint: "这一组信息帮助做更细的互补匹配，但不阻塞入池。",
  },
  {
    step: 5,
    title: "最后确认并进入匹配池",
    cta: "进入匹配池",
    optional: false,
    fields: ["手机号"],
    hint: "填写手机号，用于后续匹配结果通知。",
  },
] as const;
