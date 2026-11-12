export const SITE_META = {
  lastReviewed: "2026-11-12",
  reviewNote:
    "目录与官方入口已人工核验。实时版本、适用人群和推荐内容请始终以原始指南页面为准。"
};

export const ORGANS = {
  liver: {
    label: "肝癌",
    short: "HCC",
    accent: "rust",
    description: "肝细胞癌的筛查、诊断、分期与全病程治疗"
  },
  biliary: {
    label: "胆道肿瘤",
    short: "BTC",
    accent: "gold",
    description: "胆管癌、胆囊癌及相关胆道恶性肿瘤"
  },
  pancreas: {
    label: "胰腺癌",
    short: "PDAC",
    accent: "teal",
    description: "胰腺导管腺癌的可切除性评估与综合治疗"
  }
};

export const REGIONS = {
  china: "中国",
  international: "国际"
};

export const TYPES = {
  guideline: "综合指南",
  focused: "专题指南",
  living: "动态指南",
  update: "专题更新",
  consensus: "共识 / 路径"
};

export const GUIDELINES = [
  {
    id: "hcc-china-2026",
    title: "原发性肝癌诊疗指南（2026年版）",
    shortTitle: "中国肝癌诊疗指南 2026",
    organ: "liver",
    region: "china",
    type: "guideline",
    source: "国家卫生健康委员会",
    sourceShort: "NHC",
    displayVersion: "2026 版",
    updatedAt: "2026-04-30",
    updatedLabel: "2026.04 发布",
    featured: true,
    status: "重点推荐",
    access: "open",
    localPdf: "./assets/pdfs/hcc-china-2026.pdf",
    localPdfPages: 226,
    summary:
      "中国肝癌临床诊疗的核心综合指南，覆盖筛查监测、影像与病理诊断、分期、外科、消融、介入及系统治疗。",
    why: "适合作为中国临床场景下的首要入口，便于从诊断到治疗选择建立完整路径。",
    scope: ["筛查与诊断", "分期评估", "外科治疗", "介入治疗", "系统治疗"],
    officialUrl:
      "https://www.nhc.gov.cn/yzygj/c100067/202604/3371c9cb2f7f4f55b18c709ff2c53ab8/files/%E5%8E%9F%E5%8F%91%E6%80%A7%E8%82%9D%E7%99%8C%E8%AF%8A%E7%96%97%E6%8C%87%E5%8D%97%EF%BC%882026%E7%89%88%EF%BC%89.pdf",
    officialLabel: "直接下载官方全文 PDF",
    doi: "10.3760/cma.j.cn112139-20260410-00150",
    pmid: "42056046",
    citation:
      "中华人民共和国国家卫生健康委员会. 原发性肝癌诊疗指南（2026年版）. 中华外科杂志, 2026, 64(6): 549-580.",
    pubmedTitle: "Guideline for diagnosis and treatment of hepatocellular carcinoma（2026 edition）."
  },
  {
    id: "hcc-china-pvtt-2026",
    title: "中国肝细胞癌合并门静脉癌栓诊疗指南（2026年版）",
    shortTitle: "中国肝癌门静脉癌栓指南 2026",
    organ: "liver",
    region: "china",
    type: "focused",
    source: "中国肝癌协会 / 中国医师协会",
    sourceShort: "CN-HCC",
    displayVersion: "2026 版",
    updatedAt: "2026-02-12",
    updatedLabel: "2026.02 发布",
    featured: true,
    status: "2026 专题",
    summary:
      "针对肝细胞癌合并门静脉癌栓的中国专题指南，采用程氏分型，并覆盖外科、HAIC、TACE、放疗、系统治疗及转化治疗。",
    why: "适合处理国际指南差异较大、需要结合肝功能、可切除性和癌栓分型进行个体化决策的中国临床场景。",
    scope: ["门静脉癌栓", "程氏分型", "HAIC", "联合治疗", "转化治疗"],
    officialUrl:
      "https://doi.org/10.3760/cma.j.cn112137-20251211-03271",
    officialLabel: "查看 DOI 原文",
    doi: "10.3760/cma.j.cn112137-20251211-03271",
    pmid: "41672891",
    citation:
      "中国肝癌协会, 中国医师协会. 中国肝细胞癌合并门静脉癌栓诊疗指南（2026年版）. 中华医学杂志, 2026, 106: 41-55.",
    pubmedTitle:
      "Guidelines for diagnosis and treatment of hepatocellular carcinoma with portal vein tumor thrombus in China(2026 edition)."
  },
  {
    id: "hcc-china-tace-2026",
    title: "中国肝细胞癌经动脉介入治疗指南（2026年版）",
    shortTitle: "中国肝癌 TACE 指南 2026",
    organ: "liver",
    region: "china",
    type: "focused",
    source: "中国医师协会介入医师分会临床指南委员会",
    sourceShort: "CCI",
    displayVersion: "2026 版",
    updatedAt: "2026-06-02",
    updatedLabel: "2026.06 发布",
    featured: false,
    status: "2026 专题",
    summary:
      "中国肝细胞癌经动脉介入治疗专题指南，覆盖治疗适应证、技术路径、围术期管理、联合治疗与随访评估。",
    why: "适合在 TACE 与其他局部或系统治疗的联合决策中，使用中国本土适应证和操作规范进行核对。",
    scope: ["TACE", "介入适应证", "联合治疗", "围术期管理", "疗效评估"],
    officialUrl:
      "https://doi.org/10.3760/cma.j.cn112137-20260211-00457",
    officialLabel: "查看 DOI 原文",
    doi: "10.3760/cma.j.cn112137-20260211-00457",
    pmid: "42097631",
    citation:
      "中国医师协会介入医师分会临床指南委员会. 中国肝细胞癌经动脉介入治疗临床实践指南（2026年版）. 中华医学杂志, 2026, 106(20): 1998-2021.",
    pubmedTitle:
      "Chinese clinical practice guidelines for transarterial interventions of hepatocellular carcinoma (2026 edition)."
  },
  {
    id: "hcc-nccn",
    title: "NCCN 肝细胞癌临床实践指南",
    shortTitle: "NCCN Hepatocellular Carcinoma",
    organ: "liver",
    region: "international",
    type: "living",
    source: "National Comprehensive Cancer Network",
    sourceShort: "NCCN",
    displayVersion: "官方实时版本",
    updatedAt: "2026-11-11",
    updatedLabel: "持续更新",
    featured: true,
    status: "实时入口",
    summary:
      "以多学科决策和治疗流程见长的美国综合指南。实际版本号、具体推荐与更新日期在 NCCN 官方页面持续变化。",
    why: "适合快速查看风险分层、治疗路径和药物方案的系统化表述；访问全文通常需要 NCCN 账号。",
    scope: ["风险分层", "治疗路径", "系统治疗", "随访"],
    officialUrl:
      "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1514",
    officialLabel: "打开 NCCN 官方入口",
    doi: "",
    pmid: "",
    citation:
      "NCCN Clinical Practice Guidelines in Oncology: Hepatocellular Carcinoma. NCCN, current version.",
    pubmedTitle: ""
  },
  {
    id: "hcc-esmo-2025",
    title: "ESMO 肝细胞癌诊断、治疗与随访指南",
    shortTitle: "ESMO Hepatocellular Carcinoma",
    organ: "liver",
    region: "international",
    type: "guideline",
    source: "European Society for Medical Oncology",
    sourceShort: "ESMO",
    displayVersion: "2025",
    updatedAt: "2025-05-01",
    updatedLabel: "2025.05 发布",
    featured: false,
    status: "已收录",
    access: "open",
    summary:
      "欧洲肿瘤内科学会综合指南，强调多学科诊疗、证据分级与治疗线次，并附诊断、治疗和随访建议。",
    why: "适合了解欧洲证据框架及与中国、NCCN 路径之间的差异。",
    scope: ["诊断", "治疗决策", "系统治疗", "随访"],
    officialUrl:
      "https://www.esmo.org/guidelines/esmo-clinical-practice-guideline-hepatocellular-carcinoma",
    officialLabel: "直接阅读 ESMO 全文",
    doi: "10.1016/j.annonc.2025.02.006",
    pmid: "39986353",
    citation:
      "ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up. Ann Oncol. 2025;36(5):491-506.",
    pubmedTitle:
      "Hepatocellular carcinoma: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up."
  },
  {
    id: "hcc-ihpba-2026",
    title: "IHPBA 2026 肝癌资源可及性全球指南",
    shortTitle: "IHPBA Global HCC Guideline",
    organ: "liver",
    region: "international",
    type: "guideline",
    source: "International Hepato-Pancreato-Biliary Association",
    sourceShort: "IHPBA",
    displayVersion: "2026",
    updatedAt: "2026-09-30",
    updatedLabel: "2026.09 发布",
    featured: false,
    status: "2026 新收录",
    access: "abstract",
    summary:
      "面向医疗资源受限场景的全球肝癌管理指南，补充了高收入国家路径之外的分层决策与资源适配。",
    why: "适合需要结合药物、技术和转诊资源可及性进行本土化判断的团队。",
    scope: ["资源分层", "诊疗路径", "转诊", "系统治疗"],
    officialUrl: "https://pubmed.ncbi.nlm.nih.gov/42869716/",
    officialLabel: "查看 PubMed 记录",
    doi: "10.1016/j.hpb.2026.08.2009",
    pmid: "42869716",
    citation:
      "IHPBA 2026 global guideline for the management of hepatocellular carcinoma in resource-constrained healthcare settings. HPB (Oxford). 2026.",
    pubmedTitle:
      "IHPBA 2026 global guideline for the management of hepatocellular carcinoma in resource-constrained healthcare settings."
  },
  {
    id: "hcc-asco-2024",
    title: "ASCO 晚期肝细胞癌系统治疗指南更新",
    shortTitle: "ASCO Advanced HCC",
    organ: "liver",
    region: "international",
    type: "update",
    source: "American Society of Clinical Oncology",
    sourceShort: "ASCO",
    displayVersion: "2024",
    updatedAt: "2024-05-20",
    updatedLabel: "2024.05 更新",
    featured: false,
    status: "专题",
    access: "abstract",
    summary:
      "聚焦不可切除或晚期肝细胞癌的一、二线系统治疗选择，提供明确的证据基础与临床问题回答。",
    why: "当决策已进入系统治疗阶段，可作为综合指南之外的专题交叉核对入口。",
    scope: ["晚期 HCC", "一线治疗", "二线治疗", "药物选择"],
    officialUrl: "https://pubmed.ncbi.nlm.nih.gov/38502889/",
    officialLabel: "查看 PubMed 记录",
    doi: "10.1200/JCO.23.02745",
    pmid: "38502889",
    citation:
      "Systemic Therapy for Advanced Hepatocellular Carcinoma: ASCO Guideline Update. J Clin Oncol. 2024;42(15):1830-1850.",
    pubmedTitle:
      "Systemic Therapy for Advanced Hepatocellular Carcinoma: ASCO Guideline Update."
  },
  {
    id: "hcc-panasia-2026",
    title: "2026 亚洲版 ESMO 肝细胞癌临床实践指南",
    shortTitle: "Pan-Asian ESMO Hepatocellular Carcinoma 2026",
    organ: "liver",
    region: "international",
    type: "guideline",
    source: "ESMO / Asian oncology societies",
    sourceShort: "ESMO Asia",
    displayVersion: "2026 亚洲版",
    updatedAt: "2026-08-01",
    updatedLabel: "2026.08 发布",
    featured: true,
    status: "公开全文",
    access: "open",
    localPdf: "./assets/pdfs/hcc-panasia-2026.pdf",
    localPdfPages: 21,
    summary:
      "在 ESMO 肝癌指南基础上完成亚洲情境适配，兼顾亚洲病因构成、药物可及性、筛查体系与多学科资源配置。",
    why: "适合在中国与国际指南之间寻找区域化桥梁，并直接阅读无需登录的完整推荐与证据说明。",
    scope: ["亚洲适配", "诊断", "系统治疗", "局部治疗", "随访"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13542233/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1016/j.esmoop.2026.107771",
    pmid: "42660571",
    citation:
      "Pan-Asian adapted ESMO Clinical Practice Guidelines for the diagnosis, treatment, and follow-up of patients with hepatocellular carcinoma. ESMO Open. 2026;11(8):107771.",
    pubmedTitle:
      "Pan-Asian adapted ESMO Clinical Practice Guidelines for the diagnosis, treatment, and follow-up of patients with hepatocellular carcinoma."
  },
  {
    id: "hcc-china-open-2024",
    title: "中国肝癌诊疗指南（2024版·开放获取英文版）",
    shortTitle: "China Liver Cancer Guidelines 2024",
    organ: "liver",
    region: "china",
    type: "guideline",
    source: "中国肝癌指南专家组",
    sourceShort: "China-HCC",
    displayVersion: "2024 英文版",
    updatedAt: "2025-12-01",
    updatedLabel: "2024 版 · 2025 发表",
    featured: true,
    status: "公开全文",
    access: "open",
    localPdf: "./assets/pdfs/hcc-china-open-2024.pdf",
    localPdfPages: 57,
    summary:
      "中国肝癌诊疗指南的开放获取英文发表版，系统呈现筛查、诊断、分期、外科、介入、放疗和系统治疗路径。",
    why: "适合需要立即阅读完整内容、但无法登录中文期刊账号的场景；最新中文版仍应优先核对 2026 年版。",
    scope: ["筛查诊断", "分期", "外科", "介入", "系统治疗"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12503762/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1159/000546574",
    pmid: "41063733",
    citation:
      "China Liver Cancer Guidelines for the Diagnosis and Treatment of Hepatocellular Carcinoma (2024 Edition). Liver Cancer. 2025;14(6):779-835.",
    pubmedTitle:
      "China Liver Cancer Guidelines for the Diagnosis and Treatment of Hepatocellular Carcinoma (2024 Edition)."
  },
  {
    id: "hcc-china-conversion-perioperative-2024",
    title: "中国原发性肝癌转化及围手术期治疗共识（2024版）",
    shortTitle: "中国肝癌转化及围手术期共识 2024",
    organ: "liver",
    region: "china",
    type: "consensus",
    source: "中国抗癌协会肝癌专业委员会转化治疗联盟",
    sourceShort: "CACA",
    displayVersion: "2024 英文版",
    updatedAt: "2026-06-01",
    updatedLabel: "2024 版 · 2026 发表",
    featured: false,
    status: "公开全文",
    access: "open",
    localPdf: "./assets/pdfs/hcc-china-conversion-perioperative-2024.pdf",
    localPdfPages: 29,
    summary:
      "聚焦原发性肝癌转化治疗、围手术期系统治疗与局部治疗组合、手术时机和术后管理，提供开放获取全文。",
    why: "适合不可切除肝癌的转化评估、MDT 再分期和围手术期路径讨论。",
    scope: ["转化治疗", "围手术期", "联合治疗", "手术时机", "MDT"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13247948/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.21037/hbsn-2025-129",
    pmid: "42273581",
    citation:
      "Chinese expert consensus on conversion and perioperative therapy of primary liver cancer (2024 edition). Hepatobiliary Surg Nutr. 2026;15(3):72.",
    pubmedTitle:
      "Chinese expert consensus on conversion and perioperative therapy of primary liver cancer (2024 edition)."
  },
  {
    id: "btc-nccn",
    title: "NCCN 胆道恶性肿瘤临床实践指南",
    shortTitle: "NCCN Biliary Tract Cancers",
    organ: "biliary",
    region: "international",
    type: "living",
    source: "National Comprehensive Cancer Network",
    sourceShort: "NCCN",
    displayVersion: "官方实时版本",
    updatedAt: "2026-11-11",
    updatedLabel: "持续更新",
    featured: true,
    status: "实时入口",
    summary:
      "覆盖肝内、肝外胆管癌和胆囊癌的分期、可切除性评估、围手术期及晚期系统治疗路径。",
    why: "适合需要按解剖部位和治疗阶段快速定位建议的多学科团队。",
    scope: ["肝内胆管癌", "肝外胆管癌", "胆囊癌", "围手术期", "系统治疗"],
    officialUrl:
      "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1517",
    officialLabel: "打开 NCCN 官方入口",
    doi: "",
    pmid: "",
    citation:
      "NCCN Clinical Practice Guidelines in Oncology: Biliary Tract Cancers. NCCN, current version.",
    pubmedTitle: ""
  },
  {
    id: "btc-china-whole-course-2023",
    title: "中国胆道恶性肿瘤全程规范化管理共识（2023）",
    shortTitle: "中国胆道肿瘤全程管理共识",
    organ: "biliary",
    region: "china",
    type: "consensus",
    source: "中华医学会外科学分会胆道外科学组 / 中国医师协会",
    sourceShort: "CMA",
    displayVersion: "2023 版",
    updatedAt: "2024-06-01",
    updatedLabel: "2024.06 发表",
    featured: true,
    status: "公开 PDF",
    access: "open",
    localPdf: "./assets/pdfs/btc-china-whole-course-2023.pdf",
    localPdfPages: 10,
    summary:
      "面向胆道恶性肿瘤全程管理的中国专家共识，连接筛查诊断、手术、病理评估、辅助治疗、复发监测与晚期系统治疗。",
    why: "适合作为胆道肿瘤 MDT 的中国路径底稿。已检索到公开 PDF 镜像，正式引用仍以期刊 DOI 为准。",
    scope: ["全程管理", "胆管癌", "胆囊癌", "围手术期", "随访"],
    officialUrl:
      "https://www.ddzxhospital.com/library/up_f/file/20240725/202407251459309975.pdf",
    officialLabel: "打开公开全文 PDF",
    accessNote:
      "经网络检索找到的医院图书馆公开 PDF，共 10 页，元数据与《中华外科杂志》2024 年原文一致。",
    doi: "10.3760/cma.j.cn112139-20240203-00062",
    pmid: "38682619",
    citation:
      "中华医学会外科学分会胆道外科学组, 中国医师协会外科医师分会胆道外科专家工作组. 中国胆道恶性肿瘤全程规范化管理专家共识（2023）. 中华外科杂志, 2024, 62(6): 504-513.",
    pubmedTitle:
      "Chinese expert consensus on the whole-course standardized management of biliary tract cancer(2023)."
  },
  {
    id: "btc-china-hilar-2025",
    title: "中国肝门部胆管癌诊断与治疗共识（2025年版）",
    shortTitle: "中国肝门部胆管癌共识 2025",
    organ: "biliary",
    region: "china",
    type: "consensus",
    source: "中国肝门部胆管癌多中心专家组",
    sourceShort: "CN-hCCA",
    displayVersion: "2025 版",
    updatedAt: "2025-09-17",
    updatedLabel: "2025.09 发布",
    featured: false,
    status: "2025 共识",
    access: "open",
    summary:
      "由国内多中心多学科专家形成的肝门部胆管癌诊疗共识，覆盖筛查、诊断、分型分期、手术、局部治疗和系统治疗。",
    why: "适合肝门部胆管癌术前可切除性判断、胆道引流和 MDT 治疗路径的国内参考。",
    scope: ["肝门部胆管癌", "可切除性", "胆道引流", "手术", "系统治疗"],
    officialUrl:
      "https://www.jstage.jst.go.jp/article/bst/19/4/19_2025.01233/_pdf",
    officialLabel: "直接下载开放全文 PDF",
    doi: "10.5582/bst.2025.01233",
    pmid: "40803877",
    citation:
      "Chinese multicenter expert consensus on the diagnosis and treatment of hilar cholangiocarcinoma: 2025 edition. Biosci Trends. 2025;19(4):379-403.",
    pubmedTitle:
      "Chinese multicenter expert consensus on the diagnosis and treatment of hilar cholangiocarcinoma: 2025 edition."
  },
  {
    id: "btc-china-conversion-2025",
    title: "中国胆道恶性肿瘤转化治疗专家共识（2025）",
    shortTitle: "中国胆道肿瘤转化治疗共识 2025",
    organ: "biliary",
    region: "china",
    type: "consensus",
    source: "中华医学会外科学分会胆道外科学组 / 中国医师协会",
    sourceShort: "CMA",
    displayVersion: "2025 版",
    updatedAt: "2025-06-01",
    updatedLabel: "2025.06 发表",
    featured: true,
    status: "转化治疗",
    summary:
      "聚焦不可切除或临界可切除胆道恶性肿瘤的转化治疗，讨论病例选择、方案设计、疗效评估和转化后手术决策。",
    why: "适合在局部进展期胆道肿瘤中评估转化机会、设定再评估节点并组织多学科决策。",
    scope: ["转化治疗", "病例选择", "联合方案", "再评估", "转化后手术"],
    officialUrl:
      "https://doi.org/10.3760/cma.j.cn112139-20250310-00118",
    officialLabel: "查看 DOI 原文",
    doi: "10.3760/cma.j.cn112139-20250310-00118",
    pmid: "40258785",
    citation:
      "中华医学会外科学分会胆道外科学组, 中国医师协会外科医师分会胆道外科专家工作组. 中国胆道恶性肿瘤转化治疗专家共识（2025）. 中华外科杂志, 2025, 63(6): 453-460.",
    pubmedTitle:
      "Expert consensus on conversion therapy of biliary tract cancer (2025)."
  },
  {
    id: "btc-china-laparoscopic-icc-2026",
    title: "中国肝内胆管癌腹腔镜根治术临床实践指南（2026）",
    shortTitle: "中国肝内胆管癌腹腔镜指南 2026",
    organ: "biliary",
    region: "china",
    type: "focused",
    source: "中华医学会外科学分会胆道外科学组 / 中国医师协会",
    sourceShort: "CMA",
    displayVersion: "2026 版",
    updatedAt: "2026-10-01",
    updatedLabel: "2026.10 发布",
    featured: true,
    status: "2026 手术",
    summary:
      "围绕肝内胆管癌腹腔镜根治术的适应证、术前评估、淋巴结清扫、肝切除范围、联合切除与转化后手术形成实践推荐。",
    why: "适合外科团队在病例选择和关键技术环节中核对中国最新手术规范，并明确微创手术的边界。",
    scope: ["肝内胆管癌", "腹腔镜手术", "淋巴结清扫", "肝切除", "转化后手术"],
    officialUrl:
      "https://doi.org/10.3760/cma.j.cn112139-20260727-00324",
    officialLabel: "查看 DOI 原文",
    doi: "10.3760/cma.j.cn112139-20260727-00324",
    pmid: "42669434",
    citation:
      "中华医学会外科学分会胆道外科学组, 中国医师协会外科医师分会胆道外科专家工作组. 中国肝内胆管癌腹腔镜根治术临床实践指南（2026）. 中华外科杂志, 2026, 64(10): 1013-1020.",
    pubmedTitle:
      "Clinical practice guideline for laparoscopic radical resection of intrahepatic cholangiocarcinoma(2026)."
  },
  {
    id: "btc-esmo-2025",
    title: "ESMO 胆道恶性肿瘤管理指南中期更新",
    shortTitle: "ESMO Biliary Tract Cancer",
    organ: "biliary",
    region: "international",
    type: "update",
    source: "European Society for Medical Oncology",
    sourceShort: "ESMO",
    displayVersion: "2025 中期更新",
    updatedAt: "2025-01-01",
    updatedLabel: "2025.01 更新",
    featured: false,
    status: "中期更新",
    access: "open",
    localPdf: "./assets/pdfs/btc-esmo-2025.pdf",
    localPdfPages: 5,
    summary:
      "在 2023 版综合指南基础上更新胆道肿瘤管理中的关键进展，并与 ESMO 官方指南页联动。",
    why: "适合核对系统治疗与分子分型相关变化，再回到综合指南查看完整路径。",
    scope: ["分子检测", "系统治疗", "晚期管理", "更新条目"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11846563/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1016/j.esmoop.2024.104003",
    pmid: "39864891",
    citation:
      "ESMO Clinical Practice Guideline interim update on the management of biliary tract cancer. ESMO Open. 2025;10(1):104003.",
    pubmedTitle:
      "ESMO Clinical Practice Guideline interim update on the management of biliary tract cancer."
  },
  {
    id: "btc-asco-2026",
    title: "ASCO 晚期胆道肿瘤治疗动态指南",
    shortTitle: "ASCO Living Biliary Guideline",
    organ: "biliary",
    region: "international",
    type: "living",
    source: "American Society of Clinical Oncology",
    sourceShort: "ASCO",
    displayVersion: "Version 2026.1.0",
    updatedAt: "2026-10-14",
    updatedLabel: "2026.10 更新",
    featured: true,
    status: "动态版本",
    access: "abstract",
    summary:
      "聚焦晚期胆道肿瘤的系统治疗，采用动态指南形式持续纳入新证据，并标注版本号。",
    why: "适合在晚期治疗决策前快速查看最近一次证据更新和 ASCO 当前推荐。",
    scope: ["晚期胆道肿瘤", "系统治疗", "证据更新", "动态推荐"],
    officialUrl: "https://pubmed.ncbi.nlm.nih.gov/42874012/",
    officialLabel: "查看 PubMed 记录",
    doi: "10.1200/JCO-26-02462",
    pmid: "42874012",
    citation:
      "Treatment of Advanced Biliary Tract Cancer: ASCO Living Guideline, Version 2026.1.0. J Clin Oncol. 2026.",
    pubmedTitle:
      "Treatment of Advanced Biliary Tract Cancer: ASCO Living Guideline, Version 2026.1.0."
  },
  {
    id: "btc-panasia-2024",
    title: "2024 亚洲版 ESMO 胆道肿瘤临床实践指南",
    shortTitle: "Pan-Asian ESMO Biliary Tract Cancer",
    organ: "biliary",
    region: "international",
    type: "guideline",
    source: "ESMO / Asian oncology societies",
    sourceShort: "ESMO Asia",
    displayVersion: "2024 亚洲版",
    updatedAt: "2024-08-01",
    updatedLabel: "2024.08 发布",
    featured: false,
    status: "公开全文",
    access: "open",
    localPdf: "./assets/pdfs/btc-panasia-2024.pdf",
    localPdfPages: 18,
    summary:
      "ESMO 胆道肿瘤指南的亚洲适配版本，针对区域内病因、诊疗资源、分子检测和药物可及性调整推荐路径。",
    why: "适合比较亚洲与会话所在地的实践条件，并直接阅读开放获取的完整指南。",
    scope: ["亚洲适配", "胆管癌", "胆囊癌", "分子检测", "系统治疗"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11410730/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1016/j.esmoop.2024.103647",
    pmid: "39232586",
    citation:
      "Pan-Asian adapted ESMO Clinical Practice Guidelines for the diagnosis, treatment and follow-up of patients with biliary tract cancer. ESMO Open. 2024;9(8):103647.",
    pubmedTitle:
      "Pan-Asian adapted ESMO Clinical Practice Guidelines for the diagnosis, treatment and follow-up of patients with biliary tract cancer."
  },
  {
    id: "pdac-nccn",
    title: "NCCN 胰腺腺癌临床实践指南",
    shortTitle: "NCCN Pancreatic Adenocarcinoma",
    organ: "pancreas",
    region: "international",
    type: "living",
    source: "National Comprehensive Cancer Network",
    sourceShort: "NCCN",
    displayVersion: "官方实时版本",
    updatedAt: "2026-11-11",
    updatedLabel: "持续更新",
    featured: true,
    status: "实时入口",
    summary:
      "覆盖胰腺癌诊断、遗传风险评估、可切除性分层、围手术期和晚期系统治疗的完整决策路径。",
    why: "适合作为 MDT 讨论前的路径底稿，注意核对页面上的当前版本号与最新修订。",
    scope: ["可切除性", "围手术期", "局部晚期", "转移性治疗", "遗传评估"],
    officialUrl:
      "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1455",
    officialLabel: "打开 NCCN 官方入口",
    doi: "",
    pmid: "",
    citation:
      "NCCN Clinical Practice Guidelines in Oncology: Pancreatic Adenocarcinoma. NCCN, current version.",
    pubmedTitle: ""
  },
  {
    id: "pdac-china-national-2022",
    title: "中国胰腺癌诊疗指南（2022年版）",
    shortTitle: "中国胰腺癌国家指南 2022",
    organ: "pancreas",
    region: "china",
    type: "guideline",
    source: "国家卫生健康委员会",
    sourceShort: "NHC",
    displayVersion: "2022 版",
    updatedAt: "2022-06-30",
    updatedLabel: "2022.06 发表",
    featured: true,
    status: "国家指南",
    access: "open",
    localPdf: "./assets/pdfs/pdac-china-national-2022.pdf",
    localPdfPages: 27,
    summary:
      "中国国家级胰腺癌综合诊疗指南的英文发表版本，覆盖筛查诊断、分期、可切除性评估、外科、放疗、系统治疗与随访。",
    why: "适合作为中国胰腺癌综合路径入口；使用时应与 2025 年精准检测共识及后续国际更新交叉核对。",
    scope: ["诊断与分期", "可切除性", "外科治疗", "系统治疗", "随访"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9273582/",
    officialLabel: "查看 PMC 全文",
    doi: "10.21147/j.issn.1000-9604.2022.03.05",
    pmid: "35873891",
    citation:
      "National guidelines for diagnosis and treatment of pancreatic cancer 2022 in China (English version). Chin J Cancer Res. 2022;34(3):238-255.",
    pubmedTitle:
      "National guidelines for diagnosis and treatment of pancreatic cancer 2022 in China (English version)."
  },
  {
    id: "pdac-china-csco-2022",
    title: "CSCO 胰腺癌诊疗指南（2022）",
    shortTitle: "CSCO 胰腺癌指南 2022",
    organ: "pancreas",
    region: "china",
    type: "guideline",
    source: "中国临床肿瘤学会（CSCO）",
    sourceShort: "CSCO",
    displayVersion: "2022 版",
    updatedAt: "2022-12-01",
    updatedLabel: "2022.12 发表",
    featured: false,
    status: "学会指南",
    access: "open",
    localPdf: "./assets/pdfs/pdac-china-csco-2022.pdf",
    localPdfPages: 11,
    summary:
      "CSCO 胰腺癌诊断与治疗指南的国际期刊版本，提供面向中国临床实践的分层推荐和诊疗路径。",
    why: "适合与国家级综合指南并列查看，重点关注适合中国药物可及性和临床实践条件的推荐层级。",
    scope: ["诊疗路径", "分层推荐", "系统治疗", "中国实践", "随访"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11256594/",
    officialLabel: "查看 PMC 全文",
    doi: "10.1016/j.jncc.2022.08.006",
    pmid: "39036552",
    citation:
      "Chinese Society of Clinical Oncology (CSCO): Clinical guidelines for the diagnosis and treatment of pancreatic cancer. J Natl Cancer Cent. 2022;2(4):205-215.",
    pubmedTitle:
      "Chinese Society of Clinical Oncology (CSCO): Clinical guidelines for the diagnosis and treatment of pancreatic cancer."
  },
  {
    id: "pdac-china-precision-2025",
    title: "中国胰腺癌精准检测与分子诊断专家共识（2025）",
    shortTitle: "中国胰腺癌精准检测共识 2025",
    organ: "pancreas",
    region: "china",
    type: "consensus",
    source: "CSCO 胰腺癌专家委员会",
    sourceShort: "CSCO",
    displayVersion: "2025 版",
    updatedAt: "2026-09-01",
    updatedLabel: "2025 共识 · 2026 发表",
    featured: true,
    status: "2025 共识",
    access: "abstract",
    summary:
      "CSCO 胰腺癌专家委员会的多学科共识，覆盖胚系与体细胞检测、KRAS/BRCA/MSI 等标志物、液体活检和精准影像。",
    why: "适合在病理诊断阶段规划分子检测，并为靶向和免疫治疗决策建立可复现的检测路径。",
    scope: ["分子检测", "KRAS", "BRCA", "MSI", "液体活检"],
    officialUrl: "https://pubmed.ncbi.nlm.nih.gov/42498744/",
    officialLabel: "查看 PubMed 记录",
    doi: "10.1038/s41416-026-03522-x",
    pmid: "42498744",
    citation:
      "Chinese expert consensus on precision testing and molecular diagnosis of pancreatic cancer (2025). Br J Cancer. 2026;135(6):845-855.",
    pubmedTitle:
      "Chinese expert consensus on precision testing and molecular diagnosis of pancreatic cancer (2025)."
  },
  {
    id: "pdac-panasia-2025",
    title: "2025 亚洲版 ESMO 胰腺癌临床实践指南",
    shortTitle: "Pan-Asian ESMO Pancreatic Cancer",
    organ: "pancreas",
    region: "international",
    type: "guideline",
    source: "ESMO / Asian oncology societies",
    sourceShort: "ESMO Asia",
    displayVersion: "2025 亚洲版",
    updatedAt: "2025-10-01",
    updatedLabel: "2025.10 发布",
    featured: true,
    status: "公开全文",
    access: "open",
    localPdf: "./assets/pdfs/pdac-panasia-2025.pdf",
    localPdfPages: 28,
    summary:
      "在 ESMO 胰腺癌指南基础上进行亚洲情境适配，覆盖可切除性、围手术期治疗、局部晚期及转移性疾病管理。",
    why: "适合在亚洲药物可及性和诊疗资源框架下阅读完整路径，并与 NCCN、中国指南交叉核对。",
    scope: ["亚洲适配", "可切除性", "围手术期", "系统治疗", "随访"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12546840/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1016/j.esmoop.2025.105826",
    pmid: "41067164",
    citation:
      "Pan-Asian adapted ESMO Clinical Practice Guidelines for the diagnosis, treatment and follow-up of patients with pancreatic cancer. ESMO Open. 2025;10(10):105826.",
    pubmedTitle:
      "Pan-Asian adapted ESMO Clinical Practice Guidelines for the diagnosis, treatment and follow-up of patients with pancreatic cancer."
  },
  {
    id: "pdac-esmo-2023",
    title: "ESMO 胰腺癌诊断、治疗与随访指南",
    shortTitle: "ESMO Pancreatic Cancer",
    organ: "pancreas",
    region: "international",
    type: "guideline",
    source: "European Society for Medical Oncology",
    sourceShort: "ESMO",
    displayVersion: "2023 主指南",
    updatedAt: "2023-11-01",
    updatedLabel: "2023.11 发布",
    featured: false,
    status: "主指南",
    access: "open",
    summary:
      "欧洲胰腺癌综合指南，系统覆盖诊断、分期、手术、放疗、系统治疗和随访。",
    why: "用作完整路径参考；系统治疗部分应结合其后的 Express Update 一起查看。",
    scope: ["诊断与分期", "外科治疗", "放疗", "系统治疗", "随访"],
    officialUrl:
      "https://www.esmo.org/guidelines/esmo-clinical-practice-guideline-pancreatic-cancer",
    officialLabel: "直接阅读 ESMO 全文",
    doi: "10.1016/j.annonc.2023.08.009",
    pmid: "37678671",
    citation:
      "Pancreatic cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up. Ann Oncol. 2023;34(11):987-1002.",
    pubmedTitle:
      "Pancreatic cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up."
  },
  {
    id: "pdac-esmo-2025",
    title: "ESMO 转移性胰腺癌治疗 Express Update（2025）",
    shortTitle: "ESMO Metastatic Pancreatic Cancer 2025",
    organ: "pancreas",
    region: "international",
    type: "update",
    source: "European Society for Medical Oncology",
    sourceShort: "ESMO",
    displayVersion: "2025 Express Update",
    updatedAt: "2025-04-09",
    updatedLabel: "2025.04 更新",
    featured: true,
    status: "2025 更新",
    access: "open",
    localPdf: "./assets/pdfs/pdac-esmo-2025.pdf",
    localPdfPages: 4,
    summary:
      "针对转移性胰腺癌一线和二线系统治疗的快速更新，纳入 NALIRIFOX 一线推荐及 FOLFIRINOX 后吉西他滨联合白蛋白紫杉醇治疗。",
    why: "适合与 2023 年 ESMO 主指南配合阅读，快速定位一线方案与二线治疗选择的更新。",
    scope: ["转移性 PDAC", "NALIRIFOX", "FOLFIRINOX", "二线治疗"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12125698/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1016/j.esmoop.2025.104528",
    pmid: "40287191",
    citation:
      "ESMO Clinical Practice Guideline Express Update on the management of metastatic pancreatic cancer. ESMO Open. 2025;10(4):104528.",
    pubmedTitle:
      "ESMO Clinical Practice Guideline Express Update on the management of metastatic pancreatic cancer."
  },
  {
    id: "pdac-esmo-2026",
    title: "ESMO 转移性胰腺癌 daraxonrasib 快速更新（2026）",
    shortTitle: "ESMO daraxonrasib Update 2026",
    organ: "pancreas",
    region: "international",
    type: "update",
    source: "European Society for Medical Oncology",
    sourceShort: "ESMO",
    displayVersion: "2026 Express Update",
    updatedAt: "2026-11-01",
    updatedLabel: "2026.11 更新",
    featured: true,
    status: "最新更新",
    access: "abstract",
    summary:
      "针对转移性胰腺癌中 daraxonrasib 证据的快速更新，是 2023 主指南和 2025 系统治疗更新之后的专题补充。",
    why: "用于追踪分子靶向治疗的新证据；正式推荐需核对期刊全文、适应证和本地药物可及性。",
    scope: ["转移性 PDAC", "daraxonrasib", "分子靶向", "新证据"],
    officialUrl: "https://pubmed.ncbi.nlm.nih.gov/42617733/",
    officialLabel: "查看 PubMed 记录",
    doi: "10.1016/j.annonc.2026.08.003",
    pmid: "42617733",
    citation:
      "ESMO Clinical Practice Guideline Express Update on daraxonrasib in the treatment of metastatic pancreatic cancer. Ann Oncol. 2026;37:1463-1466.",
    pubmedTitle:
      "ESMO Clinical Practice Guideline Express Update on daraxonrasib in the treatment of metastatic pancreatic cancer."
  },
  {
    id: "pdac-rediscover-2024",
    title: "REDISCOVER 交界可切除及局部晚期胰腺癌围手术期指南",
    shortTitle: "REDISCOVER Pancreatic Perioperative Care",
    organ: "pancreas",
    region: "international",
    type: "consensus",
    source: "REDISCOVER International Consortium",
    sourceShort: "REDISCOVER",
    displayVersion: "2024",
    updatedAt: "2024-07-01",
    updatedLabel: "2024.07 发布",
    featured: false,
    status: "围手术期",
    access: "open",
    localPdf: "./assets/pdfs/pdac-rediscover-2024.pdf",
    localPdfPages: 10,
    summary:
      "面向交界可切除和局部晚期胰腺癌外科患者的国际围手术期管理建议，补充综合指南中的手术细节。",
    why: "适合术前评估、新辅助治疗后的再分期及围手术期路径核对。",
    scope: ["交界可切除", "局部晚期", "新辅助", "围手术期管理"],
    officialUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11161250/",
    officialLabel: "直接阅读 PMC 全文",
    doi: "10.1097/SLA.0000000000006248",
    pmid: "38407228",
    citation:
      "REDISCOVER International Guidelines on the Perioperative Care of Surgical Patients With Borderline-resectable and Locally Advanced Pancreatic Cancer. Ann Surg. 2024;280(1):56-65.",
    pubmedTitle:
      "REDISCOVER International Guidelines on the Perioperative Care of Surgical Patients With Borderline-resectable and Locally Advanced Pancreatic Cancer."
  }
];

export const SOURCE_DIRECTORY = [
  {
    name: "国家卫生健康委员会",
    abbreviation: "NHC",
    description: "中国国家级诊疗规范与行业政策入口",
    url: "https://www.nhc.gov.cn/",
    mark: "华"
  },
  {
    name: "中华医学会",
    abbreviation: "CMA",
    description: "中华医学会及外科学分会胆道外科学组等指南入口",
    url: "https://www.cma.org.cn/",
    mark: "医"
  },
  {
    name: "中国临床肿瘤学会",
    abbreviation: "CSCO",
    description: "CSCO 指南、专家共识与肿瘤诊疗规范入口",
    url: "https://www.csco.org.cn/",
    mark: "C"
  },
  {
    name: "NCCN",
    abbreviation: "NCCN",
    description: "美国综合癌症网络，官方页面持续更新版本",
    url: "https://www.nccn.org/guidelines/category_1",
    mark: "N"
  },
  {
    name: "ESMO",
    abbreviation: "ESMO",
    description: "欧洲肿瘤内科学会临床实践指南",
    url: "https://www.esmo.org/guidelines",
    mark: "E"
  },
  {
    name: "ASCO",
    abbreviation: "ASCO",
    description: "美国临床肿瘤学会指南与动态指南",
    url: "https://www.asco.org/practice-patients/guidelines",
    mark: "A"
  },
  {
    name: "IHPBA",
    abbreviation: "IHPBA",
    description: "国际肝胆胰协会，关注全球与资源分层场景",
    url: "https://ihpba.org/",
    mark: "I"
  },
  {
    name: "PubMed",
    abbreviation: "PubMed",
    description: "检索指南、共识与版本更新的文献入口",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    mark: "P"
  }
];

export const RADAR_QUERIES = {
  liver: {
    label: "肝癌",
    query:
      '("hepatocellular carcinoma"[Title] OR "liver cancer"[Title]) AND guideline[Publication Type]'
  },
  biliary: {
    label: "胆道",
    query:
      '("biliary tract cancer"[Title] OR cholangiocarcinoma[Title]) AND guideline[Publication Type]'
  },
  pancreas: {
    label: "胰腺",
    query:
      '("pancreatic cancer"[Title] OR "pancreatic adenocarcinoma"[Title]) AND guideline[Publication Type]'
  }
};
