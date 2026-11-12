import { mkdir, writeFile } from "node:fs/promises";
import { GUIDELINES } from "../data/guidelines.js";

const LOOKBACK_DAYS = Number(process.env.GUIDELINE_LOOKBACK_DAYS || 120);
const EUtilsBase = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const EUtilsIdentity = {
  tool: "hpb_guideline_atlas",
  email: process.env.NCBI_EMAIL || "924081448lsb-svg@users.noreply.github.com",
  ...(process.env.NCBI_API_KEY ? { api_key: process.env.NCBI_API_KEY } : {})
};

const cancerQueries = [
  {
    organ: "肝癌",
    term: '("hepatocellular carcinoma"[Title] OR "liver cancer"[Title]) AND guideline[Publication Type]'
  },
  {
    organ: "胆道肿瘤",
    term:
      '("biliary tract cancer"[Title] OR cholangiocarcinoma[Title] OR "gallbladder cancer"[Title]) AND guideline[Publication Type]'
  },
  {
    organ: "胰腺癌",
    term:
      '("pancreatic cancer"[Title] OR "pancreatic adenocarcinoma"[Title]) AND guideline[Publication Type]'
  }
];

const formatDate = (date) =>
  `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}/${String(date.getUTCDate()).padStart(2, "0")}`;

const maxDate = new Date();
const minDate = new Date(
  Date.UTC(
    maxDate.getUTCFullYear(),
    maxDate.getUTCMonth(),
    maxDate.getUTCDate() - LOOKBACK_DAYS
  )
);

const knownPmids = new Set(
  GUIDELINES.map((guideline) => guideline.pmid).filter(Boolean)
);

const fetchJson = async (url, attempts = 5) => {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "hpb-guideline-atlas/1.0"
        }
      });
      if (response.ok) return response.json();
      lastError = new Error(`Request failed ${response.status}: ${url}`);
      if (![429, 500, 502, 503, 504].includes(response.status)) throw lastError;
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    }
  }
  throw lastError;
};

const candidates = [];
const checkedSources = [];

for (const source of cancerQueries) {
  const params = new URLSearchParams({
    db: "pubmed",
    term: source.term,
    retmode: "json",
    retmax: "12",
    sort: "pub date",
    datetype: "pdat",
    mindate: formatDate(minDate),
    maxdate: formatDate(maxDate),
    ...EUtilsIdentity
  });
  const search = await fetchJson(`${EUtilsBase}/esearch.fcgi?${params}`);
  const ids = search.esearchresult?.idlist || [];

  if (!ids.length) {
    checkedSources.push({ ...source, count: 0 });
    continue;
  }

  const summaryParams = new URLSearchParams({
    db: "pubmed",
    id: ids.join(","),
    retmode: "json",
    ...EUtilsIdentity
  });
  const summary = await fetchJson(`${EUtilsBase}/esummary.fcgi?${summaryParams}`);

  for (const pmid of ids) {
    if (knownPmids.has(pmid)) continue;
    const item = summary.result?.[pmid];
    if (!item || item.error) continue;
    candidates.push({
      organ: source.organ,
      pmid,
      title: item.title || "",
      journal: item.source || "",
      pubdate: item.pubdate || "",
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
    });
  }
  checkedSources.push({ ...source, count: ids.length });
  await new Promise((resolve) => setTimeout(resolve, 350));
}

const today = formatDate(maxDate).replaceAll("/", "-");
const report = [
  `# 肝胆胰指南更新候选 · ${today}`,
  "",
  `检索窗口：最近 ${LOOKBACK_DAYS} 天。`,
  "",
  "## 新指南类文献",
  "",
  ...(candidates.length
    ? candidates.map(
        (item, index) =>
          `${index + 1}. **${item.organ}** · ${item.title}  \n   ${item.journal} · ${item.pubdate} · [PMID ${item.pmid}](${item.url})`
      )
    : ["本次未发现未收录的指南类文献。"]),
  "",
  "## 本次检索范围",
  "",
  ...checkedSources.map(
    (source) => `- ${source.organ}：${source.count} 条近期记录`
  ),
  "",
  "> 自动结果只用于发现更新线索。新增、改名、推荐变更和 PDF 全文必须人工核对官方页面后再纳入资料库。"
].join("\n");

await mkdir("reports", { recursive: true });
await writeFile("reports/guideline-watch-latest.md", report, "utf8");
console.log(report);

if (process.env.GITHUB_STEP_SUMMARY) {
  await writeFile(process.env.GITHUB_STEP_SUMMARY, report, "utf8");
}

if (
  candidates.length &&
  process.env.GITHUB_ACTIONS === "true" &&
  process.env.GITHUB_TOKEN &&
  process.env.GITHUB_REPOSITORY
) {
  const title = `[指南更新候选] ${today} · ${candidates.length} 条`;
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "hpb-guideline-atlas"
      },
      body: JSON.stringify({
        title,
        body: report
      })
    }
  );
  if (!response.ok) {
    throw new Error(`Unable to create GitHub issue: ${response.status}`);
  }
}

