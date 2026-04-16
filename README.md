# PaiGG / 配局

面向中国大陆用户的 H5 验证项目，用于测试 `CS2 / 瓦罗兰特玩家是否愿意使用互补匹配来找队友`。

## 当前阶段
- 验证版，不是完整社交产品
- 移动端优先，PC 基础兼容
- 技术栈：`Next.js + TypeScript + Tailwind CSS`

## 快速开始
1. 安装依赖：`npm.cmd install`
2. 启动开发环境：`npm.cmd run dev`
3. 浏览器访问：`http://localhost:3000`

## 当前已建立的页面骨架
- `/` 首页
- `/profile` 资料填写页
- `/submitted` 提交成功页
- `/match-result` 匹配结果页
- `/feedback` 反馈页
- `/api/match` API Route 占位接口

## 本仓库当前约定
- 长期协作规则见 [AGENTS.md](/D:/AI/PaiGG/AGENTS.md)
- 当前只做项目骨架，不接真实业务逻辑、不直连飞书

## 推荐开发顺序
1. 细化首页 CTA 与视觉层次
2. 完成资料填写页的分步骤结构与字段卡片
3. 接入前端提交状态和 API Route 占位联调
4. 再补成功页、结果页、反馈页的细节
