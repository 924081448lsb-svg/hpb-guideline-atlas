export const STAGING_GROUPS = [
  {
    id: "hcc",
    label: "肝癌",
    code: "HCC",
    system: "CNLC 2026",
    systemNote: "中国肝癌临床分期",
    guidelineId: "hcc-china-2026",
    source: "国家卫生健康委员会 · 2026 版",
    options: [
      {
        code: "Ⅰa",
        label: "早期",
        criteria:
          "PS 0-2 分；Child-Pugh A/B；单个肿瘤 ≤5 cm；无影像学血管癌栓和肝外转移。",
        pathHint: "多可评估手术切除、消融或肝移植适应证。"
      },
      {
        code: "Ⅰb",
        label: "早期",
        criteria:
          "PS 0-2 分；Child-Pugh A/B；单个肿瘤 >5 cm，或 2-3 个肿瘤且最大 ≤3 cm；无血管癌栓和肝外转移。",
        pathHint: "根据肿瘤位置与肝功能评估切除、消融或移植。"
      },
      {
        code: "Ⅱa",
        label: "中期",
        criteria:
          "PS 0-2 分；Child-Pugh A/B；2-3 个肿瘤且最大 >3 cm；无血管癌栓和肝外转移。",
        pathHint: "MDT 评估切除、局部治疗或移植可能性。"
      },
      {
        code: "Ⅱb",
        label: "中期",
        criteria:
          "PS 0-2 分；Child-Pugh A/B；肿瘤数目 ≥4 个；无血管癌栓和肝外转移。",
        pathHint: "以介入治疗和转化评估为核心，选择合适者再评估手术。"
      },
      {
        code: "Ⅲa",
        label: "局部晚期",
        criteria:
          "PS 0-2 分；Child-Pugh A/B；存在影像学可见血管癌栓，但无肝外转移。",
        pathHint: "重点评估转化机会，采用局部与系统治疗组合。"
      },
      {
        code: "Ⅲb",
        label: "晚期",
        criteria:
          "PS 0-2 分；Child-Pugh A/B；存在肝外转移；血管癌栓可有可无。",
        pathHint: "以系统治疗为主，部分寡转移患者可联合局部治疗。"
      },
      {
        code: "Ⅳ",
        label: "终末期风险",
        criteria:
          "PS 3-4 分，或肝功能 Child-Pugh C；不论肿瘤大小、数目、血管癌栓和肝外转移情况。",
        pathHint: "优先处理肝功能与全身状态，治疗选择需高度个体化。"
      }
    ]
  },
  {
    id: "biliary",
    label: "胆道肿瘤",
    code: "BTC",
    system: "AJCC 8th + 可切除性",
    systemNote: "胆囊癌、肝内/肝外胆管癌需分别使用对应 TNM 表",
    guidelineId: "btc-china-whole-course-2023",
    source: "中国胆道恶性肿瘤全程管理共识",
    options: [
      {
        code: "R",
        label: "可切除",
        criteria:
          "无远处转移，原发灶和区域淋巴结技术上可达到 R0 切除。具体标准按胆囊、肝内、肝门或远端胆管癌分别判断。",
        pathHint: "以根治性手术和规范淋巴结清扫为核心，术后按危险因素决定辅助治疗。"
      },
      {
        code: "BR",
        label: "临界可切除",
        criteria:
          "存在复杂血管/胆道重建、余肝体积边缘或广泛淋巴结风险，但根治性切除仍可能完成。",
        pathHint: "需要 MDT 讨论，评估新辅助或转化治疗及术后肝储备。"
      },
      {
        code: "LA",
        label: "局部进展",
        criteria:
          "无远处转移，但肿瘤侵犯关键血管或邻近结构，无法安全达到 R0 切除。",
        pathHint: "以系统治疗和分子分型为主；部分患者评估局部治疗或转化后手术。"
      },
      {
        code: "M1",
        label: "转移性",
        criteria:
          "存在远处转移，AJCC 对应 M1 / Ⅳ期。",
        pathHint: "系统治疗为核心，启动治疗时优先完成可操作靶点的分子检测。"
      }
    ]
  },
  {
    id: "pancreas",
    label: "胰腺癌",
    code: "PDAC",
    system: "AJCC 8th",
    systemNote: "病理/临床 TNM 分期；手术决策还需同步判断可切除性",
    guidelineId: "pdac-rediscover-2024",
    source: "AJCC 8th / REDISCOVER 围手术期路径",
    options: [
      {
        code: "ⅠA",
        label: "T1 N0 M0",
        criteria: "肿瘤最大径 ≤2 cm，无区域淋巴结转移和远处转移。",
        pathHint: "先确认可切除性；可切除者通常进入手术与围手术期路径。"
      },
      {
        code: "ⅠB",
        label: "T2 N0 M0",
        criteria: "肿瘤最大径 >2 cm 且 ≤4 cm，无区域淋巴结转移和远处转移。",
        pathHint: "分期不是手术唯一依据，还要评估血管和全身状况。"
      },
      {
        code: "ⅡA",
        label: "T3 N0 M0",
        criteria: "肿瘤最大径 >4 cm，无区域淋巴结转移和远处转移。",
        pathHint: "需同步判断是否可切除、交界可切除或局部进展。"
      },
      {
        code: "ⅡB",
        label: "T1-3 N1 M0",
        criteria: "原发肿瘤未侵犯腹腔干或肠系膜上动脉，但存在区域淋巴结转移。",
        pathHint: "MDT 评估手术、新辅助及辅助治疗路径。"
      },
      {
        code: "Ⅲ",
        label: "T4 Any N M0",
        criteria: "肿瘤侵犯腹腔干或肠系膜上动脉；可有区域淋巴结转移，无远处转移。",
        pathHint: "通常为局部进展风险高，需按血管受累程度评估可切除性。"
      },
      {
        code: "Ⅳ",
        label: "Any T Any N M1",
        criteria: "存在远处转移。",
        pathHint: "以系统治疗为核心；需结合体能、胆道状态和分子信息选择方案。"
      }
    ]
  }
];
