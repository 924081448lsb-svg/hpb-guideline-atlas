# 肝胆胰疾病

一个面向肝胆胰疾病多学科诊疗的证据导航网站。集中整理肝癌、胆道肿瘤、胰腺癌及胆囊切除相关胆管损伤的中国与国际指南、专家共识和关键研究，并提供全文检索与 PubMed 更新雷达。

## 本地运行

```bash
npm run dev
```

访问 `http://localhost:4173`。

项目不依赖第三方 npm 包，使用原生 HTML、CSS 和 JavaScript。也可以直接部署到任意静态文件托管平台；使用 `npm run dev` 时由内置的 `server.mjs` 提供本地静态服务。

## 内容维护

- 指南、共识、研究证据、版本、适用主题和引用信息集中在 `data/guidelines.js`；研究记录使用 `research` 类型，不冒充指南推荐。
- 版本更新差异集中在 `data/comparisons.js`，按“新增、强化、修订、删除/降级”分类维护。
- 首页分期速查数据集中在 `data/staging.js`，肝癌使用 CNLC，胆道与胰腺癌同时提示 TNM 和可切除性边界。
- 全文检索索引来自 `assets/pdfs/`，运行 `npm run index:fulltext` 可在 PDF 更新后重建页码级索引。
- 指南间横向差异集中在 `data/matrix.js`；MDT 一页纸在浏览器本地生成，不保存患者信息。
- 每条记录可用 `access` 标记为 `open`、`abstract` 或 `account`；未标记时默认视为需要账号。
- 页面提供“开放全文”筛选，并优先将 PMC、ESMO 公开页面和 J-STAGE PDF 作为全文入口。
- 公开 PDF 已保存到 `assets/pdfs/`，对应记录通过 `localPdf` 字段提供“站内全文”入口。
- 本地文件的来源、页数和访问说明见 `assets/pdfs/MANIFEST.md`。
- `lastReviewed` 记录人工核验日期。
- 有 `pmid` 的记录会在页面打开时通过 PubMed E-utilities 核对一次当前元数据。
- 详情抽屉中的“全文获取助手”会并行查询 OpenAlex 与 Europe PMC，展示合法开放获取版本，并提供 DOI、PubMed、Europe PMC 与单位图书馆路径。
- “PubMed 更新雷达”使用题名关键词和 `guideline` 文献类型进行联网检索，仅用于发现更新线索。
- 每周工作流同时扫描胆道肿瘤、胆管损伤、肝癌和胰腺癌的新指南与共识线索。

## 重要说明

网站提供指南入口、目录及合法开放获取全文，不绕过期刊登录或镜像受版权保护的正文。“全文获取助手”只汇总开放获取与官方入口；没有开放副本时，应使用单位图书馆代理、馆际互借或向作者索取合法版本。临床使用时必须核对当前官方版本、勘误、适用人群与本地药物技术可及性。
