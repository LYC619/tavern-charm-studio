# SillyTavern 正则脚本可视化工具

一款基于 React 的可视化编辑器，用于生成 SillyTavern（酒馆）角色卡的正则替换美化脚本。无需手写正则和 HTML，通过图形界面配置即可导出可直接导入酒馆的 JSON 脚本。

## ✨ 功能模块

| 模块 | 说明 |
|------|------|
| 🎭 对话气泡 | 3 种预设风格（竖线/卡片/引用块）、角色主题色、头像模式 |
| ✨ 文字特效 | 心理活动、旁白等特殊文本的视觉效果 |
| 📊 状态面板 | 分组独立布局（网格/标签/紧凑/高亮），支持分组级列数配置 |
| 🔄 翻页卡片 | 正面叙述 + 背面状态面板，4 种排版预设（Claude/小说/轻量/赛博） |
| 📝 格式化提示词 | Prompt 模板编辑 |
| 📦 导出中心 | 一键导出 ZIP，自动排列脚本执行顺序 |

## 🛠️ 技术栈

- **框架**：React 18 + TypeScript + Vite
- **UI**：Tailwind CSS + shadcn/ui
- **状态管理**：Zustand
- **动画**：Framer Motion
- **导出**：JSZip

## 🚀 本地开发

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## 📦 部署

在 [Lovable](https://lovable.dev) 中打开项目，点击 Share → Publish 即可发布。

支持自定义域名：Project → Settings → Domains → Connect Domain。

## 📋 更新记录

完整更新记录请查看 [CHANGELOG.md](./CHANGELOG.md)。

| 版本 | 日期 | 摘要 |
|------|------|------|
| v0.3.0 | 2026-03-08 | 翻页卡片背景方案重构，删除渐变配置，背景整合进排版预设 |
| v0.2.0 | 2026-03-08 | 正文排版预设系统（Claude/小说/轻量/赛博 4 种风格） |
| v0.1.0 | 2026-03-08 | UI 优化第一轮：对话气泡重构、状态面板分组布局、导出脚本排序 |
