import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDELINES } from "../data/guidelines.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(projectRoot, "assets/fulltext-index.json");
const candidates = [
  process.env.PDFTOTEXT_BIN,
  "/Users/lianghongbo/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/bin/pdftotext",
  "/opt/homebrew/bin/pdftotext",
  "/usr/local/bin/pdftotext",
  "/usr/bin/pdftotext"
].filter(Boolean);

const pdftotext = candidates.find((candidate) => existsSync(candidate));
if (!pdftotext) {
  throw new Error("pdftotext is required to build the full-text index.");
}

const normalize = (value) =>
  value
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const documents = [];
const pages = [];

for (const guideline of GUIDELINES.filter((item) => item.localPdf)) {
  const pdfPath = resolve(projectRoot, guideline.localPdf);
  if (!existsSync(pdfPath)) continue;

  let rawText = "";
  try {
    rawText = execFileSync(
      pdftotext,
      ["-layout", "-enc", "UTF-8", pdfPath, "-"],
      { encoding: "utf8", maxBuffer: 60 * 1024 * 1024 }
    );
  } catch (error) {
    console.warn(`Skipping ${guideline.id}: ${error.message}`);
    continue;
  }

  const pageTexts = rawText.split("\f");
  documents.push({
    id: guideline.id,
    title: guideline.title,
    shortTitle: guideline.shortTitle,
    organ: guideline.organ,
    region: guideline.region,
    source: guideline.source,
    version: guideline.displayVersion,
    updatedAt: guideline.updatedAt,
    pdf: guideline.localPdf,
    pageCount: pageTexts.length
  });

  pageTexts.forEach((text, index) => {
    const normalized = normalize(text);
    if (normalized.length < 80) return;
    pages.push({
      docId: guideline.id,
      page: index + 1,
      text: normalized
    });
  });
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    pageCount: pages.length,
    documents,
    pages
  }),
  "utf8"
);

console.log(
  `Indexed ${pages.length} pages from ${documents.length} PDFs -> ${outputPath}`
);
