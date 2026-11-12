# 肝胆胰指南库

一个面向肝胆胰肿瘤多学科诊疗的指南导航网站。集中整理肝癌、胆道肿瘤和胰腺癌的中国及国际权威指南，并提供 PubMed 近期指南类文献雷达。

## 本地运行

```bash
npm run dev
```

访问 `http://localhost:4173`。

项目不依赖第三方 npm 包，使用原生 HTML、CSS 和 JavaScript。也可以直接部署到任意静态文件托管平台；使用 `npm run dev` 时由内置的 `server.mjs` 提供本地静态服务。

## 内容维护

- 指南目录、版本、适用主题和引用信息集中在 `data/guidelines.js`。
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
- “PubMed 更新雷达”使用题名关键词和 `guideline` 文献类型进行联网检索，仅用于发现更新线索。

## 重要说明

网站只提供指南入口与目录，不复制或替代指南正文。临床使用时必须核对当前官方版本、勘误、适用人群与本地药物技术可及性。
