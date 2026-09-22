/**
 * PRISMA 2020 Flowchart Generator
 * Aplicação Web Moderna para Geração de Fluxogramas PRISMA 2020
 * Desenvolvido para Nathan - Revisão Sistemática
 */

// ESTADO GLOBAL DA APLICAÇÃO
const state = {
  options: {
    lang: 'pt',
    theme: 'official', // 'official', 'classic', 'modern_blue'
    previous: false,
    other: true,
    dbDetail: true,
    regDetail: false,
    metaAnalysis: false
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
      { name: "ReBec", count: 10 }
    ],
    website_results: 45,
    organisation_results: 20,
    citations_results: 15,
    duplicates: 340,
    excluded_automatic: 25,
    excluded_other: 10,
    records_screened: 875,
    records_excluded: 715,
    dbr_sought_reports: 160,
    dbr_notretrieved_reports: 12,
    dbr_assessed: 148,
    dbr_reasons: [
      { reason: "População incompatível com os critérios", count: 48 },
      { reason: "Intervenção não avaliada", count: 35 },
      { reason: "Delineamento inadequado (não ECR)", count: 26 },
      { reason: "Desfechos primários ausentes", count: 14 }
    ],
    other_sought_reports: 80,
    other_notretrieved_reports: 5,
    other_assessed: 75,
    other_reasons: [
      { reason: "Critérios de inclusão não atendidos", count: 42 },
      { reason: "Dados insuficientes para análise", count: 18 }
    ],
    new_studies: 25,
    new_reports: 31,
    total_studies: 25,
    total_reports: 31,
    total_studies_ma: 18,
    total_reports_ma: 22
  }
};

// DICIONÁRIO DE TEXTOS OFICIAIS (PORTUGUÊS & INGLÊS)
const i18n = {
  pt: {
    stage_ident: "IDENTIFICAÇÃO",
    stage_screen: "TRIAGEM",
    stage_inc: "INCLUÍDOS",
    header_db: "Identificação de novos estudos através de bases de dados e registros",
    header_other: "Identificação de novos estudos através de outros métodos",
    header_prev: "Estudos anteriores",
    rec_identified_from: "Registros identificados em:",
    databases: "Bases de dados",
    registers: "Registros de ensaios",
    removed_before_screening: "Registros removidos antes da triagem:",
    duplicates: "Registros duplicados removidos",
    auto_excluded: "Marcados como inelegíveis por ferramentas automatizadas",
    other_removed: "Removidos por outras razões",
    records_screened: "Registros triados",
    records_excluded: "Registros excluídos",
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
  },
  en: {
    stage_ident: "IDENTIFICATION",
    stage_screen: "SCREENING",
    stage_inc: "INCLUDED",
    header_db: "Identification of new studies via databases and registers",
    header_other: "Identification of new studies via other methods",
    header_prev: "Previous studies",
    rec_identified_from: "Records identified from:",
    databases: "Databases",
    registers: "Registers",
    removed_before_screening: "Records removed before screening:",
    duplicates: "Duplicate records removed",
    auto_excluded: "Records marked as ineligible by automation tools",
    other_removed: "Records removed for other reasons",
    records_screened: "Records screened",
    records_excluded: "Records excluded",
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
    total_reports_inc: "Reports of total included studies",
    ma_studies_inc: "Total studies included in meta-analysis",
    ma_reports_inc: "Reports of total included studies in meta-analysis"
  }
};

// TEMAS DE CORES
const themes = {
  official: {
    headerDbBg: "#f5a623",
    headerDbText: "#ffffff",
    headerOtherBg: "#e2e8f0",
    headerOtherText: "#334155",
    headerPrevBg: "#e2e8f0",
    headerPrevText: "#334155",
    stageBadgeBg: "#0284c7",
    stageBadgeText: "#ffffff",
    boxBg: "#ffffff",
    boxBorder: "#0f172a",
    arrowColor: "#0f172a",
    textColor: "#0f172a",
    subtextColor: "#334155"
  },
  classic: {
    headerDbBg: "#f1f5f9",
    headerDbText: "#0f172a",
    headerOtherBg: "#f1f5f9",
    headerOtherText: "#0f172a",
    headerPrevBg: "#f1f5f9",
    headerPrevText: "#0f172a",
    stageBadgeBg: "#475569",
    stageBadgeText: "#ffffff",
    boxBg: "#ffffff",
    boxBorder: "#000000",
    arrowColor: "#000000",
    textColor: "#000000",
    subtextColor: "#1e293b"
  },
  modern_blue: {
    headerDbBg: "#3b82f6",
    headerDbText: "#ffffff",
    headerOtherBg: "#64748b",
    headerOtherText: "#ffffff",
    headerPrevBg: "#64748b",
    headerPrevText: "#ffffff",
    stageBadgeBg: "#1d4ed8",
    stageBadgeText: "#ffffff",
    boxBg: "#f8fafc",
    boxBorder: "#3b82f6",
    arrowColor: "#1d4ed8",
    textColor: "#0f172a",
    subtextColor: "#334155"
  }
};

// ESTADO DO ZOOM E PAN
let zoomLevel = 1.0;

// INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  initFromPersistence();
  setupEventListeners();
  renderFormLists();
  syncUIFromState();
  renderDiagram();
});

// SINCRONIZAÇÃO COM URL HASH OU LOCALSTORAGE
function initFromPersistence() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#data=')) {
    try {
      const compressed = hash.substring(6);
      const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
      if (jsonStr) {
        const loaded = JSON.parse(jsonStr);
        if (loaded.options && loaded.data) {
          Object.assign(state.options, loaded.options);
          Object.assign(state.data, loaded.data);
          showToast("Dados carregados com sucesso via link da nuvem!");
          return;
        }
      }
    } catch (e) {
      console.warn("Não foi possível carregar do hash:", e);
    }
  }

  // Tentar carregar do LocalStorage
  const saved = localStorage.getItem("prisma2020_nathan_state");
  if (saved) {
    try {
      const loaded = JSON.parse(saved);
      if (loaded.options && loaded.data) {
        Object.assign(state.options, loaded.options);
        Object.assign(state.data, loaded.data);
        return;
      }
    } catch (e) {
      console.warn("Erro ao ler LocalStorage:", e);
    }
  }
}

// SALVAR AUTOMATICAMENTE NO LOCALSTORAGE
function autoSave() {
  localStorage.setItem("prisma2020_nathan_state", JSON.stringify(state));
  const statusEl = document.getElementById("save-status");
  if (statusEl) {
    statusEl.classList.remove("hidden");
    statusEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5 text-emerald-500"></i><span>Salvo localmente</span>`;
  }
}

// SINCRONIZAR CAMPOS DE FORMULÁRIO COM O ESTADO
function syncUIFromState() {
  // Opções
  document.getElementById("opt-lang").value = state.options.lang;
  document.getElementById("opt-theme").value = state.options.theme;
  document.getElementById("chk-previous").checked = state.options.previous;
  document.getElementById("chk-other").checked = state.options.other;
  document.getElementById("chk-dbDetail").checked = state.options.dbDetail;
  document.getElementById("chk-regDetail").checked = state.options.regDetail;
  document.getElementById("chk-metaAnalysis").checked = state.options.metaAnalysis;

  // Visibilidade de cartões condicionais
  updateModuleVisibility();

  // Campos numéricos
  const numberFields = [
    'previous_studies', 'previous_reports', 'database_results', 'register_results',
    'website_results', 'organisation_results', 'citations_results',
    'duplicates', 'excluded_automatic', 'excluded_other',
    'records_screened', 'records_excluded',
    'dbr_sought_reports', 'dbr_notretrieved_reports', 'dbr_assessed',
    'other_sought_reports', 'other_notretrieved_reports', 'other_assessed',
    'new_studies', 'new_reports', 'total_studies', 'total_reports',
    'total_studies_ma', 'total_reports_ma'
  ];

  numberFields.forEach(field => {
    const el = document.getElementById(`inp-${field}`);
    if (el) {
      el.value = state.data[field] !== undefined ? state.data[field] : 0;
    }
  });
}

// ATUALIZAR VISIBILIDADE DE SEÇÕES CONDICIONAIS
function updateModuleVisibility() {
  const cardPrev = document.getElementById("card-previous");
  if (cardPrev) cardPrev.classList.toggle("hidden", !state.options.previous);

  const containerTotalStudies = document.getElementById("container-total-studies");
  if (containerTotalStudies) containerTotalStudies.classList.toggle("hidden", !state.options.previous);

  const containerOther = document.getElementById("container-other-methods");
  if (containerOther) containerOther.classList.toggle("hidden", !state.options.other);

  const secEligOther = document.getElementById("sec-elig-other");
  if (secEligOther) secEligOther.classList.toggle("hidden", !state.options.other);

  const containerDbs = document.getElementById("container-specific-dbs");
  if (containerDbs) containerDbs.classList.toggle("hidden", !state.options.dbDetail);

  const containerRegs = document.getElementById("container-specific-regs");
  if (containerRegs) containerRegs.classList.toggle("hidden", !state.options.regDetail);

  const containerMeta = document.getElementById("container-meta-analysis");
  if (containerMeta) containerMeta.classList.toggle("hidden", !state.options.metaAnalysis);
}

// RENDERIZAR LISTAS DINÂMICAS (BASES, REGISTROS, MOTIVOS)
function renderFormLists() {
  // 1. Bases de Dados
  const dbList = document.getElementById("db-list");
  if (dbList) {
    dbList.innerHTML = "";
    state.data.databases.forEach((db, idx) => {
      const row = document.createElement("div");
      row.className = "flex items-center space-x-2";
      row.innerHTML = `
        <input type="text" value="${escapeHtml(db.name)}" placeholder="Nome da base (ex: PubMed)" data-idx="${idx}" class="db-name-input flex-1 text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <input type="number" min="0" value="${db.count}" placeholder="Nº" data-idx="${idx}" class="db-count-input w-20 text-right text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <button type="button" data-idx="${idx}" class="btn-del-db p-1 text-slate-400 hover:text-rose-600 transition" title="Remover base">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      `;
      dbList.appendChild(row);
    });
  }

  // 2. Registros de Ensaios
  const regList = document.getElementById("reg-list");
  if (regList) {
    regList.innerHTML = "";
    state.data.registers.forEach((reg, idx) => {
      const row = document.createElement("div");
      row.className = "flex items-center space-x-2";
      row.innerHTML = `
        <input type="text" value="${escapeHtml(reg.name)}" placeholder="Nome do registro (ex: ReBec)" data-idx="${idx}" class="reg-name-input flex-1 text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <input type="number" min="0" value="${reg.count}" placeholder="Nº" data-idx="${idx}" class="reg-count-input w-20 text-right text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <button type="button" data-idx="${idx}" class="btn-del-reg p-1 text-slate-400 hover:text-rose-600 transition" title="Remover registro">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      `;
      regList.appendChild(row);
    });
  }

  // 3. Motivos de Exclusão de Bases
  const dbrList = document.getElementById("dbr-reasons-list");
  if (dbrList) {
    dbrList.innerHTML = "";
    state.data.dbr_reasons.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "flex items-center space-x-2";
      row.innerHTML = `
        <input type="text" value="${escapeHtml(item.reason)}" placeholder="Motivo da exclusão" data-idx="${idx}" class="dbr-reason-input flex-1 text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <input type="number" min="0" value="${item.count}" placeholder="Nº" data-idx="${idx}" class="dbr-count-input w-20 text-right text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none font-semibold text-rose-700">
        <button type="button" data-idx="${idx}" class="btn-del-dbr-reason p-1 text-slate-400 hover:text-rose-600 transition" title="Remover motivo">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      `;
      dbrList.appendChild(row);
    });
  }

  // 4. Motivos de Exclusão de Outras Fontes
  const otherList = document.getElementById("other-reasons-list");
  if (otherList) {
    otherList.innerHTML = "";
    state.data.other_reasons.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "flex items-center space-x-2";
      row.innerHTML = `
        <input type="text" value="${escapeHtml(item.reason)}" placeholder="Motivo da exclusão" data-idx="${idx}" class="other-reason-input flex-1 text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <input type="number" min="0" value="${item.count}" placeholder="Nº" data-idx="${idx}" class="other-count-input w-16 text-right text-xs border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none font-semibold text-rose-700">
        <button type="button" data-idx="${idx}" class="btn-del-other-reason p-1 text-slate-400 hover:text-rose-600 transition" title="Remover motivo">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      `;
      otherList.appendChild(row);
    });
  }
}

// CONFIGURAÇÃO DE TODOS OS EVENT LISTENERS
function setupEventListeners() {
  // Alteração de Idioma e Tema
  document.getElementById("opt-lang").addEventListener("change", (e) => {
    state.options.lang = e.target.value;
    autoSave();
    renderDiagram();
  });

  document.getElementById("opt-theme").addEventListener("change", (e) => {
    state.options.theme = e.target.value;
    autoSave();
    renderDiagram();
  });

  // Toggles de Módulos
  const toggles = [
    { id: "chk-previous", key: "previous" },
    { id: "chk-other", key: "other" },
    { id: "chk-dbDetail", key: "dbDetail" },
    { id: "chk-regDetail", key: "regDetail" },
    { id: "chk-metaAnalysis", key: "metaAnalysis" }
  ];

  toggles.forEach(({ id, key }) => {
    document.getElementById(id).addEventListener("change", (e) => {
      state.options[key] = e.target.checked;
      updateModuleVisibility();
      autoSave();
      renderDiagram();
    });
  });

  // Inputs numéricos simples
  const numberFields = [
    'previous_studies', 'previous_reports', 'database_results', 'register_results',
    'website_results', 'organisation_results', 'citations_results',
    'duplicates', 'excluded_automatic', 'excluded_other',
    'records_screened', 'records_excluded',
    'dbr_sought_reports', 'dbr_notretrieved_reports', 'dbr_assessed',
    'other_sought_reports', 'other_notretrieved_reports', 'other_assessed',
    'new_studies', 'new_reports', 'total_studies', 'total_reports',
    'total_studies_ma', 'total_reports_ma'
  ];

  numberFields.forEach(field => {
    const el = document.getElementById(`inp-${field}`);
    if (el) {
      el.addEventListener("input", (e) => {
        state.data[field] = parseInt(e.target.value, 10) || 0;
        autoSave();
        renderDiagram();
      });
    }
  });

  // Botões de Adicionar Linhas Dinâmicas
  document.getElementById("btn-add-db").addEventListener("click", () => {
    state.data.databases.push({ name: `Base ${state.data.databases.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-reg").addEventListener("click", () => {
    state.data.registers.push({ name: `Registro ${state.data.registers.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-dbr-reason").addEventListener("click", () => {
    state.data.dbr_reasons.push({ reason: `Motivo ${state.data.dbr_reasons.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  document.getElementById("btn-add-other-reason").addEventListener("click", () => {
    state.data.other_reasons.push({ reason: `Motivo ${state.data.other_reasons.length + 1}`, count: 0 });
    renderFormLists();
    autoSave();
    renderDiagram();
  });

  // Event Delegation para inputs e botões de deleção de listas dinâmicas
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("db-name-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.databases[idx].name = e.target.value;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("db-count-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.databases[idx].count = parseInt(e.target.value, 10) || 0;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("reg-name-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.registers[idx].name = e.target.value;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("reg-count-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.registers[idx].count = parseInt(e.target.value, 10) || 0;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("dbr-reason-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.dbr_reasons[idx].reason = e.target.value;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("dbr-count-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.dbr_reasons[idx].count = parseInt(e.target.value, 10) || 0;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("other-reason-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.other_reasons[idx].reason = e.target.value;
      autoSave();
      renderDiagram();
    } else if (e.target.classList.contains("other-count-input")) {
      const idx = e.target.getAttribute("data-idx");
      state.data.other_reasons[idx].count = parseInt(e.target.value, 10) || 0;
      autoSave();
      renderDiagram();
    }
  });

  document.addEventListener("click", (e) => {
    const btnDelDb = e.target.closest(".btn-del-db");
    if (btnDelDb) {
      const idx = btnDelDb.getAttribute("data-idx");
      state.data.databases.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelReg = e.target.closest(".btn-del-reg");
    if (btnDelReg) {
      const idx = btnDelReg.getAttribute("data-idx");
      state.data.registers.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelDbr = e.target.closest(".btn-del-dbr-reason");
    if (btnDelDbr) {
      const idx = btnDelDbr.getAttribute("data-idx");
      state.data.dbr_reasons.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
    const btnDelOther = e.target.closest(".btn-del-other-reason");
    if (btnDelOther) {
      const idx = btnDelOther.getAttribute("data-idx");
      state.data.other_reasons.splice(idx, 1);
      renderFormLists();
      autoSave();
      renderDiagram();
      return;
    }
  });

  // Botões de Cálculo Automático
  document.getElementById("btn-sum-dbs").addEventListener("click", () => {
    const sum = state.data.databases.reduce((acc, curr) => acc + (parseInt(curr.count, 10) || 0), 0);
    state.data.database_results = sum;
    document.getElementById("inp-database_results").value = sum;
    autoSave();
    renderDiagram();
    showToast(`Total de bases calculado: ${sum}`);
  });

  document.getElementById("btn-sum-regs").addEventListener("click", () => {
    const sum = state.data.registers.reduce((acc, curr) => acc + (parseInt(curr.count, 10) || 0), 0);
    state.data.register_results = sum;
    document.getElementById("inp-register_results").value = sum;
    autoSave();
    renderDiagram();
    showToast(`Total de registros calculado: ${sum}`);
  });

  document.getElementById("btn-calc-screened").addEventListener("click", () => {
    const totalIdent = (state.data.database_results || 0) + (state.data.register_results || 0);
    const totalRemoved = (state.data.duplicates || 0) + (state.data.excluded_automatic || 0) + (state.data.excluded_other || 0);
    const screened = Math.max(0, totalIdent - totalRemoved);
    state.data.records_screened = screened;
    document.getElementById("inp-records_screened").value = screened;
    autoSave();
    renderDiagram();
    showToast(`Registros triados calculados: ${screened}`);
  });

  // Controles de Zoom
  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    zoomLevel = Math.min(2.0, zoomLevel + 0.15);
    applyZoom();
  });
  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    zoomLevel = Math.max(0.4, zoomLevel - 0.15);
    applyZoom();
  });
  document.getElementById("btn-zoom-reset").addEventListener("click", () => {
    zoomLevel = 1.0;
    applyZoom();
  });

  // Modal Nuvem
  const cloudModal = document.getElementById("cloud-modal");
  document.getElementById("btn-cloud-modal").addEventListener("click", () => {
    prepareCloudModal();
    cloudModal.classList.remove("hidden");
  });
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    cloudModal.classList.add("hidden");
  });
  document.getElementById("btn-dismiss-modal").addEventListener("click", () => {
    cloudModal.classList.add("hidden");
  });

  // Copiar URL do Link Permanente
  document.getElementById("btn-copy-url").addEventListener("click", () => {
    const urlInput = document.getElementById("inp-cloud-url");
    urlInput.select();
    navigator.clipboard.writeText(urlInput.value).then(() => {
      document.getElementById("txt-copy-url").textContent = "Copiado!";
      setTimeout(() => {
        document.getElementById("txt-copy-url").textContent = "Copiar";
      }, 2000);
      showToast("Link permanente copiado para a área de transferência!");
    });
  });

  // Salvar/Carregar Nuvem com ID
  document.getElementById("btn-save-cloud").addEventListener("click", saveCloudById);
  document.getElementById("btn-load-cloud").addEventListener("click", loadCloudById);

  // Download e Upload de Arquivos
  document.getElementById("btn-download-json").addEventListener("click", downloadJsonProject);
  document.getElementById("inp-load-file").addEventListener("change", handleFileUpload);

  // Menu Exportar Dropdown
  const exportBtn = document.getElementById("btn-export-menu");
  const exportMenu = document.getElementById("export-menu");
  exportBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMenu.classList.toggle("hidden");
  });
  document.addEventListener("click", (e) => {
    if (!exportBtn.contains(e.target) && !exportMenu.contains(e.target)) {
      exportMenu.classList.add("hidden");
    }
  });

  // Ações de Exportação
  document.getElementById("btn-export-svg").addEventListener("click", () => {
    exportSvgFile();
    exportMenu.classList.add("hidden");
  });
  document.getElementById("btn-export-png").addEventListener("click", () => {
    exportPngFile();
    exportMenu.classList.add("hidden");
  });
  document.getElementById("btn-copy-png").addEventListener("click", () => {
    copyPngToClipboard();
    exportMenu.classList.add("hidden");
  });
  document.getElementById("btn-print-pdf").addEventListener("click", () => {
    window.print();
    exportMenu.classList.add("hidden");
  });
  document.getElementById("btn-export-csv").addEventListener("click", () => {
    exportCsvFile();
    exportMenu.classList.add("hidden");
  });

  // Botão Reset
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("Deseja realmente redefinir todos os dados para o padrão inicial do PRISMA 2020?")) {
      localStorage.removeItem("prisma2020_nathan_state");
      window.location.hash = "";
      location.reload();
    }
  });
}

function applyZoom() {
  const container = document.getElementById("diagram-container");
  if (container) {
    container.style.transform = `scale(${zoomLevel})`;
  }
}

// TOGGLE DAS SEÇÕES DO ACORDEÃO
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

// PREPARAR MODAL DE SALVAMENTO EM NUVEM
function prepareCloudModal() {
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(state));
  const fullUrl = `${window.location.origin}${window.location.pathname}#data=${compressed}`;
  document.getElementById("inp-cloud-url").value = fullUrl;
}

// TROCA DE ABAS DO MODAL
function switchModalTab(tab) {
  const tabs = ['url', 'cloud', 'file'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (t === tab) {
      btn.className = "modal-tab active-tab flex-1 py-3 text-center border-b-2 border-indigo-600 text-indigo-600 font-semibold";
      content.classList.remove("hidden");
    } else {
      btn.className = "modal-tab flex-1 py-3 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-semibold";
      content.classList.add("hidden");
    }
  });
}

// SALVAR NA NUVEM / ID LOCAL
function saveCloudById() {
  const idInput = document.getElementById("inp-cloud-id");
  const id = idInput.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  if (!id) {
    alert("Por favor, digite um ID para o seu projeto (ex: revisao-nathan)");
    return;
  }
  localStorage.setItem(`prisma2020_cloud_${id}`, JSON.stringify(state));
  const msg = document.getElementById("cloud-sync-msg");
  msg.className = "text-xs font-semibold text-emerald-600 block";
  msg.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Projeto salvo com sucesso com o ID: <strong>${id}</strong>!`;
  showToast(`Projeto salvo na nuvem com o ID: ${id}`);
}

// CARREGAR DA NUVEM / ID LOCAL
function loadCloudById() {
  const idInput = document.getElementById("inp-cloud-id");
  const id = idInput.value.trim().toLowerCase();
  if (!id) {
    alert("Por favor, digite o ID do projeto que deseja carregar.");
    return;
  }
  const saved = localStorage.getItem(`prisma2020_cloud_${id}`);
  if (saved) {
    try {
      const loaded = JSON.parse(saved);
      Object.assign(state.options, loaded.options);
      Object.assign(state.data, loaded.data);
      renderFormLists();
      syncUIFromState();
      renderDiagram();
      showToast(`Projeto '${id}' carregado com sucesso!`);
      document.getElementById("cloud-modal").classList.add("hidden");
    } catch (e) {
      alert("Erro ao decodificar projeto.");
    }
  } else {
    alert(`Nenhum projeto encontrado com o ID '${id}'. Verifique se digitou corretamente.`);
  }
}

// DOWNLOAD DO PROJETO EM FORMATO JSON
function downloadJsonProject() {
  const jsonStr = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PRISMA2020_${new Date().toISOString().slice(0, 10)}.prisma`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Arquivo do projeto baixado com sucesso!");
}

// PROCESSAR UPLOAD DE ARQUIVO (.JSON / .PRISMA / .CSV)
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
          showToast("Projeto importado com sucesso!");
          document.getElementById("cloud-modal").classList.add("hidden");
        }
      } catch (err) {
        alert("Arquivo inválido. Certifique-se de escolher um arquivo .json ou .prisma exportado desta ferramenta.");
      }
    };
    reader.readAsText(file);
  }
}

// PARSEADOR DE CSV COMPATÍVEL COM O PACOTE R PRISMA2020
function parsePrismaCsv(csvContent) {
  const lines = csvContent.split(/\r?\n/);
  if (lines.length < 2) return;
  
  lines.forEach(line => {
    // Parse simples de linha CSV respeitando aspas
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (parts.length >= 8) {
      const varName = parts[0].trim().replace(/^"|"$/g, '');
      const nVal = parts[7].trim().replace(/^"|"$/g, '');
      
      if (varName in state.data) {
        state.data[varName] = isNaN(nVal) ? nVal : parseInt(nVal, 10);
      }
      
      // Parse de bases específicas se houver (Database 1, 10; Database 2, 20)
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
  showToast("CSV do PRISMA importado com sucesso!");
  document.getElementById("cloud-modal").classList.add("hidden");
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

// EXPORTAÇÃO CSV COMPATÍVEL COM O R PRISMA2020
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
  showToast("CSV compatível com o PRISMA2020 exportado!");
}

// EXPORTAÇÃO EM FORMATO SVG VETORIAL
function exportSvgFile() {
  const svgEl = document.getElementById("prisma-svg");
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgEl);

  // Garantir namespaces
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PRISMA2020_Flowchart_${new Date().toISOString().slice(0, 10)}.svg`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("SVG Vetorial baixado com sucesso!");
}

// EXPORTAÇÃO EM FORMATO PNG (300 DPI / ALTA RESOLUÇÃO)
function exportPngFile() {
  generateCanvasBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PRISMA2020_Flowchart_300DPI_${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("PNG em Alta Resolução baixado com sucesso!");
  });
}

// COPIAR IMAGEM PARA ÁREA DE TRANSFERÊNCIA (CTRL + V NO WORD)
function copyPngToClipboard() {
  generateCanvasBlob((blob) => {
    try {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]).then(() => {
        showToast("Imagem copiada! Basta dar Ctrl + V no Word ou Docs.");
      }).catch(() => {
        alert("Seu navegador não suporta cópia direta de imagens. Use o botão de download PNG.");
      });
    } catch (e) {
      alert("Seu navegador não suporta cópia direta de imagens. Use o botão de download PNG.");
    }
  });
}

// AUXILIAR: RENDERIZAR SVG EM CANVAS COM ALTA RESOLUÇÃO (2X / 300 DPI)
function generateCanvasBlob(callback) {
  const svgEl = document.getElementById("prisma-svg");
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgEl);

  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const scale = 2.5; // Alta nitidez acadêmica
    const canvas = document.createElement("canvas");
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fundo branco limpo
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

// MOSTRAR TOAST NOTIFICATION
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

// UTILITÁRIO: ESCAPE HTML
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =========================================================================
// MOTOR DE RENDERIZAÇÃO VETORIAL SVG PRISMA 2020
// =========================================================================
function renderDiagram() {
  const svg = document.getElementById("prisma-svg");
  if (!svg) return;

  const t = i18n[state.options.lang] || i18n.pt;
  const th = themes[state.options.theme] || themes.official;

  // LARGURAS E ESPAÇAMENTOS DAS COLUNAS
  const stageColWidth = 32;
  const boxWidth = 270;
  const branchBoxWidth = 240;
  const colGap = 35;
  const rowGap = 32;

  // CÁLCULO DINÂMICO DE POSIÇÕES X DAS COLUNAS
  let currentX = 20;

  // Coluna de Rótulos Laterais (Identificação, Triagem, Incluídos)
  const stageX = currentX;
  currentX += stageColWidth + 12;

  // Coluna de Estudos Anteriores (se ativo)
  let prevColX = 0;
  if (state.options.previous) {
    prevColX = currentX;
    currentX += boxWidth + colGap;
  }

  // Coluna Central (Bases e Registros)
  const mainColX = currentX;
  const branchColX = mainColX + boxWidth + colGap;
  currentX = branchColX + branchBoxWidth + colGap;

  // Coluna de Outros Métodos (se ativo)
  let otherColX = 0;
  let otherBranchColX = 0;
  if (state.options.other) {
    otherColX = currentX;
    otherBranchColX = otherColX + boxWidth + colGap;
    currentX = otherBranchColX + branchBoxWidth + 20;
  } else {
    currentX += 10;
  }

  const totalWidth = Math.max(860, currentX);

  // ALTURAS DINÂMICAS DAS CAIXAS
  // 1. Identificação: Bases de dados
  let dbLines = [`${t.databases} (n = ${state.data.database_results || 0})`];
  if (state.options.dbDetail && state.data.databases.length > 0) {
    state.data.databases.forEach(db => {
      dbLines.push(`  • ${db.name}: ${db.count}`);
    });
  }
  if ((state.data.register_results > 0) || state.options.regDetail) {
    dbLines.push(`${t.registers} (n = ${state.data.register_results || 0})`);
    if (state.options.regDetail && state.data.registers.length > 0) {
      state.data.registers.forEach(reg => {
        dbLines.push(`  • ${reg.name}: ${reg.count}`);
      });
    }
  }

  // 2. Pré-triagem: Duplicatas e inelegíveis
  const removedLines = [
    `${t.duplicates} (n = ${state.data.duplicates || 0})`,
    `${t.auto_excluded} (n = ${state.data.excluded_automatic || 0})`,
    `${t.other_removed} (n = ${state.data.excluded_other || 0})`
  ];

  // 3. Elegibilidade: Motivos de exclusão
  const dbrExLines = [];
  if (state.data.dbr_reasons && state.data.dbr_reasons.length > 0) {
    state.data.dbr_reasons.forEach(r => {
      dbrExLines.push(`• ${r.reason} (n = ${r.count})`);
    });
  } else {
    dbrExLines.push(`• Motivo 1 (n = 0)`);
  }

  // 4. Outros Métodos: Motivos de exclusão
  const otherExLines = [];
  if (state.data.other_reasons && state.data.other_reasons.length > 0) {
    state.data.other_reasons.forEach(r => {
      otherExLines.push(`• ${r.reason} (n = ${r.count})`);
    });
  } else {
    otherExLines.push(`• Motivo 1 (n = 0)`);
  }

  // COORDENADAS Y DINÂMICAS POR FASES
  let yCursor = 30;

  // FASE 0: CABEÇALHOS SUPERIORES
  const headerHeight = 44;
  const headerY = yCursor;
  yCursor += headerHeight + 15;

  // FASE 1: IDENTIFICAÇÃO (Bases & Outras fontes)
  const identY = yCursor;
  const identHeight = Math.max(75, 45 + dbLines.length * 15);
  yCursor += identHeight + rowGap;

  // FASE 2: REMOVIDOS ANTES DA TRIAGEM & TRIAGEM DE REGISTROS
  const removedBoxHeight = 45 + removedLines.length * 15;
  const screenedBoxHeight = 55;
  const screenPhaseHeight = Math.max(removedBoxHeight, screenedBoxHeight);
  const screenY = yCursor;
  yCursor += screenPhaseHeight + rowGap;

  // FASE 3: RELATÓRIOS BUSCADOS & NÃO RECUPERADOS
  const soughtY = yCursor;
  const soughtHeight = 55;
  const notRetrievedHeight = 55;
  yCursor += soughtHeight + rowGap;

  // FASE 4: RELATÓRIOS AVALIADOS & MOTIVOS DE EXCLUSÃO
  const assessedY = yCursor;
  const assessedHeight = 55;
  const dbrExHeight = 35 + dbrExLines.length * 16;
  const otherExHeight = 35 + otherExLines.length * 16;
  const assessedPhaseHeight = Math.max(assessedHeight, dbrExHeight, otherExHeight);
  yCursor += assessedPhaseHeight + rowGap;

  // FASE 5: ESTUDOS INCLUÍDOS
  const includedY = yCursor;
  let incLines = [
    `${t.new_studies_inc} (n = ${state.data.new_studies || 0})`,
    `${t.new_reports_inc} (n = ${state.data.new_reports || 0})`
  ];
  if (state.options.previous) {
    incLines.push(
      `${t.total_studies_inc} (n = ${state.data.total_studies || 0})`,
      `${t.total_reports_inc} (n = ${state.data.total_reports || 0})`
    );
  }
  const incHeight = 35 + incLines.length * 16;
  yCursor += incHeight;

  // FASE 6: METANÁLISE (OPCIONAL)
  let metaHeight = 0;
  let metaY = 0;
  if (state.options.metaAnalysis) {
    yCursor += 25;
    metaY = yCursor;
    metaHeight = 65;
    yCursor += metaHeight;
  }

  const totalHeight = yCursor + 40;

  // ATUALIZAR DIMENSÕES DO SVG E DA INTERFACE
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", totalHeight);
  svg.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);

  const dimEl = document.getElementById("canvas-dimensions");
  if (dimEl) {
    dimEl.textContent = `${totalWidth} × ${totalHeight} px`;
  }

  // MONTAGEM DO CONTEÚDO SVG
  let elements = [];

  // 1. Definições de Marcadores (Setas)
  elements.push(`
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${th.arrowColor}" />
      </marker>
    </defs>
  `);

  // 2. Rótulos das Etapas Laterais (Identificação, Triagem, Incluídos)
  const stageIdentHeight = (screenY - headerY) - 10;
  const stageScreenHeight = (includedY - screenY) - 10;
  const stageIncHeight = (totalHeight - includedY) - 30;

  elements.push(drawStageBadge(stageX, headerY, stageColWidth, stageIdentHeight, t.stage_ident, th));
  elements.push(drawStageBadge(stageX, screenY, stageColWidth, stageScreenHeight, t.stage_screen, th));
  elements.push(drawStageBadge(stageX, includedY, stageColWidth, stageIncHeight, t.stage_inc, th));

  // 3. Estudos Anteriores (se ativo)
  if (state.options.previous) {
    // Cabeçalho de Estudos Anteriores
    elements.push(drawHeaderBox(prevColX, headerY, boxWidth, headerHeight, t.header_prev, th.headerPrevBg, th.headerPrevText));

    // Caixa de Estudos Anteriores
    const prevLines = [
      `${t.prev_studies_inc} (n = ${state.data.previous_studies || 0})`,
      `${t.prev_reports_inc} (n = ${state.data.previous_reports || 0})`
    ];
    const prevBoxHeight = 70;
    elements.push(drawBox(prevColX, identY, boxWidth, prevBoxHeight, prevLines, th));

    // Conector do cabeçalho para a caixa
    elements.push(drawArrow(prevColX + boxWidth / 2, headerY + headerHeight, prevColX + boxWidth / 2, identY, th.arrowColor));

    // Conector longo lateral em cotovelo de Estudos Anteriores até a caixa de Estudos Incluídos
    const prevBottomY = identY + prevBoxHeight;
    const incTargetY = includedY + incHeight / 2;
    elements.push(`
      <path d="M ${prevColX + boxWidth / 2} ${prevBottomY} L ${prevColX + boxWidth / 2} ${incTargetY} L ${mainColX} ${incTargetY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
    `);
  }

  // 4. COLUNA CENTRAL (BASES DE DADOS E REGISTROS)
  // Cabeçalho Amarelo / Goldenrod (ou cor do tema)
  const topHeaderWidth = boxWidth + branchBoxWidth + colGap;
  elements.push(drawHeaderBox(mainColX, headerY, topHeaderWidth, headerHeight, t.header_db, th.headerDbBg, th.headerDbText));

  // Conector vertical do cabeçalho para a Caixa 1
  elements.push(drawArrow(mainColX + boxWidth / 2, headerY + headerHeight, mainColX + boxWidth / 2, identY, th.arrowColor));

  // Caixa 1: Registros Identificados em Bases e Registros
  elements.push(drawBoxWithHeader(mainColX, identY, boxWidth, identHeight, t.rec_identified_from, dbLines, th));

  // Ramificação Direita: Registros Removidos antes da Triagem
  elements.push(drawBoxWithHeader(branchColX, screenY, branchBoxWidth, removedBoxHeight, t.removed_before_screening, removedLines, th));

  // Conector em Cotovelo para a caixa de Removidos antes da Triagem
  const identMidBottomY = identY + identHeight;
  const branchMidY = screenY + removedBoxHeight / 2;
  elements.push(`
    <path d="M ${mainColX + boxWidth / 2} ${identMidBottomY} L ${mainColX + boxWidth / 2} ${branchMidY} L ${branchColX} ${branchMidY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
  `);

  // Caixa 2: Registros Triados (Screened)
  const screenedLines = [`(n = ${state.data.records_screened || 0})`];
  elements.push(drawBoxWithHeader(mainColX, screenY, boxWidth, screenedBoxHeight, t.records_screened, screenedLines, th));

  // Seta de Identificação descendo para Registros Triados
  elements.push(drawArrow(mainColX + boxWidth / 2, identMidBottomY, mainColX + boxWidth / 2, screenY, th.arrowColor));

  // Ramificação Direita: Registros Excluídos
  const recExcludedLines = [`(n = ${state.data.records_excluded || 0})`];
  const recExcludedHeight = 55;
  elements.push(drawBoxWithHeader(branchColX, screenY + removedBoxHeight + 15, branchBoxWidth, recExcludedHeight, t.records_excluded, recExcludedLines, th));

  // Seta descendo para Reports Sought + Seta para Records Excluded
  const screenBottomY = screenY + screenedBoxHeight;
  const recExMidY = screenY + removedBoxHeight + 15 + recExcludedHeight / 2;
  elements.push(`
    <path d="M ${mainColX + boxWidth / 2} ${screenBottomY} L ${mainColX + boxWidth / 2} ${recExMidY} L ${branchColX} ${recExMidY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
  `);

  // Caixa 3: Relatórios Buscados para Recuperação (Sought)
  const soughtLines = [`(n = ${state.data.dbr_sought_reports || 0})`];
  elements.push(drawBoxWithHeader(mainColX, soughtY, boxWidth, soughtHeight, t.reports_sought, soughtLines, th));
  elements.push(drawArrow(mainColX + boxWidth / 2, screenBottomY, mainColX + boxWidth / 2, soughtY, th.arrowColor));

  // Ramificação Direita: Relatórios Não Recuperados
  const notRetrievedLines = [`(n = ${state.data.dbr_notretrieved_reports || 0})`];
  elements.push(drawBoxWithHeader(branchColX, soughtY, branchBoxWidth, notRetrievedHeight, t.reports_not_retrieved, notRetrievedLines, th));

  // Seta em cotovelo para Relatórios Não Recuperados
  const soughtBottomY = soughtY + soughtHeight;
  const notRetrievedMidY = soughtY + notRetrievedHeight / 2;
  elements.push(`
    <path d="M ${mainColX + boxWidth / 2} ${soughtBottomY} L ${mainColX + boxWidth / 2} ${notRetrievedMidY} L ${branchColX} ${notRetrievedMidY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
  `);

  // Caixa 4: Relatórios Avaliados para Elegibilidade (Assessed)
  const assessedLines = [`(n = ${state.data.dbr_assessed || 0})`];
  elements.push(drawBoxWithHeader(mainColX, assessedY, boxWidth, assessedHeight, t.reports_assessed, assessedLines, th));
  elements.push(drawArrow(mainColX + boxWidth / 2, soughtBottomY, mainColX + boxWidth / 2, assessedY, th.arrowColor));

  // Ramificação Direita: Relatórios Excluídos com Motivos Detalhados
  elements.push(drawBoxWithHeader(branchColX, assessedY, branchBoxWidth, dbrExHeight, t.reports_excluded, dbrExLines, th));

  // Seta em cotovelo para Relatórios Excluídos com Motivos
  const assessedBottomY = assessedY + assessedHeight;
  const dbrExMidY = assessedY + Math.min(45, dbrExHeight / 2);
  elements.push(`
    <path d="M ${mainColX + boxWidth / 2} ${assessedBottomY} L ${mainColX + boxWidth / 2} ${dbrExMidY} L ${branchColX} ${dbrExMidY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
  `);

  // Caixa 5: Estudos Incluídos (Included)
  elements.push(drawBox(mainColX, includedY, boxWidth, incHeight, incLines, th, true));
  elements.push(drawArrow(mainColX + boxWidth / 2, assessedBottomY, mainColX + boxWidth / 2, includedY, th.arrowColor));

  // Caixa 6: Metanálise (Opcional)
  if (state.options.metaAnalysis) {
    const metaLines = [
      `${t.ma_studies_inc} (n = ${state.data.total_studies_ma || 0})`,
      `${t.ma_reports_inc} (n = ${state.data.total_reports_ma || 0})`
    ];
    elements.push(drawBox(mainColX, metaY, boxWidth, metaHeight, metaLines, th));
    elements.push(drawArrow(mainColX + boxWidth / 2, includedY + incHeight, mainColX + boxWidth / 2, metaY, th.arrowColor));
  }

  // 5. COLUNA DE OUTROS MÉTODOS (SE ATIVO)
  if (state.options.other) {
    const topOtherWidth = boxWidth + branchBoxWidth + colGap;
    // Cabeçalho de Outros Métodos
    elements.push(drawHeaderBox(otherColX, headerY, topOtherWidth, headerHeight, t.header_other, th.headerOtherBg, th.headerOtherText));
    elements.push(drawArrow(otherColX + boxWidth / 2, headerY + headerHeight, otherColX + boxWidth / 2, identY, th.arrowColor));

    // Caixa A: Registros Identificados em Outras Fontes
    const otherLines = [
      `${t.websites} (n = ${state.data.website_results || 0})`,
      `${t.organisations} (n = ${state.data.organisation_results || 0})`,
      `${t.citations} (n = ${state.data.citations_results || 0})`
    ];
    elements.push(drawBoxWithHeader(otherColX, identY, boxWidth, identHeight, t.rec_identified_from, otherLines, th));

    // Caixa B: Relatórios Buscados em Outras Fontes
    const otherSoughtLines = [`(n = ${state.data.other_sought_reports || 0})`];
    elements.push(drawBoxWithHeader(otherColX, soughtY, boxWidth, soughtHeight, t.reports_sought, otherSoughtLines, th));
    elements.push(drawArrow(otherColX + boxWidth / 2, identY + identHeight, otherColX + boxWidth / 2, soughtY, th.arrowColor));

    // Ramificação Direita: Não recuperados de Outras Fontes
    const otherNotRetrievedLines = [`(n = ${state.data.other_notretrieved_reports || 0})`];
    elements.push(drawBoxWithHeader(otherBranchColX, soughtY, branchBoxWidth, notRetrievedHeight, t.reports_not_retrieved, otherNotRetrievedLines, th));

    const otherSoughtBottomY = soughtY + soughtHeight;
    const otherNotRetrievedMidY = soughtY + notRetrievedHeight / 2;
    elements.push(`
      <path d="M ${otherColX + boxWidth / 2} ${otherSoughtBottomY} L ${otherColX + boxWidth / 2} ${otherNotRetrievedMidY} L ${otherBranchColX} ${otherNotRetrievedMidY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
    `);

    // Caixa C: Relatórios Avaliados de Outras Fontes
    const otherAssessedLines = [`(n = ${state.data.other_assessed || 0})`];
    elements.push(drawBoxWithHeader(otherColX, assessedY, boxWidth, assessedHeight, t.reports_assessed, otherAssessedLines, th));
    elements.push(drawArrow(otherColX + boxWidth / 2, otherSoughtBottomY, otherColX + boxWidth / 2, assessedY, th.arrowColor));

    // Ramificação Direita: Motivos de Exclusão de Outras Fontes
    elements.push(drawBoxWithHeader(otherBranchColX, assessedY, branchBoxWidth, otherExHeight, t.reports_excluded, otherExLines, th));

    const otherAssessedBottomY = assessedY + assessedHeight;
    const otherExMidY = assessedY + Math.min(45, otherExHeight / 2);
    elements.push(`
      <path d="M ${otherColX + boxWidth / 2} ${otherAssessedBottomY} L ${otherColX + boxWidth / 2} ${otherExMidY} L ${otherBranchColX} ${otherExMidY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
    `);

    // Conector de Outros Métodos até a Caixa Central de Estudos Incluídos
    const otherTargetY = includedY + incHeight / 2;
    elements.push(`
      <path d="M ${otherColX + boxWidth / 2} ${otherAssessedBottomY} L ${otherColX + boxWidth / 2} ${otherTargetY} L ${mainColX + boxWidth} ${otherTargetY}" fill="none" stroke="${th.arrowColor}" stroke-width="1.6" marker-end="url(#arrow)" />
    `);
  }

  svg.innerHTML = elements.join("\n");
}

// AUXILIARES DE DESENHO SVG
function drawHeaderBox(x, y, w, h, text, bg, color) {
  return `
    <g class="header-box">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${bg}" stroke="#334155" stroke-width="1.2" />
      <text x="${x + w / 2}" y="${y + h / 2 + 4}" fill="${color}" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">
        ${escapeHtml(text)}
      </text>
    </g>
  `;
}

function drawBoxWithHeader(x, y, w, h, headerText, lines, th) {
  let textElements = [];
  const startY = y + 20;

  // Título da Caixa (em negrito)
  textElements.push(`
    <text x="${x + 12}" y="${startY}" fill="${th.textColor}" font-size="11.5" font-weight="700" font-family="system-ui, -apple-system, sans-serif">
      ${escapeHtml(headerText)}
    </text>
  `);

  // Linhas de Conteúdo
  lines.forEach((line, i) => {
    textElements.push(`
      <text x="${x + 12}" y="${startY + 18 + i * 16}" fill="${th.subtextColor}" font-size="11" font-weight="500" font-family="system-ui, -apple-system, sans-serif">
        ${escapeHtml(line)}
      </text>
    `);
  });

  return `
    <g class="prisma-box">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${th.boxBg}" stroke="${th.boxBorder}" stroke-width="1.3" />
      ${textElements.join("\n")}
    </g>
  `;
}

function drawBox(x, y, w, h, lines, th, isHighlight = false) {
  let textElements = [];
  const startY = y + 22;

  lines.forEach((line, i) => {
    const isMain = isHighlight || i === 0;
    textElements.push(`
      <text x="${x + w / 2}" y="${startY + i * 18}" fill="${th.textColor}" font-size="11.5" font-weight="${isMain ? '700' : '500'}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">
        ${escapeHtml(line)}
      </text>
    `);
  });

  return `
    <g class="prisma-box">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${th.boxBg}" stroke="${th.boxBorder}" stroke-width="${isHighlight ? '1.8' : '1.3'}" />
      ${textElements.join("\n")}
    </g>
  `;
}

function drawStageBadge(x, y, w, h, label, th) {
  return `
    <g class="stage-badge">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${th.stageBadgeBg}" />
      <text x="${x + w / 2 + 4}" y="${y + h / 2}" fill="${th.stageBadgeText}" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="2" transform="rotate(-90 ${x + w / 2} ${y + h / 2})" font-family="system-ui, -apple-system, sans-serif">
        ${escapeHtml(label)}
      </text>
    </g>
  `;
}

function drawArrow(x1, y1, x2, y2, color) {
  return `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.6" marker-end="url(#arrow)" />
  `;
}
