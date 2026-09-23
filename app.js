/**
 * PRISMA 2020 Flowchart Generator
 * Modern Standalone Web App for PRISMA 2020 Flow Diagrams
 * Designed for Nathan - Systematic Review
 * Compliant with Cochrane Handbook (4.6.1), PRISMA 2020 & MECIR (C44)
 */

// GLOBAL APPLICATION STATE
const state = {
  options: {
    lang: 'en', // Default English as requested for research
    theme: 'official', // 'official', 'classic', 'modern_blue'
    previous: false,
    other: true,
    dbDetail: true,
    regDetail: false,
    metaAnalysis: false,
    hideZero: true // Hide fields with n = 0 (e.g. Registers n = 0, unused automation)
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
    records_excluded: 715,
    screening_reasons: [
      { reason: "Duplicates identified during screening", count: 15 },
      { reason: "Ineligible study design or population", count: 700 }
    ],
    dbr_sought_reports: 160,
    dbr_notretrieved_reports: 12,
    dbr_assessed: 148,
    dbr_reasons: [
      { reason: "Incompatible population criteria", count: 48 },
      { reason: "Intervention not assessed", count: 35 },
      { reason: "Inappropriate study design (non-RCT)", count: 26 },
      { reason: "Primary outcomes not reported", count: 14 }
    ],
    other_sought_reports: 80,
    other_notretrieved_reports: 5,
    other_assessed: 75,
    other_reasons: [
      { reason: "Inclusion criteria not met", count: 42 },
      { reason: "Insufficient data for synthesis", count: 18 }
    ],
    new_studies: 25,
    new_reports: 31,
    total_studies: 25,
    total_reports: 31,
    total_studies_ma: 18,
    total_reports_ma: 22
  }
};

// I18N DICTIONARY FOR TEXTS (ENGLISH & PORTUGUESE)
const i18n = {
  en: {
    stage_ident: "Identification",
    stage_screen: "Screening",
    stage_inc: "Included",
    header_db: "Identification of new studies via databases and registers",
    header_other: "Identification of new studies via other methods",
    header_prev: "Previous studies",
    rec_identified_from: "Records identified from*:",
    databases: "Databases",
    registers: "Registers",
    removed_before_screening: "Records removed before screening:",
    duplicates: "Duplicate records removed",
    auto_excluded: "Records marked as ineligible by automation tools",
    other_removed: "Records removed for other reasons",
    records_screened: "Records screened",
    records_excluded: "Records excluded**",
    reports_sought: "Reports sought for retrieval",
    reports_not_retrieved: "Reports not retrieved",
    reports_assessed: "Reports assessed for eligibility",
    reports_excluded: "Reports excluded:",
    websites: "Websites",
    organisations: "Organisations",
    citations: "Citation searching",
    new_studies_inc: "New studies included in review",
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
    header_db: "Identificação de novos estudos através de bases de dados e registros",
    header_other: "Identificação de novos estudos através de outros métodos",
    header_prev: "Estudos anteriores",
    rec_identified_from: "Registros identificados em*:",
    databases: "Bases de dados",
    registers: "Registros de ensaios",
    removed_before_screening: "Registros removidos antes da triagem:",
    duplicates: "Registros duplicados removidos",
    auto_excluded: "Marcados como inelegíveis por ferramentas automatizadas",
    other_removed: "Removidos por outras razões",
    records_screened: "Registros triados",
    records_excluded: "Registros excluídos**",
    reports_sought: "Relatórios buscados para recuperação",
    reports_not_retrieved: "Relatórios não recuperados",
    reports_assessed: "Relatórios avaliados para elegibilidade",
    reports_excluded: "Relatórios excluídos:",
    websites: "Websites",
    organisations: "Organizações",
    citations: "Busca em citações",
    new_studies_inc: "Novos estudos incluídos na revisão",
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
  bindEvents();
  renderDiagram();

  // Fit diagram to viewport initially after DOM render
  setTimeout(() => {
    fitToScreen();
  }, 100);
}

// RESTORE STATE FROM URL HASH, CLOUD OR LOCAL STORAGE
function loadSavedState() {
  // 1. Check URL Hash (#data=...)
  const hash = window.location.hash;
  if (hash && hash.startsWith("#data=")) {
    try {
      const compressed = hash.replace("#data=", "");
      const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
      if (jsonStr) {
        const loaded = JSON.parse(jsonStr);
        applyLoadedState(loaded);
        showToast("Flowchart state loaded from URL Link!");
        return;
      }
    } catch (e) {
      console.warn("Error decoding URL data hash:", e);
    }
  }

  // 2. Scan for all saved projects in localStorage
  const localProjects = scanAndListLocalProjects();

  // 3. Check autosave session
  let loadedFromAutosave = false;
  const localSaved = localStorage.getItem("prisma2020_nathan_state");
  if (localSaved) {
    try {
      const loaded = JSON.parse(localSaved);
      const st = loaded.state || loaded;
      if (st && st.data) {
        applyLoadedState(st);
        loadedFromAutosave = true;
      }
    } catch (e) {
      console.warn("Error decoding localStorage state:", e);
    }
  }

  // 4. If saved projects exist (e.g. from Cloud Project ID), offer restoration banner
  const cloudProjects = localProjects.filter(p => p.key.startsWith("prisma2020_cloud_"));
  if (cloudProjects.length > 0) {
    const latestProj = cloudProjects[0];
    showRecoveryBanner(latestProj);
  }
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

  // Sort: Cloud projects first, then by date if available
  projects.sort((a, b) => {
    if (a.key.startsWith("prisma2020_cloud_") && !b.key.startsWith("prisma2020_cloud_")) return -1;
    if (!a.key.startsWith("prisma2020_cloud_") && b.key.startsWith("prisma2020_cloud_")) return 1;
    return 0;
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

// LOAD PROJECT FROM SPECIFIC KEY
function loadProjectFromKey(key) {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const loaded = JSON.parse(saved);
      applyLoadedState(loaded);
      autoSave();
      showToast(`Projeto restaurado com sucesso!`);
      document.getElementById("cloud-modal")?.classList.add("hidden");
    } catch (e) {
      alert("Erro ao ler dados do projeto.");
    }
  } else {
    alert("Nenhum projeto encontrado com esta chave.");
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

// AUTO-SAVE TO LOCALSTORAGE
let saveTimeout = null;
function autoSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    localStorage.setItem("prisma2020_nathan_state", JSON.stringify(state));
    
    // Update save indicator badge
    const badge = document.getElementById("save-status");
    if (badge) {
      badge.classList.remove("hidden");
      badge.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5 text-emerald-500"></i><span>Saved locally</span>`;
    }
  }, 400);
}

// SYNC FORM FIELDS FROM STATE
function syncUIFromState() {
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

  const chkMeta = document.getElementById("chk-metaAnalysis");
  if (chkMeta) chkMeta.checked = state.options.metaAnalysis;

  const chkHideZero = document.getElementById("chk-hideZero");
  if (chkHideZero) chkHideZero.checked = state.options.hideZero !== false;

  // Toggle conditional UI sections
  toggleConditionalCards();

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

  // Databases & Registers exclusion reasons list
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

  const vpWidth = viewport.clientWidth - 40;
  const vpHeight = viewport.clientHeight - 40;
  const svgWidth = parseFloat(svg.getAttribute("width")) || 1000;
  const svgHeight = parseFloat(svg.getAttribute("height")) || 800;

  if (svgWidth <= 0 || svgHeight <= 0) return;

  const scaleX = vpWidth / svgWidth;
  const scaleY = vpHeight / svgHeight;
  zoomLevel = Math.min(scaleX, scaleY, 1.0); // Never exceed 100% on initial fit

  panX = Math.max(10, (viewport.clientWidth - svgWidth * zoomLevel) / 2);
  panY = Math.max(10, (viewport.clientHeight - svgHeight * zoomLevel) / 2);
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
  bindCheckbox("chk-metaAnalysis", "metaAnalysis");
  bindCheckbox("chk-hideZero", "hideZero");

  // Number Inputs
  const numberInputs = [
    "previous_studies", "previous_reports",
    "database_results", "register_results",
    "website_results", "organisation_results", "citations_results",
    "duplicates", "excluded_automatic", "excluded_other",
    "records_screened", "records_excluded",
    "dbr_sought_reports", "dbr_notretrieved_reports", "dbr_assessed",
    "other_sought_reports", "other_notretrieved_reports", "other_assessed",
    "new_studies", "new_reports",
    "total_studies", "total_reports",
    "total_studies_ma", "total_reports_ma"
  ];

  numberInputs.forEach(key => {
    const input = document.getElementById(`inp-${key}`);
    if (input) {
      input.addEventListener("input", (e) => {
        state.data[key] = parseInt(e.target.value, 10) || 0;
        autoSave();
        renderDiagram();
      });
    }
  });

  // Dynamic Add Buttons
  document.getElementById("btn-add-db")?.addEventListener("click", () => {
    state.data.databases.push({ name: `Database ${state.data.databases.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-reg")?.addEventListener("click", () => {
    state.data.registers.push({ name: `Register ${state.data.registers.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-screen-reason")?.addEventListener("click", () => {
    if (!state.data.screening_reasons) state.data.screening_reasons = [];
    state.data.screening_reasons.push({ reason: `Screening Reason ${state.data.screening_reasons.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-dbr-reason")?.addEventListener("click", () => {
    state.data.dbr_reasons.push({ reason: `Reason ${state.data.dbr_reasons.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-other-reason")?.addEventListener("click", () => {
    state.data.other_reasons.push({ reason: `Reason ${state.data.other_reasons.length + 1}`, count: 0 });
    renderFormLists();
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
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelReg = e.target.closest(".btn-del-reg");
    if (btnDelReg) {
      const idx = parseInt(btnDelReg.getAttribute("data-idx"), 10);
      state.data.registers.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelScreen = e.target.closest(".btn-del-screen-reason");
    if (btnDelScreen) {
      const idx = parseInt(btnDelScreen.getAttribute("data-idx"), 10);
      state.data.screening_reasons.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelDbr = e.target.closest(".btn-del-dbr-reason");
    if (btnDelDbr) {
      const idx = parseInt(btnDelDbr.getAttribute("data-idx"), 10);
      state.data.dbr_reasons.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelOther = e.target.closest(".btn-del-other-reason");
    if (btnDelOther) {
      const idx = parseInt(btnDelOther.getAttribute("data-idx"), 10);
      state.data.other_reasons.splice(idx, 1);
      renderFormLists();
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
  document.getElementById("btn-refresh-projects")?.addEventListener("click", renderSavedProjectsList);

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
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(state));
  const fullUrl = `${window.location.origin}${window.location.pathname}#data=${compressed}`;
  const inp = document.getElementById("inp-cloud-url");
  if (inp) inp.value = fullUrl;
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

// LOCALSTORAGE PROJECT ID SAVE & LOAD
function saveCloudById() {
  const idInput = document.getElementById("inp-cloud-id");
  const id = idInput?.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  if (!id) {
    alert("Por favor, digite um nome/ID para o projeto (ex: revisao-nathan-2026)");
    return;
  }
  const payload = {
    id: id,
    savedAt: new Date().toISOString(),
    state: JSON.parse(JSON.stringify(state))
  };
  localStorage.setItem(`prisma2020_cloud_${id}`, JSON.stringify(payload));
  renderSavedProjectsList();

  const msg = document.getElementById("cloud-sync-msg");
  if (msg) {
    msg.className = "text-xs font-semibold text-emerald-600 block";
    msg.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Projeto salvo com sucesso sob o ID: <strong>${id}</strong>!`;
  }
  showToast(`Projeto '${id}' salvo com sucesso!`);
}

function loadCloudById() {
  const idInput = document.getElementById("inp-cloud-id");
  const id = idInput?.value.trim().toLowerCase();
  if (!id) {
    alert("Por favor, digite o nome/ID do projeto para carregar.");
    return;
  }
  loadProjectFromKey(`prisma2020_cloud_${id}`);
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

  const lang = state.options.lang || 'en';
  const t = i18n[lang] || i18n.en;
  const th = themes[state.options.theme] || themes.official;
  const hideZero = state.options.hideZero !== false;

  // DIMENSIONS AND GEOMETRY
  const stageColWidth = 26;
  const boxW = 215; // Width of standard PRISMA boxes
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
  const box1Lines = [t.rec_identified_from];
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
  const box4Lines = [
    t.records_excluded,
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

  // 8. Box 8: Reports excluded reasons (Main track)
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

  // 9. Box 9: New studies included in review
  const box9Lines = [
    t.new_studies_inc,
    `(n = ${state.data.new_studies || 0})`,
    t.new_reports_inc,
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

  // ROW 6: INCLUDED
  const r6Y = r5Y + r5Height + 36;
  const hBox9 = calcBoxHeight(box9Lines);
  const r6Height = hBox9;

  // ROW 7: META-ANALYSIS (OPTIONAL)
  let r7Y = 0;
  let r7Height = 0;
  if (state.options.metaAnalysis) {
    r7Y = r6Y + r6Height + 28;
    r7Height = 48;
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
  `);

  // 1. LEFT STAGE BADGES (Pill shaped, soft blue #adcbf0, vertical text rotated -90)
  // Badge 1: Identification (covers Row 2)
  el.push(drawStagePill(stageX, r2Y, stageColWidth, r2Height, t.stage_ident, th));

  // Badge 2: Screening (covers Row 3 to Row 5)
  const screeningTotalHeight = (r5Y + r5Height) - r3Y;
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
  el.push(drawHeaderPill(col1X, r1Y, mainTrackWidth, headerHeight, t.header_db, th.headerDbBg, th.headerDbText));

  // Header 2: Other Methods (Grey pill spanning Col 3 and Col 4)
  if (state.options.other) {
    el.push(drawHeaderPill(col3X, r1Y, otherTrackWidth, headerHeight, t.header_other, th.headerOtherBg, th.headerOtherText));
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

  // 8. ROW 6: INCLUDED
  // Vertical Arrow: Box 7 -> Box 9
  el.push(drawArrow(col1X + boxW / 2, r5Y + hBox7, col1X + boxW / 2, r6Y, th.arrowColor));

  // Box 9 (Col 1): New studies included in review
  el.push(drawBoxWhite(col1X, r6Y, boxW, hBox9, box9Lines, th, "inp-new_studies", "sec-inc"));

  // Elbow Arrow from Box 13 (Other Track) to right edge of Box 9
  if (state.options.other) {
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
    const metaLines = [
      t.ma_studies_inc,
      `(n = ${state.data.total_studies_ma || 0})`,
      t.ma_reports_inc,
      `(n = ${state.data.total_reports_ma || 0})`
    ];
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

// Other Methods Track Box (Solid Light Grey #dcdcdc fill, NO border, Centered Text, Clickable)
function drawBoxGrey(x, y, w, h, lines, th, targetFieldId = "", sectionId = "") {
  const lineHeight = 13.5;
  const startY = y + (h - (lines.length - 1) * lineHeight) / 2 + 3.5;

  const textTags = lines.map((line, i) => {
    return `<text x="${x + w / 2}" y="${startY + i * lineHeight}" fill="${th.textColor}" font-size="10" font-weight="400" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif">${escapeHtml(line)}</text>`;
  }).join("\n");

  const clickAttr = targetFieldId ? `class="prisma-box-other clickable-box" data-target="${targetFieldId}" data-section="${sectionId}" title="Click to edit in form"` : `class="prisma-box-other"`;

  return `
    <g ${clickAttr}>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${th.otherBoxBg}" stroke="none" rx="0" />
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
