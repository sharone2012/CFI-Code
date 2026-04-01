# CFI Deep Tech — Complete Project Folder Structure

**Date:** April 1, 2026
**Vercel Account:** sharone2012 (cfideeptech team)
**Trial expires:** ~11 days

---

## VERCEL PROJECTS (2)

| Vercel Project | Domain | GitHub Repo | Branch |
|---|---|---|---|
| **cfideeptech** | cfideeptech.vercel.app (+1 custom) | `sharone2012/happy-react-bundle` | `main` |
| **happy-react-bundle** | happy-react-bundle.vercel.app | `sharone2012/happy-react-bundle` | `main` |

> Both Vercel projects deploy from the **same repo** (`happy-react-bundle`).
> `cfideeptech` is the active one (41 edge requests). `happy-react-bundle` has 0 requests (likely a duplicate).

---

## GITHUB REPOS (5)

| # | Repo | Language | Purpose | Linked to Vercel? |
|---|------|----------|---------|-------------------|
| 1 | **happy-react-bundle** | HTML/JS/TS | Main app — Vite + React + Supabase (Lovable) | YES (both projects) |
| 2 | **CFI-Code** | JavaScript | Backend API, components, docs, SQL | NO |
| 3 | **CFI** | Python | Private repo | NO |
| 4 | **web-site-final-draft** | HTML | Processing Line 1-Pagers, S1 Pre-Processing designs | NO |
| 5 | **CFI-Frontend-Dashboard-** | — | CFI Application Front End | NO |

---

## REPO 1: happy-react-bundle (VERCEL-LINKED)

**Tech Stack:** Vite + React 18 + TypeScript + Tailwind CSS + Shadcn/UI + Supabase + Recharts
**Built with:** Lovable

### Vercel Config (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/s3", "destination": "/s3.html" },
    { "source": "/((?!.*\\.html$).*)", "destination": "/" }
  ]
}
```

### Routes (from `src/main.tsx`)
```
/                                    → App.jsx (main dashboard with S0–S6 tabs)
/lab                                 → LabAnalysisV2.jsx
/s3                                  → S3Landing.jsx (via vercel rewrite → s3.html)
/s3/a-bio-library                    → S3ABioLibrary.jsx
/s1-index                            → S1CapexOpex.jsx
/s1-capex-opex                       → S1CapexOpex.jsx
/s1-efb-ascii                        → S1EfbAscii.jsx
/s1-opdc-ascii                       → S1OpdcAscii.jsx
/s1-pos-ascii                        → S1PosAscii.jsx
/s1-efb-spec                         → S1EfbSpec.jsx
/s1-opdc-spec                        → S1OpdcSpec.jsx
/s1-pos-spec                         → S1PosSpec.jsx
/s1-combined                         → S1Combined.jsx
/s1-floor-efb                        → S1FloorPlanEfb.jsx
/s1-floor-opdc                       → S1FloorPlanOpdc.jsx
/s1-floor-pos                        → S1FloorPlanPos.jsx
/s0-residue-select                   → S0ResidueSelector.jsx
/s1-engineering                      → S1Engineering.jsx
/CFI_AG_Management_Planning_Calculator → AG Management Calculator
```

### Full Folder Structure
```
happy-react-bundle/
├── vercel.json                          # Vercel routing config
├── package.json                         # Dependencies (Vite + React + Shadcn)
├── index.html                           # Vite entry point
├── s3.html                              # Standalone S3 page (served at /s3)
├── vite.config.ts                       # Vite build config
├── tailwind.config.ts                   # Tailwind CSS config
├── tsconfig.json                        # TypeScript config
├── components.json                      # Shadcn/UI config
├── eslint.config.js                     # ESLint config
├── postcss.config.js                    # PostCSS config
├── playwright.config.ts                 # E2E test config
├── vitest.config.ts                     # Unit test config
├── .env                                 # Environment variables (Supabase keys)
│
├── src/
│   ├── main.tsx                         # React entry + all routes
│   ├── App.jsx                          # MAIN DASHBOARD (S0–S6 tabs, ~5000+ lines)
│   ├── App.css                          # Global styles
│   ├── index.css                        # Tailwind imports
│   ├── LoginPage.jsx                    # Login page
│   ├── s3-entry.jsx                     # S3 standalone entry
│   │
│   ├── # ── S0 FILES (Site Inputs / Residue) ──
│   ├── CFI_S0_Page.jsx                  # Full S0 page (standalone)
│   ├── CFI_S0_Redesign.jsx              # S0 redesign version
│   ├── LOVABLE_S0_REDESIGN.txt          # S0 redesign spec
│   │
│   ├── # ── CALCULATORS & TOOLS ──
│   ├── CFI_AG_Management_Planning_Calculator.jsx
│   ├── CFI_Bio_Database_Manager_v2.jsx
│   ├── CFI_Data_Upload_Pipeline.jsx
│   ├── CFI_EFB_DM_Calc.jsx
│   ├── CFI_OPDC_DM_Calc.jsx
│   ├── CFI_POS_DM_v4.jsx
│   ├── CFI_POME_DM_Calculator_v3.jsx
│   ├── CFI_GH_Calculator.jsx
│   ├── CFI_NPK_Value_Dashboard.jsx
│   ├── CFI_Nutrient_Ledger.jsx
│   ├── CFI_S1S2_Calculator.jsx
│   ├── CFI_SoilAcidity_Lookup.jsx
│   ├── CFI_SoilBio_Viz_v3.jsx
│   ├── CFI_Soil_Calculator_v4_PUBLISHED.jsx
│   ├── CFI_Stage_Lab_Display_v2.jsx
│   ├── CFI_Final_Lab_Display.jsx
│   ├── CFI_Treatment_Optimizer.jsx
│   │
│   ├── pages/                           # Route pages
│   │   ├── Index.tsx                    # Home/landing
│   │   ├── NotFound.tsx                 # 404
│   │   ├── SiteSetup.jsx               # Site setup wizard
│   │   ├── S0ResidueSelector.jsx        # S0 Residue Selector (/s0-residue-select)
│   │   ├── S1Index.jsx                  # S1 Index
│   │   ├── S1CapexOpex.jsx              # S1 CAPEX/OPEX calculator
│   │   ├── S1Combined.jsx              # S1 Combined view
│   │   ├── S1Engineering.jsx           # S1 Engineering
│   │   ├── S1EfbAscii.jsx             # S1 EFB ASCII flow
│   │   ├── S1OpdcAscii.jsx            # S1 OPDC ASCII flow
│   │   ├── S1PosAscii.jsx             # S1 POS ASCII flow
│   │   ├── S1EfbSpec.jsx              # S1 EFB Spec sheet
│   │   ├── S1OpdcSpec.jsx             # S1 OPDC Spec sheet
│   │   ├── S1PosSpec.jsx              # S1 POS Spec sheet
│   │   ├── S1FloorPlanEfb.jsx         # S1 Floor plan EFB
│   │   ├── S1FloorPlanOpdc.jsx        # S1 Floor plan OPDC
│   │   ├── S1FloorPlanPos.jsx         # S1 Floor plan POS
│   │   ├── S3.jsx                      # S3 Biologicals
│   │   ├── S3Landing.jsx              # S3 Landing page
│   │   ├── S3ABioLibrary.jsx          # S3 Bio Library
│   │   ├── LabAnalysis.jsx            # Lab Analysis v1
│   │   └── LabAnalysisV2.jsx          # Lab Analysis v2 (/lab)
│   │
│   ├── components/                      # Reusable components
│   │   ├── CFI_S0_SectionAB.jsx        # S0 Sections A & B
│   │   ├── CFI_S0_SectionC.jsx         # S0 Section C
│   │   ├── CFI_S0_SectionC_MillResults.jsx  # S0 Section C Mill Results
│   │   ├── CFI_S0_SectionD.jsx         # S0 Section D
│   │   ├── CFI_Soil_Science_Module.jsx
│   │   ├── CFI_SoilAcidity_ProfileCard.jsx
│   │   ├── CFI_SourceRegistry_Button.jsx
│   │   ├── CFI_ValueCalculator.jsx
│   │   ├── CFI_PriceRefreshBadge.jsx
│   │   ├── S1EngineeringComplete.jsx
│   │   ├── S1SpecPanel.jsx
│   │   ├── NavLink.tsx
│   │   ├── UnitInput.jsx
│   │   └── ui/                          # Shadcn/UI components (40+ files)
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       ├── toast.tsx
│   │       └── ... (36 more)
│   │
│   ├── contexts/
│   │   └── MillContext.tsx               # Global mill/site context
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx               # Mobile detection hook
│   │   └── use-toast.ts                 # Toast notification hook
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts                # Supabase client init
│   │       └── types.ts                 # Auto-generated DB types
│   │
│   ├── lib/
│   │   ├── supabase.ts                  # Supabase helper
│   │   └── utils.ts                     # Utility functions (cn, etc.)
│   │
│   └── test/
│       ├── setup.ts                     # Test setup
│       └── example.test.ts              # Example test
│
├── public/                              # Static HTML pages (served directly)
│   ├── # ── S0 ──
│   ├── CFI_S0_Master_Reference_v3.html
│   │
│   ├── # ── S1 ENGINEERING ──
│   ├── CFI_S1_ALL_DESIGNS.html
│   ├── CFI_S1_ASCII_FLOWS_COMPLETE.html
│   ├── CFI_S1_CONTROL_PANEL.html
│   ├── CFI_S1_Combined_v2.html
│   ├── CFI_S1_EFB_Process_Engineering_Ascii.html
│   ├── CFI_S1_EFB_Processing_Line_1Pager.html
│   ├── CFI_S1_Master_Tracker.html
│   ├── CFI_S1_OPDC_Process_Engineering_Ascii.html
│   ├── CFI_S1_OPDC_Processing_Line_1Pager.html
│   ├── CFI_S1_POS_Process_Engineering_Ascii.html
│   ├── CFI_S1_POS_Processing_Line_1Pager.html
│   ├── CFI_S1_Processing_Lines_Complete.html
│   ├── CFI_S1_Structure_Map.html
│   │
│   ├── # ── S3 SOIL SCIENCE ──
│   ├── S3_Apple_UX_v2.html
│   ├── S3_MASTER_v2.html
│   ├── CFI_SoilScience_Merged_v1.html
│   ├── CFI_SoilScience_Mockup_v2.html
│   ├── SOIL_ACIDITY_LOOKUP_VISUAL_EXAMPLE.html
│   │
│   ├── # ── LAB REPORTS ──
│   ├── CFI_Lab_Report_v2_2_7.html
│   ├── CFI_OPDC_Lab_Report_v1-2-0.html
│   ├── CFI_OPF_DeepTech_Report.html
│   ├── CFI_Residue_Lab_Reports.html
│   ├── CFI_Residue_Soil_Nutrient_Analysis.html
│   │
│   ├── # ── OTHER ──
│   ├── CFI_Colour_v6.html
│   ├── CFI_Database_Structure.html
│   ├── Value_Calculator.html
│   ├── cfi_platform_process_flow.html
│   ├── consolidation.html
│   ├── engineering/Value_Calculator.html
│   ├── palm-soil-science (1).html
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── backend/
│   └── api/
│       └── CFI_AddOrganism_API.js       # 3 API endpoints (search/research/insert)
│
├── agents/
│   ├── price_agent.js                   # Price refresh agent
│   └── .github/workflows/
│       └── price_agent.yml              # GitHub Action for price agent
│
├── sql/
│   ├── cfi_fertiliser_prices.sql
│   └── migrations/
│       ├── 029_add_soil_micronutrient_metadata_columns.sql
│       ├── 030_populate_soil_micronutrient_data_2024.sql
│       ├── 031_create_soil_amendments_and_costs_tables.sql
│       ├── 032_populate_soil_amendments_database.sql
│       ├── 033_populate_soil_fertility_by_management.sql
│       └── 034_populate_cfi_product_nutrients_with_zn.sql
│
├── supabase/
│   ├── config.toml                      # Supabase local config
│   └── migrations/
│       ├── 20260317_migration_16_cfi_industries.md
│       ├── 20260320171439_f97449da-091a-4472-8d5d-f2f87d9075f7.sql
│       ├── CFI_Migration17a_Schema.sql
│       ├── CFI_Migration_Dedup_Mills_All.sql
│       ├── CFI_Migration_Enrich_60TPH_GFW.sql
│       └── CFI_Migration_Western_Soil_Grid (1).sql
│
├── docs/
│   ├── CFI_DATABASE_SCHEMA_ANALYSIS.md
│   ├── guides/
│   │   ├── CFI_AUTO_PROMPT_SETUP_GUIDE.txt
│   │   ├── CFI_AddOrganism_INTEGRATION_GUIDE.txt
│   │   ├── CFI_RANKING_OBJECTIVES_PER_SOIL.txt
│   │   └── CFI_S3_SOILs_design_UI_12_RANKING_OBJECTIVES.md
│   ├── prompts/
│   │   └── CFI_MASTER_PROMPT_NEW_ORGANISM_v2.md
│   ├── specifications/
│   │   ├── S3_BIOLOGICALS_SOIL_SCORING_CANONICAL.txt
│   │   └── S3_Soil_Objectives_With_Warnings.md
│   └── status/
│       ├── CFI_COMPLETE_DEPLOYMENT_STACKS.txt
│       ├── CFI_OPTIMIZED_ORGANISM_STACKS.txt
│       ├── CFI_SOIILS_for_investors_COMPLETION_SUMMARY_WITH_CANONICAL.txt
│       ├── CFI_SOILS_method_of_research_QUICK_BASELINE_COMPLETE.txt
│       ├── CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt
│       ├── CFI_ULTISOL_GAP_ANALYSIS.txt
│       └── S3_BIOLOGICALS_SCORING_SUMMARY.txt
│
├── CFI_Project_Files/                   # Legacy/reference files
│   ├── 00_MANIFEST.md
│   ├── 1_App.jsx                        # Original App.jsx
│   ├── 1_SiteSetup.jsx
│   ├── 1_index.html
│   ├── 1_vite.config.ts
│   ├── 2_CALCULATOR_LOGIC.jsx
│   ├── 3_SUPABASE_INTEGRATION.jsx
│   ├── 4_DESIGN_SYSTEM.jsx
│   ├── 5_STATE_MANAGEMENT.jsx
│   ├── docs/                            # Original design docs (.docx, .md)
│   │   ├── LOVABLE_S0_REDESIGN.txt
│   │   ├── CFI_Lovable_Project_Brief_v4_2.docx
│   │   ├── S1_Mechanical_Calculator_Master_Prompt.docx
│   │   └── ... (13 more docs)
│   ├── jsx/                             # Historical JSX versions
│   │   ├── CFI_S0_Redesign.jsx
│   │   ├── CFI_FULL_BUILD_v25.jsx
│   │   ├── CFI_v23_FIXED.jsx
│   │   └── ... (18 more JSX files)
│   ├── sql/                             # Earlier migrations
│   │   ├── CFI_Migration4_POS_Patch.sql
│   │   └── ... (5 more SQL files)
│   └── outputs/
│       ├── CFI_Bio_Database_Manager_v3.jsx
│       └── CFI_Migration6_Biologicals.sql
│
├── CFI_PriceRefreshBadge.jsx            # Root-level component (legacy?)
├── CFI_ValueCalculator.jsx              # Root-level calculator (legacy?)
└── .lovable/
    └── plan.md                          # Lovable project plan
```

---

## S0 FILES — QUICK REFERENCE

S0 = "Site Inputs" — the first stage of the CFI pipeline (S0→S6).

| File | Location | Purpose |
|------|----------|---------|
| **App.jsx** | `src/App.jsx` | S0 state lives here (`s0`, `upS0`), line ~1468. Tab system: S0–S6 |
| **S0ResidueSelector.jsx** | `src/pages/` | Standalone S0 residue selector page (`/s0-residue-select`) |
| **CFI_S0_SectionAB.jsx** | `src/components/` | S0 Sections A & B (site info, feedstock) |
| **CFI_S0_SectionC.jsx** | `src/components/` | S0 Section C (calculations) |
| **CFI_S0_SectionC_MillResults.jsx** | `src/components/` | S0 Section C mill results display |
| **CFI_S0_SectionD.jsx** | `src/components/` | S0 Section D |
| **CFI_S0_Page.jsx** | `src/` | Full standalone S0 page |
| **CFI_S0_Redesign.jsx** | `src/` | S0 redesign version |
| **CFI_S0_Master_Reference_v3.html** | `public/` | Static HTML reference for S0 |

### S0 handles:
- Plant name & contact info
- FFB capacity (TPH), utilisation %, hours/day, days/month
- Feedstock data: EFB, OPDC, POS, PMF, PKE
- DMPP settings (dose, cost)
- Raw blend baseline calculations

---

## REPO 2: CFI-Code (THIS REPO — NOT ON VERCEL)

```
CFI-Code/
├── components/
│   └── CFI_AddOrganismButton.jsx
├── calculators/
│   ├── CFI_AG_Management_Calculator_v1.jsx
│   └── Value_Calculator.html
├── backend/
│   └── api/
│       └── CFI_AddOrganism_API.js
├── docs/
│   ├── guides/ (4 files)
│   ├── prompts/ (1 file)
│   ├── specifications/ (1 file)
│   └── status/ (5 files)
├── html/
│   └── S14_Process_Engineering_Ascii/ (3 HTML files)
├── sql/
│   └── cfi_fertiliser_prices.sql
├── README.md
├── FILE_MANIFEST.txt
└── PUSH_TO_GITHUB.sh
```

> This repo contains duplicates of some files also in `happy-react-bundle`.
> It is NOT deployed to Vercel.
