// ==========================================================================
// Admin Task Dashboard Engine (GoMega + ClickUp / MeisterTask Hybrid)
// Dual-Engine: Enterprise Agency Kanban Board & Multi-Client Task Manager
// ==========================================================================

const STORAGE_KEY = 'gomega_admin_tasks_v1';

// Preset Color Mappings for Client Logos/Badges
const CLIENT_COLORS = {
  'Foundation Repair Pros of Joplin': { bg: '#e9880b', text: '#0b1c22', letter: 'F' },
  'Bay Management Group': { bg: '#2563eb', text: '#ffffff', letter: 'B' },
  'GAMA Insurance Agency LLC': { bg: '#ef4444', text: '#ffffff', letter: 'G' },
  'Specialty Roofing Inc': { bg: '#f97316', text: '#ffffff', letter: 'S' },
  'The Charles Chateau': { bg: '#8b5cf6', text: '#ffffff', letter: 'T' },
  'Infinite Wellness': { bg: '#10b981', text: '#ffffff', letter: 'I' },
  'Hardscape.com': { bg: '#0284c7', text: '#ffffff', letter: 'H' },
  'LevelWorks Construct & Renovate': { bg: '#7c3aed', text: '#ffffff', letter: 'L' },
  'Approach Tours': { bg: '#dc2626', text: '#ffffff', letter: 'A' },
  'Harmony 783': { bg: '#d97706', text: '#ffffff', letter: 'H' },
  'Hoxton Planning & Management LLC': { bg: '#059669', text: '#ffffff', letter: 'H' },
  'S-Cube Fixtures': { bg: '#475569', text: '#ffffff', letter: 'S' },
  'Warden AI': { bg: '#ec4899', text: '#ffffff', letter: 'W' },
  'All Florida Permits': { bg: '#0891b2', text: '#ffffff', letter: 'A' },
  'Minwax': { bg: '#b91c1c', letter: 'M', text: '#ffffff' },
  'Spark Byte': { bg: '#16a34a', letter: 'S', text: '#ffffff' },
  'JobPack': { bg: '#ca8a04', letter: 'J', text: '#ffffff' },
  'Hubsh': { bg: '#ea580c', letter: 'H', text: '#ffffff' }
};

// Default Real-World Agency Tasks Dataset (Matching GoMega + ClickUp Screenshots)
const DEFAULT_TASKS = [
  // --- IN PROGRESS ---
  {
    id: 'TASK-101',
    title: 'Remediate Bolivar, MO H1 mismatch and restore Joplin Local Map Pack #1 rank',
    client: 'Foundation Repair Pros of Joplin',
    status: 'in-progress',
    category: 'Technical SEO',
    priority: 'P0',
    dueDate: 'Today, 5:00 PM',
    assignee: 'Myself',
    tags: ['geo-remediation', 'urgent'],
    description: 'Replace Bolivar, MO reference in homepage H1 with Joplin, MO. Update Google Business Profile coordinates and local schema to eliminate Map Pack suppression.',
    checklist: [
      { text: 'Update index.html H1 heading and meta title', done: true },
      { text: 'Inject LocalBusiness GeoCoordinates JSON-LD', done: true },
      { text: 'Request Google Search Console re-indexing', done: false }
    ],
    comments: 4
  },
  {
    id: 'TASK-102',
    title: 'Sever external CTA redirect leak to bolivarfoundationrepair.com',
    client: 'Foundation Repair Pros of Joplin',
    status: 'in-progress',
    category: 'Conversion',
    priority: 'P0',
    dueDate: 'Today, 6:30 PM',
    assignee: 'Myself',
    tags: ['leak-fix', 'lead-loss'],
    description: 'Header and footer buttons on live WordPress domain redirect traffic to a competing/sister domain in Bolivar. Repoint all CTAs to Joplin internal contact modal.',
    checklist: [
      { text: 'Audit all 31 live crawl pages for external hrefs', done: true },
      { text: 'Implement internal certified inspection modal', done: true },
      { text: 'Verify phone number routing to (417) 555-0192', done: false }
    ],
    comments: 2
  },
  {
    id: 'TASK-103',
    title: 'Pitch 15 Four-States civic & .gov/.edu backlinks (City of Joplin, MSSU)',
    client: 'Foundation Repair Pros of Joplin',
    status: 'in-progress',
    category: 'Outreach',
    priority: 'P1',
    dueDate: 'Tomorrow',
    assignee: 'Myself',
    tags: ['white-hat', 'backlinks-crm'],
    description: 'Dispatch customized outreach pitches to City of Joplin contractor portal, Jasper County, MSSU Off-Campus housing, and SOMO REALTORS.',
    checklist: [
      { text: 'Vetted 15 regional targets in backlinks CRM', done: true },
      { text: 'Drafted tailored white-hat outreach copy', done: true },
      { text: 'Dispatch first batch of 5 civic pitches', done: false }
    ],
    comments: 1
  },

  // --- NOT STARTED ---
  {
    id: 'TASK-201',
    title: 'Review robots.txt, add instructions for LLMs if not already present',
    client: 'GAMA Insurance Agency LLC',
    status: 'not-started',
    category: 'Technical SEO',
    priority: 'P2',
    dueDate: 'May 22, 10:20 PM',
    assignee: 'Myself',
    tags: ['ai-readiness', 'robots.txt'],
    description: 'Ensure GPTBot, ClaudeBot, and PerplexityBot are permitted to crawl insurance knowledge resources without blocking user privacy directories.',
    checklist: [
      { text: 'Fetch live robots.txt', done: false },
      { text: 'Add Allow directives for AI agent search bots', done: false },
      { text: 'Deploy llms.txt summary for LLM citation engine', done: false }
    ],
    comments: 0
  },
  {
    id: 'TASK-202',
    title: 'Add structured data (schema markup) to Insurance service pages',
    client: 'GAMA Insurance Agency LLC',
    status: 'not-started',
    category: 'On-Page SEO',
    priority: 'P4',
    dueDate: '7 months ago',
    assignee: 'Myself',
    tags: ['schema-json-ld'],
    description: 'Implement InsuranceAgency and Service schema on Commercial, Auto, and Homeowners insurance sub-pages to trigger Google rich snippets.',
    checklist: [
      { text: 'Draft schema markup templates', done: false },
      { text: 'Validate via Schema.org validator', done: false }
    ],
    comments: 1
  },
  {
    id: 'TASK-203',
    title: 'Fix: Resource loading errors',
    client: 'GAMA Insurance Agency LLC',
    status: 'not-started',
    category: 'Technical SEO',
    priority: 'P20',
    dueDate: '5 months ago',
    assignee: 'Team',
    tags: ['http-errors'],
    description: 'CDN CSS and font files intermittently returning HTTP 403 on edge network.',
    checklist: [],
    comments: 0
  },
  {
    id: 'TASK-204',
    title: 'Submit 10DLC application for SMS notifications',
    client: 'Specialty Roofing Inc',
    status: 'not-started',
    category: 'Conversion',
    priority: 'P50',
    dueDate: 'Oct 10, 10:04 AM',
    assignee: 'Myself',
    tags: ['compliance', '10dlc'],
    description: 'Register Brand and Campaign on The Campaign Registry (TCR) to enable customer appointment reminder SMS.',
    checklist: [
      { text: 'EIN and business address verification', done: false },
      { text: 'Sample SMS opt-in workflow screenshots', done: false }
    ],
    comments: 2
  },
  {
    id: 'TASK-205',
    title: 'Update privacy policy, terms & opt-in',
    client: 'The Charles Chateau',
    status: 'not-started',
    category: 'Conversion',
    priority: 'P10',
    dueDate: 'Jul 16, 12:08 AM',
    assignee: 'Myself',
    tags: ['legal-policy'],
    description: 'Add mandatory SMS opt-in disclosure statement and privacy policy clause.',
    checklist: [],
    comments: 0
  },
  {
    id: 'TASK-206',
    title: 'Submit 10DLC application',
    client: 'The Charles Chateau',
    status: 'not-started',
    category: 'Conversion',
    priority: 'P50',
    dueDate: 'Jul 16, 12:08 AM',
    assignee: 'Myself',
    tags: ['compliance'],
    description: 'Submit Brand registration after privacy policy update.',
    checklist: [],
    comments: 0
  },
  {
    id: 'TASK-207',
    title: 'Update privacy policy, terms & opt-in',
    client: 'Infinite Wellness',
    status: 'not-started',
    category: 'Conversion',
    priority: 'P10',
    dueDate: 'Jul 23, 10:25 PM',
    assignee: 'Myself',
    tags: ['legal-policy'],
    description: 'Review healthcare SMS privacy disclaimer.',
    checklist: [],
    comments: 0
  },
  {
    id: 'TASK-208',
    title: 'Submit 10DLC application',
    client: 'Infinite Wellness',
    status: 'not-started',
    category: 'Conversion',
    priority: 'P50',
    dueDate: 'Jul 23, 10:25 PM',
    assignee: 'Myself',
    tags: ['compliance'],
    description: 'Submit healthcare wellness brand registration.',
    checklist: [],
    comments: 0
  },

  // --- BLOCKED ---
  {
    id: 'TASK-301',
    title: 'Fix: Broken links across knowledge base',
    client: 'Hubsh',
    status: 'blocked',
    category: 'Technical SEO',
    priority: 'P50',
    dueDate: '9 months ago',
    assignee: 'Myself',
    tags: ['broken-links', 'seo-blocked-tasks'],
    description: 'Blocked waiting on client IT department to grant Cloudflare DNS and staging access.',
    checklist: [
      { text: 'Awaiting client admin credentials', done: false }
    ],
    comments: 5
  },
  {
    id: 'TASK-302',
    title: 'Review robots.txt, add instructions for LLMs if not already present',
    client: 'JobPack',
    status: 'blocked',
    category: 'Technical SEO',
    priority: 'P2',
    dueDate: '8 months ago',
    assignee: 'Myself',
    tags: ['seo-blocked-tasks'],
    description: 'Blocked pending confirmation from security officer regarding proprietary technical documentation scraping.',
    checklist: [],
    comments: 3
  },
  {
    id: 'TASK-303',
    title: 'Review robots.txt, add instructions for LLMs if not already present',
    client: 'Spark Byte',
    status: 'blocked',
    category: 'Technical SEO',
    priority: 'P2',
    dueDate: '8 months ago',
    assignee: 'Myself',
    tags: ['seo-blocked-tasks'],
    description: 'Awaiting GitHub repo merge permissions.',
    checklist: [],
    comments: 1
  },
  {
    id: 'TASK-304',
    title: 'Add Structured Data (Schema Markup) to Key Pages',
    client: 'Minwax',
    status: 'blocked',
    category: 'On-Page SEO',
    priority: 'P2',
    dueDate: '8 months ago',
    assignee: 'Myself',
    tags: ['seo-blocked-tasks', 'schema'],
    description: 'Awaiting approval from corporate brand governance team for Product Schema JSON-LD.',
    checklist: [],
    comments: 2
  },
  {
    id: 'TASK-305',
    title: 'Fix Indexing Issues on Core Porcelain Paver Pages',
    client: 'Hardscape.com',
    status: 'blocked',
    category: 'Technical SEO',
    priority: 'P1',
    dueDate: '8 months ago',
    assignee: 'Myself',
    tags: ['indexation', 'canonical'],
    description: 'Canonical tag pointing to staging domain causing Google Search Console index exclusion.',
    checklist: [
      { text: 'Identify incorrect staging URLs in sitemap', done: true },
      { text: 'Client CMS locked pending Shopify migration', done: false }
    ],
    comments: 4
  },
  {
    id: 'TASK-306',
    title: 'Add Structured Data Schema to Product and Service Pages',
    client: 'Hardscape.com',
    status: 'blocked',
    category: 'On-Page SEO',
    priority: 'P5',
    dueDate: '8 months ago',
    assignee: 'Myself',
    tags: ['schema'],
    description: 'Blocked waiting on Shopify dev sandbox access.',
    checklist: [],
    comments: 1
  },
  {
    id: 'TASK-307',
    title: 'Resolve Duplicate Content Issues (216 Pages)',
    client: 'Hardscape.com',
    status: 'blocked',
    category: 'On-Page SEO',
    priority: 'P1',
    dueDate: '8 months ago',
    assignee: 'Myself',
    tags: ['duplicate-content'],
    description: 'Faceted navigation generating 216 uncrawled parameter variations.',
    checklist: [],
    comments: 2
  },

  // --- NEEDS REVIEW ---
  {
    id: 'TASK-401',
    title: 'Fix: Broken resources & CSS mime types',
    client: 'Approach Tours',
    status: 'needs-review',
    category: 'Technical SEO',
    priority: 'P20',
    dueDate: '8 months ago',
    assignee: 'Team',
    tags: ['qa-ready'],
    description: 'Asset headers updated to text/css. Awaiting client QA verification on production server.',
    checklist: [
      { text: 'Verify NGINX mime types configuration', done: true },
      { text: 'Purge Fastly cache', done: true },
      { text: 'Client sign-off', done: false }
    ],
    comments: 2
  },
  {
    id: 'TASK-402',
    title: 'Improve Core Web Vitals (INP < 150ms, LCP < 2.0s)',
    client: 'Harmony 783',
    status: 'needs-review',
    category: 'Technical SEO',
    priority: 'P1',
    dueDate: '4 months ago',
    assignee: 'Myself',
    tags: ['web-vitals', 'crx-data'],
    description: 'Implemented font preloading and deferred non-critical analytics JS. CrUX 28-day field data ready for review.',
    checklist: [
      { text: 'Compress hero WebP images', done: true },
      { text: 'Defer third-party tracking scripts', done: true },
      { text: 'Measure field INP in GA4', done: true }
    ],
    comments: 6
  },
  {
    id: 'TASK-403',
    title: 'Fix 404 local sitemap endpoint on Joplin root domain',
    client: 'Foundation Repair Pros of Joplin',
    status: 'needs-review',
    category: 'Technical SEO',
    priority: 'P1',
    dueDate: 'Yesterday',
    assignee: 'Myself',
    tags: ['sitemap-404', 'joplin-remediation'],
    description: 'The root domain had a broken local-sitemap.xml 404 error. Generated and verified clean XML index pointing to all 31 core URLs.',
    checklist: [
      { text: 'Compile 31 verified URL list', done: true },
      { text: 'Generate valid sitemap.xml with lastmod dates', done: true },
      { text: 'Submit to Google Search Console', done: false }
    ],
    comments: 3
  },

  // --- COMPLETED ---
  {
    id: 'TASK-501',
    title: 'Remove all mentions of SCUBA from equipment catalog',
    client: 'S-Cube Fixtures',
    status: 'completed',
    category: 'Content',
    priority: 'P-10',
    dueDate: 'Jan 21, 7:21 PM',
    assignee: 'Myself',
    tags: ['content-cleanup'],
    description: 'Removed legacy scuba retail fixture pages and 301-redirected URLs to commercial retail display category.',
    checklist: [
      { text: 'Crawl 45 scuba fixtures URLs', done: true },
      { text: 'Add 301 redirects to .htaccess', done: true },
      { text: 'Re-index via GSC', done: true }
    ],
    comments: 1
  },
  {
    id: 'TASK-502',
    title: 'Fix broken blog/article links on hoxtonpm.com',
    client: 'Hoxton Planning & Management LLC',
    status: 'completed',
    category: 'Technical SEO',
    priority: 'P-10',
    dueDate: 'Apr 12, 12:39 AM',
    assignee: 'Myself',
    tags: ['links-fixed'],
    description: 'Fixed 34 broken internal links pointing to old WordPress categories.',
    checklist: [
      { text: 'Export broken link audit', done: true },
      { text: 'Update database permalinks', done: true }
    ],
    comments: 0
  },
  {
    id: 'TASK-503',
    title: 'LevelWorks – Add Blog button to header nav (right of Services) linking to /blog',
    client: 'LevelWorks Construct & Renovate',
    status: 'completed',
    category: 'Technical SEO',
    priority: 'P-50',
    dueDate: 'Apr 24, 1:21 AM',
    assignee: 'Myself',
    tags: ['header-nav'],
    description: 'Injected responsive blog button in primary sticky navigation bar.',
    checklist: [
      { text: 'Update desktop nav menu', done: true },
      { text: 'Update mobile drawer navigation', done: true }
    ],
    comments: 1
  },
  {
    id: 'TASK-504',
    title: 'LevelWorks – Configure + submit XML sitemap in MEGA app',
    client: 'LevelWorks Construct & Renovate',
    status: 'completed',
    category: 'XML Sitemap Subm',
    priority: 'P-30',
    dueDate: 'Apr 21, 7:43 PM',
    assignee: 'Myself',
    tags: ['sitemap-ping'],
    description: 'Configured automated XML sitemap ping to Google and Bing.',
    checklist: [],
    comments: 0
  },
  {
    id: 'TASK-505',
    title: 'HUMAN: Publish Warden AI Cornerstone Article (Automated Flow)',
    client: 'Warden AI',
    status: 'completed',
    category: 'Article Update',
    priority: 'P-10',
    dueDate: 'Apr 23, 12:09 PM',
    assignee: 'Myself',
    tags: ['cornerstone', 'human-edited'],
    description: 'Completed editorial review and pushed cornerstone AI guardrails article live.',
    checklist: [
      { text: 'Fact-check 12 citations', done: true },
      { text: 'Generate high-res social OG cards', done: true },
      { text: 'Publish on CMS', done: true }
    ],
    comments: 4
  },
  {
    id: 'TASK-506',
    title: 'AFP – Add FAQPage JSON-LD to 3 WP Posts (Pages 1, 2, 4) – Churn Risk',
    client: 'All Florida Permits',
    status: 'completed',
    category: 'Technical SEO',
    priority: 'P-10',
    dueDate: 'Apr 24, 8:05 PM',
    assignee: 'Myself',
    tags: ['churn-risk', 'schema'],
    description: 'Injected FAQPage schema with 10 questions covering Florida building permits.',
    checklist: [
      { text: 'Validate on Google Rich Results tool', done: true }
    ],
    comments: 2
  },
  {
    id: 'TASK-507',
    title: 'Deploy Basement Wall Deflection & Pier Depth Geotechnical Calculators',
    client: 'Foundation Repair Pros of Joplin',
    status: 'completed',
    category: 'Engineering',
    priority: 'P1',
    dueDate: 'Apr 25, 4:15 PM',
    assignee: 'Myself',
    tags: ['calculators-engine', 'interactive'],
    description: 'Built interactive geotechnical calculators for Joplin cherty clay soils: Underpinning Pier Depth & Count Estimator plus Hydrostatic Wall Deflection Diagnostic.',
    checklist: [
      { text: 'Calibrate Ozark limestone bedrock algorithms', done: true },
      { text: 'Implement real-time price range & steel footage outputs', done: true },
      { text: 'Connect 1-click lead capture modal dispatch', done: true }
    ],
    comments: 3
  },
  {
    id: 'TASK-508',
    title: 'Publish Karst Topography & Historic Mining Subsidence 2026 Field Guide',
    client: 'Foundation Repair Pros of Joplin',
    status: 'completed',
    category: 'Content',
    priority: 'P2',
    dueDate: 'Apr 26, 11:30 AM',
    assignee: 'Myself',
    tags: ['field-guide', 'high-authority'],
    description: 'Penned comprehensive geotechnical article covering Tri-State lead/zinc mining tunnels, Baxter cherty soils, and steel push pier engineering.',
    checklist: [
      { text: 'Review NRCS soil survey data for Jasper County', done: true },
      { text: 'Format with answer-first and high-contrast callouts', done: true }
    ],
    comments: 1
  },
  {
    id: 'TASK-509',
    title: 'Implement Automated Rent Collection & Lead Routing Schema',
    client: 'Bay Management Group',
    status: 'completed',
    category: 'Technical SEO',
    priority: 'P1',
    dueDate: 'Apr 27, 2:40 PM',
    assignee: 'Myself',
    tags: ['bmg-intelligence', 'schema'],
    description: 'Deployed RealEstateAgent and ApartmentComplex schema across Baltimore, Philadelphia, and Northern Virginia property hubs.',
    checklist: [
      { text: 'Validate Schema.org entity relationships', done: true },
      { text: 'Verify lead attribution webhooks', done: true }
    ],
    comments: 2
  }
];

// App State
let tasksState = [];
let currentView = 'board'; // 'board' or 'list'
let currentCustomer = 'all';
let currentAssignee = 'myself';
let currentSearch = '';
let currentPriorityFilter = 'all';
let autoRefreshActive = false;
let autoRefreshTimer = null;
let autoRefreshCountdown = 30;
let draggedTaskId = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  initEventListeners();
  renderApp();
});

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      tasksState = JSON.parse(saved);
    } catch (e) {
      tasksState = [...DEFAULT_TASKS];
    }
  } else {
    tasksState = [...DEFAULT_TASKS];
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksState));
}

function initEventListeners() {
  // Sidebar Toggle
  const sidebarToggle = document.getElementById('sidebarToggleBtn');
  const sidebar = document.getElementById('appSidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  // View Switcher (Board vs List)
  const btnBoardView = document.getElementById('btnBoardView');
  const btnListView = document.getElementById('btnListView');
  if (btnBoardView && btnListView) {
    btnBoardView.addEventListener('click', () => switchView('board'));
    btnListView.addEventListener('click', () => switchView('list'));
  }

  // Customer Filter
  const customerSelect = document.getElementById('customerFilterSelect');
  if (customerSelect) {
    customerSelect.addEventListener('change', (e) => {
      currentCustomer = e.target.value;
      renderApp();
    });
  }

  // Assignee Filter
  const assigneeSelect = document.getElementById('assigneeFilterSelect');
  if (assigneeSelect) {
    assigneeSelect.addEventListener('change', (e) => {
      currentAssignee = e.target.value;
      renderApp();
    });
  }

  // Live Search
  const searchInput = document.getElementById('taskSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderApp();
    });
  }

  // Keyboard shortcut Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  // Auto 30s Refresh Toggle
  const autoRefreshBtn = document.getElementById('autoRefreshBtn');
  if (autoRefreshBtn) {
    autoRefreshBtn.addEventListener('click', toggleAutoRefresh);
  }

  // Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Add Task Buttons
  const btnNewTask = document.getElementById('btnNewTask');
  if (btnNewTask) {
    btnNewTask.addEventListener('click', () => openNewTaskModal());
  }

  // Modals Close Handlers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  // CSV Export
  const btnExportCsv = document.getElementById('btnExportCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportTasksCsv);
  }

  // CSV Import (Upload)
  const btnUploadCsv = document.getElementById('btnUploadCsv');
  const csvFileInput = document.getElementById('csvFileInput');
  if (btnUploadCsv && csvFileInput) {
    btnUploadCsv.addEventListener('click', () => csvFileInput.click());
    csvFileInput.addEventListener('change', handleCsvUpload);
  }

  // Reset to Defaults
  const btnResetDefaults = document.getElementById('btnResetDefaults');
  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', () => {
      if (confirm('Restore all default client tasks from GoMega and ClickUp?')) {
        tasksState = [...DEFAULT_TASKS];
        saveTasks();
        renderApp();
        showToast('Restored 25 default agency tasks!');
      }
    });
  }

  // Setup Drag & Drop Handlers on Columns
  setupDragAndDrop();
}

function switchView(view) {
  currentView = view;
  const boardViewEl = document.getElementById('kanbanBoardView');
  const listViewEl = document.getElementById('taskListView');
  const btnBoard = document.getElementById('btnBoardView');
  const btnList = document.getElementById('btnListView');

  if (view === 'board') {
    boardViewEl?.classList.remove('hidden');
    listViewEl?.classList.remove('active');
    btnBoard?.classList.add('active');
    btnList?.classList.remove('active');
  } else {
    boardViewEl?.classList.add('hidden');
    listViewEl?.classList.add('active');
    btnBoard?.classList.remove('active');
    btnList?.classList.add('active');
  }
  renderApp();
}

function toggleAutoRefresh() {
  const btn = document.getElementById('autoRefreshBtn');
  autoRefreshActive = !autoRefreshActive;

  if (autoRefreshActive) {
    btn?.classList.add('active');
    autoRefreshCountdown = 30;
    btn.innerText = `⟳ Auto: ${autoRefreshCountdown}s`;
    autoRefreshTimer = setInterval(() => {
      autoRefreshCountdown--;
      if (autoRefreshCountdown <= 0) {
        autoRefreshCountdown = 30;
        renderApp();
        showToast('Auto-refreshed tasks from client queue');
      }
      if (btn) btn.innerText = `⟳ Auto: ${autoRefreshCountdown}s`;
    }, 1000);
  } else {
    btn?.classList.remove('active');
    if (btn) btn.innerText = '⟳ Auto 30s: Off';
    clearInterval(autoRefreshTimer);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('gomega_theme', target);
  showToast(`Switched to ${target === 'dark' ? 'Petroleum Blueprint' : 'Clean Light'} theme`);
}

function getFilteredTasks() {
  return tasksState.filter(task => {
    // 1. Customer Filter
    if (currentCustomer !== 'all' && task.client !== currentCustomer) {
      return false;
    }
    // 2. Assignee Filter
    if (currentAssignee === 'myself' && task.assignee !== 'Myself') {
      return false;
    }
    // 3. Search text
    if (currentSearch) {
      const textMatch = task.title.toLowerCase().includes(currentSearch) ||
                        task.client.toLowerCase().includes(currentSearch) ||
                        (task.category || '').toLowerCase().includes(currentSearch) ||
                        (task.priority || '').toLowerCase().includes(currentSearch) ||
                        (task.description || '').toLowerCase().includes(currentSearch);
      if (!textMatch) return false;
    }
    return true;
  });
}

function renderApp() {
  const filtered = getFilteredTasks();
  if (currentView === 'board') {
    renderBoardView(filtered);
  } else {
    renderListView(filtered);
  }
  updateGlobalCounters(filtered);
}

function updateGlobalCounters(filtered) {
  const cols = ['not-started', 'in-progress', 'blocked', 'failed', 'needs-review', 'completed'];
  cols.forEach(status => {
    const count = filtered.filter(t => t.status === status).length;
    const badge = document.getElementById(`count-${status}`);
    if (badge) badge.textContent = count;
  });
}

// --------------------------------------------------------------------------
// KANBAN BOARD VIEW RENDERER
// --------------------------------------------------------------------------
function renderBoardView(filtered) {
  const cols = [
    { id: 'not-started', container: 'cards-not-started' },
    { id: 'in-progress', container: 'cards-in-progress' },
    { id: 'blocked', container: 'cards-blocked' },
    { id: 'failed', container: 'cards-failed' },
    { id: 'needs-review', container: 'cards-needs-review' },
    { id: 'completed', container: 'cards-completed' }
  ];

  cols.forEach(({ id, container }) => {
    const el = document.getElementById(container);
    if (!el) return;

    const columnTasks = filtered.filter(t => t.status === id);
    if (columnTasks.length === 0) {
      el.innerHTML = `<div class="column-empty-state">No tasks in this stage</div>`;
      return;
    }

    el.innerHTML = columnTasks.map(t => renderTaskCard(t)).join('');
  });

  // Re-attach card events
  document.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked a sub-button
      if (e.target.closest('button') || e.target.closest('a')) return;
      openTaskDetailModal(card.dataset.taskId);
    });
  });
}

function renderTaskCard(t) {
  const clientInfo = CLIENT_COLORS[t.client] || { bg: '#64748b', text: '#ffffff', letter: t.client.charAt(0) };
  
  // Category tag classes
  let tagClass = 'tag-tech-seo';
  const cat = (t.category || '').toLowerCase();
  if (cat.includes('on-page')) tagClass = 'tag-onpage-seo';
  else if (cat.includes('conversion')) tagClass = 'tag-conversion';
  else if (cat.includes('sitemap')) tagClass = 'tag-sitemap';
  else if (cat.includes('content') || cat.includes('article')) tagClass = 'tag-content';
  else if (cat.includes('engineering') || cat.includes('outreach')) tagClass = 'tag-engineering';

  // Checklist computation
  const checklist = t.checklist || [];
  const completedChecklist = checklist.filter(c => c.done).length;
  const checklistHtml = checklist.length > 0 ? `
    <div class="checklist-progress" title="${completedChecklist}/${checklist.length} checklist items complete">
      <span>${completedChecklist}/${checklist.length}</span>
      <div class="checklist-bar-bg">
        <div class="checklist-bar-fill" style="width: ${Math.round((completedChecklist / checklist.length) * 100)}%;"></div>
      </div>
    </div>
  ` : '';

  return `
    <div class="task-card" draggable="true" data-task-id="${t.id}">
      <div class="task-client-badge">
        <span class="client-icon" style="background:${clientInfo.bg}; color:${clientInfo.text};">
          ${clientInfo.letter}
        </span>
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:210px;">${t.client}</span>
      </div>

      <div class="task-card-title">${escapeHtml(t.title)}</div>

      <div class="task-meta-row">
        <span class="tag-badge ${tagClass}">${t.category || 'General'}</span>
        <span class="priority-code ${t.priority === 'P0' ? 'priority-urgent' : ''}">${t.priority || 'P2'}</span>
        ${(t.tags || []).slice(0, 1).map(tag => `<span class="tag-badge" style="background:var(--bg-app); color:var(--text-dim); border-color:var(--border-subtle);">${tag}</span>`).join('')}
      </div>

      <div class="task-card-footer">
        <div class="task-date-info">
          <span>🕒</span>
          <span>${t.dueDate || 'No due date'}</span>
        </div>
        ${checklistHtml}
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// DRAG AND DROP HANDLERS (HTML5 Drag & Drop)
// --------------------------------------------------------------------------
function setupDragAndDrop() {
  const columns = document.querySelectorAll('.kanban-column');

  columns.forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });

    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });

    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const targetStatus = col.dataset.status;
      if (!draggedTaskId || !targetStatus) return;

      const task = tasksState.find(t => t.id === draggedTaskId);
      if (task && task.status !== targetStatus) {
        task.status = targetStatus;
        saveTasks();
        renderApp();
        showToast(`Moved "${task.title.substring(0, 30)}..." to ${formatStatusName(targetStatus)}`);
      }
    });
  });
}

function handleDragStart(e) {
  draggedTaskId = this.dataset.taskId;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', draggedTaskId);
}

function handleDragEnd() {
  this.classList.remove('dragging');
  draggedTaskId = null;
  document.querySelectorAll('.kanban-column').forEach(c => c.classList.remove('drag-over'));
}

// --------------------------------------------------------------------------
// LIST VIEW (CLICKUP STYLE TABLE)
// --------------------------------------------------------------------------
function renderListView(filtered) {
  const tbody = document.getElementById('taskListTbody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:48px; color:var(--text-muted);">
          No tasks matching the selected filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(t => {
    const clientInfo = CLIENT_COLORS[t.client] || { bg: '#64748b', text: '#ffffff', letter: t.client.charAt(0) };
    const statusPill = getStatusPill(t.status);

    return `
      <tr>
        <td style="width: 40px; text-align: center;">
          <input type="checkbox" ${t.status === 'completed' ? 'checked' : ''} onchange="toggleTaskComplete('${t.id}', this.checked)">
        </td>
        <td style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); width: 85px;">
          ${t.id}
        </td>
        <td>
          <a href="javascript:void(0)" onclick="openTaskDetailModal('${t.id}')" style="font-weight:600; color:var(--text-main); text-decoration:none;">
            ${escapeHtml(t.title)}
          </a>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <span class="client-icon" style="background:${clientInfo.bg}; color:${clientInfo.text}; width:16px; height:16px; font-size:0.6rem;">${clientInfo.letter}</span>
            <span style="font-size:0.82rem; font-weight:600;">${t.client}</span>
          </div>
        </td>
        <td>${statusPill}</td>
        <td>
          <span class="priority-code ${t.priority === 'P0' ? 'priority-urgent' : ''}">${t.priority || 'P2'}</span>
        </td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${t.dueDate || '—'}</td>
      </tr>
    `;
  }).join('');
}

function getStatusPill(status) {
  const names = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'blocked': 'Blocked',
    'failed': 'Failed',
    'needs-review': 'Needs Review',
    'completed': 'Completed'
  };
  const classes = {
    'not-started': 'background:#f1f5f9; color:#475569;',
    'in-progress': 'background:#e0f2fe; color:#0369a1;',
    'blocked': 'background:#fee2e2; color:#b91c1c;',
    'failed': 'background:#fef2f2; color:#991b1b;',
    'needs-review': 'background:#fef3c7; color:#b45309;',
    'completed': 'background:#d1fae5; color:#065f46;'
  };
  return `<span style="display:inline-block; padding:3px 10px; border-radius:999px; font-size:0.75rem; font-weight:700; ${classes[status]}">${names[status]}</span>`;
}

window.toggleTaskComplete = function(id, isChecked) {
  const task = tasksState.find(t => t.id === id);
  if (task) {
    task.status = isChecked ? 'completed' : 'in-progress';
    saveTasks();
    renderApp();
    showToast(isChecked ? `Marked "${task.title.substring(0, 24)}..." as Completed` : 'Reopened task');
  }
};

// --------------------------------------------------------------------------
// TASK DETAIL MODAL (CLICKUP STYLE INSPECTOR)
// --------------------------------------------------------------------------
window.openTaskDetailModal = function(taskId) {
  const task = tasksState.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('taskDetailModal');
  const titleEl = document.getElementById('detailTaskTitle');
  const clientEl = document.getElementById('detailTaskClient');
  const statusEl = document.getElementById('detailTaskStatus');
  const priorityEl = document.getElementById('detailTaskPriority');
  const descEl = document.getElementById('detailTaskDesc');
  const checklistContainer = document.getElementById('detailChecklistContainer');

  if (titleEl) titleEl.innerText = task.title;
  if (clientEl) clientEl.innerText = task.client;
  if (statusEl) statusEl.value = task.status;
  if (priorityEl) priorityEl.value = task.priority || 'P2';
  if (descEl) descEl.value = task.description || '';

  // Render Checklists
  renderModalChecklist(task);

  // Status change handler
  if (statusEl) {
    statusEl.onchange = () => {
      task.status = statusEl.value;
      saveTasks();
      renderApp();
      showToast(`Updated status to ${formatStatusName(task.status)}`);
    };
  }

  // Priority change handler
  if (priorityEl) {
    priorityEl.onchange = () => {
      task.priority = priorityEl.value;
      saveTasks();
      renderApp();
    };
  }

  // Description change handler
  if (descEl) {
    descEl.onblur = () => {
      task.description = descEl.value;
      saveTasks();
    };
  }

  // Delete button
  const deleteBtn = document.getElementById('btnDeleteTask');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      if (confirm(`Delete task "${task.title}"?`)) {
        tasksState = tasksState.filter(t => t.id !== task.id);
        saveTasks();
        modal.classList.remove('active');
        document.body.style.overflow = '';
        renderApp();
        showToast('Task deleted successfully');
      }
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function renderModalChecklist(task) {
  const container = document.getElementById('detailChecklistContainer');
  if (!container) return;

  const checklist = task.checklist || [];
  if (checklist.length === 0) {
    container.innerHTML = `
      <div style="font-size:0.84rem; color:var(--text-muted); font-style:italic;">
        No subtasks defined yet. Add a subtask below.
      </div>
    `;
  } else {
    container.innerHTML = checklist.map((item, idx) => `
      <div class="checklist-item ${item.done ? 'done' : ''}">
        <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleChecklistItem('${task.id}', ${idx}, this.checked)">
        <span style="flex:1; font-size:0.88rem;">${escapeHtml(item.text)}</span>
        <button style="border:none; background:transparent; cursor:pointer; color:var(--text-dim);" onclick="removeChecklistItem('${task.id}', ${idx})">✕</button>
      </div>
    `).join('');
  }
}

window.toggleChecklistItem = function(taskId, idx, isDone) {
  const task = tasksState.find(t => t.id === taskId);
  if (task && task.checklist && task.checklist[idx]) {
    task.checklist[idx].done = isDone;
    saveTasks();
    renderModalChecklist(task);
    renderApp();
  }
};

window.removeChecklistItem = function(taskId, idx) {
  const task = tasksState.find(t => t.id === taskId);
  if (task && task.checklist) {
    task.checklist.splice(idx, 1);
    saveTasks();
    renderModalChecklist(task);
    renderApp();
  }
};

window.addChecklistItem = function() {
  const input = document.getElementById('newChecklistInput');
  const text = (input?.value || '').trim();
  if (!text) return;

  const titleEl = document.getElementById('detailTaskTitle');
  const task = tasksState.find(t => t.title === titleEl?.innerText);
  if (task) {
    if (!task.checklist) task.checklist = [];
    task.checklist.push({ text, done: false });
    input.value = '';
    saveTasks();
    renderModalChecklist(task);
    renderApp();
  }
};

// --------------------------------------------------------------------------
// NEW TASK MODAL
// --------------------------------------------------------------------------
window.openNewTaskModal = function(preselectedStatus = 'not-started') {
  const modal = document.getElementById('newTaskModal');
  const statusSelect = document.getElementById('newStatus');
  if (statusSelect) statusSelect.value = preselectedStatus;
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

const newTaskForm = document.getElementById('newTaskForm');
if (newTaskForm) {
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('newTitle')?.value.trim();
    const client = document.getElementById('newClient')?.value;
    const category = document.getElementById('newCategory')?.value;
    const priority = document.getElementById('newPriority')?.value;
    const status = document.getElementById('newStatus')?.value;
    const dueDate = document.getElementById('newDueDate')?.value.trim() || 'Tomorrow';
    const description = document.getElementById('newDescription')?.value.trim();

    if (!title || !client) return;

    const newTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title,
      client,
      status: status || 'not-started',
      category: category || 'Technical SEO',
      priority: priority || 'P1',
      dueDate,
      assignee: 'Myself',
      tags: ['user-created'],
      description,
      checklist: [],
      comments: 0
    };

    tasksState.unshift(newTask);
    saveTasks();
    newTaskForm.reset();
    document.getElementById('newTaskModal')?.classList.remove('active');
    document.body.style.overflow = '';
    renderApp();
    showToast(`Created new task: "${title.substring(0, 24)}..."`);
  });
}

// --------------------------------------------------------------------------
// CSV EXPORT & IMPORT
// --------------------------------------------------------------------------
function exportTasksCsv() {
  if (tasksState.length === 0) {
    alert('No tasks to export');
    return;
  }

  const headers = ['Task_ID', 'Title', 'Client', 'Status', 'Category', 'Priority', 'Due_Date', 'Assignee', 'Description'];
  const rows = tasksState.map(t => [
    t.id,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    `"${(t.client || '').replace(/"/g, '""')}"`,
    t.status,
    t.category,
    t.priority,
    `"${(t.dueDate || '').replace(/"/g, '""')}"`,
    t.assignee,
    `"${(t.description || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gomega-admin-tasks-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Exported ${tasksState.length} tasks to CSV!`);
}

function handleCsvUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target.result;
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length <= 1) throw new Error('File has no data rows');

      let importedCount = 0;
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length >= 4) {
          const title = parts[1].replace(/^"|"$/g, '').trim();
          const client = parts[2].replace(/^"|"$/g, '').trim();
          const status = parts[3].trim() || 'not-started';
          if (title && client) {
            tasksState.push({
              id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
              title,
              client,
              status,
              category: parts[4] || 'Technical SEO',
              priority: parts[5] || 'P2',
              dueDate: parts[6] ? parts[6].replace(/^"|"$/g, '') : 'Imported',
              assignee: 'Myself',
              tags: ['csv-import'],
              description: parts[8] ? parts[8].replace(/^"|"$/g, '') : '',
              checklist: []
            });
            importedCount++;
          }
        }
      }

      saveTasks();
      renderApp();
      showToast(`Imported ${importedCount} tasks from CSV!`);
    } catch (err) {
      alert('Could not parse CSV file. Ensure valid headers.');
    }
  };
  reader.readAsText(file);
}

// --------------------------------------------------------------------------
// UTILITIES
// --------------------------------------------------------------------------
function formatStatusName(status) {
  const map = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'blocked': 'Blocked',
    'failed': 'Failed',
    'needs-review': 'Needs Review',
    'completed': 'Completed'
  };
  return map[status] || status;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function showToast(msg) {
  let toast = document.getElementById('adminToastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> <span>${escapeHtml(msg)}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
