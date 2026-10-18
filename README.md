# PreSight AI

面向互联网产品团队的 0-1 AI 市场分析 MVP。

## MVP 主链路

```text
输入产品想法 → AI 市场判断 → 机会切口 → 第一版 MVP
```

## 当前保留的核心模块

- 产品想法输入框
- 三个互联网产品示例案例
- 市场进入建议与吸引力评分
- SAM / SOM / 增长率 / 竞品数量
- 推荐目标用户
- 三个最值得验证的机会
- 第一版 MVP 功能清单
- 数据来源与可信度说明
- 模拟分析加载状态

## 已移除的冗余内容

- 左侧复杂导航
- 多页面切换
- 大型市场趋势图
- 复杂竞品定位图
- 不参与第一轮决策的风险与行动卡片
- 与互联网产品无关的示例项目

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 注意

当前版本是比赛演示用前端 MVP。页面中的市场规模、竞品数量和增长率是 Demo 数据，尚未接入实时数据源或大模型 API。正式接入后，应在每条结论旁标注来源、更新时间、估算性质和可信度。

## 当前搜索能力边界

- 输入内容后会立即进入待分析状态。
- 点击“开始分析”或按 `⌘ / Ctrl + Enter` 会显示检索过程。
- 自定义输入会生成对应的 Google、Google Trends 和 Bing 检索页面入口。
- 当前尚未接入搜索 API 或网页正文解析，因此来源卡片是检索入口，不是已经抓取并总结的真实网页结果。
- 正式版本需要在服务端接入搜索 API、网页解析和大模型总结，并保存每条结论的引用。

## 配置真实搜索

当前已接入服务端搜索接口，使用 Tavily Search API；AI 分析通过公司 Athena LiteLLM 网关。首次使用前：

1. 访问 [Tavily](https://app.tavily.com/) 创建账号并获取 API Key。
2. 在项目根目录复制 `.env.example` 为 `.env`。
3. 将 `TAVILY_API_KEY=tvly-your-key-here` 替换为你的 Key。
4. 重启开发服务：

```bash
npm run dev
```

前端会请求 `POST /api/search`，服务端返回真实网页的标题、摘要、域名和链接。API Key 只保存在服务端环境变量中，不会发送到浏览器。

## 配置动态 AI 分析

真实搜索完成后，PreSight AI 会将搜索结果交给 OpenAI 生成动态的市场判断、竞品数量、机会和 MVP。

在 `.env` 中继续添加：

```env
OPENAI_API_KEY=你的OpenAIKey
OPENAI_BASE_URL=https://litellm.spaccez.com
OPENAI_MODEL=codex
```

配置后重启 `npm run dev`。如果只配置 Tavily，页面可以搜索真实网页，但分析卡片仍无法根据输入动态生成。API Key 只放服务端 `.env`，不要写进前端。
