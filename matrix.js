export const MATRIX_QUESTIONS = [
  {
    id: "hcc-first-line",
    organ: "liver",
    title: "晚期肝癌一线系统治疗",
    scenario: "不可切除或转移性 HCC，Child-Pugh A，需选择首次系统治疗",
    summary:
      "共同方向是免疫联合优先。中国指南列举的本土获批组合更多；ASCO 更强调 Child-Pugh A、PS 0-1 的证据边界；NCCN 以持续更新的路径和药物页组织选择。",
    rows: [
      {
        guideline: "中国 NHC",
        version: "2026",
        recommendation:
          "优先考虑免疫联合抗血管生成或双免疫方案；同时保留 TKI 单药、替雷利珠单抗和 FOLFOX4。",
        difference:
          "覆盖最多中国已获批联合方案，包括卡瑞利珠单抗+阿帕替尼、信迪利单抗+贝伐珠单抗类似物、菲诺利单抗、特瑞普利单抗和安罗替尼+派安普利单抗等。",
        access: "开放全文",
        url: "./assets/pdfs/hcc-china-2026.pdf"
      },
      {
        guideline: "ASCO",
        version: "2024",
        recommendation:
          "阿替利珠单抗+贝伐珠单抗或度伐利尤单抗+替西木单抗可作为一线；有禁忌时可选索拉非尼、仑伐替尼或度伐利尤单抗。",
        difference:
          "限定于 Child-Pugh A 和 ECOG PS 0-1 的证据人群，并给出不同一线后续二线的对应选择。",
        access: "摘要 / 官方指南",
        url: "https://pubmed.ncbi.nlm.nih.gov/38502889/"
      },
      {
        guideline: "NCCN",
        version: "当前版本",
        recommendation:
          "按肝功能、PS、出血风险、既往治疗和可及性进入相应治疗页；版本持续修订。",
        difference:
          "更新频率高、路径细，但需要注册并核对当前版本号，不宜引用旧截图。",
        access: "需账号",
        url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1514"
      }
    ],
    consensus:
      "三者均将免疫联合置于晚期一线的重要位置；中国指南的本土方案最全，ASCO 对证据人群更严格，NCCN 更适合查看当前路径。",
    caveat:
      "合并食管胃静脉曲张、近期出血、Child-Pugh B/C 或自身免疫病时，不能直接把“联合优先”套用于所有患者。"
  },
  {
    id: "btc-first-line",
    organ: "biliary",
    title: "晚期胆道肿瘤一线与分子检测",
    scenario: "局部晚期或转移性胆管癌/胆囊癌，准备开始首次系统治疗",
    summary:
      "2024-2026 的更新趋于一致：分子检测更靠前，一线以吉西他滨+顺铂联合 PD-(L)1 为基础，无靶点者后线进入 FOLFOX；不同指南对液体活检和具体靶点药物的覆盖程度不同。",
    rows: [
      {
        guideline: "中国共识",
        version: "2024 发表",
        recommendation:
          "GC 为基础；TOPAZ-1、KEYNOTE-966 支持免疫联合化疗。进展后常以 FOLFOX 为二线，并按 FGFR2、IDH1、HER2 等分子靶点选择药物。",
        difference:
          "强调全程管理、可切除性评估与中国可及性；分子检测建议尚不如 ASCO 2026 细。",
        access: "站内全文",
        url: "./assets/pdfs/btc-china-whole-course-2023.pdf"
      },
      {
        guideline: "ESMO",
        version: "2025 中期更新",
        recommendation:
          "启动一线系统治疗时推荐分子分型；吉西他滨+顺铂联合度伐利尤单抗或帕博利珠单抗均列为 I, A。",
        difference:
          "把分子检测前置到一线启动节点，并扩充 FGFR2、HER2、NTRK、RET 的后线推荐。",
        access: "站内全文",
        url: "./assets/pdfs/btc-esmo-2025.pdf"
      },
      {
        guideline: "ASCO Living",
        version: "2026.1.0",
        recommendation:
          "诊断任一阶段推荐组织 DNA/RNA 广谱 NGS；组织不可用时才考虑血浆液体活检。pMMR/MSS 一线推荐 ICI+化疗，dMMR/MSI-H 可用帕博利珠单抗。",
        difference:
          "对组织与液体活检的先后关系最明确，并将 IDH1、FGFR2、BRAF、HER2、RET、NTRK、NRG1 等后线治疗集中到动态指南。",
        access: "摘要 / 动态指南",
        url: "https://pubmed.ncbi.nlm.nih.gov/42874012/"
      },
      {
        guideline: "NCCN",
        version: "当前版本",
        recommendation:
          "按肿瘤部位、可切除性、分子结果和系统治疗线次进入相应页面。",
        difference:
          "手术、局部治疗和系统治疗路径整合最细，但需登录并追踪版本更新。",
        access: "需账号",
        url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1517"
      }
    ],
    consensus:
      "四者均重视分子分型；GC+PD-(L)1 已成为一线重要路径，FOLFOX 是无明确靶点时常用的后线选择。",
    caveat:
      "靶向药的地区获批状态和可及性差异很大，必须核对本地适应证；液体活检不能无条件替代组织检测。"
  },
  {
    id: "pdac-first-line",
    organ: "pancreas",
    title: "转移性胰腺癌一线系统治疗",
    scenario: "病理确诊的转移性胰腺导管腺癌，ECOG PS 0-1 或较差",
    summary:
      "中国 2022 指南以 PS 分层和 FOLFIRINOX/GN 为主；ESMO 2025 更新把 NALIRIFOX 加入体能良好患者的一线选择；NCCN 版本更动态。最关键的差异是 NALIRIFOX 的纳入时间与适用条件。",
    rows: [
      {
        guideline: "中国 NHC",
        version: "2022",
        recommendation:
          "按 PS 选择方案。PS 较好者可用 FOLFIRINOX/mFOLIRINOX 或含吉西他滨双药；PS 较差者考虑单药或支持治疗。",
        difference:
          "这是中国国家级综合指南，尚未纳入 NALIRIFOX 的 2023 年 NAPOLI 3 证据。",
        access: "站内全文",
        url: "./assets/pdfs/pdac-china-national-2022.pdf"
      },
      {
        guideline: "CSCO",
        version: "2022",
        recommendation:
          "GN、FOLFIRINOX、吉西他滨和 S-1 均为一线 I 级推荐；BRCA1/2 胚系突变且铂类获益者考虑奥拉帕利维持。",
        difference:
          "突出中国药物可及性和分层推荐，S-1 等本土常用方案的位置更明确。",
        access: "站内全文",
        url: "./assets/pdfs/pdac-china-csco-2022.pdf"
      },
      {
        guideline: "ESMO",
        version: "2025 Express Update",
        recommendation:
          "ECOG PS 0-1、胆红素 <1.5×ULN 且无重要合并症者，推荐 FOLFIRINOX 或 NALIRIFOX；GN 仍为 I, B 选项。",
        difference:
          "在 2023 主指南基础上新增 NALIRIFOX，并补充 FOLFIRINOX 后 GP 二线推荐。",
        access: "站内全文",
        url: "./assets/pdfs/pdac-esmo-2025.pdf"
      },
      {
        guideline: "NCCN",
        version: "当前版本",
        recommendation:
          "按 PS、合并症和方案耐受性进入一线治疗页，并持续纳入新方案。",
        difference:
          "版本更新最快，适合核对当前药物选项；全文需注册。",
        access: "需账号",
        url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1455"
      }
    ],
    consensus:
      "体能良好患者接受联合化疗，体能较差者降低强度；GN 和 FOLFIRINOX 是共同基础。",
    caveat:
      "NALIRIFOX 与 FOLFIRINOX 没有直接头对头研究，选择需考虑毒性、胆道状态、神经毒性风险和费用。"
  }
];
