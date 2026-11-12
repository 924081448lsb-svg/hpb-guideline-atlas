export const CHANGE_TYPES = {
  added: {
    label: "新增",
    description: "旧版没有独立推荐，新版新增"
  },
  strengthened: {
    label: "强化",
    description: "推荐等级、适用范围或证据定位提升"
  },
  revised: {
    label: "修订",
    description: "原有表述或技术参数发生调整"
  },
  removed: {
    label: "删除 / 降级",
    description: "新版弱化、删除或不再作为常规推荐"
  }
};

export const COMPARISONS = [
  {
    id: "hcc-cn-2026-2024",
    organ: "liver",
    title: "中国肝癌诊疗指南",
    subtitle: "2024 版 → 2026 版",
    oldVersion: {
      label: "2024 版",
      date: "2025 英文发表",
      source: "China Liver Cancer Guidelines",
      url: "./assets/pdfs/hcc-china-open-2024.pdf",
      buttonLabel: "打开旧版全文"
    },
    newVersion: {
      label: "2026 版",
      date: "2026.04 发布",
      source: "国家卫生健康委员会",
      url: "./assets/pdfs/hcc-china-2026.pdf",
      buttonLabel: "打开新版全文"
    },
    scope: "中国国家指南",
    summary:
      "新版主要变化集中在晚期一线免疫联合方案、部分方案的推荐等级提升，以及 SBRT 剂量表述调整。旧版仍可用于理解路径延续，但不应替代新版推荐。",
    changes: [
      {
        id: "hcc-nivo-ipi",
        status: "strengthened",
        category: "系统治疗",
        title: "纳武利尤单抗联合伊匹木单抗由“潜在选择”升级为正式一线推荐",
        before:
          "2024 版将 CheckMate 9DW 结果描述为支持该双免疫方案成为潜在的一线治疗选择。",
        after:
          "2026 版列为一线系统治疗第 2 项，给出证据等级 1、推荐 A，并写明该方案已在多国获批。",
        impact:
          "双免疫联合从研究性讨论提升为正式指南方案。临床采用仍需核对中国监管适应证、肝功能分层及免疫相关毒性管理。",
        evidence: "CheckMate 9DW：mOS 23.7 vs 20.6 个月；ORR 36% vs 13%",
        oldSource: "2024 版：Systemic Therapy / Other first-line progress",
        newSource: "2026 版：五（五）1（2），约第 93-94 页"
      },
      {
        id: "hcc-finotonlimab",
        status: "added",
        category: "系统治疗",
        title: "新增菲诺利单抗联合贝伐珠单抗一线方案",
        before: "2024 版没有该联合方案的独立一线推荐。",
        after:
          "2026 版新增为一线推荐，证据等级 1、推荐 A，适用于既往未接受系统治疗的不可切除或转移性肝癌。",
        impact:
          "一线免疫联合选项进一步增加。选择时需要结合药物可及性、出血风险、肝功能与患者合并症。",
        evidence: "SCT-I10A-C301：mOS 22.1 vs 14.2 个月",
        oldSource: "2024 版：First-Line Systemic Antitumor Therapy",
        newSource: "2026 版：五（五）1（5），约第 95-96 页"
      },
      {
        id: "hcc-toripalimab",
        status: "added",
        category: "系统治疗",
        title: "新增特瑞普利单抗联合贝伐珠单抗一线方案",
        before: "2024 版没有该联合方案作为独立一线推荐的条目。",
        after:
          "2026 版新增为证据等级 1、推荐 A 的一线方案，并纳入不可切除或转移性患者的系统治疗路径。",
        impact:
          "为中国患者提供新的 PD-1 联合抗血管生成选项；需与已有免疫联合方案综合比较毒性、费用和可及性。",
        evidence: "HEPATORCH：mOS 20.0 vs 14.5 个月；mPFS 5.8 vs 4.0 个月",
        oldSource: "2024 版：First-Line Systemic Antitumor Therapy",
        newSource: "2026 版：五（五）1（6），约第 96 页"
      },
      {
        id: "hcc-anlotinib-penpulimab",
        status: "added",
        category: "系统治疗",
        title: "新增安罗替尼联合派安普利单抗一线方案",
        before: "2024 版未形成该组合的正式一线推荐。",
        after:
          "2026 版将其列为不可切除或转移性肝癌的一线方案，证据等级 1、推荐 A。",
        impact:
          "TKI 联合免疫治疗的选择增加；实际使用需关注高血压、血小板下降及肝功能异常。",
        evidence: "APOLLO：较索拉非尼降低疾病进展风险 47%、死亡风险 31%",
        oldSource: "2024 版：First-Line Systemic Antitumor Therapy",
        newSource: "2026 版：五（五）1（7），约第 96-97 页"
      },
      {
        id: "hcc-sbrt-dose",
        status: "revised",
        category: "放射治疗",
        title: "SBRT 常用剂量范围下限由 45 Gy 调整为 30 Gy",
        before:
          "2024 版写作 SBRT 一般推荐剂量至少 45-60 Gy，分 3-10 次。",
        after:
          "2026 版写作 SBRT 一般推荐剂量至少 30-60 Gy，分 3-10 次。",
        impact:
          "这是技术参数表述调整，不等于所有患者都适合更低剂量。实际剂量仍需结合肿瘤位置、正常肝体积和肝功能个体化确定。",
        evidence: "两版均强调照射剂量与生存相关，并需要限制正常组织剂量",
        oldSource: "2024 版：Radiotherapy / Key points",
        newSource: "2026 版：五（四）要点论述（4），约第 91 页"
      }
    ]
  },
  {
    id: "btc-esmo-2025-2023",
    organ: "biliary",
    title: "ESMO 胆道肿瘤指南",
    subtitle: "2023 主指南 → 2025 中期更新",
    oldVersion: {
      label: "2023 主指南",
      date: "2023.02 发布",
      source: "ESMO Clinical Practice Guideline",
      url: "https://www.esmo.org/guidelines/esmo-clinical-practice-guideline-biliary-tract-cancer",
      buttonLabel: "打开旧版官方页面"
    },
    newVersion: {
      label: "2025 中期更新",
      date: "2025.01 发表",
      source: "ESMO Open",
      url: "./assets/pdfs/btc-esmo-2025.pdf",
      buttonLabel: "打开新版全文"
    },
    scope: "国际指南专题更新",
    summary:
      "这是一次中期更新，不是整本替代。变化重点是把分子检测前置，并扩充第一线免疫联合及 FGFR2、HER2、NTRK、RET 等靶向治疗推荐。",
    changes: [
      {
        id: "btc-molecular",
        status: "strengthened",
        category: "分子检测",
        title: "启动一线系统治疗时推荐进行分子分型",
        before:
          "2023 版已有分子检测框架，但 2025 更新将其明确为启动一线系统治疗时的高等级推荐。",
        after:
          "对局部晚期、晚期或转移性胆道肿瘤，在开始一线治疗时推荐分子检测，尤其适用于高进展或复发风险患者 [I, A]。",
        impact:
          "分子检测从“可供选择”进一步前移为治疗路径组成部分，影响一线方案和后续靶向机会。",
        evidence: "推荐等级 I, A；建议覆盖 IDH1、FGFR2、BRAF、HER2、NTRK、RET、BRCA1/2、PALB2 等",
        oldSource: "2023 版：诊断与分子检测基础路径",
        newSource: "2025 更新：Diagnosis, pathology and molecular biology，第 1 页"
      },
      {
        id: "btc-first-line-immuno",
        status: "added",
        category: "系统治疗",
        title: "一线免疫联合明确并列纳入度伐利尤单抗与帕博利珠单抗",
        before:
          "2023 版主指南已建立吉西他滨联合顺铂的免疫联合方向；2025 更新将两种 PD-(L)1 联合方案并列推荐。",
        after:
          "顺铂+吉西他滨+度伐利尤单抗或帕博利珠单抗均作为一线治疗推荐 [I, A]。",
        impact:
          "帕博利珠单抗联合方案依据 KEYNOTE-966 进入明确推荐，扩大了晚期胆道肿瘤的一线选择。",
        evidence: "KEYNOTE-966：mOS 12.7 vs 10.9 个月，HR 0.83",
        oldSource: "2023 版：Advanced disease / First-line treatment",
        newSource: "2025 更新：First-line treatment，第 2 页"
      },
      {
        id: "btc-fgfr2",
        status: "added",
        category: "靶向治疗",
        title: "FGFR2 融合患者新增 futibatinib 与 pemigatinib 并列推荐",
        before:
          "2023 版尚未形成 2025 更新中这一组明确的二线及以上并列推荐。",
        after:
          "对既往至少一线系统治疗后进展的 FGFR2 融合或重排胆管癌，推荐 futibatinib 或 pemigatinib [III, A]；ESCAT I-B。",
        impact:
          "FGFR2 检测阳性的患者有了更清晰的后续靶向路径，检测质量与融合判读更加关键。",
        evidence: "FIGHT-202 / FOENIX-CCA2 等单臂研究；推荐等级 III, A",
        oldSource: "2023 版：Second-line targeted therapy",
        newSource: "2025 更新：Second- and later-line treatment，第 3 页"
      },
      {
        id: "btc-her2",
        status: "added",
        category: "靶向治疗",
        title: "HER2 阳性后线治疗新增 trastuzumab deruxtecan 与 zanidatamab",
        before:
          "2023 版没有新版中这两项 HER2 抗体偶联或双抗治疗的明确推荐。",
        after:
          "HER2 过表达和/或扩增患者既往治疗后，可考虑 trastuzumab deruxtecan；既往治疗的 HER2 阳性患者推荐 zanidatamab [III, A]。",
        impact:
          "HER2 成为胆道肿瘤后线治疗的重要分层标志物；不同药物的监管获批状态并不相同。",
        evidence: "DESTINY-PanTumor02、HERIZON-BTC-01 等研究",
        oldSource: "2023 版：HER2-directed therapy",
        newSource: "2025 更新：Second- and later-line treatment，第 3 页"
      },
      {
        id: "btc-ntrk-ret",
        status: "added",
        category: "靶向治疗",
        title: "NTRK 与 RET 融合后线治疗进入正式推荐",
        before: "2023 版未形成新版中对应的 NTRK/RET 完整治疗清单。",
        after:
          "NTRK 融合可使用 entrectinib、larotrectinib 或 repotrectinib；RET 融合可考虑 selpercatinib。",
        impact:
          "虽然发生率低，但一旦检出可获得明确靶向机会，支持在晚期患者中使用足够覆盖相关融合的检测策略。",
        evidence: "篮子试验证据；多项为 III, A；部分药物尚无 EMA 或 FDA 适应证",
        oldSource: "2023 版：Other targetable alterations",
        newSource: "2025 更新：Second- and later-line treatment，第 3 页"
      }
    ]
  },
  {
    id: "pdac-esmo-2025-2023",
    organ: "pancreas",
    title: "ESMO 胰腺癌指南",
    subtitle: "2023 主指南 → 2025 Express Update",
    oldVersion: {
      label: "2023 主指南",
      date: "2023.11 发布",
      source: "ESMO Clinical Practice Guideline",
      url: "https://www.esmo.org/guidelines/esmo-clinical-practice-guideline-pancreatic-cancer",
      buttonLabel: "打开旧版官方页面"
    },
    newVersion: {
      label: "2025 快速更新",
      date: "2025.04 发表",
      source: "ESMO Open",
      url: "./assets/pdfs/pdac-esmo-2025.pdf",
      buttonLabel: "打开新版全文"
    },
    scope: "转移性胰腺癌系统治疗",
    summary:
      "这次 Express Update 主要更新转移性胰腺癌的一线与二线系统治疗。外科、放疗和诊断框架仍应回到 2023 主指南，不应把快速更新当作整本替代。",
    changes: [
      {
        id: "pdac-nalirifox",
        status: "added",
        category: "一线治疗",
        title: "体能良好的转移性胰腺癌新增 NALIRIFOX 一线方案",
        before:
          "2023 主指南的一线首选框架以 FOLFIRINOX 或吉西他滨联合白蛋白紫杉醇为主，尚未纳入 NALIRIFOX 的正式一线推荐。",
        after:
          "ECOG PS 0-1、总胆红素低于 1.5 倍正常上限且无重要合并症的患者，可推荐 FOLFIRINOX 或 NALIRIFOX [I, A]。",
        impact:
          "一线三药方案从 FOLFIRINOX 单一路径扩展为两种可选方案；选择需综合毒性、胆道状态、体能及费用。",
        evidence: "NAPOLI 3：mOS 11.1 vs 9.2 个月；mPFS 7.4 vs 5.6 个月",
        oldSource: "2023 主指南：Metastatic pancreatic cancer / First-line",
        newSource: "2025 更新：First-line treatment，第 1-2 页"
      },
      {
        id: "pdac-gn-position",
        status: "revised",
        category: "一线治疗",
        title: "吉西他滨联合白蛋白紫杉醇的定位更强调体能和胃肠道毒性",
        before:
          "2023 主指南将 FOLFIRINOX 与吉西他滨联合白蛋白紫杉醇作为主要一线选择。",
        after:
          "2025 更新仍保留吉西他滨联合白蛋白紫杉醇 [I, B]，但同时强调其尤其适用于不能耐受三药方案或担心胃肠道毒性的患者。",
        impact:
          "并非所有体能良好患者都必须使用三药方案；治疗选择更强调毒性与患者耐受性。",
        evidence: "网络荟萃分析支持 FOLFIRINOX/NALIRIFOX 为优选，但直接比较证据有限",
        oldSource: "2023 主指南：First-line systemic therapy",
        newSource: "2025 更新：First-line recommendations，第 2 页"
      },
      {
        id: "pdac-second-line-gp",
        status: "added",
        category: "二线治疗",
        title: "FOLFIRINOX 后进展新增吉西他滨联合紫杉醇二线推荐",
        before:
          "2023 主指南未给出 GEMPAX 研究之后这一明确的 FOLFIRINOX 后续二线推荐。",
        after:
          "FOLFIRINOX 治疗后，ECOG PS 0-2 且合并症可控的患者可给予吉西他滨联合紫杉醇 [I, B]。",
        impact:
          "二线治疗由一般性化疗描述转向更具体的方案推荐，但应评估体力状态、神经毒性和合并症。",
        evidence: "GEMPAX：mOS 6.4 vs 5.9 个月；mPFS 3.1 vs 2.0 个月",
        oldSource: "2023 主指南：Second-line treatment",
        newSource: "2025 更新：Second-line treatment，第 2-3 页"
      },
      {
        id: "pdac-after-nalirifox",
        status: "added",
        category: "二线治疗",
        title: "NALIRIFOX 后进展：可考虑含吉西他滨方案，但证据等级很低",
        before:
          "2023 主指南没有 NALIRIFOX 一线治疗后的后续路径，因为 NALIRIFOX 当时尚未进入一线推荐。",
        after:
          "NALIRIFOX 后进展、ECOG PS 0-2 且合并症可控者，可提供含吉西他滨方案 [V, C]。",
        impact:
          "这是基于专家意见的低等级建议，没有前瞻性研究直接验证；不能与 FOLFIRINOX 后 GP 的 I, B 推荐等同理解。",
        evidence: "无直接临床试验数据；推荐等级 V, C",
        oldSource: "2023 主指南：无 NALIRIFOX 后续路径",
        newSource: "2025 更新：Second-line recommendations，第 3 页"
      }
    ]
  }
];
