import {
  GUIDELINES,
  ORGANS,
  RADAR_QUERIES,
  REGIONS,
  SITE_META,
  SOURCE_DIRECTORY,
  TYPES
} from "./data/guidelines.js";
import { CHANGE_TYPES, COMPARISONS } from "./data/comparisons.js";
import { MATRIX_QUESTIONS } from "./data/matrix.js";
import { STAGING_GROUPS } from "./data/staging.js";

const SHORT_TITLES = {
  liver: "HCC",
  biliary: "BTC",
  pancreas: "PDAC"
};

const ACCESS_META = {
  open: {
    label: "开放全文",
    detail: "无需账号，可直接阅读或下载"
  },
  abstract: {
    label: "仅摘要",
    detail: "当前公开入口提供摘要或元数据"
  },
  account: {
    label: "需账号",
    detail: "官方全文可能需要机构或个人账号"
  }
};

const getAccess = (guideline) => guideline.access || "account";

const state = {
  organ: "all",
  region: "all",
  type: "all",
  sort: "newest",
  query: "",
  savedOnly: false,
  openOnly: false,
  localOnly: false,
  comparisonId: COMPARISONS[0].id,
  comparisonCategory: "all",
  stagingGroupId: STAGING_GROUPS[0].id,
  stagingIndex: 0,
  fulltextOrgan: "all",
  fulltextQuery: "",
  matrixId: MATRIX_QUESTIONS[0].id,
  saved: new Set(JSON.parse(localStorage.getItem("hpb-saved") || "[]")),
  verifiedPmids: new Set()
};

const elements = {
  grid: document.querySelector("#guidelineGrid"),
  emptyState: document.querySelector("#emptyState"),
  resultCount: document.querySelector("#resultCount"),
  searchInput: document.querySelector("#searchInput"),
  regionFilter: document.querySelector("#regionFilter"),
  typeFilter: document.querySelector("#typeFilter"),
  sortFilter: document.querySelector("#sortFilter"),
  openAccessFilter: document.querySelector("#openAccessFilter"),
  localAccessFilter: document.querySelector("#localAccessFilter"),
  savedFilter: document.querySelector("#savedFilter"),
  savedCount: document.querySelector("#savedCount"),
  activeFilters: document.querySelector("#activeFilters"),
  chinaShortcut: document.querySelector("#chinaShortcut"),
  comparisonTabs: document.querySelector("#comparisonTabs"),
  comparisonHeader: document.querySelector("#comparisonHeader"),
  comparisonContent: document.querySelector("#comparisonContent"),
  stagingTabs: document.querySelector("#stagingTabs"),
  stagingStageList: document.querySelector("#stagingStageList"),
  stagingDetail: document.querySelector("#stagingDetail"),
  stagingGuideLink: document.querySelector("#stagingGuideLink"),
  heroFulltextForm: document.querySelector("#heroFulltextForm"),
  heroFulltextSearchInput: document.querySelector("#heroFulltextSearchInput"),
  fulltextIndexStatus: document.querySelector("#fulltextIndexStatus"),
  fulltextSearchInput: document.querySelector("#fulltextSearchInput"),
  clearFulltextSearch: document.querySelector("#clearFulltextSearch"),
  fulltextOrganFilters: document.querySelector("#fulltextOrganFilters"),
  fulltextResults: document.querySelector("#fulltextResults"),
  matrixTabs: document.querySelector("#matrixTabs"),
  matrixContent: document.querySelector("#matrixContent"),
  mdtForm: document.querySelector("#mdtForm"),
  mdtPreview: document.querySelector("#mdtPreview"),
  drawer: document.querySelector("#detailDrawer"),
  drawerScrim: document.querySelector("#drawerScrim"),
  drawerContent: document.querySelector("#drawerContent"),
  toast: document.querySelector("#toast"),
  verifyButton: document.querySelector("#verifyButton"),
  heroVerifyButton: document.querySelector("#heroVerifyButton"),
  verifyStatus: document.querySelector("#verifyStatus"),
  verifyLabel: document.querySelector("#verifyLabel"),
  radarStatus: document.querySelector("#radarStatus"),
  radarTime: document.querySelector("#radarTime"),
  refreshRadar: document.querySelector("#refreshRadar")
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatDate = (dateString, style = "short") => {
  if (!dateString) return "持续更新";
  const date = new Date(`${dateString}T12:00:00`);
  if (style === "numeric") {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
      .format(date)
      .replaceAll("/", ".");
  }
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
};

const showToast = (message) => {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2600);
};

const getVisibleGuidelines = () => {
  const query = state.query.trim().toLocaleLowerCase("zh-CN");
  const visible = GUIDELINES.filter((guideline) => {
    const matchesOrgan = state.organ === "all" || guideline.organ === state.organ;
    const matchesRegion =
      state.region === "all" || guideline.region === state.region;
    const matchesType = state.type === "all" || guideline.type === state.type;
    const matchesSaved = !state.savedOnly || state.saved.has(guideline.id);
    const matchesAccess = !state.openOnly || getAccess(guideline) === "open";
    const matchesLocal = !state.localOnly || Boolean(guideline.localPdf);
    const searchableText = [
      guideline.title,
      guideline.shortTitle,
      guideline.source,
      guideline.summary,
      ACCESS_META[getAccess(guideline)].label,
      ...guideline.scope
    ]
      .join(" ")
      .toLocaleLowerCase("zh-CN");
    const matchesQuery = !query || searchableText.includes(query);
    return (
      matchesOrgan &&
      matchesRegion &&
      matchesType &&
      matchesSaved &&
      matchesAccess &&
      matchesLocal &&
      matchesQuery
    );
  });

  return visible.sort((a, b) => {
    if (state.sort === "title") {
      return a.title.localeCompare(b.title, "zh-CN");
    }
    if (state.sort === "recommended") {
      return Number(b.featured) - Number(a.featured) ||
        new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
};

const renderCard = (guideline, index) => {
  const isSaved = state.saved.has(guideline.id);
  const accent = ORGANS[guideline.organ].accent;
  const organ = ORGANS[guideline.organ];
  const verified = guideline.pmid && state.verifiedPmids.has(guideline.pmid);
  const access = getAccess(guideline);
  const accessMeta = ACCESS_META[access];
  const accessLabel = guideline.localPdf ? "站内全文" : accessMeta.label;

  return `
    <article
      class="guideline-card accent-${accent}${guideline.featured ? " is-featured" : ""}"
      style="animation-delay:${Math.min(index * 35, 210)}ms"
      data-id="${escapeHtml(guideline.id)}"
    >
      <span class="status-ribbon">${escapeHtml(guideline.status)}</span>
      <span class="card-watermark" aria-hidden="true">${SHORT_TITLES[guideline.organ]}</span>
      <div class="card-top">
        <div class="card-badges">
          <span class="organ-badge"><i></i>${escapeHtml(organ.label)}</span>
          <span class="access-badge ${access}">${escapeHtml(accessLabel)}</span>
        </div>
        <button
          class="save-button${isSaved ? " is-saved" : ""}"
          type="button"
          data-save="${escapeHtml(guideline.id)}"
          aria-label="${isSaved ? "取消收藏" : "收藏"}：${escapeHtml(guideline.title)}"
          aria-pressed="${isSaved}"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6-4.3-4.2 6-.9L12 3Z" />
          </svg>
        </button>
      </div>
      <div class="card-source">
        ${escapeHtml(guideline.sourceShort)} · ${escapeHtml(REGIONS[guideline.region])} ·
        ${escapeHtml(TYPES[guideline.type])}${verified ? " · PubMed 已核验" : ""}${guideline.localPdf ? ` · 站内 ${guideline.localPdfPages} 页` : ""}
      </div>
      <h3>${escapeHtml(guideline.title)}</h3>
      <p class="card-summary">${escapeHtml(guideline.summary)}</p>
      <div class="card-tags">
        ${guideline.scope
          .slice(0, 3)
          .map((tag) => `<span class="card-tag">${escapeHtml(tag)}</span>`)
          .join("")}
      </div>
      <div class="card-footer">
        <span class="card-version">
          <i class="version-dot"></i>
          ${escapeHtml(guideline.displayVersion)} · ${escapeHtml(guideline.updatedLabel)}
        </span>
        <button class="detail-button" type="button" data-detail="${escapeHtml(guideline.id)}">
          查看详情
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M14 7l5 5-5 5" />
          </svg>
        </button>
      </div>
    </article>
  `;
};

const renderActiveFilters = () => {
  const filters = [];
  if (state.organ !== "all") {
    filters.push({
      key: "organ",
      label: ORGAN_TITLE(state.organ)
    });
  }
  if (state.region !== "all") {
    filters.push({
      key: "region",
      label: REGIONS[state.region]
    });
  }
  if (state.type !== "all") {
    filters.push({
      key: "type",
      label: TYPES[state.type]
    });
  }
  if (state.query) {
    filters.push({
      key: "query",
      label: `“${state.query}”`
    });
  }
  if (state.savedOnly) {
    filters.push({ key: "savedOnly", label: "仅看收藏" });
  }
  if (state.openOnly) {
    filters.push({ key: "openOnly", label: "仅看开放全文" });
  }
  if (state.localOnly) {
    filters.push({ key: "localOnly", label: "仅看站内全文" });
  }

  elements.activeFilters.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-chip" type="button" data-clear-filter="${filter.key}">
          ${escapeHtml(filter.label)}
          <span aria-hidden="true">×</span>
        </button>
      `
    )
    .join("");
};

const ORGAN_TITLE = (organ) => ORGANS[organ]?.label || "全部";

const updateLibraryCounts = () => {
  const countByOrgan = (organ) =>
    GUIDELINES.filter((guideline) => guideline.organ === organ).length;
  document.querySelector("#allGuidelineCount").textContent = GUIDELINES.length;
  document.querySelector("#liverGuidelineCount").textContent =
    countByOrgan("liver");
  document.querySelector("#biliaryGuidelineCount").textContent =
    countByOrgan("biliary");
  document.querySelector("#pancreasGuidelineCount").textContent =
    countByOrgan("pancreas");
  document.querySelector("#chinaGuidelineCount").textContent =
    GUIDELINES.filter((guideline) => guideline.region === "china").length;
  document.querySelector("#openAccessCount").textContent =
    GUIDELINES.filter((guideline) => getAccess(guideline) === "open").length;
  document.querySelector("#localAccessCount").textContent =
    GUIDELINES.filter((guideline) => Boolean(guideline.localPdf)).length;
  document.querySelector("#totalGuidelineCount").textContent = GUIDELINES.length;
  document.querySelector("#sourceCount").textContent = SOURCE_DIRECTORY.length;
};

const renderLibrary = () => {
  const visible = getVisibleGuidelines();
  elements.grid.innerHTML = visible.map(renderCard).join("");
  elements.resultCount.textContent = visible.length;
  elements.emptyState.hidden = visible.length !== 0;
  elements.grid.hidden = visible.length === 0;
  elements.savedCount.textContent = state.saved.size;
  updateLibraryCounts();
  renderActiveFilters();
};

const syncControls = () => {
  document.querySelectorAll(".organ-tab").forEach((button) => {
    const isActive = button.dataset.organ === state.organ;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  elements.searchInput.value = state.query;
  elements.regionFilter.value = state.region;
  elements.typeFilter.value = state.type;
  elements.sortFilter.value = state.sort;
  elements.savedFilter.setAttribute("aria-pressed", String(state.savedOnly));
  elements.openAccessFilter.setAttribute("aria-pressed", String(state.openOnly));
  elements.localAccessFilter.setAttribute("aria-pressed", String(state.localOnly));
  elements.chinaShortcut.setAttribute(
    "aria-pressed",
    String(state.region === "china")
  );
};

const clearFilters = () => {
  state.organ = "all";
  state.region = "all";
  state.type = "all";
  state.query = "";
  state.savedOnly = false;
  state.openOnly = false;
  state.localOnly = false;
  syncControls();
  renderLibrary();
};

const saveSaved = () => {
  localStorage.setItem("hpb-saved", JSON.stringify([...state.saved]));
};

const toggleSaved = (id) => {
  const guideline = GUIDELINES.find((item) => item.id === id);
  if (!guideline) return;
  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast(`已取消收藏：${guideline.shortTitle}`);
  } else {
    state.saved.add(id);
    showToast(`已收藏：${guideline.shortTitle}`);
  }
  saveSaved();
  renderLibrary();
};

const openDrawer = (id) => {
  const guideline = GUIDELINES.find((item) => item.id === id);
  if (!guideline) return;
  const organ = ORGANS[guideline.organ];
  const isSaved = state.saved.has(guideline.id);
  const access = getAccess(guideline);
  const accessMeta = ACCESS_META[access];
  const accessLabel = guideline.localPdf ? "站内全文" : accessMeta.label;
  const primaryHref = guideline.localPdf || guideline.officialUrl;
  const primaryLabel = guideline.localPdf
    ? `站内阅读全文 PDF · ${guideline.localPdfPages} 页`
    : guideline.officialLabel;

  elements.drawerContent.innerHTML = `
    <div class="drawer-organ">
      <i></i>${escapeHtml(organ.label)} / ${SHORT_TITLES[guideline.organ]}
      <span class="drawer-access ${access}">${escapeHtml(accessLabel)}</span>
    </div>
    <h2 id="drawerTitle">${escapeHtml(guideline.title)}</h2>
    <p class="drawer-source-line">
      ${escapeHtml(guideline.source)} · ${escapeHtml(REGIONS[guideline.region])}
    </p>
    <p class="drawer-access-note">
      ${escapeHtml(accessMeta.detail)}。${guideline.localPdf ? `全文 PDF 已下载到本站，可直接离线阅读。` : ""}${escapeHtml(guideline.accessNote || "")}${access === "account" ? "点击前请确认是否已有登录权限。" : ""}
    </p>
    <div class="drawer-actions">
      <a class="button button-primary" href="${escapeHtml(primaryHref)}" target="_blank" rel="noopener noreferrer">
        ${escapeHtml(primaryLabel)}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M19 14v5H5V5h5" />
        </svg>
      </a>
      <button
        class="icon-button save-button${isSaved ? " is-saved" : ""}"
        type="button"
        data-save="${escapeHtml(guideline.id)}"
        aria-label="${isSaved ? "取消收藏" : "收藏"}"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6-4.3-4.2 6-.9L12 3Z" />
        </svg>
      </button>
    </div>
    ${
      guideline.localPdf
        ? `<a class="drawer-original-link" href="${escapeHtml(guideline.officialUrl)}" target="_blank" rel="noopener noreferrer">查看原始来源 <span>↗</span></a>`
        : ""
    }
    <section class="drawer-section">
      <h3>收录摘要</h3>
      <p>${escapeHtml(guideline.summary)}</p>
    </section>
    <section class="drawer-section">
      <h3>适合怎么用</h3>
      <p>${escapeHtml(guideline.why)}</p>
    </section>
    <section class="drawer-section">
      <h3>版本信息</h3>
      <dl class="drawer-facts">
        <div>
          <dt>当前标识</dt>
          <dd>${escapeHtml(guideline.displayVersion)}</dd>
        </div>
        <div>
          <dt>发布 / 更新</dt>
          <dd>${escapeHtml(guideline.updatedLabel)}</dd>
        </div>
        <div>
          <dt>文件类型</dt>
          <dd>${escapeHtml(TYPES[guideline.type])}</dd>
        </div>
        <div>
          <dt>地区范围</dt>
          <dd>${escapeHtml(REGIONS[guideline.region])}</dd>
        </div>
        <div>
          <dt>阅读方式</dt>
          <dd>${escapeHtml(accessLabel)}</dd>
        </div>
      </dl>
    </section>
    <section class="drawer-section">
      <h3>关键主题</h3>
      <div class="drawer-tags">
        ${guideline.scope
          .map((tag) => `<span>${escapeHtml(tag)}</span>`)
          .join("")}
      </div>
    </section>
    <section class="drawer-section">
      <h3>建议引用</h3>
      <div class="citation-box">
        <p>${escapeHtml(guideline.citation)}</p>
        ${
          guideline.doi
            ? `<p class="doi-line">DOI: ${escapeHtml(guideline.doi)}</p>`
            : ""
        }
        <button class="copy-button" type="button" data-copy-citation="${escapeHtml(guideline.id)}" aria-label="复制引用">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="8" y="8" width="11" height="12" rx="2" />
            <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
      </div>
    </section>
  `;

  elements.drawerScrim.hidden = false;
  requestAnimationFrame(() => elements.drawerScrim.classList.add("visible"));
  elements.drawer.classList.add("open");
  elements.drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  document.querySelector("#closeDrawer").focus();
};

const closeDrawer = () => {
  elements.drawer.classList.remove("open");
  elements.drawer.setAttribute("aria-hidden", "true");
  elements.drawerScrim.classList.remove("visible");
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    elements.drawerScrim.hidden = true;
  }, 300);
};

const setOrgan = (organ) => {
  state.organ = organ;
  syncControls();
  renderLibrary();
};

const applyClinicalShortcut = (query) => {
  state.query = query;
  state.organ = "all";
  state.region = "all";
  state.type = "all";
  state.savedOnly = false;
  state.openOnly = false;
  state.localOnly = false;
  syncControls();
  renderLibrary();
  document.querySelector("#library").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => {
    if (!getVisibleGuidelines().length) {
      showToast(`暂未收录“${query}”专题，可调整关键词或查看近期检索`);
    } else {
      showToast(`已定位与“${query}”相关的指南`);
    }
  }, 350);
};

const setupTheme = () => {
  const stored = localStorage.getItem("hpb-theme");
  if (stored) {
    document.documentElement.dataset.theme = stored;
  }
  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("hpb-theme", next);
  });
};

const copyText = async (text, successMessage) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    showToast(successMessage);
  }
};

const renderSources = () => {
  document.querySelector("#sourceGrid").innerHTML = SOURCE_DIRECTORY.map(
    (source) => `
      <a class="source-card" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">
        <span class="source-mark">${escapeHtml(source.mark)}</span>
        <div>
          <h3>${escapeHtml(source.name)}</h3>
          <small>${escapeHtml(source.abbreviation)}</small>
          <p>${escapeHtml(source.description)}</p>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </a>
    `
  ).join("");
};

const getActiveComparison = () =>
  COMPARISONS.find((comparison) => comparison.id === state.comparisonId) ||
  COMPARISONS[0];

const renderStaging = () => {
  const group =
    STAGING_GROUPS.find((item) => item.id === state.stagingGroupId) ||
    STAGING_GROUPS[0];
  const option =
    group.options[
      Math.min(Math.max(state.stagingIndex, 0), group.options.length - 1)
    ];

  elements.stagingTabs.innerHTML = STAGING_GROUPS.map(
    (item) => `
      <button
        class="staging-tab${item.id === group.id ? " active" : ""}"
        type="button"
        role="tab"
        data-staging-group="${escapeHtml(item.id)}"
        aria-selected="${item.id === group.id}"
      >
        ${escapeHtml(item.label)}
      </button>
    `
  ).join("");

  elements.stagingStageList.innerHTML = `
    ${group.options
      .map(
        (stage, index) => `
          <button
            class="staging-stage-button${index === state.stagingIndex ? " active" : ""}"
            type="button"
            role="tab"
            data-staging-index="${index}"
            aria-selected="${index === state.stagingIndex}"
          >
            <strong>${escapeHtml(stage.code)}</strong>
            <span>${escapeHtml(stage.label)}</span>
          </button>
        `
      )
      .join("")}
    <p class="staging-stage-note">
      ${escapeHtml(group.systemNote)}
    </p>
  `;

  elements.stagingDetail.innerHTML = `
    <div class="staging-detail-system">
      ${escapeHtml(group.system)} · ${escapeHtml(group.code)}
    </div>
    <div class="staging-detail-main">
      <div class="staging-code">${escapeHtml(option.code)}</div>
      <div class="staging-detail-copy">
        <h3>${escapeHtml(option.label)}</h3>
        <p>${escapeHtml(option.criteria)}</p>
      </div>
    </div>
    <div class="staging-path">
      <strong>路径提示</strong>
      <span>${escapeHtml(option.pathHint)}</span>
    </div>
  `;

  elements.stagingGuideLink.innerHTML = `${escapeHtml(group.source)} <span>↗</span>`;
  elements.stagingGuideLink.dataset.guideId = group.guidelineId;
};

let fulltextIndex = null;
let fulltextIndexPromise = null;

const loadFulltextIndex = async () => {
  if (fulltextIndex) return fulltextIndex;
  if (fulltextIndexPromise) return fulltextIndexPromise;
  fulltextIndexPromise = fetchJson("./assets/fulltext-index.json")
    .then((data) => {
      fulltextIndex = data;
      elements.fulltextIndexStatus.classList.add("ready");
      elements.fulltextIndexStatus.innerHTML = `<span></span>已索引 ${data.pageCount} 页 · ${data.documents.length} 份全文`;
      if (state.fulltextQuery) renderFulltextResults();
      return data;
    })
    .catch(() => {
      elements.fulltextIndexStatus.textContent = "全文索引载入失败";
      fulltextIndexPromise = null;
      return null;
    });
  return fulltextIndexPromise;
};

const getSearchTerms = (query) => {
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  if (!normalized) return [];
  return [...new Set(
    normalized
      .split(/[\s,，、;；/]+/)
      .map((term) => term.trim())
      .filter((term) => term.length > 1)
  )].sort((a, b) => b.length - a.length);
};

const highlightFulltext = (text, terms) => {
  if (!terms.length) return escapeHtml(text);
  const escapedText = escapeHtml(text);
  const escapedTerms = terms
    .map((term) => escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .filter(Boolean);
  if (!escapedTerms.length) return escapedText;
  return escapedText.replace(
    new RegExp(`(${escapedTerms.join("|")})`, "gi"),
    "<mark>$1</mark>"
  );
};

const makeSnippet = (text, query, terms) => {
  const lower = text.toLocaleLowerCase("zh-CN");
  const phrase = query.trim().toLocaleLowerCase("zh-CN");
  const compactText = lower.replace(/\s+/g, "");
  const compactPhrase = phrase.replace(/\s+/g, "");
  let index = compactPhrase ? compactText.indexOf(compactPhrase) : -1;
  if (index < 0) {
    index = Math.min(
      ...terms.map((term) => {
        const found = compactText.indexOf(term.replace(/\s+/g, ""));
        return found < 0 ? Number.POSITIVE_INFINITY : found;
      })
    );
  }
  if (!Number.isFinite(index) || index < 0) index = 0;
  const start = Math.max(0, index - 105);
  const end = Math.min(text.length, index + 185);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).replace(/\s+/g, " ")}${end < text.length ? "…" : ""}`;
};

const renderFulltextResults = () => {
  const query = state.fulltextQuery.trim();
  if (!query) {
    elements.fulltextResults.innerHTML = `
      <div class="fulltext-placeholder">
        <span>SEARCH INSIDE / 原文定位</span>
        <h3>输入一个临床词，直接跳到原文页码</h3>
        <p>支持中文与英文关键词，结果来自本地保存的公开全文 PDF。</p>
      </div>
    `;
    return;
  }
  if (!fulltextIndex) {
    elements.fulltextResults.innerHTML =
      '<div class="fulltext-no-results">正在建立全文索引，请稍候…</div>';
    loadFulltextIndex();
    return;
  }

  const terms = getSearchTerms(query);
  const phrase = query.replace(/\s+/g, "").toLocaleLowerCase("zh-CN");
  const highlightTerms = new Set(terms);
  if (/[\u3400-\u9fff]/.test(phrase) && phrase.length >= 4) {
    for (let index = 0; index < phrase.length - 1; index += 1) {
      highlightTerms.add(phrase.slice(index, index + 2));
    }
  }
  const documentMap = new Map(
    fulltextIndex.documents.map((document) => [document.id, document])
  );
  const results = [];

  for (const page of fulltextIndex.pages) {
    const document = documentMap.get(page.docId);
    if (!document) continue;
    if (state.fulltextOrgan !== "all" && document.organ !== state.fulltextOrgan) {
      continue;
    }
    const lower = page.text
      .toLocaleLowerCase("zh-CN")
      .replace(/\s+/g, "");
    const phraseCount =
      phrase.length > 1 ? lower.split(phrase).length - 1 : 0;
    const termCounts = terms.map(
      (term) => lower.split(term.replace(/\s+/g, "")).length - 1
    );
    const matchedTerms = termCounts.filter((count) => count > 0).length;
    if (phraseCount === 0 && (terms.length === 0 || matchedTerms === 0)) continue;
    const score =
      phraseCount * 20 +
      termCounts.reduce((sum, count) => sum + count, 0) * 3 +
      matchedTerms * 5;
    results.push({ ...page, document, score });
  }

  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, 40);
  if (!top.length) {
    elements.fulltextResults.innerHTML = `
      <div class="fulltext-no-results">
        没有找到“${escapeHtml(query)}”。尝试更换关键词，或切换癌种范围。
      </div>
    `;
    return;
  }

  elements.fulltextResults.innerHTML = `
    <div class="fulltext-results-head">
      <strong>${top.length} 个原文命中</strong>
      <span>${escapeHtml(query)} · ${state.fulltextOrgan === "all" ? "全部癌种" : ORGAN_TITLE(state.fulltextOrgan)}</span>
    </div>
    <div class="fulltext-result-list">
      ${top
        .map((result) => {
          const snippet = makeSnippet(result.text, query, terms);
          return `
            <article class="fulltext-result">
              <div>
                <div class="fulltext-result-meta">
                  <span>${escapeHtml(ORGAN_TITLE(result.document.organ))}</span>
                  <span>${escapeHtml(result.document.source)}</span>
                  <span>${escapeHtml(result.document.version)}</span>
                </div>
                <h4>${escapeHtml(result.document.title)}</h4>
                <p>${highlightFulltext(snippet, [...highlightTerms])}</p>
              </div>
              <a class="fulltext-page-link" href="${escapeHtml(result.document.pdf)}#page=${result.page}" target="_blank" rel="noopener noreferrer">
                第 ${result.page} 页 ↗
              </a>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
};

const renderMatrix = () => {
  const question =
    MATRIX_QUESTIONS.find((item) => item.id === state.matrixId) ||
    MATRIX_QUESTIONS[0];
  elements.matrixTabs.innerHTML = MATRIX_QUESTIONS.map(
    (item) => `
      <button
        class="matrix-question-tab${item.id === question.id ? " active" : ""}"
        type="button"
        data-matrix-id="${escapeHtml(item.id)}"
      >
        ${escapeHtml(item.title)}
      </button>
    `
  ).join("");

  const headers = question.rows
    .map(
      (row) => `
        <div class="matrix-cell guideline-head">
          <h4>${escapeHtml(row.guideline)}</h4>
          <p>${escapeHtml(row.version)} · ${escapeHtml(row.access)}</p>
          <a href="${escapeHtml(row.url)}" target="_blank" rel="noopener noreferrer">查看来源 ↗</a>
        </div>
      `
    )
    .join("");
  const recommendationCells = question.rows
    .map(
      (row) =>
        `<div class="matrix-cell body">${escapeHtml(row.recommendation)}</div>`
    )
    .join("");
  const differenceCells = question.rows
    .map(
      (row) =>
        `<div class="matrix-cell body difference">${escapeHtml(row.difference)}</div>`
    )
    .join("");

  elements.matrixContent.innerHTML = `
    <div class="matrix-summary">
      <div class="matrix-summary-copy">
        <span>${escapeHtml(ORGAN_TITLE(question.organ))} · CLINICAL QUESTION</span>
        <h3>${escapeHtml(question.title)}</h3>
        <p>${escapeHtml(question.summary)}</p>
      </div>
      <div class="matrix-column-count">
        <strong>${question.rows.length}</strong>
        <span>份指南 / 共识</span>
      </div>
    </div>
    <div class="matrix-scroll">
      <div class="matrix-table" style="--matrix-count:${question.rows.length}">
        <div class="matrix-cell row-label">指南与版本</div>
        ${headers}
        <div class="matrix-cell row-label">核心推荐</div>
        ${recommendationCells}
        <div class="matrix-cell row-label">关键差异</div>
        ${differenceCells}
      </div>
    </div>
    <div class="matrix-consensus">
      <div><strong>共同点</strong><p>${escapeHtml(question.consensus)}</p></div>
      <div><strong>不能忽略的边界</strong><p>${escapeHtml(question.caveat)}</p></div>
    </div>
  `;
};

const renderEmptyMdt = () => {
  elements.mdtPreview.innerHTML = `
    <div class="mdt-preview-empty">
      <span>MDT SUMMARY</span>
      <h3>填写后生成讨论摘要</h3>
      <p>输出仅作为沟通模板，不生成诊断或治疗结论。</p>
    </div>
  `;
};

const buildMdtSummary = (formData) => {
  const fields = [
    ["肿瘤类型", formData.get("cancer")],
    ["分期 / 范围", formData.get("stage")],
    ["可切除性", formData.get("resectability")],
    ["体能及器官功能", formData.get("status")],
    ["病理与分子", formData.get("pathology")],
    ["既往治疗 / MDT 问题", formData.get("treatment")]
  ].map(([label, value]) => ({ label, value: String(value || "").trim() || "未填写" }));
  return fields;
};

const getMdtPlainText = (fields) =>
  [
    "MDT 讨论一页纸",
    `生成日期：${new Intl.DateTimeFormat("zh-CN").format(new Date())}`,
    "",
    ...fields.map((field) => `${field.label}：${field.value}`),
    "",
    "说明：本摘要仅用于多学科讨论，不包含诊断或治疗结论；请勿填写患者身份信息。"
  ].join("\n");

const printMdt = (fields) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    showToast("浏览器阻止了打印窗口，请允许弹窗");
    return;
  }
  printWindow.opener = null;
  const rows = fields
    .map(
      (field) => `
        <tr><th>${escapeHtml(field.label)}</th><td>${escapeHtml(field.value).replaceAll("\n", "<br>")}</td></tr>
      `
    )
    .join("");
  printWindow.document.write(`
    <!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
    <title>MDT 讨论一页纸</title>
    <style>
      body{font-family:-apple-system,"PingFang SC",sans-serif;color:#17231f;margin:38px;line-height:1.7}
      h1{font-family:"Songti SC",serif;font-size:28px;margin:0 0 5px}
      .meta{color:#777;font-size:12px;margin-bottom:24px}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #bbb;padding:10px 12px;text-align:left;vertical-align:top;font-size:13px}
      th{width:145px;background:#f3efe6}
      .note{margin-top:18px;color:#777;font-size:11px}
      @media print{body{margin:20mm}}
    </style></head><body>
      <h1>MDT 讨论一页纸</h1>
      <div class="meta">生成日期：${escapeHtml(new Intl.DateTimeFormat("zh-CN").format(new Date()))}</div>
      <table>${rows}</table>
      <p class="note">仅供多学科讨论沟通，不包含诊断或治疗结论。</p>
      <script>window.onload=()=>window.print()</script>
    </body></html>
  `);
  printWindow.document.close();
};

const renderComparisonTabs = () => {
  elements.comparisonTabs.innerHTML = COMPARISONS.map(
    (comparison) => `
      <button
        class="comparison-tab${comparison.id === state.comparisonId ? " active" : ""}"
        type="button"
        data-comparison="${escapeHtml(comparison.id)}"
        data-organ="${escapeHtml(comparison.organ)}"
        aria-pressed="${comparison.id === state.comparisonId}"
      >
        <span class="comparison-tab-dot"></span>
        <span class="comparison-tab-copy">
          <strong>${escapeHtml(comparison.title)}</strong>
          <span>${escapeHtml(comparison.subtitle)}</span>
        </span>
        <span class="comparison-tab-count">${comparison.changes.length}</span>
      </button>
    `
  ).join("");
};

const renderComparison = () => {
  const comparison = getActiveComparison();
  renderComparisonTabs();

  const counts = comparison.changes.reduce(
    (accumulator, change) => {
      accumulator[change.status] = (accumulator[change.status] || 0) + 1;
      return accumulator;
    },
    {}
  );

  elements.comparisonHeader.innerHTML = `
    <div class="comparison-eyebrow">
      <strong>${escapeHtml(ORGANS[comparison.organ].label)} / ${escapeHtml(ORGANS[comparison.organ].short)}</strong>
      <span>${escapeHtml(comparison.scope)}</span>
    </div>
    <div class="version-compare-row">
      <article class="version-card old">
        <span class="version-card-label">OLDER VERSION</span>
        <h3>${escapeHtml(comparison.oldVersion.label)}</h3>
        <p>${escapeHtml(comparison.oldVersion.date)}</p>
        <div class="version-card-footer">
          <span class="version-source">${escapeHtml(comparison.oldVersion.source)}</span>
          <a class="version-link" href="${escapeHtml(comparison.oldVersion.url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(comparison.oldVersion.buttonLabel)} <span>↗</span>
          </a>
        </div>
      </article>
      <div class="version-arrow" aria-hidden="true"><span>→</span></div>
      <article class="version-card new">
        <span class="version-card-label">LATEST VERSION</span>
        <h3>${escapeHtml(comparison.newVersion.label)}</h3>
        <p>${escapeHtml(comparison.newVersion.date)}</p>
        <div class="version-card-footer">
          <span class="version-source">${escapeHtml(comparison.newVersion.source)}</span>
          <a class="version-link" href="${escapeHtml(comparison.newVersion.url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(comparison.newVersion.buttonLabel)} <span>↗</span>
          </a>
        </div>
      </article>
    </div>
    <div class="compare-summary">
      <p>${escapeHtml(comparison.summary)}</p>
      <div class="compare-stats">
        <div class="compare-stat"><strong>${comparison.changes.length}</strong><span>变化条目</span></div>
        ${Object.entries(CHANGE_TYPES)
          .filter(([status]) => counts[status])
          .map(
            ([status, meta]) => `
              <div class="compare-stat">
                <strong>${counts[status]}</strong>
                <span>${escapeHtml(meta.label)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  const categories = [
    "all",
    ...new Set(comparison.changes.map((change) => change.category))
  ];
  if (
    state.comparisonCategory !== "all" &&
    !categories.includes(state.comparisonCategory)
  ) {
    state.comparisonCategory = "all";
  }

  const visibleChanges = comparison.changes.filter(
    (change) =>
      state.comparisonCategory === "all" ||
      change.category === state.comparisonCategory
  );

  elements.comparisonContent.innerHTML = `
    <div class="change-filters" role="group" aria-label="按变更类别筛选">
      ${categories
        .map(
          (category) => `
            <button
              class="change-filter${state.comparisonCategory === category ? " active" : ""}"
              type="button"
              data-change-category="${escapeHtml(category)}"
            >
              ${category === "all" ? "全部变化" : escapeHtml(category)}
            </button>
          `
        )
        .join("")}
    </div>
    <div class="diff-list">
      ${
        visibleChanges.length
          ? visibleChanges
              .map(
                (change, index) => `
                  <details class="diff-item"${index === 0 ? " open" : ""}>
                    <summary>
                      <span class="diff-category">
                        <span class="change-badge ${escapeHtml(change.status)}">${escapeHtml(CHANGE_TYPES[change.status].label)}</span>
                        <small>${escapeHtml(change.category)}</small>
                      </span>
                      <h3 class="diff-title">${escapeHtml(change.title)}</h3>
                      <span class="diff-toggle" aria-hidden="true">＋</span>
                    </summary>
                    <div class="diff-body">
                      <div class="diff-compare">
                        <div class="diff-side before">
                          <span>${escapeHtml(comparison.oldVersion.label)} / BEFORE</span>
                          <p>${escapeHtml(change.before)}</p>
                        </div>
                        <div class="diff-arrow" aria-hidden="true">→</div>
                        <div class="diff-side after">
                          <span>${escapeHtml(comparison.newVersion.label)} / AFTER</span>
                          <p>${escapeHtml(change.after)}</p>
                        </div>
                      </div>
                      <div class="diff-impact">
                        <strong>临床解读</strong>
                        <p>${escapeHtml(change.impact)}</p>
                      </div>
                      <p class="diff-evidence"><b>证据 / 关键结果：</b>${escapeHtml(change.evidence)}</p>
                      <div class="diff-sources">
                        <span class="diff-source"><span>旧版</span>${escapeHtml(change.oldSource)}</span>
                        <span class="diff-source"><span>新版</span>${escapeHtml(change.newSource)}</span>
                      </div>
                    </div>
                  </details>
                `
              )
              .join("")
          : `<p class="compare-empty">该类别下暂无已核验的变化条目。</p>`
      }
    </div>
  `;
};

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

const verifyPubMedRecords = async ({ quiet = false } = {}) => {
  const tracked = GUIDELINES.filter((guideline) => guideline.pmid);
  if (!tracked.length) return;

  elements.verifyButton.classList.add("is-loading");
  if (!quiet) {
    elements.verifyLabel.textContent = "正在查询 PubMed";
    elements.verifyStatus.textContent = `${tracked.length} 条待核验`;
  }

  try {
    const ids = tracked.map((guideline) => guideline.pmid).join(",");
    const data = await fetchJson(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids}`
    );
    const result = data.result || {};
    let matched = 0;
    const mismatches = [];

    tracked.forEach((guideline) => {
      const remote = result[guideline.pmid];
      if (!remote) return;
      matched += 1;
      state.verifiedPmids.add(guideline.pmid);
      const remoteTitle = (remote.title || "")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">");
      if (
        guideline.pubmedTitle &&
        remoteTitle &&
        remoteTitle.toLocaleLowerCase().slice(0, 48) !==
          guideline.pubmedTitle.toLocaleLowerCase().slice(0, 48)
      ) {
        mismatches.push(guideline.shortTitle);
      }
    });

    const now = new Date();
    const nowLabel = new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(now);

    elements.verifyLabel.textContent = "PubMed 元数据已同步";
    elements.verifyStatus.textContent = `${matched}/${tracked.length} 条 · ${nowLabel}`;
    renderLibrary();
    if (!quiet) {
      showToast(
        mismatches.length
          ? `已核验 ${matched} 条，${mismatches.length} 条题名有差异，请查看原文`
          : `已核验 ${matched} 条 PubMed 记录`
      );
    }
  } catch {
    elements.verifyLabel.textContent = "联网核验未完成";
    elements.verifyStatus.textContent = "请检查网络后重试";
    if (!quiet) {
      showToast("PubMed 暂时无法访问，已保留本地核验目录");
    }
  } finally {
    elements.verifyButton.classList.remove("is-loading");
  }
};

const parseYearMonth = (dateString) => {
  if (!dateString) return { year: "----", month: "--" };
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return { year: "----", month: "--" };
  return {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1).padStart(2, "0")
  };
};

const renderRadarColumn = (organ, items) => {
  const container = document.querySelector(
    `[data-radar-organ="${organ}"] .radar-list`
  );
  if (!items.length) {
    container.innerHTML = `<p class="radar-error">近期未检索到新的指南类记录。</p>`;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const { year, month } = parseYearMonth(item.pubdate);
      return `
        <div class="radar-item">
          <span class="radar-date"><strong>${year}</strong>${month} 月</span>
          <a href="https://pubmed.ncbi.nlm.nih.gov/${escapeHtml(item.uid)}/" target="_blank" rel="noopener noreferrer">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.source || "PubMed")} · PMID ${escapeHtml(item.uid)}</p>
          </a>
          <svg class="radar-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </div>
      `;
    })
    .join("");
};

const makeRadarUrl = (query) => {
  const params = new URLSearchParams({
    db: "pubmed",
    term: query,
    retmode: "json",
    retmax: "5",
    sort: "pub date"
  });
  return `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params}`;
};

const loadRadar = async ({ force = false } = {}) => {
  const cached = sessionStorage.getItem("hpb-radar");
  if (!force && cached) {
    try {
      const payload = JSON.parse(cached);
      if (Date.now() - payload.savedAt < 6 * 60 * 60 * 1000) {
        renderRadar(payload.data, payload.savedAt);
        return;
      }
    } catch {
      sessionStorage.removeItem("hpb-radar");
    }
  }

  elements.radarStatus.textContent = "正在检索近期指南类文献…";
  elements.refreshRadar.disabled = true;
  const organKeys = Object.keys(RADAR_QUERIES);
  const radarData = {};

  try {
    for (const organ of organKeys) {
      const searchData = await fetchJson(makeRadarUrl(RADAR_QUERIES[organ].query));
      const ids = searchData.esearchresult?.idlist || [];
      if (!ids.length) {
        radarData[organ] = [];
      } else {
        const summaryData = await fetchJson(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`
        );
        radarData[organ] = ids
          .map((id) => summaryData.result?.[id])
          .filter(Boolean)
          .slice(0, 3);
      }
      await new Promise((resolve) => window.setTimeout(resolve, 380));
    }
    const savedAt = Date.now();
    sessionStorage.setItem("hpb-radar", JSON.stringify({ savedAt, data: radarData }));
    renderRadar(radarData, savedAt);
  } catch {
    elements.radarStatus.textContent = "PubMed 雷达暂时离线";
    elements.radarTime.textContent = "请点击刷新重试";
    organKeys.forEach((organ) => {
      document.querySelector(
        `[data-radar-organ="${organ}"] .radar-list`
      ).innerHTML = `<p class="radar-error">联网检索未完成，请稍后重试。</p>`;
    });
  } finally {
    elements.refreshRadar.disabled = false;
  }
};

const renderRadar = (data, savedAt) => {
  Object.keys(RADAR_QUERIES).forEach((organ) => {
    renderRadarColumn(organ, data[organ] || []);
  });
  elements.radarStatus.textContent = "已载入近期指南类文献";
  elements.radarTime.textContent = `检索于 ${new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(savedAt))}`;
};

const setupNavigation = () => {
  const navLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${visible.target.id}`
          );
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25] }
    );
    sections.forEach((section) => observer.observe(section));
  }
};

const bindEvents = () => {
  elements.heroFulltextForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = elements.heroFulltextSearchInput.value.trim();
    if (!query) {
      elements.heroFulltextSearchInput.focus();
      return;
    }
    state.fulltextQuery = query;
    elements.fulltextSearchInput.value = query;
    renderFulltextResults();
    elements.heroFulltextSearchInput.blur();
    const section = document.querySelector("#fulltext");
    window.setTimeout(() => {
      section.scrollIntoView({ behavior: "auto", block: "start" });
    }, 0);
  });

  let fulltextTimer;
  elements.fulltextSearchInput.addEventListener("input", (event) => {
    window.clearTimeout(fulltextTimer);
    fulltextTimer = window.setTimeout(() => {
      state.fulltextQuery = event.target.value;
      renderFulltextResults();
    }, 160);
  });

  elements.clearFulltextSearch.addEventListener("click", () => {
    state.fulltextQuery = "";
    elements.fulltextSearchInput.value = "";
    renderFulltextResults();
    elements.fulltextSearchInput.focus();
  });

  elements.fulltextOrganFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fulltext-organ]");
    if (!button) return;
    state.fulltextOrgan = button.dataset.fulltextOrgan;
    elements.fulltextOrganFilters.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("active", item.dataset.fulltextOrgan === state.fulltextOrgan);
    });
    renderFulltextResults();
  });

  document.querySelectorAll("[data-fulltext-query]").forEach((button) => {
    button.addEventListener("click", () => {
      state.fulltextQuery = button.dataset.fulltextQuery;
      elements.fulltextSearchInput.value = state.fulltextQuery;
      renderFulltextResults();
    });
  });

  elements.matrixTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-matrix-id]");
    if (!button) return;
    state.matrixId = button.dataset.matrixId;
    renderMatrix();
  });

  elements.mdtForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = buildMdtSummary(new FormData(elements.mdtForm));
    const text = getMdtPlainText(fields);
    elements.mdtPreview.innerHTML = `
      <div class="mdt-summary">
        <div class="mdt-summary-head">
          <span>MDT DISCUSSION SHEET</span>
          <h3>讨论摘要已生成</h3>
          <p>${escapeHtml(new Intl.DateTimeFormat("zh-CN").format(new Date()))}</p>
        </div>
        <dl class="mdt-summary-list">
          ${fields
            .map(
              (field) => `
                <div class="mdt-summary-item">
                  <dt>${escapeHtml(field.label)}</dt>
                  <dd>${escapeHtml(field.value)}</dd>
                </div>
              `
            )
            .join("")}
        </dl>
        <p class="mdt-summary-note">数据只保留在当前页面内存中，刷新后清空；不生成诊断或治疗结论。</p>
        <div class="mdt-summary-actions">
          <button type="button" data-mdt-action="print">打印 / 另存 PDF</button>
          <button type="button" data-mdt-action="copy">复制文本</button>
        </div>
      </div>
    `;
    elements.mdtPreview.dataset.plainText = text;
    elements.mdtPreview.dataset.fields = JSON.stringify(fields);
  });

  elements.mdtForm.addEventListener("reset", () => {
    window.setTimeout(renderEmptyMdt, 0);
  });

  elements.mdtPreview.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mdt-action]");
    if (!button) return;
    const fields = JSON.parse(elements.mdtPreview.dataset.fields || "[]");
    if (button.dataset.mdtAction === "print") printMdt(fields);
    if (button.dataset.mdtAction === "copy") {
      copyText(elements.mdtPreview.dataset.plainText || "", "MDT 摘要已复制");
    }
  });

  elements.stagingTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-staging-group]");
    if (!button) return;
    state.stagingGroupId = button.dataset.stagingGroup;
    state.stagingIndex = 0;
    renderStaging();
  });

  elements.stagingStageList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-staging-index]");
    if (!button) return;
    state.stagingIndex = Number(button.dataset.stagingIndex);
    renderStaging();
  });

  elements.stagingGuideLink.addEventListener("click", () => {
    const guideId = elements.stagingGuideLink.dataset.guideId;
    if (GUIDELINES.some((guideline) => guideline.id === guideId)) {
      openDrawer(guideId);
    }
  });

  elements.comparisonTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-comparison]");
    if (!button) return;
    state.comparisonId = button.dataset.comparison;
    state.comparisonCategory = "all";
    renderComparison();
  });

  elements.comparisonContent.addEventListener("click", (event) => {
    const button = event.target.closest("[data-change-category]");
    if (!button) return;
    state.comparisonCategory = button.dataset.changeCategory;
    renderComparison();
  });

  document.querySelectorAll(".organ-tab").forEach((button) => {
    button.addEventListener("click", () => {
      setOrgan(button.dataset.organ);
    });
  });

  let searchTimer;
  elements.searchInput.addEventListener("input", (event) => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.query = event.target.value;
      renderLibrary();
    }, 120);
  });

  elements.regionFilter.addEventListener("change", (event) => {
    state.region = event.target.value;
    syncControls();
    renderLibrary();
  });

  elements.typeFilter.addEventListener("change", (event) => {
    state.type = event.target.value;
    renderLibrary();
  });

  elements.sortFilter.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderLibrary();
  });

  elements.savedFilter.addEventListener("click", () => {
    state.savedOnly = !state.savedOnly;
    state.openOnly = false;
    state.localOnly = false;
    syncControls();
    renderLibrary();
  });

  elements.openAccessFilter.addEventListener("click", () => {
    state.openOnly = !state.openOnly;
    state.localOnly = false;
    state.savedOnly = false;
    syncControls();
    renderLibrary();
    showToast(
      state.openOnly ? "已筛选为可直接阅读的开放全文" : "已显示全部阅读方式"
    );
  });

  elements.localAccessFilter.addEventListener("click", () => {
    state.localOnly = !state.localOnly;
    state.openOnly = false;
    state.savedOnly = false;
    syncControls();
    renderLibrary();
    showToast(
      state.localOnly ? "已筛选为已下载到本站的全文" : "已显示全部阅读方式"
    );
  });

  elements.chinaShortcut.addEventListener("click", () => {
    state.region = state.region === "china" ? "all" : "china";
    state.organ = "all";
    state.type = "all";
    state.query = "";
    state.savedOnly = false;
    state.openOnly = false;
    state.localOnly = false;
    syncControls();
    renderLibrary();
    showToast(
      state.region === "china"
        ? "已切换为中国指南与共识"
        : "已显示全部地区指南"
    );
  });

  elements.activeFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-clear-filter]");
    if (!button) return;
    const key = button.dataset.clearFilter;
    if (key === "organ") state.organ = "all";
    if (key === "region") state.region = "all";
    if (key === "type") state.type = "all";
    if (key === "query") state.query = "";
    if (key === "savedOnly") state.savedOnly = false;
    if (key === "openOnly") state.openOnly = false;
    if (key === "localOnly") state.localOnly = false;
    syncControls();
    renderLibrary();
  });

  document.querySelector("#resetFilters").addEventListener("click", clearFilters);

  elements.grid.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save]");
    if (saveButton) {
      toggleSaved(saveButton.dataset.save);
      return;
    }
    const detailButton = event.target.closest("[data-detail]");
    if (detailButton) {
      openDrawer(detailButton.dataset.detail);
    }
  });

  elements.drawerContent.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save]");
    if (saveButton) {
      toggleSaved(saveButton.dataset.save);
      const updated = GUIDELINES.find((item) => item.id === saveButton.dataset.save);
      if (updated) openDrawer(updated.id);
      return;
    }
    const copyButton = event.target.closest("[data-copy-citation]");
    if (copyButton) {
      const guideline = GUIDELINES.find(
        (item) => item.id === copyButton.dataset.copyCitation
      );
      if (guideline) copyText(guideline.citation, "引用已复制");
    }
  });

  document.querySelector("#closeDrawer").addEventListener("click", closeDrawer);
  elements.drawerScrim.addEventListener("click", closeDrawer);

  document.querySelectorAll("[data-focus-search]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#library").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => elements.searchInput.focus(), 350);
    });
  });

  document.querySelectorAll("[data-shortcut]").forEach((button) => {
    button.addEventListener("click", () =>
      applyClinicalShortcut(button.dataset.shortcut)
    );
  });

  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName;
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(tag);
    if (
      (event.key === "/" && !isTyping) ||
      ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")
    ) {
      event.preventDefault();
      document.querySelector("#library").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => elements.searchInput.focus(), 250);
    }
    if (event.key === "Escape") {
      if (elements.drawer.classList.contains("open")) {
        closeDrawer();
      } else if (state.query && isTyping) {
        state.query = "";
        syncControls();
        renderLibrary();
      }
    }
  });

  elements.verifyButton.addEventListener("click", () => verifyPubMedRecords());
  elements.heroVerifyButton.addEventListener("click", () =>
    verifyPubMedRecords()
  );
  elements.refreshRadar.addEventListener("click", () =>
    loadRadar({ force: true })
  );
};

const initialize = () => {
  setupTheme();
  const reviewDate = formatDate(SITE_META.lastReviewed, "numeric");
  document.querySelector("#reviewDate").textContent = reviewDate;
  document.querySelector("#footerReviewDate").textContent = reviewDate;
  renderLibrary();
  renderSources();
  renderStaging();
  renderComparison();
  renderMatrix();
  renderEmptyMdt();
  syncControls();
  bindEvents();
  setupNavigation();
  window.setTimeout(loadFulltextIndex, 900);
  verifyPubMedRecords({ quiet: true });
  window.setTimeout(() => loadRadar(), 900);
};

initialize();
