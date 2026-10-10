# Client Intelligence Portal & Deliverable System Memory

## 1. Project & Repository Identity
- **Active Client Project:** Foundation Repair Pros of Joplin (`foundationrepairprosofjoplin.com`)
- **Repository:** `jingeniero06-cloud/foundation-repair-pros-of-joplin`
- **Live Deployment:** `https://jingeniero06-cloud.github.io/foundation-repair-pros-of-joplin/`
- **Master Registry:** `C:\Users\My PC\.gemini\antigravity\scratch\projects\PROJECTS_REGISTRY.md`
- **Hosting / CI/CD:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), continuous deployment on every push to `main` with `.nojekyll` enabled.

---

## 2. Client Profile & Forensic SEO Findings
- **Client Domain:** `https://foundationrepairprosofjoplin.com/`
- **Industry Silo:** Residential & Commercial Foundation Repair, Underpinning, Waterproofing
- **Primary Market:** Joplin, MO, Jasper County, Newton County & Surrounding Four-States Area
- **Audited URLs:** 31 live endpoints mapped across 19 services and 5 local service towns
- **Composite Score:** **48 / 100** (Urgent / Warning Tier)
- **Top 3 Fatal Vulnerabilities (High-Ticket Pitch Lever):**
  1. *Severe Geo-Mismatch:* Homepage `<title>` and H1 target **Bolivar, MO** (90 miles northeast of Joplin).
  2. *External Lead Bleed:* Conversion CTA buttons directly link to `https://bolivarfoundationrepair.com/...` with `target="_blank"`, losing Joplin homeowner bids.
  3. *Broken Technical Elements:* Origin 404 on `local-sitemap.xml`, truncated meta description (`Call us today at.`), and staging page `/google-setup/` indexed publicly.

---

## 3. Design System & Aesthetic Standards (Northline Luxury Tier)
- **Heading Typography:** `Fraunces` (Serif, variable optical sizing `9..144`, weights 400, 500, 600)
- **Body & UI Typography:** `Inter` (Sans-serif, system fallbacks, weights 400, 500, 600, 700, 800)
- **Color Palette:**
  - Obsidian Dark: `#0b1220` (`--ink`), Slate Surface `#131d31`, Midnight Navy `#111a2e`
  - Pure Paper: `#f8fafc` (`--paper`), Muted Sand `#f1f5f9` (`--paper-2`), White `#ffffff`
  - Regal Champagne Gold: `#c9a35b` (`--gold`), Light Gold `#e3c48a` (`--gold-2`)
  - Warning / Alert: Coral Red `#ef4444`, Warm Amber `#d97706`, Success Emerald `#10b981`
- **Header & Navbar Rules:**
  - Single-line navigation with `white-space: nowrap !important;`
  - Fixed link height (`38px`) with `display: inline-flex; align-items: center; justify-content: center;`
  - Active indicator: champagne subtle tint with border (`rgba(201, 163, 91, 0.12)`, `rgba(201, 163, 91, 0.32)`)
  - CTA Button: Deep obsidian text (`#0b1220 !important; font-weight: 700;`) on radiant gold gradient with zero text wrapping
  - Breakpoints: Responsive tightening at 1120px; collapsible mobile drawer at ≤960px

---

## 4. The 6 Core Deliverables in the Ecosystem
1. **Executive Overview (`index.html`):**
   - 48/100 Composite Rating in warning coral/amber
   - Emergency Geo-Mismatch Alert Banner & Fatal Vulnerabilities Breakdown
   - 7 Contractor Pillars & Competitor Benchmark (Groundworks, Thrasher, Joplin Foundation Repair)
   - Certified Foundation Inspection lead capture modal
2. **Forensic Crawl Database Explorer (`audit.html`):**
   - 31-page deterministic crawl corpus of `foundationrepairprosofjoplin.com`
   - Real-time client-side search, filtering (status, depth, meta, H1, TTFB), and sorting
   - Page-level technical modal & 4-phase remediation roadmap
   - Direct 1-click CSV & JSON export
3. **White-Hat Institutional Backlinks CRM (`backlinks.html`):**
   - 15 verified high-authority targets (.gov, .edu, SOMO REALTORS, HBA SWMO, Joplin Globe, KOAM News Now)
   - Real Domain Rating (DR), monthly organic reach, and verified departmental emails
   - 1-Click Tailored Pitch Launcher with copy to clipboard and `mailto:` dispatch
   - Zero PBNs / Zero casino / Zero spam guarantee
4. **2026 Joplin Geotechnical Field Guide (`blog.html`):**
   - 2,400-word publication-ready engineering guide
   - Covers Ozark karst soils, Baxter/Clarksville cherty clay, Tri-State mining void subsidence, steel push vs. helical piers, and Joplin Chapter 26 building permits
   - 2 custom dark-mode SVG geotechnical engineering charts
5. **Interactive Geotechnical Diagnostic Calculators (`calculators.html`):**
   - Steel Push Pier Depth & Soil Load Estimator (calibrated for Ozark soils & bedrock depth)
   - Hydrostatic Basement Wall Bowing Deflection Diagnostic (IRC R404 structural limits)
6. **Executive Deliverables & Engineering Archive (`downloads.html`):**
   - Direct machine-readable JSON datasets: `downloads/joplin_audit_31_urls.json` & `downloads/joplin_backlinks_targets.json`
   - Print-to-PDF ready views for executive presentation

---

## 5. Client Agency Playbook & Reusable Architecture
- Every client inquiry receives a deterministic forensic crawl, actionable data matrix, custom engineering/compliance calculators, and interactive link CRM.
- Projects are scaffolded into `projects/<client-slug>` using `scaffold-new-client.py` and tracked in `projects/PROJECTS_REGISTRY.md`.
- Automated deployment to GitHub Pages via GitHub Actions provides instant live client links.
