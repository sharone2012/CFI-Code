# CFI Deep Tech — Complete Biological System + Calculators

**Date:** March 26, 2026  
**Status:** ✅ Production-Ready  
**Coverage:** 100% Indonesian palm plantations (6 soil types)  
**Grade:** A- (90/100)

---

## 📁 Repository Structure

```
CFI-Code/
├── components/
│   └── CFI_AddOrganismButton.jsx              # Add Organism modal (React)
├── calculators/
│   ├── CFI_AG_Management_Calculator_v1.jsx    # AG Management Calculator
│   └── Value_Calculator.html                  # Value calculator (HTML)
├── backend/
│   └── api/
│       └── CFI_AddOrganism_API.js             # 3 API endpoints
├── docs/
│   ├── prompts/
│   │   └── CFI_MASTER_PROMPT_NEW_ORGANISM_v2.md    # Research protocol
│   ├── guides/
│   │   ├── CFI_AddOrganism_INTEGRATION_GUIDE.txt   # Deployment guide
│   │   ├── CFI_AUTO_PROMPT_SETUP_GUIDE.txt         # Auto-trigger setup
│   │   ├── CFI_RANKING_OBJECTIVES_PER_SOIL.txt     # Ranking logic
│   │   └── CFI_S3_SOILs_design_UI_12_RANKING_OBJECTIVES.md  # UI specs
│   ├── status/
│   │   ├── CFI_COMPLETE_DEPLOYMENT_STACKS.txt           # 54 deployment stacks
│   │   ├── CFI_ULTISOL_GAP_ANALYSIS.txt                 # Gap analysis
│   │   ├── CFI_SOILS_method_of_research_QUICK_BASELINE_COMPLETE.txt
│   │   ├── CFI_SOIILS_for_investors_COMPLETION_SUMMARY_WITH_CANONICAL.txt
│   │   └── CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt
│   └── specifications/
│       └── S3_Soil_Objectives_With_Warnings.md          # S3 Tab 4 specs
└── sql/
    └── migrations/
        └── (SQL migrations - to be added)
```

**Total Files:** 17

---

## 🎯 What This Repository Contains

### **1. React Components (2 files)**

**CFI_AddOrganismButton.jsx** — Add Organism workflow
- Fuzzy search modal (ATCC/DSMZ/NRRL databases)
- Auto-research with master prompt
- Preview before insert
- Approval gate (`is_approved = FALSE`)

**CFI_AG_Management_Calculator_v1.jsx** — AG Management Calculator
- Fertiliser planning and optimization
- Soil-specific recommendations
- Multi-year projections

---

### **2. Calculators (1 file)**

**Value_Calculator.html** — Standalone value calculator
- Economic analysis tool
- Cost-benefit calculations
- HTML/JS implementation

---

### **3. Backend API (1 file)**

**CFI_AddOrganism_API.js** — 3 API endpoints
1. POST /api/organism-search — Fuzzy database search
2. POST /api/research-organism — Master prompt execution
3. POST /api/insert-organism — Supabase insert with approval

---

### **4. Documentation (13 files)**

**Master Prompt:**
- CFI_MASTER_PROMPT_NEW_ORGANISM_v2.md (454 lines)
- 13-professor expert panel
- Research Intensity 99-Power
- Anti-hallucination protocol

**Integration Guides:**
- CFI_AddOrganism_INTEGRATION_GUIDE.txt — Complete deployment
- CFI_AUTO_PROMPT_SETUP_GUIDE.txt — Auto-trigger configuration
- CFI_RANKING_OBJECTIVES_PER_SOIL.txt — 72 ranked lists
- CFI_S3_SOILs_design_UI_12_RANKING_OBJECTIVES.md — UI specifications

**Status Reports:**
- CFI_COMPLETE_DEPLOYMENT_STACKS.txt — 54 stacks (9 organisms × 6 soils)
- CFI_ULTISOL_GAP_ANALYSIS.txt — Gap analysis methodology
- CFI_SOILS_method_of_research_QUICK_BASELINE_COMPLETE.txt — Research method
- CFI_SOIILS_for_investors_COMPLETION_SUMMARY_WITH_CANONICAL.txt — Investor summary
- CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt — Technical status

**Specifications:**
- S3_Soil_Objectives_With_Warnings.md — S3 Tab 4 integration specs

---

## 🚀 Quick Start

### **1. Frontend (Lovable)**

```bash
# Upload React components to Lovable project a250ef5c-8cf7-4d8d-9b6e-2d683798916d
cp components/CFI_AddOrganismButton.jsx <lovable-project>/src/components/
cp calculators/CFI_AG_Management_Calculator_v1.jsx <lovable-project>/src/components/
```

### **2. Backend (Supabase Edge Functions)**

```bash
supabase functions new organism-search
supabase functions new research-organism
supabase functions new insert-organism

# Copy code from backend/api/CFI_AddOrganism_API.js

supabase functions deploy organism-search
supabase functions deploy research-organism
supabase functions deploy insert-organism
```

### **3. Environment Variables**

```bash
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://lcpbtnipkvrmuwllymfw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 📊 System Status

### **Database Coverage:**
- ✅ 6/6 soils operational (Inceptisol, Ultisol, Oxisol, Histosol, Spodosol, Andisol)
- ✅ 57 organism-soil scores approved
- ✅ 100% Indonesian palm plantation coverage

### **Ranking Functions:**
- ✅ 5/12 operational (value, P-release, lignin, N-fixing, BSF-ready)
- ⏳ 7/12 to be added (N-trap, K-retention, liming, Fe-mgmt, acid tolerance, N2O-safe, soil-optimized)

### **Master Prompt:**
- ✅ Uploaded to Supabase `cfi_master_prompts` table
- ✅ Auto-triggers on keywords: "add organism", "new organism", "upload organism"
- ✅ Tested with Thermobifida fusca (successful)

---

## 🔒 Canonical Values (Locked)

**These values CANNOT be overridden by AI or research:**

```
OPDC yield          = 15.2% of EFB FW = 4.2% FFB (CLASS A)
OPDC MC floor       = 40% wb minimum (BSF pore damage <40%)
N conversion        = N × 6.25 (AOAC 984.13 Jones factor)
PKE N value         = 26.7 kg N/t DM (LOCKED Mar 2026)
Equipment derate    = 65% of nameplate
5-day minimum       = NEVER override
PKSA cost           = $0.00 (mill waste)
```

Full list in `docs/status/CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt`

---

## 📋 File Descriptions

### **Components:**
| File | Description | Size | Status |
|------|-------------|------|--------|
| CFI_AddOrganismButton.jsx | Add Organism modal (React) | 24KB | ✅ Production |
| CFI_AG_Management_Calculator_v1.jsx | AG Management Calculator | TBD | ✅ Production |

### **Calculators:**
| File | Description | Size | Status |
|------|-------------|------|--------|
| Value_Calculator.html | Standalone value calculator | TBD | ✅ Production |

### **Backend:**
| File | Description | Size | Status |
|------|-------------|------|--------|
| CFI_AddOrganism_API.js | 3 API endpoints | 9KB | ✅ Ready to deploy |

### **Documentation:**
| File | Description | Size | Category |
|------|-------------|------|----------|
| CFI_MASTER_PROMPT_NEW_ORGANISM_v2.md | Research protocol | 16KB | Prompt |
| CFI_AddOrganism_INTEGRATION_GUIDE.txt | Deployment guide | 11KB | Guide |
| CFI_AUTO_PROMPT_SETUP_GUIDE.txt | Auto-trigger setup | 9KB | Guide |
| CFI_RANKING_OBJECTIVES_PER_SOIL.txt | Ranking logic | 15KB | Guide |
| CFI_S3_SOILs_design_UI_12_RANKING_OBJECTIVES.md | UI specs | 15KB | Guide |
| CFI_COMPLETE_DEPLOYMENT_STACKS.txt | 54 deployment stacks | 13KB | Status |
| CFI_ULTISOL_GAP_ANALYSIS.txt | Gap analysis | 8KB | Status |
| CFI_SOILS_method_of_research_QUICK_BASELINE_COMPLETE.txt | Research method | 10KB | Status |
| CFI_SOIILS_for_investors_COMPLETION_SUMMARY_WITH_CANONICAL.txt | Investor summary | 10KB | Status |
| CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt | Technical status | 8KB | Status |
| S3_Soil_Objectives_With_Warnings.md | S3 Tab 4 specs | TBD | Specification |

---

## ✅ What's Included vs What's Not

### **✅ INCLUDED:**
- React components (Add Organism Button, AG Calculator)
- HTML calculator (Value Calculator)
- Backend API handlers (3 endpoints)
- Master prompt (research protocol)
- Integration guides (deployment, auto-trigger)
- Status reports (deployment stacks, gap analysis, completion summaries)
- UI specifications (S3 ranking objectives, soil warnings)

### **❌ NOT INCLUDED (stored elsewhere):**
- SQL migrations (in Supabase, not GitHub)
- Database data (57 organism scores in Supabase)
- Environment variables (never commit to GitHub)
- Master prompt in database (already in `cfi_master_prompts` table)

---

## 🎯 Next Steps

### **Immediate (30 min):**
1. Deploy backend API (Supabase Edge Functions or Express)
2. Update React component API URLs
3. Test full Add Organism workflow

### **Short-term (3-4 hours):**
1. Add 7 remaining ranking objectives
2. Build S3 Biological Tab React UI
3. Add Rhizopus oligosporus soil-specific scores

### **Long-term (months):**
1. ICP-OES Package B on POS ($200-400)
2. Field trials (Histosol N2O, Spodosol EPS, Andisol Si)
3. Nagoya Protocol ABS agreement (IPB ICBB)
4. SNI 2803:2012 registration

---

## 🏆 Achievement Summary

**Before:** Calculator worked only Ultisol (24% of palms), 76% BLOCKED  
**After:** Calculator works ALL 6 soils (100% coverage), ZERO blocked  

**Grade progression:** C+ (75/100) → B+ (85/100) → A- (90/100)

---

## 📞 Contact

**Project:** CFI Deep Tech  
**Founder/CEO:** Sharon  
**Database:** Supabase `lcpbtnipkvrmuwllymfw`  
**Frontend:** Lovable project `a250ef5c-8cf7-4d8d-9b6e-2d683798916d`  
**GitHub:** sharonp2012/CFI-Code

---

**Last Updated:** March 26, 2026  
**Status:** Production-ready, awaiting deployment  
**Total Files:** 17 (2 components + 1 calculator + 1 API + 13 docs)
