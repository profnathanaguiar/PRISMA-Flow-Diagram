/**
 * PRISMA 2020 Flowchart Generator • Version: Mark 3.4 (2026-10-23)
 * Versioning rule: Same day -> Mark 3.1, 3.2, 3.3, 3.4... | Different days -> Mark 4, Mark 5...
 * Modern Standalone Web App for PRISMA 2020 Flow Diagrams
 * Designed for Nathan - Systematic Review
 * Compliant with Cochrane Handbook (4.6.1), PRISMA 2020 & MECIR (C44)
 */

// GLOBAL APPLICATION STATE
const state = {
  options: {
    lang: 'en', // Default English as requested for research
    theme: 'official', // 'official', 'classic', 'modern_blue', 'scientific_teal'
    previous: false,
    other: true,
    dbDetail: true,
    regDetail: false,
    dataExtraction: true, // Separate stage for exclusions during data extraction
    metaAnalysis: false,
    hideZero: true, // Hide fields with n = 0 (e.g. Registers n = 0, unused automation)
    includeNew: false, // Default false: "Studies included", "Identification of studies" (Original review)
    showFootnotes: false // Default false: clean without * or **
  },
  data: {
    previous_studies: 0,
    previous_reports: 0,
    database_results: 1250,
    register_results: 0,
    databases: [
      { name: "PubMed / MEDLINE", count: 520 },
      { name: "Embase", count: 430 },
      { name: "Cochrane Library", count: 180 },
      { name: "Scopus", count: 120 }
    ],
    registers: [
      { name: "ClinicalTrials.gov", count: 25 },
      { name: "EU Clinical Trials", count: 10 }
    ],
    website_results: 45,
    organisation_results: 20,
    citations_results: 15,
    duplicates: 340,
    excluded_automatic: 25,
    excluded_other: 10,
    records_screened: 875,
    records_excluded: 727,
    screening_reasons: [
      { reason: "Duplicates identified during screening", count: 15 },
      { reason: "Ineligible study design or population", count: 712 }
    ],
    dbr_sought_reports: 148,
    dbr_notretrieved_reports: 12,
    dbr_assessed: 136,
    dbr_reasons: [
      { reason: "Incompatible population criteria", count: 32 },
      { reason: "Intervention not assessed", count: 24 },
      { reason: "Inappropriate study design (non-RCT)", count: 22 }
    ],
    dbr_extraction_assessed: 58,
    extraction_reasons: [
      { reason: "Insufficient outcome data during extraction", count: 30 },
      { reason: "Overlapping cohort / duplicate report", count: 20 }
    ],
    other_sought_reports: 80,
    other_notretrieved_reports: 5,
    other_assessed: 75,
    other_reasons: [
      { reason: "Inclusion criteria not met", count: 42 },
      { reason: "Insufficient data for synthesis", count: 33 }
    ],
    new_studies: 8,
    new_reports: 8,
    total_studies: 8,
    total_reports: 8,
    total_studies_ma: 8,
    total_reports_ma: 8
  }
};

// I18N DICTIONARY FOR TEXTS (ENGLISH & PORTUGUESE)
const i18n = {
  en: {
    stage_ident: "Identification",
    stage_screen: "Screening",
    stage_inc: "Included",
    header_db: "Identification of studies via databases and registers",
    header_db_new: "Identification of new studies via databases and registers",
    header_other: "Identification of studies via other methods",
    header_other_new: "Identification of new studies via other methods",
    header_prev: "Previous studies",
    rec_identified_from: "Records identified from:",
    rec_identified_from_fn: "Records identified from*:",
    databases: "Databases",
    registers: "Registers",
    removed_before_screening: "Records removed before screening:",
    duplicates: "Duplicate records removed",
    auto_excluded: "Records marked as ineligible by automation tools",
    other_removed: "Records removed for other reasons",
    records_screened: "Records screened",
    records_excluded: "Records excluded",
    records_excluded_fn: "Records excluded**",
    reports_sought: "Reports sought for retrieval",
    reports_not_retrieved: "Reports not retrieved",
    reports_assessed: "Reports assessed for eligibility",
    reports_excluded: "Reports excluded:",
    reports_extraction_assessed: "Reports included in data extraction",
    reports_extraction_excluded: "Reports excluded during data extraction:",
    websites: "Websites",
    organisations: "Organisations",
    citations: "Citation searching",
    studies_inc: "Studies included in review",
    new_studies_inc: "New studies included in review",
    reports_inc: "Reports of included studies",
    new_reports_inc: "Reports of new included studies",
    prev_studies_inc: "Studies included in previous version of review",
    prev_reports_inc: "Reports of studies included in previous version of review",
    total_studies_inc: "Total studies included in review",
    total_reports_inc: "Total reports of studies included",
    ma_studies_inc: "Studies included in meta-analysis",
    ma_reports_inc: "Reports of studies included in meta-analysis"
  },
  pt: {
    stage_ident: "Identificação",
    stage_screen: "Triagem",
    stage_inc: "Incluídos",
    header_db: "Identificação de estudos através de bases de dados e registros",
    header_db_new: "Identificação de novos estudos através de bases de dados e registros",
    header_other: "Identificação de estudos através de outros métodos",
    header_other_new: "Identificação de novos estudos através de outros métodos",
    header_prev: "Estudos anteriores",
    rec_identified_from: "Registros identificados em:",
    rec_identified_from_fn: "Registros identificados em*:",
    databases: "Bases de dados",
    registers: "Registros de ensaios",
    removed_before_screening: "Registros removidos antes da triagem:",
    duplicates: "Registros duplicados removidos",
    auto_excluded: "Marcados como inelegíveis por ferramentas automatizadas",
    other_removed: "Removidos por outras razões",
    records_screened: "Registros triados",
    records_excluded: "Registros excluídos",
    records_excluded_fn: "Registros excluídos**",
    reports_sought: "Relatórios buscados para recuperação",
    reports_not_retrieved: "Relatórios não recuperados",
    reports_assessed: "Relatórios avaliados para elegibilidade",
    reports_excluded: "Relatórios excluídos:",
    reports_extraction_assessed: "Relatórios incluídos na extração de dados",
    reports_extraction_excluded: "Relatórios excluídos na extração de dados:",
    websites: "Websites",
    organisations: "Organizações",
    citations: "Busca em citações",
    studies_inc: "Estudos incluídos na revisão",
    new_studies_inc: "Novos estudos incluídos na revisão",
    reports_inc: "Relatórios de estudos incluídos",
    new_reports_inc: "Relatórios de novos estudos incluídos",
    prev_studies_inc: "Estudos incluídos na versão anterior da revisão",
    prev_reports_inc: "Relatórios de estudos na versão anterior da revisão",
    total_studies_inc: "Total de estudos incluídos na revisão",
    total_reports_inc: "Total de relatórios de estudos incluídos",
    ma_studies_inc: "Estudos incluídos na metanálise",
    ma_reports_inc: "Relatórios de estudos incluídos na metanálise"
  }
};

// VISUAL THEMES
const themes = {
  official: {
    headerDbBg: "#f5b133", // Official Amber/Goldenrod
    headerDbText: "#000000",
    headerOtherBg: "#dcdcdc", // Official Gainsboro Grey
    headerOtherText: "#000000",
    headerPrevBg: "#e2e8f0",
    headerPrevText: "#000000",
    stageBadgeBg: "#adcbf0", // Official Soft Periwinkle Blue
    stageBadgeText: "#1e293b",
    mainBoxBg: "#ffffff",
    mainBoxBorder: "#000000",
    otherBoxBg: "#dcdcdc",
    otherBoxBorder: "none",
    textColor: "#000000",
    arrowColor: "#000000"
  },
  classic: {
    headerDbBg: "#ffffff",
    headerDbText: "#000000",
    headerOtherBg: "#ffffff",
    headerOtherText: "#000000",
    headerPrevBg: "#ffffff",
    headerPrevText: "#000000",
    stageBadgeBg: "#f1f5f9",
    stageBadgeText: "#334155",
    mainBoxBg: "#ffffff",
    mainBoxBorder: "#000000",
    otherBoxBg: "#f8fafc",
    otherBoxBorder: "#000000",
    textColor: "#000000",
    arrowColor: "#000000"
  },
  modern_blue: {
    headerDbBg: "#3b82f6",
    headerDbText: "#ffffff",
    headerOtherBg: "#64748b",
    headerOtherText: "#ffffff",
    headerPrevBg: "#94a3b8",
    headerPrevText: "#ffffff",
    stageBadgeBg: "#dbeafe",
    stageBadgeText: "#1e40af",
    mainBoxBg: "#ffffff",
    mainBoxBorder: "#2563eb",
    otherBoxBg: "#f1f5f9",
    otherBoxBorder: "#94a3b8",
    textColor: "#0f172a",
    arrowColor: "#1e40af"
  },
  scientific_teal: {
    headerDbBg: "#014e62",
    headerDbText: "#ffffff",
    headerOtherBg: "#00ada0",
    headerOtherText: "#ffffff",
    headerPrevBg: "#e8eaec",
    headerPrevText: "#00202b",
    stageBadgeBg: "#e8eaec",
    stageBadgeText: "#014e62",
    mainBoxBg: "#ffffff",
    mainBoxBorder: "#014e62",
    otherBoxBg: "#e8eaec",
    otherBoxBorder: "#00ada0",
    textColor: "#00202b",
    arrowColor: "#014e62"
  }
};

// PAN & ZOOM AND INTERACTIVE DRAG STATE
let zoomLevel = 1.0;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragMoved = false;
let startDragX = 0;
let startDragY = 0;

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  loadSavedState();
  renderFormLists();
  syncUIFromState();
  initPanAndZoom();
  initProjectManagement();
  bindEvents();
  renderDiagram();

  // Fit diagram to viewport initially after DOM render
  setTimeout(() => {
    fitToScreen();
  }, 100);

  // Automatically synchronize with Cloud Storage on startup
  syncFromCloudOnStartup();
}

// =========================================================================
// REAL CLOUD SYNC ENGINE (DUAL-REDUNDANT: KEYVALUE CLOUD + BYTEBIN)
// Works across file:// (Local) and https://*.github.io (GitHub Pages)
// =========================================================================
const CLOUD_KV_BASE = "https://keyvalue.immanuel.co/api/KeyVal";
const CLOUD_APP_KEY = "fbgldz3q";
const BYTEBIN_POST_URL = "https://bytebin.lucko.me/post";
const BYTEBIN_GET_BASE = "https://bytebin.lucko.me/";
const CLOUD_CHUNK_SIZE = 160;

let hasLocalSavedData = false;
let lastLoadedTimestamp = 0;
let cloudSyncTimeout = null;
let isSyncingCloud = false;

function sanitizeCloudKey(id) {
  return String(id || "revisao-nathan")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .slice(0, 32) || "revisao_nathan";
}

// Encode any string into 100% URL-path-safe alphanumeric [A-Za-z0-9_]
function encodeCloudSafe(str) {
  const lz = LZString.compressToEncodedURIComponent(str);
  return lz.replace(/\+/g, "_A").replace(/-/g, "_B").replace(/\$/g, "_C");
}

function decodeCloudSafe(safeStr) {
  if (!safeStr || typeof safeStr !== "string") return null;
  const lz = safeStr.replace(/_A/g, "+").replace(/_B/g, "-").replace(/_C/g, "$");
  return LZString.decompressFromEncodedURIComponent(lz);
}

async function kvGet(key) {
  try {
    const res = await fetch(`${CLOUD_KV_BASE}/GetValue/${CLOUD_APP_KEY}/${key}?_t=${Date.now()}`, {
      method: "GET",
      cache: "no-store"
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.replace(/^"|"$/g, "").trim() || null;
  } catch (e) {
    return null;
  }
}

async function kvSet(key, val) {
  try {
    const res = await fetch(`${CLOUD_KV_BASE}/UpdateValue/${CLOUD_APP_KEY}/${key}/${val}`, {
      method: "POST",
      body: ""
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

function updateCloudBadge(status, text) {
  const badge = document.getElementById("save-status");
  if (!badge) return;
  badge.classList.remove("hidden");
  if (status === "syncing") {
    badge.className = "flex items-center text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 transition-all";
    badge.innerHTML = `<i class="fa-solid fa-cloud-arrow-up mr-1.5 animate-bounce text-indigo-500"></i><span>${text || "Sincronizando nuvem..."}</span>`;
  } else if (status === "synced") {
    badge.className = "flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 transition-all";
    badge.innerHTML = `<i class="fa-solid fa-cloud mr-1.5 text-emerald-500"></i><span>${text || "Salvo na nuvem"}</span>`;
  } else if (status === "local") {
    badge.className = "flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 transition-all";
    badge.innerHTML = `<i class="fa-solid fa-hard-drive mr-1.5 text-amber-500"></i><span>${text || "Salvo localmente"}</span>`;
  }
}

async function syncProjectToCloud(projId, payload, options = { silent: true }) {
  const cleanId = (projId || currentActiveProject || "revisao-nathan").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  const safeKey = sanitizeCloudKey(cleanId);
  const jsonPayload = JSON.stringify(payload);

  isSyncingCloud = true;
  updateCloudBadge("syncing", "Sincronizando nuvem...");

  try {
    // 1. Upload full JSON to Bytebin (fast 1-request cloud document store)
    let bytebinKey = "";
    try {
      const bbRes = await fetch(BYTEBIN_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonPayload
      });
      if (bbRes.ok) {
        const bbData = await bbRes.json();
        if (bbData && bbData.key) bytebinKey = bbData.key;
      }
    } catch (e) {}

    // 2. Encode and split into URL-safe chunks for permanent KeyValue storage
    const encoded = encodeCloudSafe(jsonPayload);
    const chunks = [];
    for (let i = 0; i < encoded.length; i += CLOUD_CHUNK_SIZE) {
      chunks.push(encoded.slice(i, i + CLOUD_CHUNK_SIZE));
    }

    const chunkPromises = chunks.map((chunk, idx) => kvSet(`p_${safeKey}_${idx}`, chunk));
    const chunkResults = await Promise.all(chunkPromises);
    const allChunksOk = chunkResults.every(Boolean);

    // 3. Save project metadata
    const st = payload.state || payload;
    const totalArticles = (st.data?.database_results || 0) + (st.data?.register_results || 0);
    const savedAtMs = payload.savedAt ? new Date(payload.savedAt).getTime() : Date.now();
    const metaObj = {
      v: 1,
      id: cleanId,
      b: bytebinKey,
      c: chunks.length,
      t: savedAtMs,
      n: totalArticles
    };
    const metaSaved = await kvSet(`p_${safeKey}_meta`, encodeCloudSafe(JSON.stringify(metaObj)));

    // 4. Update active project pointer & cloud project list
    await kvSet("prisma_active_proj", encodeCloudSafe(cleanId));
    await registerProjectInCloudIndex(cleanId);

    isSyncingCloud = false;
    if (metaSaved || bytebinKey) {
      updateCloudBadge("synced", "Salvo na nuvem ☁️");
      if (!options.silent) {
        showToast(`☁️ Projeto '${cleanId}' salvo e sincronizado na nuvem!`);
      }
      return true;
    } else {
      updateCloudBadge("local", "Salvo localmente");
      return false;
    }
  } catch (err) {
    isSyncingCloud = false;
    updateCloudBadge("local", "Salvo localmente");
    return false;
  }
}

async function registerProjectInCloudIndex(projId) {
  try {
    let list = [projId];
    const rawList = await kvGet("prisma_proj_list");
    if (rawList) {
      const decoded = decodeCloudSafe(rawList);
      if (decoded) {
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed)) {
          list = Array.from(new Set([projId, ...parsed])).slice(0, 15);
        }
      }
    }
    const localProjs = scanAndListLocalProjects()
      .filter(p => p.key.startsWith("prisma2020_cloud_"))
      .map(p => p.id);
    list = Array.from(new Set([projId, ...localProjs, ...list])).slice(0, 15);
    await kvSet("prisma_proj_list", encodeCloudSafe(JSON.stringify(list)));
  } catch (e) {}
}

async function fetchProjectMetaFromCloud(projId) {
  const safeKey = sanitizeCloudKey(projId);
  const rawMeta = await kvGet(`p_${safeKey}_meta`);
  if (!rawMeta) return null;
  try {
    const decoded = decodeCloudSafe(rawMeta);
    return decoded ? JSON.parse(decoded) : null;
  } catch (e) {
    return null;
  }
}

async function fetchProjectFromCloud(projId, preloadedMeta = null) {
  const safeKey = sanitizeCloudKey(projId);
  const meta = preloadedMeta || (await fetchProjectMetaFromCloud(projId));
  if (!meta) return null;

  // 1. Try fast single-request fetch from Bytebin
  if (meta.b) {
    try {
      const res = await fetch(`${BYTEBIN_GET_BASE}${meta.b}`, { method: "GET", cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.state || data.data)) {
          return data;
        }
      }
    } catch (e) {}
  }

  // 2. Fallback: Reassemble permanent chunks from KeyValue store
  if (meta.c && meta.c > 0) {
    try {
      const chunkPromises = [];
      for (let i = 0; i < meta.c; i++) {
        chunkPromises.push(kvGet(`p_${safeKey}_${i}`));
      }
      const chunks = await Promise.all(chunkPromises);
      if (chunks.every(Boolean)) {
        const fullSafeStr = chunks.join("");
        const jsonStr = decodeCloudSafe(fullSafeStr);
        if (jsonStr) {
          const parsed = JSON.parse(jsonStr);
          if (parsed && (parsed.state || parsed.data)) {
            return parsed;
          }
        }
      }
    } catch (e) {}
  }

  return null;
}

async function syncFromCloudOnStartup() {
  updateCloudBadge("syncing", "Sincronizando nuvem...");
  try {
    // 1. Discover cloud active project and cloud project list
    const [rawActive, rawList] = await Promise.all([
      kvGet("prisma_active_proj"),
      kvGet("prisma_proj_list")
    ]);

    const cloudActiveProj = rawActive ? (decodeCloudSafe(rawActive) || "revisao-nathan") : currentActiveProject;
    let cloudProjIds = ["revisao-nathan"];
    if (rawList) {
      try {
        const parsed = JSON.parse(decodeCloudSafe(rawList));
        if (Array.isArray(parsed)) cloudProjIds = parsed;
      } catch (e) {}
    }
    cloudProjIds = Array.from(new Set([cloudActiveProj, currentActiveProject, ...cloudProjIds].filter(Boolean)));

    // 2. Check cloud metadata for all known projects
    let activeCloudPayload = null;
    let activeCloudTime = 0;

    for (const pid of cloudProjIds) {
      const meta = await fetchProjectMetaFromCloud(pid);
      if (!meta) continue;

      const localKey = `prisma2020_cloud_${pid}`;
      let localTime = 0;
      try {
        const localRaw = localStorage.getItem(localKey);
        if (localRaw) {
          const localParsed = JSON.parse(localRaw);
          localTime = localParsed.savedAt ? new Date(localParsed.savedAt).getTime() : 0;
        }
      } catch (e) {}

      // Download from cloud if local doesn't have it or cloud is newer
      if (!localTime || (meta.t && meta.t > localTime)) {
        const cloudPayload = await fetchProjectFromCloud(pid, meta);
        if (cloudPayload) {
          localStorage.setItem(localKey, JSON.stringify(cloudPayload));
          if (pid === cloudActiveProj || pid === currentActiveProject) {
            activeCloudPayload = cloudPayload;
            activeCloudTime = meta.t || Date.now();
          }
        }
      }
    }

    // 3. Decide whether to apply cloud state or push newer local state to cloud
    if (activeCloudPayload && (!hasLocalSavedData || activeCloudTime > lastLoadedTimestamp)) {
      currentActiveProject = activeCloudPayload.id || cloudActiveProj || "revisao-nathan";
      localStorage.setItem("prisma2020_active_project", currentActiveProject);
      localStorage.setItem("prisma2020_nathan_state", JSON.stringify(activeCloudPayload));
      lastLoadedTimestamp = activeCloudTime;
      hasLocalSavedData = true;

      updateActiveProjectLabel();
      applyLoadedState(activeCloudPayload);
      updateUrlHashFromState(activeCloudPayload);
      renderSavedProjectsList();
      renderHeaderProjectsList();
      updateCloudBadge("synced", "Sincronizado na nuvem ☁️");
      showToast(`☁️ Dados do projeto '${currentActiveProject}' carregados da nuvem!`);
      document.getElementById("recovery-banner")?.classList.add("hidden");
    } else if (hasLocalSavedData) {
      // Local has data that is newer or equal -> ensure it is pushed to cloud
      const payload = {
        id: currentActiveProject,
        savedAt: new Date(lastLoadedTimestamp || Date.now()).toISOString(),
        state: JSON.parse(JSON.stringify(state))
      };
      await syncProjectToCloud(currentActiveProject, payload, { silent: true });
      renderSavedProjectsList();
      renderHeaderProjectsList();
    } else {
      updateCloudBadge("synced", "Pronto (Nuvem ativa)");
    }
  } catch (err) {
    console.warn("Cloud startup sync warning:", err);
    updateCloudBadge("local", "Modo local");
  }
}

function updateUrlHashFromState(payloadOrState) {
  try {
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payloadOrState));
    history.replaceState(null, "", "#data=" + compressed);
  } catch (e) {}
}

// RESTORE STATE FROM URL HASH, CLOUD OR LOCAL STORAGE
function loadSavedState() {
  const savedActiveProj = localStorage.getItem("prisma2020_active_project");
  if (savedActiveProj) {
    currentActiveProject = savedActiveProj;
  }

  const candidates = [];

  // 1. Check URL Hash (#data=...)
  const hash = window.location.hash;
  if (hash && hash.startsWith("#data=")) {
    try {
      const compressed = hash.replace("#data=", "");
      const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
      if (jsonStr) {
        const loaded = JSON.parse(jsonStr);
        const st = loaded.state || loaded;
        if (st && st.data) {
          const ts = loaded.savedAt ? new Date(loaded.savedAt).getTime() : 1;
          candidates.push({
            source: "hash",
            id: loaded.id || currentActiveProject,
            savedAt: ts,
            payload: loaded
          });
        }
      }
    } catch (e) {
      console.warn("Error decoding URL data hash:", e);
    }
  }

  // 2. Check autosave session in localStorage
  const localSaved = localStorage.getItem("prisma2020_nathan_state");
  if (localSaved) {
    try {
      const loaded = JSON.parse(localSaved);
      const st = loaded.state || loaded;
      if (st && st.data) {
        // Legacy format (saved directly as state without savedAt) was always the latest edit in that browser
        const isLegacy = !loaded.savedAt && !!loaded.data;
        const ts = loaded.savedAt ? new Date(loaded.savedAt).getTime() : (isLegacy ? Date.now() - 500 : 2);
        candidates.push({
          source: "autosave",
          id: loaded.id || currentActiveProject,
          savedAt: ts,
          payload: isLegacy ? { id: currentActiveProject, savedAt: new Date(ts).toISOString(), state: st } : loaded
        });
      }
    } catch (e) {
      console.warn("Error decoding localStorage state:", e);
    }
  }

  // 3. Scan all saved projects in localStorage
  const localProjects = scanAndListLocalProjects();
  const cloudProjects = localProjects.filter(p => p.key.startsWith("prisma2020_cloud_"));
  cloudProjects.forEach(p => {
    const ts = p.savedAt ? new Date(p.savedAt).getTime() : 3;
    candidates.push({
      source: "project",
      id: p.id,
      savedAt: ts,
      payload: { id: p.id, savedAt: p.savedAt, state: p.state }
    });
  });

  if (candidates.length > 0) {
    // Pick the candidate with the newest timestamp
    candidates.sort((a, b) => b.savedAt - a.savedAt);
    const best = candidates[0];
    hasLocalSavedData = true;
    lastLoadedTimestamp = best.savedAt > 1000 ? best.savedAt : Date.now();
    if (best.id && best.id !== "Sessão Atual (Auto-save)") {
      currentActiveProject = best.id;
    }
    applyLoadedState(best.payload);
  }

  updateActiveProjectLabel();
}

// APPLY LOADED STATE OBJECT TO RUNTIME STATE
function applyLoadedState(loaded) {
  const st = loaded.state || loaded;
  if (st.options) Object.assign(state.options, st.options);
  if (st.data) Object.assign(state.data, st.data);
  renderFormLists();
  syncUIFromState();
  renderDiagram();
  fitToScreen();
}

// SCAN ALL LOCAL STORAGE KEYS FOR PRISMA PROJECTS
function scanAndListLocalProjects() {
  const projects = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.startsWith("prisma2020_cloud_")) {
        const id = key.replace("prisma2020_cloud_", "");
        try {
          const val = JSON.parse(localStorage.getItem(key));
          const st = val.state || val;
          const total = (st.data?.database_results || 0) + (st.data?.register_results || 0);
          projects.push({
            key: key,
            id: id,
            savedAt: val.savedAt || null,
            total: total,
            state: st
          });
        } catch (e) {}
      } else if (key === "prisma2020_nathan_state") {
        try {
          const val = JSON.parse(localStorage.getItem(key));
          const st = val.state || val;
          const total = (st.data?.database_results || 0) + (st.data?.register_results || 0);
          projects.push({
            key: key,
            id: "Sessão Atual (Auto-save)",
            savedAt: null,
            total: total,
            state: st
          });
        } catch (e) {}
      }
    }
  } catch (err) {
    console.warn("Error scanning localStorage:", err);
  }

  // Sort: Cloud projects first, then by most recent date descending
  projects.sort((a, b) => {
    if (a.key.startsWith("prisma2020_cloud_") && !b.key.startsWith("prisma2020_cloud_")) return -1;
    if (!a.key.startsWith("prisma2020_cloud_") && b.key.startsWith("prisma2020_cloud_")) return 1;
    const tA = a.savedAt ? new Date(a.savedAt).getTime() : 0;
    const tB = b.savedAt ? new Date(b.savedAt).getTime() : 0;
    return tB - tA;
  });

  return projects;
}

// SHOW TOP RECOVERY BANNER
function showRecoveryBanner(project) {
  const banner = document.getElementById("recovery-banner");
  const bannerText = document.getElementById("recovery-banner-text");
  if (!banner) return;

  const totalStudies = project.total || 0;
  const dateStr = project.savedAt ? ` em ${new Date(project.savedAt).toLocaleDateString()}` : "";
  if (bannerText) {
    bannerText.innerHTML = `<strong>Versão salva encontrada:</strong> Projeto <em>"${escapeHtml(project.id)}"</em> (${totalStudies} artigos recuperados${dateStr}).`;
  }
  banner.classList.remove("hidden");

  const btnRestore = document.getElementById("btn-recovery-restore");
  if (btnRestore) {
    btnRestore.onclick = () => {
      loadProjectFromKey(project.key);
      banner.classList.add("hidden");
    };
  }

  const btnDismiss = document.getElementById("btn-recovery-dismiss");
  if (btnDismiss) {
    btnDismiss.onclick = () => {
      banner.classList.add("hidden");
    };
  }
}

// RENDER DETECTED PROJECTS IN CLOUD MODAL
function renderSavedProjectsList() {
  const listEl = document.getElementById("saved-projects-list");
  if (!listEl) return;

  const projects = scanAndListLocalProjects();
  if (projects.length === 0) {
    listEl.innerHTML = `
      <div class="text-[11px] text-slate-400 p-2.5 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
        Nenhum projeto salvo encontrado neste navegador ainda.
      </div>
    `;
    return;
  }

  listEl.innerHTML = projects.map(p => `
    <div class="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-xs hover:border-indigo-300 transition">
      <div class="flex-1 min-w-0 mr-2">
        <div class="flex items-center space-x-1.5">
          <span class="font-bold text-xs text-slate-800 truncate">${escapeHtml(p.id)}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">${p.total} artigos</span>
        </div>
        <div class="text-[10px] text-slate-400">
          ${p.savedAt ? new Date(p.savedAt).toLocaleString() : 'Salvo localmente'}
        </div>
      </div>
      <div class="flex items-center space-x-1.5 shrink-0">
        <button type="button" class="btn-load-proj px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold transition" data-key="${p.key}">
          Restaurar
        </button>
        ${p.key !== 'prisma2020_nathan_state' ? `
          <button type="button" class="btn-del-proj p-1 text-slate-400 hover:text-rose-600 rounded transition" data-key="${p.key}" title="Excluir">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        ` : ''}
      </div>
    </div>
  `).join("");
}

// LOAD PROJECT FROM SPECIFIC KEY (WITH CLOUD SYNC)
async function loadProjectFromKey(key) {
  let projId = key.startsWith("prisma2020_cloud_") ? key.replace("prisma2020_cloud_", "") : (currentActiveProject || "revisao-nathan");
  let loaded = null;

  // Check local first
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      loaded = JSON.parse(saved);
    } catch (e) {}
  }

  // Also check if Cloud has this project (or a newer version of it)
  if (key.startsWith("prisma2020_cloud_")) {
    try {
      const cloudMeta = await fetchProjectMetaFromCloud(projId);
      const localTime = loaded?.savedAt ? new Date(loaded.savedAt).getTime() : 0;
      if (cloudMeta && (!loaded || (cloudMeta.t && cloudMeta.t > localTime))) {
        const cloudData = await fetchProjectFromCloud(projId, cloudMeta);
        if (cloudData) {
          loaded = cloudData;
          localStorage.setItem(key, JSON.stringify(cloudData));
        }
      }
    } catch (e) {}
  }

  if (loaded) {
    currentActiveProject = projId;
    localStorage.setItem("prisma2020_active_project", currentActiveProject);
    lastLoadedTimestamp = loaded.savedAt ? new Date(loaded.savedAt).getTime() : Date.now();
    hasLocalSavedData = true;
    updateActiveProjectLabel();
    applyLoadedState(loaded);
    autoSave();
    showToast(`Projeto '${currentActiveProject}' carregado com sucesso!`);
    document.getElementById("cloud-modal")?.classList.add("hidden");
  } else {
    alert("Nenhum projeto encontrado local ou na nuvem com esta chave.");
  }
}

// RESTORE FROM HASH / URL INPUT
function restoreFromHashInput() {
  const input = document.getElementById("inp-restore-hash");
  if (!input) return;
  let val = input.value.trim();
  if (!val) {
    alert("Por favor, cole um link ou código #data=...");
    return;
  }

  let compressed = "";
  if (val.includes("#data=")) {
    compressed = val.split("#data=")[1];
  } else if (val.startsWith("data=")) {
    compressed = val.replace("data=", "");
  } else {
    compressed = val;
  }

  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
    if (!jsonStr) throw new Error("Decompression failed");
    const loaded = JSON.parse(jsonStr);
    applyLoadedState(loaded);
    autoSave();
    showToast("Projeto restaurado com sucesso do link!");
    document.getElementById("cloud-modal")?.classList.add("hidden");
    input.value = "";
  } catch (err) {
    alert("Código ou link inválido. Verifique se copiou o link completo com o #data=...");
  }
}

// =========================================================================
// MULTI-PROJECT MANAGEMENT & 1-CLICK QUICK SAVE (FLOPPY DISK 💾)
// =========================================================================
let currentActiveProject = "revisao-nathan";

function initProjectManagement() {
  const btnProjMenu = document.getElementById("btn-project-menu");
  const projMenu = document.getElementById("project-menu");
  if (btnProjMenu && projMenu) {
    btnProjMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      renderHeaderProjectsList();
      projMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
      if (!btnProjMenu.contains(e.target) && !projMenu.contains(e.target)) {
        projMenu.classList.add("hidden");
      }
    });
  }

  // 1-Click Quick Save Floppy Disk
  document.getElementById("btn-quick-save")?.addEventListener("click", quickSaveActiveProject);

  // New Project Button in Dropdown
  document.getElementById("btn-header-new-proj")?.addEventListener("click", () => {
    projMenu?.classList.add("hidden");
    createNewProject();
  });

  // Manage Projects in Header Dropdown
  document.getElementById("btn-header-manage-projs")?.addEventListener("click", () => {
    projMenu?.classList.add("hidden");
    prepareCloudModal();
    switchModalTab('cloud');
    document.getElementById("cloud-modal")?.classList.remove("hidden");
  });

  updateActiveProjectLabel();
}

function updateActiveProjectLabel() {
  const lbl = document.getElementById("label-active-project");
  if (lbl) {
    lbl.textContent = currentActiveProject || "Sem projeto";
  }
}

function renderHeaderProjectsList() {
  const listEl = document.getElementById("header-projects-list");
  if (!listEl) return;

  const projects = scanAndListLocalProjects();
  if (projects.length === 0) {
    listEl.innerHTML = `<div class="p-2.5 text-center text-xs text-slate-400">Nenhum projeto salvo encontrado.</div>`;
    return;
  }

  listEl.innerHTML = projects.map(p => {
    const isCloudKey = p.key.startsWith("prisma2020_cloud_");
    const projName = isCloudKey ? p.id : "Auto-save (Sessão)";
    const isActive = isCloudKey && (p.id === currentActiveProject);
    return `
      <div class="flex items-center justify-between p-2 rounded-lg text-xs hover:bg-slate-100 cursor-pointer transition ${isActive ? 'bg-indigo-50 font-bold text-indigo-900 border border-indigo-200' : 'text-slate-700'}" data-header-proj-key="${p.key}">
        <div class="flex items-center space-x-2 truncate flex-1 min-w-0">
          <i class="fa-solid fa-${isActive ? 'folder-open text-indigo-600' : 'folder text-slate-400'}"></i>
          <span class="truncate">${escapeHtml(projName)}</span>
          <span class="text-[10px] text-slate-400 font-normal">(${p.total} arts)</span>
        </div>
        ${isActive ? '<i class="fa-solid fa-circle-check text-emerald-600 text-xs ml-1"></i>' : ''}
      </div>
    `;
  }).join("");

  listEl.querySelectorAll("[data-header-proj-key]").forEach(item => {
    item.addEventListener("click", () => {
      const key = item.getAttribute("data-header-proj-key");
      loadProjectFromKey(key);
      document.getElementById("project-menu")?.classList.add("hidden");
    });
  });
}

async function quickSaveActiveProject() {
  let projId = currentActiveProject;
  if (!projId || projId === "Sem projeto" || projId === "Sessão Atual (Auto-save)") {
    const entered = prompt("Digite o nome para salvar este projeto:", "revisao-nathan");
    if (!entered || !entered.trim()) return;
    projId = entered.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    currentActiveProject = projId;
    updateActiveProjectLabel();
  }

  const nowIso = new Date().toISOString();
  lastLoadedTimestamp = new Date(nowIso).getTime();
  hasLocalSavedData = true;

  const payload = {
    id: projId,
    savedAt: nowIso,
    state: JSON.parse(JSON.stringify(state))
  };

  localStorage.setItem(`prisma2020_cloud_${projId}`, JSON.stringify(payload));
  localStorage.setItem("prisma2020_nathan_state", JSON.stringify(payload));
  localStorage.setItem("prisma2020_active_project", projId);
  updateUrlHashFromState(payload);

  const btn = document.getElementById("btn-quick-save");
  const txt = document.getElementById("txt-quick-save");
  if (btn && txt) {
    btn.classList.add("bg-emerald-700", "ring-2", "ring-emerald-400");
    txt.innerHTML = `<i class="fa-solid fa-cloud-arrow-up text-emerald-200 mr-1"></i>Salvando...`;
  }

  renderSavedProjectsList();
  renderHeaderProjectsList();

  const synced = await syncProjectToCloud(projId, payload, { silent: true });

  if (btn && txt) {
    txt.innerHTML = `<i class="fa-solid fa-check text-emerald-200 mr-1"></i>${synced ? "Salvo na nuvem!" : "Salvo!"}`;
    setTimeout(() => {
      btn.classList.remove("bg-emerald-700", "ring-2", "ring-emerald-400");
      txt.textContent = "Salvar";
    }, 2000);
  }

  showToast(synced
    ? `☁️ Projeto '${projId}' salvo localmente e sincronizado na nuvem!`
    : `💾 Projeto '${projId}' salvo localmente!`
  );
}

async function createNewProject() {
  const entered = prompt("Digite o nome do novo projeto:", "revisao-2");
  if (!entered || !entered.trim()) return;
  const newId = entered.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');

  currentActiveProject = newId;
  localStorage.setItem("prisma2020_active_project", newId);
  updateActiveProjectLabel();

  const nowIso = new Date().toISOString();
  lastLoadedTimestamp = new Date(nowIso).getTime();
  hasLocalSavedData = true;

  const payload = {
    id: newId,
    savedAt: nowIso,
    state: JSON.parse(JSON.stringify(state))
  };
  localStorage.setItem(`prisma2020_cloud_${newId}`, JSON.stringify(payload));
  localStorage.setItem("prisma2020_nathan_state", JSON.stringify(payload));
  updateUrlHashFromState(payload);

  renderSavedProjectsList();
  renderHeaderProjectsList();
  await syncProjectToCloud(newId, payload, { silent: false });
}

// AUTO-SAVE TO LOCALSTORAGE AND CLOUD
let saveTimeout = null;
function autoSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const projId = (currentActiveProject && currentActiveProject !== "Sem projeto" && currentActiveProject !== "Sessão Atual (Auto-save)")
      ? currentActiveProject
      : "revisao-nathan";
    currentActiveProject = projId;

    const nowIso = new Date().toISOString();
    lastLoadedTimestamp = new Date(nowIso).getTime();
    hasLocalSavedData = true;

    const payload = {
      id: projId,
      savedAt: nowIso,
      state: JSON.parse(JSON.stringify(state))
    };

    localStorage.setItem("prisma2020_nathan_state", JSON.stringify(payload));
    localStorage.setItem(`prisma2020_cloud_${projId}`, JSON.stringify(payload));
    localStorage.setItem("prisma2020_active_project", projId);
    updateUrlHashFromState(payload);
    updateCloudBadge("local", "Salvo localmente");

    // Debounced automatic Cloud Sync
    if (cloudSyncTimeout) clearTimeout(cloudSyncTimeout);
    cloudSyncTimeout = setTimeout(() => {
      syncProjectToCloud(projId, payload, { silent: true });
    }, 1200);
  }, 300);
}

// AUTOMATIC PRISMA MATHEMATICAL CONSISTENCY ENGINE
function setInputLockState(inputId, lockIconId, isLocked) {
  const inp = document.getElementById(inputId);
  const lockIcon = lockIconId ? document.getElementById(lockIconId) : null;
  if (inp) {
    inp.readOnly = isLocked;
    if (isLocked) {
      inp.classList.add("bg-slate-100", "cursor-not-allowed", "text-slate-700");
      inp.classList.remove("bg-white", "bg-slate-50");
    } else {
      inp.classList.remove("bg-slate-100", "cursor-not-allowed", "text-slate-700");
      inp.classList.add("bg-white");
    }
  }
  if (lockIcon) {
    lockIcon.classList.toggle("hidden", !isLocked);
  }
}

function recalculateFlowMath() {
  if (!state.data.databases) state.data.databases = [];
  if (!state.data.registers) state.data.registers = [];
  if (!state.data.screening_reasons) state.data.screening_reasons = [];
  if (!state.data.dbr_reasons) state.data.dbr_reasons = [];
  if (!state.data.extraction_reasons) state.data.extraction_reasons = [];
  if (!state.data.other_reasons) state.data.other_reasons = [];

  // 1. Databases & Registers Totals
  const lockDb = !!(state.options.dbDetail && state.data.databases.length > 0);
  if (lockDb) {
    state.data.database_results = state.data.databases.reduce((acc, d) => acc + (parseInt(d.count, 10) || 0), 0);
  }
  setInputLockState("inp-database_results", "lock-database_results", lockDb);

  const lockReg = !!(state.options.regDetail && state.data.registers.length > 0);
  if (lockReg) {
    state.data.register_results = state.data.registers.reduce((acc, r) => acc + (parseInt(r.count, 10) || 0), 0);
  }
  setInputLockState("inp-register_results", "lock-register_results", lockReg);

  // 2. Screening: Records Screened & Records Excluded
  const totalIdentMain = (parseInt(state.data.database_results, 10) || 0) + (parseInt(state.data.register_results, 10) || 0);
  const totalRemovedPre = (parseInt(state.data.duplicates, 10) || 0)
    + (parseInt(state.data.excluded_automatic, 10) || 0)
    + (parseInt(state.data.excluded_other, 10) || 0);
  state.data.records_screened = Math.max(0, totalIdentMain - totalRemovedPre);

  const lockScreenExcl = state.data.screening_reasons.length > 0;
  if (lockScreenExcl) {
    state.data.records_excluded = state.data.screening_reasons.reduce((acc, r) => acc + (parseInt(r.count, 10) || 0), 0);
  }
  setInputLockState("inp-records_excluded", "lock-records_excluded", lockScreenExcl);

  // 3. Retrieval & Eligibility (Main Track)
  state.data.dbr_sought_reports = Math.max(0, state.data.records_screened - (parseInt(state.data.records_excluded, 10) || 0));
  state.data.dbr_assessed = Math.max(0, state.data.dbr_sought_reports - (parseInt(state.data.dbr_notretrieved_reports, 10) || 0));

  const dbrExcludedSum = state.data.dbr_reasons.reduce((acc, r) => acc + (parseInt(r.count, 10) || 0), 0);
  const dbrAfterEligibility = Math.max(0, state.data.dbr_assessed - dbrExcludedSum);

  // 4. Other Methods Track (Retrieval & Eligibility)
  const otherIdentTotal = (parseInt(state.data.website_results, 10) || 0)
    + (parseInt(state.data.organisation_results, 10) || 0)
    + (parseInt(state.data.citations_results, 10) || 0);
  state.data.other_sought_reports = otherIdentTotal;
  state.data.other_assessed = Math.max(0, state.data.other_sought_reports - (parseInt(state.data.other_notretrieved_reports, 10) || 0));

  const otherExcludedSum = state.data.other_reasons.reduce((acc, r) => acc + (parseInt(r.count, 10) || 0), 0);
  const otherAfterEligibility = state.options.other
    ? Math.max(0, state.data.other_assessed - otherExcludedSum)
    : 0;

  // 5. Data Extraction Stage (Combines Main Track + Other Methods Track after Eligibility!)
  const useExtractionStage = state.options.dataExtraction !== false;
  state.data.dbr_extraction_assessed = dbrAfterEligibility + otherAfterEligibility;
  const extractionExcludedSum = state.data.extraction_reasons.reduce((acc, r) => acc + (parseInt(r.count, 10) || 0), 0);

  // 6. Final Inclusion (Reports locked; Studies remains user-editable)
  if (useExtractionStage) {
    state.data.new_reports = Math.max(0, state.data.dbr_extraction_assessed - extractionExcludedSum);
  } else {
    state.data.new_reports = dbrAfterEligibility + otherAfterEligibility;
  }
  state.data.total_reports = (parseInt(state.data.previous_reports, 10) || 0) + state.data.new_reports;
  state.data.total_studies = (parseInt(state.data.previous_studies, 10) || 0) + (parseInt(state.data.new_studies, 10) || 0);

  // Sync calculated numbers to DOM inputs without disrupting active typing on editable fields
  const derivedKeys = [
    "database_results", "register_results",
    "records_screened", "records_excluded",
    "dbr_sought_reports", "dbr_assessed", "dbr_extraction_assessed",
    "other_sought_reports", "other_assessed",
    "new_reports", "total_studies", "total_reports"
  ];
  derivedKeys.forEach(k => {
    const inp = document.getElementById(`inp-${k}`);
    if (inp && document.activeElement !== inp) {
      inp.value = state.data[k];
    } else if (inp && inp.readOnly) {
      inp.value = state.data[k];
    }
  });

  // Update live summary badges in Card 5 & Card 6
  const elDbrExSum = document.getElementById("lbl-dbr-excluded-sum");
  if (elDbrExSum) elDbrExSum.textContent = dbrExcludedSum;

  const elDbrAfterCap = document.getElementById("lbl-dbr-after-elig-caption");
  if (elDbrAfterCap) {
    elDbrAfterCap.innerHTML = useExtractionStage
      ? `To Data Extraction: <strong id="lbl-dbr-included-net" class="text-indigo-700">${dbrAfterEligibility}</strong> reports`
      : `Included from Databases: <strong id="lbl-dbr-included-net" class="text-emerald-700">${dbrAfterEligibility}</strong> reports`;
  }

  const elExtFormula = document.getElementById("lbl-extraction-formula");
  if (elExtFormula) {
    elExtFormula.textContent = state.options.other
      ? `Auto: ${dbrAfterEligibility} (Databases) + ${otherAfterEligibility} (Other Methods) = ${state.data.dbr_extraction_assessed} reports`
      : `Auto: ${dbrAfterEligibility} reports from Databases`;
  }

  const elExtExSum = document.getElementById("lbl-extraction-excluded-sum");
  if (elExtExSum) elExtExSum.textContent = extractionExcludedSum;

  const elExtNet = document.getElementById("lbl-extraction-included-net");
  if (elExtNet) elExtNet.textContent = state.data.new_reports;

  const elOtherExSum = document.getElementById("lbl-other-excluded-sum");
  if (elOtherExSum) elOtherExSum.textContent = otherExcludedSum;

  const elOtherNet = document.getElementById("lbl-other-included-net");
  if (elOtherNet) elOtherNet.textContent = otherAfterEligibility;

  const elFormula = document.getElementById("lbl-reports-formula");
  if (elFormula) {
    if (useExtractionStage) {
      elFormula.textContent = `Auto: ${state.data.dbr_extraction_assessed} (Extraction) - ${extractionExcludedSum} (Excluded) = ${state.data.new_reports} reports`;
    } else if (state.options.other) {
      elFormula.textContent = `Auto: ${dbrAfterEligibility} (Main) + ${otherAfterEligibility} (Other) = ${state.data.new_reports} reports`;
    } else {
      elFormula.textContent = `Auto: ${dbrAfterEligibility} reports from main flow`;
    }
  }
}

// SYNC FORM FIELDS FROM STATE
function syncUIFromState() {
  if (state.options.dataExtraction === undefined) {
    state.options.dataExtraction = true;
  }

  // Option controls
  const optLang = document.getElementById("opt-lang");
  if (optLang) optLang.value = state.options.lang;

  const optTheme = document.getElementById("opt-theme");
  if (optTheme) optTheme.value = state.options.theme;

  const chkPrevious = document.getElementById("chk-previous");
  if (chkPrevious) chkPrevious.checked = state.options.previous;

  const chkOther = document.getElementById("chk-other");
  if (chkOther) chkOther.checked = state.options.other;

  const chkDbDetail = document.getElementById("chk-dbDetail");
  if (chkDbDetail) chkDbDetail.checked = state.options.dbDetail;

  const chkRegDetail = document.getElementById("chk-regDetail");
  if (chkRegDetail) chkRegDetail.checked = state.options.regDetail;

  const chkDataExtraction = document.getElementById("chk-dataExtraction");
  if (chkDataExtraction) chkDataExtraction.checked = state.options.dataExtraction !== false;

  const chkMeta = document.getElementById("chk-metaAnalysis");
  if (chkMeta) chkMeta.checked = state.options.metaAnalysis;

  const chkHideZero = document.getElementById("chk-hideZero");
  if (chkHideZero) chkHideZero.checked = state.options.hideZero !== false;

  const chkIncludeNew = document.getElementById("chk-includeNew");
  if (chkIncludeNew) chkIncludeNew.checked = !!state.options.includeNew;

  const chkShowFootnotes = document.getElementById("chk-showFootnotes");
  if (chkShowFootnotes) chkShowFootnotes.checked = !!state.options.showFootnotes;

  // Toggle conditional UI sections
  toggleConditionalCards();

  // Recalculate all derived PRISMA values before populating inputs
  recalculateFlowMath();

  // Numeric form fields
  for (const [key, val] of Object.entries(state.data)) {
    if (typeof val === 'number') {
      const input = document.getElementById(`inp-${key}`);
      if (input) input.value = val;
    }
  }
}

function toggleConditionalCards() {
  const cardPrev = document.getElementById("card-previous");
  if (cardPrev) {
    cardPrev.classList.toggle("hidden", !state.options.previous);
  }

  const containerTotalStudies = document.getElementById("container-total-studies");
  if (containerTotalStudies) {
    containerTotalStudies.classList.toggle("hidden", !state.options.previous);
  }

  const containerOther = document.getElementById("container-other-methods");
  if (containerOther) {
    containerOther.classList.toggle("hidden", !state.options.other);
  }

  const containerOtherEx = document.getElementById("sec-elig-other");
  if (containerOtherEx) {
    containerOtherEx.classList.toggle("hidden", !state.options.other);
  }

  const containerExtraction = document.getElementById("sec-elig-extraction");
  if (containerExtraction) {
    containerExtraction.classList.toggle("hidden", state.options.dataExtraction === false);
  }

  const containerMeta = document.getElementById("container-meta-analysis");
  if (containerMeta) {
    containerMeta.classList.toggle("hidden", !state.options.metaAnalysis);
  }
}

// DYNAMIC LISTS RENDERING WITH REORDERING (▲ Up / ▼ Down)
function renderFormLists() {
  // Databases list
  const dbList = document.getElementById("db-list");
  if (dbList) {
    dbList.innerHTML = state.data.databases.map((db, idx) => `
      <div class="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
        <!-- Reorder buttons -->
        <div class="flex flex-col space-y-0.5">
          <button type="button" data-idx="${idx}" class="btn-move-db-up text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-up text-[9px]"></i>
          </button>
          <button type="button" data-idx="${idx}" class="btn-move-db-down text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Down" ${idx === state.data.databases.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>
        <input type="text" value="${escapeHtml(db.name)}" data-idx="${idx}" class="db-name-input flex-1 text-xs px-2 py-1 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-sky-500">
        <input type="number" min="0" value="${db.count}" data-idx="${idx}" class="db-count-input w-20 text-right text-xs px-2 py-1 border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-sky-500">
        <button type="button" data-idx="${idx}" class="btn-del-db text-slate-400 hover:text-rose-500 p-1 transition" title="Remove database">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `).join("");
  }

  // Clinical trial registers list
  const regList = document.getElementById("reg-list");
  if (regList) {
    regList.innerHTML = state.data.registers.map((reg, idx) => `
      <div class="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
        <div class="flex flex-col space-y-0.5">
          <button type="button" data-idx="${idx}" class="btn-move-reg-up text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-up text-[9px]"></i>
          </button>
          <button type="button" data-idx="${idx}" class="btn-move-reg-down text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Down" ${idx === state.data.registers.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>
        <input type="text" value="${escapeHtml(reg.name)}" data-idx="${idx}" class="reg-name-input flex-1 text-xs px-2 py-1 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-sky-500">
        <input type="number" min="0" value="${reg.count}" data-idx="${idx}" class="reg-count-input w-20 text-right text-xs px-2 py-1 border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-sky-500">
        <button type="button" data-idx="${idx}" class="btn-del-reg text-slate-400 hover:text-rose-500 p-1 transition" title="Remove register">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `).join("");
  }

  // Screening exclusion reasons list
  const screenList = document.getElementById("screening-reasons-list");
  if (screenList) {
    if (!state.data.screening_reasons) state.data.screening_reasons = [];
    screenList.innerHTML = state.data.screening_reasons.map((r, idx) => `
      <div class="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
        <div class="flex flex-col space-y-0.5">
          <button type="button" data-idx="${idx}" class="btn-move-screen-up text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-up text-[9px]"></i>
          </button>
          <button type="button" data-idx="${idx}" class="btn-move-screen-down text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Down" ${idx === state.data.screening_reasons.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>
        <input type="text" value="${escapeHtml(r.reason)}" data-idx="${idx}" class="screen-reason-input flex-1 text-xs px-2 py-1 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Ex: Duplicates identified during screening">
        <input type="number" min="0" value="${r.count}" data-idx="${idx}" class="screen-count-input w-20 text-right text-xs px-2 py-1 border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500">
        <button type="button" data-idx="${idx}" class="btn-del-screen-reason text-slate-400 hover:text-rose-500 p-1 transition" title="Remove reason">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `).join("");
  }

  // Databases & Registers exclusion reasons list (Eligibility)
  const dbrList = document.getElementById("dbr-reasons-list");
  if (dbrList) {
    dbrList.innerHTML = state.data.dbr_reasons.map((r, idx) => `
      <div class="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
        <div class="flex flex-col space-y-0.5">
          <button type="button" data-idx="${idx}" class="btn-move-dbr-up text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-up text-[9px]"></i>
          </button>
          <button type="button" data-idx="${idx}" class="btn-move-dbr-down text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Down" ${idx === state.data.dbr_reasons.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>
        <input type="text" value="${escapeHtml(r.reason)}" data-idx="${idx}" class="dbr-reason-input flex-1 text-xs px-2 py-1 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
        <input type="number" min="0" value="${r.count}" data-idx="${idx}" class="dbr-count-input w-20 text-right text-xs px-2 py-1 border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500">
        <button type="button" data-idx="${idx}" class="btn-del-dbr-reason text-slate-400 hover:text-rose-500 p-1 transition" title="Remove reason">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `).join("");
  }

  // Data Extraction exclusion reasons list (Databases & Registers)
  const extractionList = document.getElementById("extraction-reasons-list");
  if (extractionList) {
    if (!state.data.extraction_reasons) state.data.extraction_reasons = [];
    extractionList.innerHTML = state.data.extraction_reasons.map((r, idx) => `
      <div class="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-slate-200">
        <div class="flex flex-col space-y-0.5">
          <button type="button" data-idx="${idx}" class="btn-move-extraction-up text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-up text-[9px]"></i>
          </button>
          <button type="button" data-idx="${idx}" class="btn-move-extraction-down text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Down" ${idx === state.data.extraction_reasons.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>
        <input type="text" value="${escapeHtml(r.reason)}" data-idx="${idx}" class="extraction-reason-input flex-1 text-xs px-2 py-1 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Ex: Missing quantitative data during extraction">
        <input type="number" min="0" value="${r.count}" data-idx="${idx}" class="extraction-count-input w-20 text-right text-xs px-2 py-1 border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500">
        <button type="button" data-idx="${idx}" class="btn-del-extraction-reason text-slate-400 hover:text-rose-500 p-1 transition" title="Remove reason">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `).join("");
  }

  // Other sources exclusion reasons list
  const otherList = document.getElementById("other-reasons-list");
  if (otherList) {
    otherList.innerHTML = state.data.other_reasons.map((r, idx) => `
      <div class="flex items-center space-x-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
        <div class="flex flex-col space-y-0.5">
          <button type="button" data-idx="${idx}" class="btn-move-other-up text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-up text-[9px]"></i>
          </button>
          <button type="button" data-idx="${idx}" class="btn-move-other-down text-slate-400 hover:text-indigo-600 disabled:opacity-20 p-0.5" title="Move Down" ${idx === state.data.other_reasons.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>
        <input type="text" value="${escapeHtml(r.reason)}" data-idx="${idx}" class="other-reason-input flex-1 text-xs px-2 py-1 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
        <input type="number" min="0" value="${r.count}" data-idx="${idx}" class="other-count-input w-20 text-right text-xs px-2 py-1 border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500">
        <button type="button" data-idx="${idx}" class="btn-del-other-reason text-slate-400 hover:text-rose-500 p-1 transition" title="Remove reason">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `).join("");
  }
}

// HELPER: SWAP ITEMS IN ARRAY
function swapArrayItems(arr, fromIdx, toIdx) {
  if (fromIdx < 0 || fromIdx >= arr.length || toIdx < 0 || toIdx >= arr.length) return;
  const temp = arr[fromIdx];
  arr[fromIdx] = arr[toIdx];
  arr[toIdx] = temp;
}

// PAN & ZOOM HANDLING
function initPanAndZoom() {
  const viewport = document.getElementById("diagram-viewport");
  if (!viewport) return;

  // Mouse Drag to Pan
  viewport.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // Only left click
    isDragging = true;
    dragMoved = false;
    startDragX = e.clientX - panX;
    startDragY = e.clientY - panY;
    viewport.classList.add("cursor-grabbing");
    viewport.classList.remove("cursor-grab");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const curX = e.clientX - startDragX;
    const curY = e.clientY - startDragY;
    if (Math.abs(curX - panX) > 3 || Math.abs(curY - panY) > 3) {
      dragMoved = true;
    }
    panX = curX;
    panY = curY;
    applyTransform();
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      viewport.classList.remove("cursor-grabbing");
      viewport.classList.add("cursor-grab");
    }
  });

  // Mouse Wheel / Ctrl+Wheel to Zoom
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newZoom = Math.min(3.0, Math.max(0.25, zoomLevel * zoomFactor));
    panX = mouseX - (mouseX - panX) * (newZoom / zoomLevel);
    panY = mouseY - (mouseY - panY) * (newZoom / zoomLevel);
    zoomLevel = newZoom;
    applyTransform();
  }, { passive: false });

  // Zoom control buttons
  const btnIn = document.getElementById("btn-zoom-in");
  if (btnIn) {
    btnIn.addEventListener("click", () => {
      zoomLevel = Math.min(3.0, zoomLevel * 1.2);
      applyTransform();
    });
  }

  const btnOut = document.getElementById("btn-zoom-out");
  if (btnOut) {
    btnOut.addEventListener("click", () => {
      zoomLevel = Math.max(0.25, zoomLevel / 1.2);
      applyTransform();
    });
  }

  const btnFit = document.getElementById("btn-zoom-fit");
  if (btnFit) {
    btnFit.addEventListener("click", fitToScreen);
  }

  const btnReset = document.getElementById("btn-zoom-reset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      zoomLevel = 1.0;
      panX = 25;
      panY = 25;
      applyTransform();
    });
  }

  // Interactive Click-to-Focus: Click SVG box -> Jump & Highlight Form Field
  const svgEl = document.getElementById("prisma-svg");
  if (svgEl) {
    svgEl.addEventListener("click", (e) => {
      // If user was dragging to move diagram, ignore click
      if (dragMoved) return;

      const clickable = e.target.closest(".clickable-box");
      if (!clickable) return;

      const targetId = clickable.getAttribute("data-target");
      const sectionId = clickable.getAttribute("data-section");

      // Expand accordion section if closed
      if (sectionId) {
        const sec = document.getElementById(sectionId);
        if (sec && sec.classList.contains("hidden")) {
          toggleSection(sectionId);
        }
      }

      // Scroll and highlight target
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.remove("highlight-target");
          void target.offsetWidth; // force browser reflow for CSS re-trigger
          target.classList.add("highlight-target");

          if (typeof target.focus === "function") {
            target.focus();
            if (typeof target.select === "function") target.select();
          }

          setTimeout(() => {
            target.classList.remove("highlight-target");
          }, 2200);
        }
      }
    });
  }

  // Re-fit automatically when Tailwind CDN finishes styling or window resizes
  window.addEventListener("load", () => {
    fitToScreen();
    setTimeout(fitToScreen, 250);
  });
  window.addEventListener("resize", () => {
    if (!dragMoved) fitToScreen();
  });
  if (typeof ResizeObserver !== "undefined") {
    let lastVpWidth = 0;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        if (w > 0 && Math.abs(w - lastVpWidth) > 15) {
          lastVpWidth = w;
          fitToScreen();
        }
      }
    });
    ro.observe(viewport);
  }
}

function applyTransform() {
  const container = document.getElementById("diagram-container");
  if (container) {
    container.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
  }
  const zoomInd = document.getElementById("zoom-indicator");
  if (zoomInd) {
    zoomInd.textContent = `${Math.round(zoomLevel * 100)}%`;
  }
}

function fitToScreen() {
  const viewport = document.getElementById("diagram-viewport");
  const svg = document.getElementById("prisma-svg");
  if (!viewport || !svg) return;

  const vpWidth = viewport.clientWidth - 24;
  const vpHeight = viewport.clientHeight - 24;
  const svgWidth = parseFloat(svg.getAttribute("width")) || 1000;
  const svgHeight = parseFloat(svg.getAttribute("height")) || 800;

  if (vpWidth <= 0 || vpHeight <= 0 || svgWidth <= 0 || svgHeight <= 0) return;

  const scaleX = vpWidth / svgWidth;
  const scaleY = vpHeight / svgHeight;
  zoomLevel = Math.min(scaleX, scaleY, 1.35);

  panX = Math.max(8, (viewport.clientWidth - svgWidth * zoomLevel) / 2);
  panY = Math.max(8, (viewport.clientHeight - svgHeight * zoomLevel) / 2);
  applyTransform();
}

// BIND DOM EVENTS
function bindEvents() {
  // Option: Language
  const optLang = document.getElementById("opt-lang");
  if (optLang) {
    optLang.addEventListener("change", (e) => {
      state.options.lang = e.target.value;
      autoSave();
      renderDiagram();
    });
  }

  // Option: Theme
  const optTheme = document.getElementById("opt-theme");
  if (optTheme) {
    optTheme.addEventListener("change", (e) => {
      state.options.theme = e.target.value;
      autoSave();
      renderDiagram();
    });
  }

  // Option Checkboxes
  const bindCheckbox = (id, prop) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", (e) => {
        state.options[prop] = e.target.checked;
        toggleConditionalCards();
        autoSave();
        renderDiagram();
        fitToScreen();
      });
    }
  };

  bindCheckbox("chk-previous", "previous");
  bindCheckbox("chk-other", "other");
  bindCheckbox("chk-dbDetail", "dbDetail");
  bindCheckbox("chk-regDetail", "regDetail");
  bindCheckbox("chk-dataExtraction", "dataExtraction");
  bindCheckbox("chk-metaAnalysis", "metaAnalysis");
  bindCheckbox("chk-hideZero", "hideZero");
  bindCheckbox("chk-includeNew", "includeNew");
  bindCheckbox("chk-showFootnotes", "showFootnotes");

  // Number Inputs
  const numberInputs = [
    "previous_studies", "previous_reports",
    "database_results", "register_results",
    "website_results", "organisation_results", "citations_results",
    "duplicates", "excluded_automatic", "excluded_other",
    "records_screened", "records_excluded",
    "dbr_sought_reports", "dbr_notretrieved_reports", "dbr_assessed", "dbr_extraction_assessed",
    "other_sought_reports", "other_notretrieved_reports", "other_assessed",
    "new_studies", "new_reports",
    "total_studies", "total_reports",
    "total_studies_ma", "total_reports_ma"
  ];

  numberInputs.forEach(key => {
    const input = document.getElementById(`inp-${key}`);
    if (input) {
      input.addEventListener("input", (e) => {
        if (input.readOnly) return;
        state.data[key] = parseInt(e.target.value, 10) || 0;
        recalculateFlowMath();
        autoSave();
        renderDiagram();
      });
    }
  });

  // Dynamic Add Buttons
  document.getElementById("btn-add-db")?.addEventListener("click", () => {
    state.data.databases.push({ name: `Database ${state.data.databases.length + 1}`, count: 0 });
    renderFormLists();
    recalculateFlowMath();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-reg")?.addEventListener("click", () => {
    state.data.registers.push({ name: `Register ${state.data.registers.length + 1}`, count: 0 });
    renderFormLists();
    recalculateFlowMath();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-screen-reason")?.addEventListener("click", () => {
    if (!state.data.screening_reasons) state.data.screening_reasons = [];
    state.data.screening_reasons.push({ reason: `Screening Reason ${state.data.screening_reasons.length + 1}`, count: 0 });
    renderFormLists();
    recalculateFlowMath();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-dbr-reason")?.addEventListener("click", () => {
    state.data.dbr_reasons.push({ reason: `Reason ${state.data.dbr_reasons.length + 1}`, count: 0 });
    renderFormLists();
    recalculateFlowMath();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-extraction-reason")?.addEventListener("click", () => {
    if (!state.data.extraction_reasons) state.data.extraction_reasons = [];
    state.data.extraction_reasons.push({ reason: `Extraction Reason ${state.data.extraction_reasons.length + 1}`, count: 0 });
    renderFormLists();
    recalculateFlowMath();
    autoSave();
    renderDiagram();
    fitToScreen();
  });

  document.getElementById("btn-add-other-reason")?.addEventListener("click", () => {
    state.data.other_reasons.push({ reason: `Reason ${state.data.other_reasons.length + 1}`, count: 0 });
    renderFormLists();
    recalculateFlowMath();
    autoSave();
    renderDiagram();
  });

  // Dynamic Item Inputs Delegation
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.classList.contains("db-name-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.databases[idx].name = t.value;
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("db-count-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.databases[idx].count = parseInt(t.value, 10) || 0;
      recalculateFlowMath();
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("reg-name-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.registers[idx].name = t.value;
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("reg-count-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.registers[idx].count = parseInt(t.value, 10) || 0;
      recalculateFlowMath();
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("screen-reason-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.screening_reasons[idx].reason = t.value;
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("screen-count-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.screening_reasons[idx].count = parseInt(t.value, 10) || 0;
      recalculateFlowMath();
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("dbr-reason-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.dbr_reasons[idx].reason = t.value;
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("dbr-count-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.dbr_reasons[idx].count = parseInt(t.value, 10) || 0;
      recalculateFlowMath();
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("extraction-reason-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.extraction_reasons[idx].reason = t.value;
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("extraction-count-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.extraction_reasons[idx].count = parseInt(t.value, 10) || 0;
      recalculateFlowMath();
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("other-reason-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.other_reasons[idx].reason = t.value;
      autoSave();
      renderDiagram();
    } else if (t.classList.contains("other-count-input")) {
      const idx = parseInt(t.getAttribute("data-idx"), 10);
      state.data.other_reasons[idx].count = parseInt(t.value, 10) || 0;
      recalculateFlowMath();
      autoSave();
      renderDiagram();
    }
  });

  // Dynamic Item Delete and Reorder Delegation
  document.addEventListener("click", (e) => {
    // 1. REORDER UP
    const btnUpDb = e.target.closest(".btn-move-db-up");
    if (btnUpDb) {
      const idx = parseInt(btnUpDb.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.databases, idx, idx - 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnUpReg = e.target.closest(".btn-move-reg-up");
    if (btnUpReg) {
      const idx = parseInt(btnUpReg.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.registers, idx, idx - 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnUpScreen = e.target.closest(".btn-move-screen-up");
    if (btnUpScreen) {
      const idx = parseInt(btnUpScreen.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.screening_reasons, idx, idx - 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnUpDbr = e.target.closest(".btn-move-dbr-up");
    if (btnUpDbr) {
      const idx = parseInt(btnUpDbr.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.dbr_reasons, idx, idx - 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnUpExt = e.target.closest(".btn-move-extraction-up");
    if (btnUpExt) {
      const idx = parseInt(btnUpExt.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.extraction_reasons, idx, idx - 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnUpOther = e.target.closest(".btn-move-other-up");
    if (btnUpOther) {
      const idx = parseInt(btnUpOther.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.other_reasons, idx, idx - 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }

    // 2. REORDER DOWN
    const btnDownDb = e.target.closest(".btn-move-db-down");
    if (btnDownDb) {
      const idx = parseInt(btnDownDb.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.databases, idx, idx + 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDownReg = e.target.closest(".btn-move-reg-down");
    if (btnDownReg) {
      const idx = parseInt(btnDownReg.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.registers, idx, idx + 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDownScreen = e.target.closest(".btn-move-screen-down");
    if (btnDownScreen) {
      const idx = parseInt(btnDownScreen.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.screening_reasons, idx, idx + 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDownDbr = e.target.closest(".btn-move-dbr-down");
    if (btnDownDbr) {
      const idx = parseInt(btnDownDbr.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.dbr_reasons, idx, idx + 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDownExt = e.target.closest(".btn-move-extraction-down");
    if (btnDownExt) {
      const idx = parseInt(btnDownExt.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.extraction_reasons, idx, idx + 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDownOther = e.target.closest(".btn-move-other-down");
    if (btnDownOther) {
      const idx = parseInt(btnDownOther.getAttribute("data-idx"), 10);
      swapArrayItems(state.data.other_reasons, idx, idx + 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }

    // 3. DELETE ITEMS
    const btnDelDb = e.target.closest(".btn-del-db");
    if (btnDelDb) {
      const idx = parseInt(btnDelDb.getAttribute("data-idx"), 10);
      state.data.databases.splice(idx, 1);
      renderFormLists();
      recalculateFlowMath();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelReg = e.target.closest(".btn-del-reg");
    if (btnDelReg) {
      const idx = parseInt(btnDelReg.getAttribute("data-idx"), 10);
      state.data.registers.splice(idx, 1);
      renderFormLists();
      recalculateFlowMath();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelScreen = e.target.closest(".btn-del-screen-reason");
    if (btnDelScreen) {
      const idx = parseInt(btnDelScreen.getAttribute("data-idx"), 10);
      state.data.screening_reasons.splice(idx, 1);
      renderFormLists();
      recalculateFlowMath();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelDbr = e.target.closest(".btn-del-dbr-reason");
    if (btnDelDbr) {
      const idx = parseInt(btnDelDbr.getAttribute("data-idx"), 10);
      state.data.dbr_reasons.splice(idx, 1);
      renderFormLists();
      recalculateFlowMath();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelExt = e.target.closest(".btn-del-extraction-reason");
    if (btnDelExt) {
      const idx = parseInt(btnDelExt.getAttribute("data-idx"), 10);
      state.data.extraction_reasons.splice(idx, 1);
      renderFormLists();
      recalculateFlowMath();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelOther = e.target.closest(".btn-del-other-reason");
    if (btnDelOther) {
      const idx = parseInt(btnDelOther.getAttribute("data-idx"), 10);
      state.data.other_reasons.splice(idx, 1);
      renderFormLists();
      recalculateFlowMath();
      autoSave();
      renderDiagram();
      return;
    }

    // 4. LOAD OR DELETE DETECTED PROJECTS
    const btnLoadProj = e.target.closest(".btn-load-proj");
    if (btnLoadProj) {
      const key = btnLoadProj.getAttribute("data-key");
      loadProjectFromKey(key);
      return;
    }
    const btnDelProj = e.target.closest(".btn-del-proj");
    if (btnDelProj) {
      const key = btnDelProj.getAttribute("data-key");
      if (confirm("Deseja realmente remover esta versão salva do navegador?")) {
        localStorage.removeItem(key);
        renderSavedProjectsList();
        showToast("Versão excluída do armazenamento local.");
      }
      return;
    }
  });

  // Automatic Sum Calculators
  document.getElementById("btn-sum-dbs")?.addEventListener("click", () => {
    const sum = state.data.databases.reduce((acc, curr) => acc + (parseInt(curr.count, 10) || 0), 0);
    state.data.database_results = sum;
    const inp = document.getElementById("inp-database_results");
    if (inp) inp.value = sum;
    autoSave();
    renderDiagram();
    showToast(`Databases total calculated: ${sum}`);
  });

  document.getElementById("btn-sum-regs")?.addEventListener("click", () => {
    const sum = state.data.registers.reduce((acc, curr) => acc + (parseInt(curr.count, 10) || 0), 0);
    state.data.register_results = sum;
    const inp = document.getElementById("inp-register_results");
    if (inp) inp.value = sum;
    autoSave();
    renderDiagram();
    showToast(`Registers total calculated: ${sum}`);
  });

  document.getElementById("btn-sum-screen-reasons")?.addEventListener("click", () => {
    if (state.data.screening_reasons && state.data.screening_reasons.length > 0) {
      const sum = state.data.screening_reasons.reduce((acc, curr) => acc + (parseInt(curr.count, 10) || 0), 0);
      state.data.records_excluded = sum;
      const inp = document.getElementById("inp-records_excluded");
      if (inp) inp.value = sum;
      autoSave();
      renderDiagram();
      showToast(`Total excluded records calculated from reasons: ${sum}`);
    }
  });

  document.getElementById("btn-calc-screened")?.addEventListener("click", () => {
    const totalIdent = (state.data.database_results || 0) + (state.data.register_results || 0);
    const totalRemoved = (state.data.duplicates || 0) + (state.data.excluded_automatic || 0) + (state.data.excluded_other || 0);
    const screened = Math.max(0, totalIdent - totalRemoved);
    state.data.records_screened = screened;
    const inp = document.getElementById("inp-records_screened");
    if (inp) inp.value = screened;
    autoSave();
    renderDiagram();
    showToast(`Screened records calculated: ${screened}`);
  });

  // Cloud Modal Open & Close
  const cloudModal = document.getElementById("cloud-modal");
  document.getElementById("btn-cloud-modal")?.addEventListener("click", () => {
    prepareCloudModal();
    cloudModal?.classList.remove("hidden");
  });
  document.getElementById("btn-close-modal")?.addEventListener("click", () => {
    cloudModal?.classList.add("hidden");
  });
  document.getElementById("btn-dismiss-modal")?.addEventListener("click", () => {
    cloudModal?.classList.add("hidden");
  });

  // Copy Cloud URL
  document.getElementById("btn-copy-url")?.addEventListener("click", () => {
    const urlInput = document.getElementById("inp-cloud-url");
    if (urlInput) {
      urlInput.select();
      navigator.clipboard.writeText(urlInput.value).then(() => {
        const txt = document.getElementById("txt-copy-url");
        if (txt) {
          txt.textContent = "Copied!";
          setTimeout(() => { txt.textContent = "Copy"; }, 2000);
        }
        showToast("Permanent cloud link copied to clipboard!");
      });
    }
  });

  // Save/Load Cloud ID
  document.getElementById("btn-save-cloud")?.addEventListener("click", saveCloudById);
  document.getElementById("btn-load-cloud")?.addEventListener("click", loadCloudById);
  document.getElementById("btn-restore-hash")?.addEventListener("click", restoreFromHashInput);
  document.getElementById("btn-refresh-projects")?.addEventListener("click", async () => {
    await syncFromCloudOnStartup();
    renderSavedProjectsList();
  });

  // File Download / Upload
  document.getElementById("btn-download-json")?.addEventListener("click", downloadJsonProject);
  document.getElementById("inp-load-file")?.addEventListener("change", handleFileUpload);

  // Export Dropdown Menu
  const exportBtn = document.getElementById("btn-export-menu");
  const exportMenu = document.getElementById("export-menu");
  if (exportBtn && exportMenu) {
    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      exportMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
      if (!exportBtn.contains(e.target) && !exportMenu.contains(e.target)) {
        exportMenu.classList.add("hidden");
      }
    });
  }

  // Export Actions
  document.getElementById("btn-export-svg")?.addEventListener("click", () => {
    exportSvgFile();
    exportMenu?.classList.add("hidden");
  });
  document.getElementById("btn-export-png")?.addEventListener("click", () => {
    exportPngFile();
    exportMenu?.classList.add("hidden");
  });
  document.getElementById("btn-copy-png")?.addEventListener("click", () => {
    copyPngToClipboard();
    exportMenu?.classList.add("hidden");
  });
  document.getElementById("btn-print-pdf")?.addEventListener("click", () => {
    window.print();
    exportMenu?.classList.add("hidden");
  });
  document.getElementById("btn-export-csv")?.addEventListener("click", () => {
    exportCsvFile();
    exportMenu?.classList.add("hidden");
  });

  // Reset Button
  document.getElementById("btn-reset")?.addEventListener("click", () => {
    if (confirm("Reset flowchart to official PRISMA 2020 defaults?")) {
      localStorage.removeItem("prisma2020_nathan_state");
      window.location.hash = "";
      location.reload();
    }
  });
}

// ACCORDION SECTION TOGGLE
function toggleSection(sectionId) {
  const el = document.getElementById(sectionId);
  const icon = document.getElementById(`icon-${sectionId}`);
  if (el) {
    el.classList.toggle("hidden");
    if (icon) {
      icon.style.transform = el.classList.contains("hidden") ? "rotate(180deg)" : "rotate(0deg)";
    }
  }
}

// PREPARE CLOUD PERMANENT URL
function prepareCloudModal() {
  const payload = {
    id: currentActiveProject || "revisao-nathan",
    savedAt: new Date(lastLoadedTimestamp || Date.now()).toISOString(),
    state: state
  };
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
  const baseUrl = window.location.href.split("#")[0];
  const fullUrl = `${baseUrl}#data=${compressed}`;
  const inp = document.getElementById("inp-cloud-url");
  if (inp) inp.value = fullUrl;

  const idInput = document.getElementById("inp-cloud-id");
  if (idInput && !idInput.value) {
    idInput.value = currentActiveProject || "revisao-nathan";
  }

  renderSavedProjectsList();
}

// SWITCH MODAL TABS
function switchModalTab(tab) {
  const tabs = ['url', 'cloud', 'file'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (btn && content) {
      if (t === tab) {
        btn.className = "modal-tab active-tab flex-1 py-3 text-center border-b-2 border-indigo-600 text-indigo-600 font-semibold";
        content.classList.remove("hidden");
      } else {
        btn.className = "modal-tab flex-1 py-3 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-semibold";
        content.classList.add("hidden");
      }
    }
  });
  if (tab === 'cloud') {
    renderSavedProjectsList();
  }
}

// CLOUD & LOCALSTORAGE PROJECT ID SAVE & LOAD
async function saveCloudById() {
  const idInput = document.getElementById("inp-cloud-id");
  const id = idInput?.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  if (!id) {
    alert("Por favor, digite um nome/ID para o projeto (ex: revisao-nathan-2026)");
    return;
  }
  const nowIso = new Date().toISOString();
  lastLoadedTimestamp = new Date(nowIso).getTime();
  hasLocalSavedData = true;

  const payload = {
    id: id,
    savedAt: nowIso,
    state: JSON.parse(JSON.stringify(state))
  };
  localStorage.setItem(`prisma2020_cloud_${id}`, JSON.stringify(payload));
  localStorage.setItem("prisma2020_nathan_state", JSON.stringify(payload));
  localStorage.setItem("prisma2020_active_project", id);
  currentActiveProject = id;
  updateActiveProjectLabel();
  updateUrlHashFromState(payload);
  renderSavedProjectsList();
  renderHeaderProjectsList();

  const msg = document.getElementById("cloud-sync-msg");
  if (msg) {
    msg.className = "text-xs font-semibold text-indigo-600 block";
    msg.innerHTML = `<i class="fa-solid fa-cloud-arrow-up animate-bounce mr-1"></i> Sincronizando projeto <strong>${escapeHtml(id)}</strong> na nuvem...`;
  }

  const synced = await syncProjectToCloud(id, payload, { silent: false });
  if (msg) {
    msg.className = "text-xs font-semibold text-emerald-600 block";
    msg.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Projeto salvo ${synced ? "na nuvem e localmente" : "localmente"} sob o ID: <strong>${escapeHtml(id)}</strong>!`;
  }
}

async function loadCloudById() {
  const idInput = document.getElementById("inp-cloud-id");
  const id = idInput?.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  if (!id) {
    alert("Por favor, digite o nome/ID do projeto para carregar.");
    return;
  }
  const msg = document.getElementById("cloud-sync-msg");
  if (msg) {
    msg.className = "text-xs font-semibold text-indigo-600 block";
    msg.innerHTML = `<i class="fa-solid fa-cloud-arrow-down animate-bounce mr-1"></i> Buscando projeto <strong>${escapeHtml(id)}</strong> na nuvem...`;
  }
  await loadProjectFromKey(`prisma2020_cloud_${id}`);
  if (msg) {
    msg.classList.add("hidden");
  }
}

// FILE DOWNLOAD / IMPORT (.json / .prisma / .csv)
function downloadJsonProject() {
  const jsonStr = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PRISMA2020_${new Date().toISOString().slice(0, 10)}.prisma`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Project file downloaded successfully!");
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  if (file.name.endsWith(".csv")) {
    reader.onload = (event) => {
      parsePrismaCsv(event.target.result);
    };
    reader.readAsText(file);
  } else {
    reader.onload = (event) => {
      try {
        const loaded = JSON.parse(event.target.result);
        if (loaded.options && loaded.data) {
          Object.assign(state.options, loaded.options);
          Object.assign(state.data, loaded.data);
          renderFormLists();
          syncUIFromState();
          autoSave();
          renderDiagram();
          fitToScreen();
          showToast("Project imported successfully!");
          document.getElementById("cloud-modal")?.classList.add("hidden");
        }
      } catch (err) {
        alert("Invalid file format. Please upload a .prisma or .json project file.");
      }
    };
    reader.readAsText(file);
  }
}

// CSV IMPORT / EXPORT (PRISMA2020 R Package Compatible)
function parsePrismaCsv(csvContent) {
  const lines = csvContent.split(/\r?\n/);
  if (lines.length < 2) return;

  lines.forEach(line => {
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (parts.length >= 8) {
      const varName = parts[0].trim().replace(/^"|"$/g, '');
      const nVal = parts[7].trim().replace(/^"|"$/g, '');

      if (varName in state.data) {
        state.data[varName] = isNaN(nVal) ? nVal : parseInt(nVal, 10);
      }
      if (varName === "database_specific_results" && nVal && nVal.includes(",")) {
        state.data.databases = parseSemicolonList(nVal);
      }
      if (varName === "register_specific_results" && nVal && nVal.includes(",")) {
        state.data.registers = parseSemicolonList(nVal);
      }
      if (varName === "dbr_excluded" && nVal && nVal.includes(",")) {
        state.data.dbr_reasons = parseSemicolonList(nVal, "reason");
      }
      if (varName === "other_excluded" && nVal && nVal.includes(",")) {
        state.data.other_reasons = parseSemicolonList(nVal, "reason");
      }
    }
  });

  renderFormLists();
  syncUIFromState();
  autoSave();
  renderDiagram();
  fitToScreen();
  showToast("PRISMA CSV imported successfully!");
  document.getElementById("cloud-modal")?.classList.add("hidden");
}

function parseSemicolonList(str, labelKey = "name") {
  const items = str.split(";");
  const result = [];
  items.forEach(item => {
    const parts = item.split(",");
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const count = parseInt(parts[1].trim(), 10) || 0;
      result.push({ [labelKey]: name, count: count });
    }
  });
  return result;
}

function exportCsvFile() {
  const dbsString = state.data.databases.map(d => `${d.name}, ${d.count}`).join("; ");
  const regsString = state.data.registers.map(r => `${r.name}, ${r.count}`).join("; ");
  const dbrExString = state.data.dbr_reasons.map(r => `${r.reason}, ${r.count}`).join("; ");
  const otherExString = state.data.other_reasons.map(r => `${r.reason}, ${r.count}`).join("; ");

  const rows = [
    ["data","node","box","description","boxtext","tooltips","url","n"],
    ["previous_studies","node5","box1","Studies included in previous version of review","Studies included in previous version of review","Studies included in previous version of review","previous_studies.html",state.data.previous_studies],
    ["previous_reports","NA","box1","Reports of studies included in previous version of review","Reports of studies included in previous version of review","NA","previous_reports.html",state.data.previous_reports],
    ["database_results","node7","box2","Records identified from: Databases","Databases","Records identified from: Databases and Registers","database_results.html",state.data.database_results],
    ["database_specific_results","NA","box2","Records identified from: specific databases","Specific Databases","NA","database_results.html",`"${dbsString}"`],
    ["register_results","NA","box2","Records identified from: Registers","Registers","NA","NA",state.data.register_results],
    ["register_specific_results","NA","box2","Records identified from: specific registers","Specific Registers","NA","database_results.html",`"${regsString}"`],
    ["website_results","node17","box11","Records identified from: Websites","Websites","Records identified from: Websites, Organisations and Citation Searching","website_results.html",state.data.website_results],
    ["organisation_results","","box11","Records identified from: Organisations","Organisations","NA","NA",state.data.organisation_results],
    ["citations_results","NA","box11","Records identified from: Citation searching","Citation searching","NA","NA",state.data.citations_results],
    ["duplicates","node8","box3","Duplicate records","Duplicate records","Duplicate records","duplicates.html",state.data.duplicates],
    ["excluded_automatic","NA","box3","Records marked as ineligible by automation tools","Records marked as ineligible by automation tools","NA","NA",state.data.excluded_automatic],
    ["excluded_other","NA","box3","Records removed for other reasons","Records removed for other reasons","NA","NA",state.data.excluded_other],
    ["records_screened","node9","box4","Records screened (databases and registers)","Records screened","Records screened (databases and registers)","records_screened.html",state.data.records_screened],
    ["records_excluded","node10","box5","Records excluded (databases and registers)","Records excluded","Records excluded (databases and registers)","records_excluded.html",state.data.records_excluded],
    ["dbr_sought_reports","node11","box6","Reports sought for retrieval (databases and registers)","Reports sought for retrieval","Reports sought for retrieval (databases and registers)","dbr_sought_reports.html",state.data.dbr_sought_reports],
    ["dbr_notretrieved_reports","node12","box7","Reports not retrieved (databases and registers)","Reports not retrieved","Reports not retrieved (databases and registers)","dbr_notretrieved_reports.html",state.data.dbr_notretrieved_reports],
    ["other_sought_reports","node18","box12","Reports sought for retrieval (other)","Reports sought for retrieval","Reports sought for retrieval (other)","other_sought_reports.html",state.data.other_sought_reports],
    ["other_notretrieved_reports","node19","box13","Reports not retrieved (other)","Reports not retrieved","Reports not retrieved (other)","other_notretrieved_reports.html",state.data.other_notretrieved_reports],
    ["dbr_assessed","node13","box8","Reports assessed for eligibility (databases and registers)","Reports assessed for eligibility","Reports assessed for eligibility (databases and registers)","dbr_assessed.html",state.data.dbr_assessed],
    ["dbr_excluded","node14","box9","Reports excluded (databases and registers)","Reports excluded","Reports excluded (databases and registers)","dbrexcludedrecords.html",`"${dbrExString}"`],
    ["other_assessed","node20","box14","Reports assessed for eligibility (other)","Reports assessed for eligibility","Reports assessed for eligibility (other)","other_assessed.html",state.data.other_assessed],
    ["other_excluded","node21","box15","Reports excluded (other)","Reports excluded","Reports excluded (other)","other_excluded.html",`"${otherExString}"`],
    ["new_studies","node15","box10","New studies included in review","New studies included in review","New studies included in review","new_studies.html",state.data.new_studies],
    ["new_reports","NA","box10","Reports of new included studies","Reports of new included studies","NA","NA",state.data.new_reports],
    ["total_studies","node22","box16","Total studies included in review","Total studies included in review","Total studies included in review","total_studies.html",state.data.total_studies],
    ["total_reports","NA","box16","Reports of total included studies","Reports of total included studies","NA","NA",state.data.total_reports],
    ["total_studies_ma","node23","box17","Total studies included in meta-analysis","Total studies included in meta-analysis","Total studies included in meta-analysis","total_studies_meta_analysis.html",state.data.total_studies_ma],
    ["total_reports_ma","NA","box17","Reports of total included studies in meta-analysis","Reports of total included studies in meta-analysis","NA","NA",state.data.total_reports_ma]
  ];

  const csvContent = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PRISMA2020_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("PRISMA 2020 R-compatible CSV exported!");
}

// VECTOR SVG EXPORT
function exportSvgFile() {
  const svgEl = document.getElementById("prisma-svg");
  if (!svgEl) return;
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgEl);

  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PRISMA2020_Flowchart_${new Date().toISOString().slice(0, 10)}.svg`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Vector SVG downloaded successfully!");
}

// 300 DPI PNG EXPORT
function exportPngFile() {
  generateCanvasBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PRISMA2020_Flowchart_300DPI_${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("High-resolution PNG downloaded!");
  });
}

// COPY PNG TO CLIPBOARD (Word / Google Docs Ctrl+V)
function copyPngToClipboard() {
  generateCanvasBlob((blob) => {
    try {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]).then(() => {
        showToast("Image copied! Press Ctrl+V directly into Word or Docs.");
      }).catch(() => {
        alert("Clipboard copy not supported in this browser. Please use the Download PNG button.");
      });
    } catch (e) {
      alert("Clipboard copy not supported in this browser. Please use the Download PNG button.");
    }
  });
}

function generateCanvasBlob(callback) {
  const svgEl = document.getElementById("prisma-svg");
  if (!svgEl) return;

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgEl);

  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const scale = 2.5; // High academic resolution
    const canvas = document.createElement("canvas");
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      URLObj.revokeObjectURL(blobURL);
      callback(blob);
    }, "image/png");
  };
  img.src = blobURL;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");
  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3500);
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =========================================================================
// PRISMA 2020 SVG RENDERING ENGINE (WITH SMART ZERO HIDING & INTERACTIVE FOCUS)
// =========================================================================
function renderDiagram() {
  const svg = document.getElementById("prisma-svg");
  if (!svg) return;

  // Enforce mathematical consistency across all stages before rendering
  recalculateFlowMath();

  const lang = state.options.lang || 'en';
  const t = i18n[lang] || i18n.en;
  const th = themes[state.options.theme] || themes.official;
  const hideZero = state.options.hideZero !== false;
  const useExtractionStage = state.options.dataExtraction !== false;

  // DIMENSIONS AND GEOMETRY
  const stageColWidth = 26;
  const boxW = 235; // Width of standard PRISMA boxes (expanded for academic labels)
  const colGap = 32; // Gap between columns in each track
  const trackGap = 40; // Gap between Main Track and Other Methods Track

  // COLUMN X COORDINATES
  let curX = 20;
  const stageX = curX;
  curX += stageColWidth + 16;

  // Previous Track Column (Optional)
  let prevColX = 0;
  if (state.options.previous) {
    prevColX = curX;
    curX += boxW + colGap;
  }

  // Databases & Registers Track (Col 1 & Col 2)
  const col1X = curX;
  const col2X = col1X + boxW + colGap;
  const mainTrackWidth = (col2X + boxW) - col1X;
  curX = col2X + boxW;

  // Other Methods Track (Col 3 & Col 4, Optional)
  let col3X = 0;
  let col4X = 0;
  let otherTrackWidth = 0;
  if (state.options.other) {
    curX += trackGap;
    col3X = curX;
    col4X = col3X + boxW + colGap;
    otherTrackWidth = (col4X + boxW) - col3X;
    curX = col4X + boxW;
  }

  const totalWidth = curX + 25;

  // BUILD TEXT LINES FOR EACH BOX

  // 1. Box 1: Records identified from databases & registers
  // Cochrane Handbook & MECIR: n is the total number of articles/records retrieved
  const recIdentTitle = state.options.showFootnotes ? (t.rec_identified_from_fn || t.rec_identified_from) : t.rec_identified_from;
  const box1Lines = [recIdentTitle];
  box1Lines.push(`${t.databases} (n = ${state.data.database_results || 0})`);
  if (state.options.dbDetail && state.data.databases && state.data.databases.length > 0) {
    state.data.databases.forEach(db => {
      box1Lines.push(`${db.name} (n = ${db.count})`);
    });
  }

  // Registers: Only show if NOT hidden by hideZero (or if count > 0 or registers list active)
  const hasRegResults = (state.data.register_results > 0) || (state.options.regDetail && state.data.registers.length > 0);
  if (!hideZero || hasRegResults) {
    box1Lines.push(`${t.registers} (n = ${state.data.register_results || 0})`);
    if (state.options.regDetail && state.data.registers && state.data.registers.length > 0) {
      state.data.registers.forEach(reg => {
        box1Lines.push(`${reg.name} (n = ${reg.count})`);
      });
    }
  }

  // 2. Box 2: Records removed before screening
  const box2Lines = [t.removed_before_screening];
  let removedCount = 0;
  if (!hideZero || (state.data.duplicates || 0) > 0) {
    box2Lines.push(`Duplicate records removed (n = ${state.data.duplicates || 0})`);
    removedCount++;
  }
  if (!hideZero || (state.data.excluded_automatic || 0) > 0) {
    box2Lines.push(`Records marked as ineligible by automation`);
    box2Lines.push(`tools (n = ${state.data.excluded_automatic || 0})`);
    removedCount++;
  }
  if (!hideZero || (state.data.excluded_other || 0) > 0) {
    box2Lines.push(`Records removed for other reasons (n = ${state.data.excluded_other || 0})`);
    removedCount++;
  }
  if (removedCount === 0) {
    box2Lines.push(`None removed (n = 0)`);
  }

  // 3. Box 3: Records screened
  const box3Lines = [
    t.records_screened,
    `(n = ${state.data.records_screened || 0})`
  ];

  // 4. Box 4: Records excluded during screening (Supports itemized reasons, e.g. Duplicates identified during screening)
  const recExclTitle = state.options.showFootnotes ? (t.records_excluded_fn || t.records_excluded) : t.records_excluded;
  const box4Lines = [
    recExclTitle,
    `(n = ${state.data.records_excluded || 0})`
  ];
  if (state.data.screening_reasons && state.data.screening_reasons.length > 0) {
    state.data.screening_reasons.forEach(r => {
      if (!hideZero || r.count > 0 || state.data.screening_reasons.length === 1) {
        box4Lines.push(`${r.reason} (n = ${r.count})`);
      }
    });
  }

  // 5. Box 5: Reports sought for retrieval (Main track)
  const box5Lines = [
    t.reports_sought,
    `(n = ${state.data.dbr_sought_reports || 0})`
  ];

  // 6. Box 6: Reports not retrieved (Main track)
  const box6Lines = [
    t.reports_not_retrieved,
    `(n = ${state.data.dbr_notretrieved_reports || 0})`
  ];

  // 7. Box 7: Reports assessed for eligibility (Main track)
  const box7Lines = [
    t.reports_assessed,
    `(n = ${state.data.dbr_assessed || 0})`
  ];

  // 8. Box 8: Reports excluded reasons in Eligibility (Main track)
  const box8Lines = [t.reports_excluded];
  if (state.data.dbr_reasons && state.data.dbr_reasons.length > 0) {
    state.data.dbr_reasons.forEach(r => {
      if (!hideZero || r.count > 0 || state.data.dbr_reasons.length === 1) {
        box8Lines.push(`${r.reason} (n = ${r.count})`);
      }
    });
  } else {
    box8Lines.push(`Reason 1 (n = 0)`);
  }

  // 8B. Box 7B & Box 8B: Data Extraction Stage (Main track)
  const box7bLines = [
    t.reports_extraction_assessed || "Reports included in data extraction",
    `(n = ${state.data.dbr_extraction_assessed || 0})`
  ];
  const box8bLines = [t.reports_extraction_excluded || "Reports excluded during data extraction:"];
  if (state.data.extraction_reasons && state.data.extraction_reasons.length > 0) {
    state.data.extraction_reasons.forEach(r => {
      if (!hideZero || r.count > 0 || state.data.extraction_reasons.length === 1) {
        box8bLines.push(`${r.reason} (n = ${r.count})`);
      }
    });
  } else {
    box8bLines.push(`(n = 0)`);
  }

  // 9. Box 9: Studies included in review (Supports non-new vs new wording)
  const studiesIncText = (state.options.includeNew || state.options.previous) ? t.new_studies_inc : t.studies_inc;
  const reportsIncText = (state.options.includeNew || state.options.previous) ? t.new_reports_inc : t.reports_inc;
  const box9Lines = [
    studiesIncText,
    `(n = ${state.data.new_studies || 0})`,
    reportsIncText,
    `(n = ${state.data.new_reports || 0})`
  ];
  if (state.options.previous) {
    box9Lines.push(
      t.total_studies_inc,
      `(n = ${state.data.total_studies || 0})`,
      t.total_reports_inc,
      `(n = ${state.data.total_reports || 0})`
    );
  }

  // 10. Box 10: Records identified from other sources
  const box10Lines = [t.rec_identified_from];
  let otherSourcesCount = 0;
  if (!hideZero || (state.data.website_results || 0) > 0) {
    box10Lines.push(`${t.websites} (n = ${state.data.website_results || 0})`);
    otherSourcesCount++;
  }
  if (!hideZero || (state.data.organisation_results || 0) > 0) {
    box10Lines.push(`${t.organisations} (n = ${state.data.organisation_results || 0})`);
    otherSourcesCount++;
  }
  if (!hideZero || (state.data.citations_results || 0) > 0) {
    box10Lines.push(`${t.citations} (n = ${state.data.citations_results || 0})`);
    otherSourcesCount++;
  }
  if (otherSourcesCount === 0) {
    box10Lines.push(`(n = 0)`);
  }

  // 11. Box 11: Reports sought for retrieval (Other track)
  const box11Lines = [
    t.reports_sought,
    `(n = ${state.data.other_sought_reports || 0})`
  ];

  // 12. Box 12: Reports not retrieved (Other track)
  const box12Lines = [
    t.reports_not_retrieved,
    `(n = ${state.data.other_notretrieved_reports || 0})`
  ];

  // 13. Box 13: Reports assessed for eligibility (Other track)
  const box13Lines = [
    t.reports_assessed,
    `(n = ${state.data.other_assessed || 0})`
  ];

  // 14. Box 14: Reports excluded reasons (Other track)
  const box14Lines = [t.reports_excluded];
  if (state.data.other_reasons && state.data.other_reasons.length > 0) {
    state.data.other_reasons.forEach(r => {
      if (!hideZero || r.count > 0 || state.data.other_reasons.length === 1) {
        box14Lines.push(`${r.reason} (n = ${r.count})`);
      }
    });
  } else {
    box14Lines.push(`Reason 1 (n = 0)`);
  }

  // HELPER: AUTOMATIC PIXEL-ACCURATE WORD WRAPPING FOR ALL BOXES
  const maxTextPixelWidth = boxW - 18; // 9px horizontal padding on each side inside box
  let textMeasureCtx = null;
  try {
    const c = document.createElement("canvas");
    textMeasureCtx = c.getContext("2d");
    if (textMeasureCtx) {
      textMeasureCtx.font = "400 10px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
    }
  } catch (e) {}

  function measureLinePx(str) {
    if (textMeasureCtx) {
      return textMeasureCtx.measureText(str).width;
    }
    return str.length * 5.6;
  }

  function wrapBoxLinesInPlace(linesArr) {
    const wrapped = [];
    linesArr.forEach(rawLine => {
      const line = String(rawLine || "").trim();
      if (!line) return;
      if (measureLinePx(line) <= maxTextPixelWidth) {
        wrapped.push(line);
        return;
      }
      // Keep parenthetical counts like "(n = 30)" as a single non-breaking token
      const protectedLine = line.replace(/\(\s*n\s*=\s*[^)]+\)/gi, match => match.replace(/\s+/g, "\u00A0"));
      const words = protectedLine.split(/\s+/);
      let currentLine = "";

      words.forEach(word => {
        const cleanWord = word.replace(/\u00A0/g, " ");
        const candidate = currentLine ? `${currentLine} ${cleanWord}` : cleanWord;
        if (measureLinePx(candidate) <= maxTextPixelWidth) {
          currentLine = candidate;
        } else {
          if (currentLine) {
            wrapped.push(currentLine);
          }
          if (measureLinePx(cleanWord) > maxTextPixelWidth) {
            let chunk = "";
            for (const ch of cleanWord) {
              if (measureLinePx(chunk + ch) <= maxTextPixelWidth) {
                chunk += ch;
              } else {
                if (chunk) wrapped.push(chunk);
                chunk = ch;
              }
            }
            currentLine = chunk;
          } else {
            currentLine = cleanWord;
          }
        }
      });
      if (currentLine) {
        wrapped.push(currentLine);
      }
    });
    linesArr.length = 0;
    linesArr.push(...wrapped);
  }

  [
    box1Lines, box2Lines, box3Lines, box4Lines,
    box5Lines, box6Lines, box7Lines, box8Lines,
    box7bLines, box8bLines, box9Lines, box10Lines,
    box11Lines, box12Lines, box13Lines, box14Lines
  ].forEach(wrapBoxLinesInPlace);

  // HELPER: CALCULATE BOX HEIGHT FROM LINE COUNT
  const lineHeight = 13.5;
  const paddingY = 16;
  function calcBoxHeight(lines) {
    return Math.max(38, Math.round(lines.length * lineHeight + paddingY));
  }

  // ROW HEIGHTS (NO OVERLAP GRID)
  const headerHeight = 28;
  const rowGap = 32;

  // ROW 1: HEADERS
  const r1Y = 22;

  // ROW 2: IDENTIFICATION
  const r2Y = r1Y + headerHeight + 20;
  const hBox1 = calcBoxHeight(box1Lines);
  const hBox2 = calcBoxHeight(box2Lines);
  const hBox10 = state.options.other ? calcBoxHeight(box10Lines) : 0;
  const r2Height = Math.max(hBox1, hBox2, hBox10);

  // ROW 3: SCREENING
  const r3Y = r2Y + r2Height + rowGap;
  const hBox3 = calcBoxHeight(box3Lines);
  const hBox4 = calcBoxHeight(box4Lines);
  const r3Height = Math.max(hBox3, hBox4);

  // ROW 4: SOUGHT / RETRIEVAL
  const r4Y = r3Y + r3Height + rowGap;
  const hBox5 = calcBoxHeight(box5Lines);
  const hBox6 = calcBoxHeight(box6Lines);
  const hBox11 = state.options.other ? calcBoxHeight(box11Lines) : 0;
  const hBox12 = state.options.other ? calcBoxHeight(box12Lines) : 0;
  const r4Height = Math.max(hBox5, hBox6, hBox11, hBox12);

  // ROW 5: ASSESSED / ELIGIBILITY
  const r5Y = r4Y + r4Height + rowGap;
  const hBox7 = calcBoxHeight(box7Lines);
  const hBox8 = calcBoxHeight(box8Lines);
  const hBox13 = state.options.other ? calcBoxHeight(box13Lines) : 0;
  const hBox14 = state.options.other ? calcBoxHeight(box14Lines) : 0;
  const r5Height = Math.max(hBox7, hBox8, hBox13, hBox14);

  // ROW 5B & 5C: DATA EXTRACTION STAGE (OPTIONAL, ON BY DEFAULT)
  // Row 5B has Box 7B (Reports included in data extraction) in Col 1, receiving the Blue Arrow from Box 13 (Other Methods) on its right edge.
  // Row 5C has Box 8B (Reports excluded during data extraction) in Col 2, receiving the Red Arrow branching off the vertical line between Box 7B and Box 9.
  let r5bY = 0;
  let hBox7b = 0;
  let r5cY = 0;
  let hBox8b = 0;
  if (useExtractionStage) {
    r5bY = r5Y + r5Height + rowGap;
    hBox7b = calcBoxHeight(box7bLines);
    r5cY = r5bY + hBox7b + 18;
    hBox8b = calcBoxHeight(box8bLines);
  }

  // ROW 6: INCLUDED
  const lastPreIncludedBottom = useExtractionStage ? (r5cY + hBox8b) : (r5Y + r5Height);
  const r6Y = lastPreIncludedBottom + 26;
  const hBox9 = calcBoxHeight(box9Lines);
  const r6Height = hBox9;

  // ROW 7: META-ANALYSIS (OPTIONAL)
  let r7Y = 0;
  let r7Height = 0;
  let metaLines = [];
  if (state.options.metaAnalysis) {
    metaLines = [
      t.ma_studies_inc,
      `(n = ${state.data.total_studies_ma || 0})`,
      t.ma_reports_inc,
      `(n = ${state.data.total_reports_ma || 0})`
    ];
    wrapBoxLinesInPlace(metaLines);
    r7Y = r6Y + r6Height + 28;
    r7Height = calcBoxHeight(metaLines);
  }

  const totalHeight = (state.options.metaAnalysis ? r7Y + r7Height : r6Y + r6Height) + 30;

  // UPDATE SVG CANVAS SIZE
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", totalHeight);
  svg.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);

  const dimEl = document.getElementById("canvas-dimensions");
  if (dimEl) {
    dimEl.textContent = `${totalWidth} × ${totalHeight} px`;
  }

  // ASSEMBLE SVG ELEMENTS
  const el = [];

  // Arrow marker definition (clean black triangle)
  el.push(`
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${th.arrowColor}" />
      </marker>
    </defs>
    <rect x="0" y="0" width="${totalWidth}" height="${totalHeight}" fill="#ffffff" />
  `);

  // 1. LEFT STAGE BADGES (Pill shaped, soft blue #adcbf0, vertical text rotated -90)
  // Badge 1: Identification (covers Row 2)
  el.push(drawStagePill(stageX, r2Y, stageColWidth, r2Height, t.stage_ident, th));

  // Badge 2: Screening (covers Row 3 to Row 5 / Row 5B)
  const screeningTotalHeight = lastPreIncludedBottom - r3Y;
  el.push(drawStagePill(stageX, r3Y, stageColWidth, screeningTotalHeight, t.stage_screen, th));

  // Badge 3: Included (covers Row 6)
  const includedTotalHeight = (state.options.metaAnalysis ? (r7Y + r7Height) - r6Y : r6Height);
  el.push(drawStagePill(stageX, r6Y, stageColWidth, includedTotalHeight, t.stage_inc, th));

  // 2. PREVIOUS STUDIES TRACK (OPTIONAL)
  if (state.options.previous) {
    // Header
    el.push(drawHeaderPill(prevColX, r1Y, boxW, headerHeight, t.header_prev, th.headerPrevBg, th.headerPrevText));
    el.push(drawArrow(prevColX + boxW / 2, r1Y + headerHeight, prevColX + boxW / 2, r2Y, th.arrowColor));

    // Box
    const prevLines = [
      t.prev_studies_inc,
      `(n = ${state.data.previous_studies || 0})`,
      t.prev_reports_inc,
      `(n = ${state.data.previous_reports || 0})`
    ];
    wrapBoxLinesInPlace(prevLines);
    const prevH = calcBoxHeight(prevLines);
    el.push(drawBoxWhite(prevColX, r2Y, boxW, prevH, prevLines, th, "inp-previous_studies", "sec-prev"));

    // Arrow from Previous box down and into Included Box
    const prevTargetY = r6Y + hBox9 / 2;
    el.push(`
      <path d="M ${prevColX + boxW / 2} ${r2Y + prevH} L ${prevColX + boxW / 2} ${prevTargetY} L ${col1X} ${prevTargetY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.2" marker-end="url(#arrow)" />
    `);
  }

  // 3. TOP HEADERS
  // Header 1: Databases & Registers (Amber/Goldenrod pill spanning Col 1 and Col 2)
  const headerDbText = (state.options.includeNew || state.options.previous) ? (t.header_db_new || t.header_db) : t.header_db;
  el.push(drawHeaderPill(col1X, r1Y, mainTrackWidth, headerHeight, headerDbText, th.headerDbBg, th.headerDbText));

  // Header 2: Other Methods (Grey pill spanning Col 3 and Col 4)
  if (state.options.other) {
    const headerOtherText = (state.options.includeNew || state.options.previous) ? (t.header_other_new || t.header_other) : t.header_other;
    el.push(drawHeaderPill(col3X, r1Y, otherTrackWidth, headerHeight, headerOtherText, th.headerOtherBg, th.headerOtherText));
  }

  // 4. ROW 2: IDENTIFICATION
  // Box 1 (Col 1): Records identified from Databases & Registers
  el.push(drawBoxWhite(col1X, r2Y, boxW, hBox1, box1Lines, th, "container-specific-dbs", "sec-ident"));

  // Horizontal Arrow: Box 1 -> Box 2
  const r2MidY = r2Y + hBox1 / 2;
  el.push(drawArrow(col1X + boxW, r2MidY, col2X, r2MidY, th.arrowColor));

  // Box 2 (Col 2): Records removed before screening
  el.push(drawBoxWhite(col2X, r2Y, boxW, hBox2, box2Lines, th, "container-pre-screen", "sec-screen"));

  // Box 10 (Col 3, Other Track): Records identified from other sources
  if (state.options.other) {
    el.push(drawBoxGrey(col3X, r2Y, boxW, hBox10, box10Lines, th, "container-other-methods", "sec-ident"));
  }

  // 5. ROW 3: SCREENING
  // Vertical Arrow: Box 1 -> Box 3
  el.push(drawArrow(col1X + boxW / 2, r2Y + hBox1, col1X + boxW / 2, r3Y, th.arrowColor));

  // Box 3 (Col 1): Records screened
  el.push(drawBoxWhite(col1X, r3Y, boxW, hBox3, box3Lines, th, "inp-records_screened", "sec-screen"));

  // Horizontal Arrow: Box 3 -> Box 4
  const r3MidY = r3Y + hBox3 / 2;
  el.push(drawArrow(col1X + boxW, r3MidY, col2X, r3MidY, th.arrowColor));

  // Box 4 (Col 2): Records excluded during screening
  el.push(drawBoxWhite(col2X, r3Y, boxW, hBox4, box4Lines, th, "container-screening-reasons", "sec-screen"));

  // In Other Track: Arrow straight down from Box 10 past Row 3 down to Box 11 in Row 4!
  if (state.options.other) {
    el.push(drawArrow(col3X + boxW / 2, r2Y + hBox10, col3X + boxW / 2, r4Y, th.arrowColor));
  }

  // 6. ROW 4: RETRIEVAL / SOUGHT
  // Vertical Arrow: Box 3 -> Box 5
  el.push(drawArrow(col1X + boxW / 2, r3Y + hBox3, col1X + boxW / 2, r4Y, th.arrowColor));

  // Box 5 (Col 1): Reports sought for retrieval
  el.push(drawBoxWhite(col1X, r4Y, boxW, hBox5, box5Lines, th, "inp-dbr_sought_reports", "sec-elig"));

  // Horizontal Arrow: Box 5 -> Box 6
  const r4MidY = r4Y + hBox5 / 2;
  el.push(drawArrow(col1X + boxW, r4MidY, col2X, r4MidY, th.arrowColor));

  // Box 6 (Col 2): Reports not retrieved
  el.push(drawBoxWhite(col2X, r4Y, boxW, hBox6, box6Lines, th, "inp-dbr_notretrieved_reports", "sec-elig"));

  // Other Track Row 4
  if (state.options.other) {
    // Box 11 (Col 3): Reports sought for retrieval
    el.push(drawBoxGrey(col3X, r4Y, boxW, hBox11, box11Lines, th, "inp-other_sought_reports", "sec-elig"));

    // Horizontal Arrow: Box 11 -> Box 12
    const r4OtherMidY = r4Y + hBox11 / 2;
    el.push(drawArrow(col3X + boxW, r4OtherMidY, col4X, r4OtherMidY, th.arrowColor));

    // Box 12 (Col 4): Reports not retrieved
    el.push(drawBoxGrey(col4X, r4Y, boxW, hBox12, box12Lines, th, "inp-other_notretrieved_reports", "sec-elig"));
  }

  // 7. ROW 5: ASSESSED / ELIGIBILITY
  // Vertical Arrow: Box 5 -> Box 7
  el.push(drawArrow(col1X + boxW / 2, r4Y + hBox5, col1X + boxW / 2, r5Y, th.arrowColor));

  // Box 7 (Col 1): Reports assessed for eligibility
  el.push(drawBoxWhite(col1X, r5Y, boxW, hBox7, box7Lines, th, "inp-dbr_assessed", "sec-elig"));

  // Horizontal Arrow: Box 7 -> Box 8
  const r5MidY = r5Y + hBox7 / 2;
  el.push(drawArrow(col1X + boxW, r5MidY, col2X, r5MidY, th.arrowColor));

  // Box 8 (Col 2): Reports excluded with reasons
  el.push(drawBoxWhite(col2X, r5Y, boxW, hBox8, box8Lines, th, "dbr-reasons-list", "sec-elig"));

  // Other Track Row 5
  if (state.options.other) {
    // Vertical Arrow: Box 11 -> Box 13
    el.push(drawArrow(col3X + boxW / 2, r4Y + hBox11, col3X + boxW / 2, r5Y, th.arrowColor));

    // Box 13 (Col 3): Reports assessed for eligibility
    el.push(drawBoxGrey(col3X, r5Y, boxW, hBox13, box13Lines, th, "inp-other_assessed", "sec-elig"));

    // Horizontal Arrow: Box 13 -> Box 14
    const r5OtherMidY = r5Y + hBox13 / 2;
    el.push(drawArrow(col3X + boxW, r5OtherMidY, col4X, r5OtherMidY, th.arrowColor));

    // Box 14 (Col 4): Reports excluded with reasons
    el.push(drawBoxGrey(col4X, r5Y, boxW, hBox14, box14Lines, th, "other-reasons-list", "sec-elig"));
  }

  // 7B. ROW 5B & 5C: DATA EXTRACTION STAGE (IF ENABLED)
  if (useExtractionStage) {
    // Vertical Arrow: Box 7 (Assessed for Eligibility) -> Box 7B (Included in Data Extraction)
    el.push(drawArrow(col1X + boxW / 2, r5Y + hBox7, col1X + boxW / 2, r5bY, th.arrowColor));

    // Box 7B (Col 1): Reports included in data extraction
    el.push(drawBoxWhite(col1X, r5bY, boxW, hBox7b, box7bLines, th, "inp-dbr_extraction_assessed", "sec-elig"));

    // Elbow Arrow (Blue Arrow): From Box 13 (Other Methods Assessed) into right edge of Box 7B (Reports included in data extraction)
    if (state.options.other) {
      const elbowStartX = col3X + boxW / 2;
      const elbowStartY = r5Y + hBox13;
      const elbowTargetX = col1X + boxW;
      const elbowTargetY = r5bY + hBox7b / 2;

      el.push(`
        <path d="M ${elbowStartX} ${elbowStartY} L ${elbowStartX} ${elbowTargetY} L ${elbowTargetX} ${elbowTargetY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.2" marker-end="url(#arrow)" />
      `);
    }

    // Horizontal Arrow (Red Arrow): Branches from the vertical line below Box 7B into left edge of Box 8B (Reports excluded during data extraction)
    const r5cMidY = r5cY + hBox8b / 2;
    el.push(drawArrow(col1X + boxW / 2, r5cMidY, col2X, r5cMidY, th.arrowColor));

    // Box 8B (Col 2): Reports excluded during data extraction
    el.push(drawBoxWhite(col2X, r5cY, boxW, hBox8b, box8bLines, th, "extraction-reasons-list", "sec-elig"));
  }

  // 8. ROW 6: INCLUDED
  // Vertical Arrow: Box 7B (or Box 7) -> Box 9
  const mainPreIncludedBottomY = useExtractionStage ? (r5bY + hBox7b) : (r5Y + hBox7);
  el.push(drawArrow(col1X + boxW / 2, mainPreIncludedBottomY, col1X + boxW / 2, r6Y, th.arrowColor));

  // Box 9 (Col 1): New studies included in review
  el.push(drawBoxWhite(col1X, r6Y, boxW, hBox9, box9Lines, th, "inp-new_studies", "sec-inc"));

  // Elbow Arrow from Box 13 (Other Track) to right edge of Box 9 ONLY when Data Extraction stage is disabled
  if (state.options.other && !useExtractionStage) {
    const elbowStartX = col3X + boxW / 2;
    const elbowStartY = r5Y + hBox13;
    const elbowTargetX = col1X + boxW;
    const elbowTargetY = r6Y + hBox9 / 2;

    el.push(`
      <path d="M ${elbowStartX} ${elbowStartY} L ${elbowStartX} ${elbowTargetY} L ${elbowTargetX} ${elbowTargetY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.2" marker-end="url(#arrow)" />
    `);
  }

  // 9. ROW 7: META-ANALYSIS (OPTIONAL)
  if (state.options.metaAnalysis) {
    el.push(drawArrow(col1X + boxW / 2, r6Y + hBox9, col1X + boxW / 2, r7Y, th.arrowColor));
    el.push(drawBoxWhite(col1X, r7Y, boxW, r7Height, metaLines, th, "inp-total_studies_ma", "sec-inc"));
  }

  svg.innerHTML = el.join("\n");
}

// =========================================================================
// SVG DRAWING UTILITIES
// =========================================================================

// Top Rounded Pill Headers
function drawHeaderPill(x, y, w, h, text, bg, color) {
  return `
    <g class="header-pill">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${bg}" stroke="none" />
      <text x="${x + w / 2}" y="${y + h / 2 + 3.5}" fill="${color}" font-size="10.5" font-weight="700" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif">
        ${escapeHtml(text)}
      </text>
    </g>
  `;
}

// Side Stage Badge Pills (Soft Blue #adcbf0, Vertical Text)
function drawStagePill(x, y, w, h, label, th) {
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  return `
    <g class="stage-pill">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${th.stageBadgeBg}" stroke="none" />
      <text x="${centerX}" y="${centerY + 3}" fill="${th.stageBadgeText}" font-size="11" font-weight="600" text-anchor="middle" transform="rotate(-90 ${centerX} ${centerY})" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif">
        ${escapeHtml(label)}
      </text>
    </g>
  `;
}

// Databases & Registers Track Box (White fill, 1px Black Border, Centered Text, Clickable)
function drawBoxWhite(x, y, w, h, lines, th, targetFieldId = "", sectionId = "") {
  const lineHeight = 13.5;
  const startY = y + (h - (lines.length - 1) * lineHeight) / 2 + 3.5;

  const textTags = lines.map((line, i) => {
    return `<text x="${x + w / 2}" y="${startY + i * lineHeight}" fill="${th.textColor}" font-size="10" font-weight="400" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif">${escapeHtml(line)}</text>`;
  }).join("\n");

  const clickAttr = targetFieldId ? `class="prisma-box-main clickable-box" data-target="${targetFieldId}" data-section="${sectionId}" title="Click to edit in form"` : `class="prisma-box-main"`;

  return `
    <g ${clickAttr}>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${th.mainBoxBg}" stroke="${th.mainBoxBorder}" stroke-width="1.0" rx="0" />
      ${textTags}
    </g>
  `;
}

// Other Methods Track Box (Centered Text, Clickable)
function drawBoxGrey(x, y, w, h, lines, th, targetFieldId = "", sectionId = "") {
  const lineHeight = 13.5;
  const startY = y + (h - (lines.length - 1) * lineHeight) / 2 + 3.5;

  const textTags = lines.map((line, i) => {
    return `<text x="${x + w / 2}" y="${startY + i * lineHeight}" fill="${th.textColor}" font-size="10" font-weight="400" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif">${escapeHtml(line)}</text>`;
  }).join("\n");

  const clickAttr = targetFieldId ? `class="prisma-box-other clickable-box" data-target="${targetFieldId}" data-section="${sectionId}" title="Click to edit in form"` : `class="prisma-box-other"`;
  const strokeColor = (th.otherBoxBorder && th.otherBoxBorder !== "none") ? th.otherBoxBorder : "none";
  const strokeWidthAttr = strokeColor !== "none" ? ` stroke-width="1.0"` : "";

  return `
    <g ${clickAttr}>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${th.otherBoxBg}" stroke="${strokeColor}"${strokeWidthAttr} rx="0" />
      ${textTags}
    </g>
  `;
}

// Straight Line Arrow with Marker
function drawArrow(x1, y1, x2, y2, color) {
  return `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.2" marker-end="url(#arrow)" />
  `;
}
