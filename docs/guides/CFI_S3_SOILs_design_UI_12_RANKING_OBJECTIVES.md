CFI S3 BIOLOGICAL TAB — 12 RANKING OBJECTIVES (UI BUTTONS)
===========================================================
Date: March 26, 2026
Status: PRODUCTION-READY for React UI build

**THESE ARE THE 12 RADIO BUTTONS/CARDS ON S3 BIOLOGICAL TAB PAGE**

---

## 🎯 12 RANKING OBJECTIVES

User selects ONE objective → System ranks organisms for selected soil type

---

### **1. VALUE FOR MONEY** 💰
**Button Label:** "Best Value (Cost-Benefit)"  
**Icon:** 💰 or dollar sign  
**Description:** "Ranks organisms by cost-effectiveness. Best bang for your buck!"  
**Calculation:** `value_ratio = objective_score / cost_per_tonne_fw`  
**Use case:** Budget-constrained deployment, economic optimization  
**Database function:** `rank_organisms_by_objective(soil, 'value_for_money', n)`

---

### **2. PHOSPHORUS RELEASE** 🧪
**Button Label:** "P-Solubilisation (Phosphorus)"  
**Icon:** ⚗️ or 🧪  
**Description:** "Maximizes phosphorus availability. Critical for high P-fixation soils (Oxisol, Andisol)."  
**Calculation:** Uses `p_releaser_score_soil` (soil-specific) or `p_releaser_score` (generic)  
**Use case:** Oxisol (65% fixation), Andisol (82% fixation), low-P soils  
**Priority soils:** Oxisol > Andisol > Spodosol > Ultisol > Inceptisol  
**Database function:** `rank_organisms_by_objective(soil, 'p_release', n)`

---

### **3. LIGNIN DEGRADATION** 🌾
**Button Label:** "Lignin Breakdown"  
**Icon:** 🌾 or wood chips icon  
**Description:** "Reduces lignin content for BSF colonization. Improves substrate quality."  
**Calculation:** Uses `lignin_score_soil` (soil-specific) or `lignin_degrader_score` (generic)  
**Use case:** EFB (22% ADL) pre-treatment, S0-S3 delignification  
**Target:** ADL 22% → 14-17% (white-rot fungi, enzymes)  
**Database function:** `rank_organisms_by_objective(soil, 'lignin', n)`

---

### **4. NITROGEN FIXATION** 🌱
**Button Label:** "N-Fixing (Nitrogen)"  
**Icon:** 🌱 or leaf icon  
**Description:** "Adds atmospheric nitrogen. Reduces N-fertiliser needs (15-25 kg N/ha/yr)."  
**Calculation:** Uses `n_fixer_score_soil` (soil-specific) or `n_fixer_score` (generic)  
**Use case:** N-deficient soils, organic farming, fertiliser cost reduction  
**Key organisms:** Azotobacter, Azospirillum, Rhizobium (if applicable)  
**⚠️ Safety:** Histosol peat — N2O risk assessment required  
**Database function:** `rank_organisms_by_objective(soil, 'n_fixing', n)`

---

### **5. BSF SUBSTRATE QUALITY** 🐛
**Button Label:** "BSF-Ready Substrate"  
**Icon:** 🐛 or insect icon  
**Description:** "Optimizes pH, C:N, toxins for Black Soldier Fly colonization (S4)."  
**Calculation:** Uses `bsf_score_soil` (soil-specific) or `bsf_ready_score` (generic)  
**Use case:** S0-S3 → S4 transition, maximize BSF yield/survival  
**Target:** pH 6.5-8.0, C:N 17-32, low ADL, no toxins  
**⚠️ Gate:** Bt must decay <10⁴ CFU/g before S4  
**Database function:** `rank_organisms_by_objective(soil, 'bsf_ready', n)`

---

### **6. NITROGEN RETENTION (N-Trap)** 🪤
**Button Label:** "N-Trap (Leaching Prevention)"  
**Icon:** 🪤 or trap icon  
**Description:** "Captures NH3 and prevents N-leaching. Critical for sandy Spodosol (32% leaching)."  
**Calculation:** Combines LAB (7-15 kg N/t DM) + yeast (NH3 retention 50%)  
**Use case:** Sandy soils (Spodosol), high-leaching environments  
**Key organisms:** Lactobacillus, Saccharomyces, facultative anaerobes  
**Priority soils:** Spodosol > Histosol > Ultisol  
**Database function:** `rank_organisms_by_objective(soil, 'n_trap', n)` [TO BE ADDED]

---

### **7. POTASSIUM RETENTION (K-Leaching)** ⚡
**Button Label:** "K-Retention (Potassium)"  
**Icon:** ⚡ or lightning bolt  
**Description:** "Prevents K-leaching on sandy soils. Spodosol loses 30% K annually."  
**Calculation:** EPS polysaccharides (Bacillus mucilaginosus) + CEC boost  
**Use case:** Spodosol (CEC 6 cmol/kg LOWEST), sandy soils  
**Key organisms:** Bacillus mucilaginosus, Xanthomonas (EPS producers)  
**Target:** CEC 6 → 9+ cmol/kg  
**Database function:** `rank_organisms_by_objective(soil, 'k_leaching', n)` [TO BE ADDED]

---

### **8. LIMING RESPONSE** 🧂
**Button Label:** "Post-Lime Recovery"  
**Icon:** 🧂 or lime icon  
**Description:** "Organisms that thrive AFTER liming. Critical for Oxisol (pH 4.4 → 5.0)."  
**Calculation:** Thermophilic resilience + post-lime colonization speed  
**Use case:** Oxisol mandatory liming (1.5 t/ha dolomite)  
**Key organisms:** Bacillus licheniformis, Nitrosomonas, thermophiles  
**⚠️ Constraint:** Nitrosomonas POST-LIME ONLY (suppressed pH <4.5)  
**Priority soils:** Oxisol > Ultisol  
**Database function:** `rank_organisms_by_objective(soil, 'liming_response', n)` [TO BE ADDED]

---

### **9. IRON MANAGEMENT (Fe Chelation)** 🧲
**Button Label:** "Fe/Mn Management"  
**Icon:** 🧲 or magnet icon  
**Description:** "Chelates excess Fe/Mn. Critical for POS stream (3,000-8,000 mg Fe/kg DM)."  
**Calculation:** Siderophore production + organic acid chelation (citric, gluconic)  
**Use case:** POS inclusion rate control, heavy metal management  
**Key organisms:** Pseudomonas (siderophores), Aspergillus (citric acid)  
**Target:** Fe <3,000 mg/kg → 20% POS inclusion; >8,000 → CaCO3 amendment  
**Database function:** `rank_organisms_by_objective(soil, 'iron_management', n)` [TO BE ADDED]

---

### **10. ACID TOLERANCE** 🔋
**Button Label:** "Extreme Acid (pH <4.5)"  
**Icon:** 🔋 or battery acid icon  
**Description:** "Organisms for ultra-low pH soils. Histosol pH 3.8, Oxisol pH 4.4."  
**Calculation:** Acid stress tolerance + enzyme activity <pH 4.5  
**Use case:** Histosol (pH 3.8), Oxisol (pH 4.4), acid peat  
**Key organisms:** Acaulospora (acid-specialist AMF), Aspergillus, LAB  
**Priority soils:** Histosol > Oxisol > Ultisol  
**Database function:** `rank_organisms_by_objective(soil, 'acid_tolerance', n)` [TO BE ADDED]

---

### **11. N2O-SAFE (Peat/Waterlogging)** ✅
**Button Label:** "N2O-Safe (No Emission Risk)"  
**Icon:** ✅ or green checkmark  
**Description:** "SAFE organisms for Histosol peat. NO denitrification pathway (nirK/nirS)."  
**Calculation:** Excludes Azotobacter, Azospirillum; prioritizes LAB, facultative anaerobes  
**Use case:** Histosol peat (waterlogged, N2O amplification 5→15+ kg/ha/yr risk)  
**Safe organisms:** Lactobacillus (4.2★), Cellulomonas fimi, Saccharomyces  
**⚠️ LOCKED:** Azotobacter (2.0★), Azospirillum (2.0★) until field trials  
**Priority soils:** Histosol ONLY  
**Database function:** `rank_organisms_by_objective(soil, 'n2o_safe', n)` [TO BE ADDED]

---

### **12. SOIL-OPTIMIZED (Auto-Select Best)** 🎯
**Button Label:** "Soil-Optimized Stack"  
**Icon:** 🎯 or target icon  
**Description:** "AI-selected stack for YOUR soil. Uses soil_specific_score when available."  
**Calculation:** Prioritizes organisms with `soil_specific_score` > `generic score`  
**Use case:** One-click optimal recommendation per soil  
**Logic:**  
  - Inceptisol: Maximize high-performers (Phanerochaete 4.8★, Trichoderma 4.5★)  
  - Oxisol: Extreme P-solubilisers (Aspergillus 4.8★, Acaulospora 4.5★)  
  - Histosol: N2O-safe + CH4 suppression (Lactobacillus 4.2★)  
  - Spodosol: EPS producers (B. mucilaginosus 4.5★, Azotobacter 4.0★)  
  - Andisol: AMF bypass (Glomus mosseae 5.0★, G. intraradices 4.8★)  
  - Ultisol: Kaolinite P-release (Aspergillus 4.5★, LAB 4.5★)  
**Database function:** `rank_organisms_by_objective(soil, 'soil_specific', n)` [TO BE ADDED]

---

## 🎨 UI DESIGN SPECS (S3 BIOLOGICAL TAB)

### **LAYOUT:**

```
┌─────────────────────────────────────────────────────────┐
│  S3 BIOLOGICAL — ORGANISM SELECTION                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. SELECT YOUR SOIL TYPE:                              │
│     ┌────────┬────────┬────────┬────────┬────────┬────┐│
│     │Inceptisol│Ultisol│Oxisol│Histosol│Spodosol│Andisol││
│     └────────┴────────┴────────┴────────┴────────┴────┘│
│                                                          │
│  2. SELECT YOUR OBJECTIVE:                              │
│     ┌──────────────┬──────────────┬──────────────┐     │
│     │ 💰 Value    │ 🧪 P-Release │ 🌾 Lignin    │     │
│     ├──────────────┼──────────────┼──────────────┤     │
│     │ 🌱 N-Fixing │ 🐛 BSF-Ready │ 🪤 N-Trap    │     │
│     ├──────────────┼──────────────┼──────────────┤     │
│     │ ⚡ K-Retain │ 🧂 Post-Lime │ 🧲 Fe-Mgmt   │     │
│     ├──────────────┼──────────────┼──────────────┤     │
│     │ 🔋 Acid Tol │ ✅ N2O-Safe  │ 🎯 Optimized │     │
│     └──────────────┴──────────────┴──────────────┘     │
│                                                          │
│  3. RANKED ORGANISMS:                                   │
│     ┌────────────────────────────────────────────────┐ │
│     │ Rank │ Organism         │ Score │ Cost │ Mech ││ │
│     ├──────┼──────────────────┼───────┼──────┼──────┤│ │
│     │  1   │ Aspergillus niger│ 4.8★  │ $2.50│  ℹ️  ││ │
│     │  2   │ Acaulospora sp.  │ 4.5★  │ $4.20│  ℹ️  ││ │
│     │  3   │ B. megaterium    │ 4.2★  │ $0.90│  ℹ️  ││ │
│     └────────────────────────────────────────────────┘ │
│                                                          │
│  [Add to Stack] [Clear Selection] [Deploy]             │
└─────────────────────────────────────────────────────────┘
```

### **BUTTON STATES:**

**UNSELECTED:** 
- Background: `#0C1E33` (navy)
- Border: `rgba(139,160,180,0.18)` (grey)
- Text: `#8B9CB4` (grey)

**SELECTED:**
- Background: `rgba(64,215,197,0.12)` (teal glow)
- Border: `rgba(64,215,197,0.60)` (teal bright)
- Text: `#F5A623` (amber)

**HOVER:**
- Border: `rgba(64,215,197,0.40)` (teal medium)
- Cursor: pointer

### **MECHANISM TOOLTIP (ℹ️ click):**

```
┌───────────────────────────────────────┐
│ ASPERGILLUS NIGER — OXISOL           │
├───────────────────────────────────────┤
│ Score: 4.8★ (HIGHEST for P-release) │
│ Cost: $2.50/t FW                     │
│                                       │
│ MECHANISM:                            │
│ Citric acid (pKa 3.1) chelates       │
│ Fe³⁺/Al³⁺ from gibbsite/goethite at  │
│ pH 4.4. P-release 45-67% vs 25-35%   │
│ on kaolinite. Extreme P-fixation     │
│ (65%) mitigation.                    │
│                                       │
│ SOURCE:                               │
│ Osorio 2001 Oxisol; Pinzari 2012;    │
│ Wang 2005 gibbsite dissolution       │
│                                       │
│ CONSTRAINT:                           │
│ Liming mandatory 1.5 t/ha            │
└───────────────────────────────────────┘
```

---

## 📊 BUTTON CLICK → DATABASE QUERY

**User flow:**
1. User selects soil (e.g., "Oxisol")
2. User clicks objective button (e.g., "🧪 P-Release")
3. System calls: `rank_organisms_by_objective('Oxisol', 'p_release', 10)`
4. Display top 10 ranked organisms with scores, costs, mechanisms

**React state:**
```javascript
const [selectedSoil, setSelectedSoil] = useState('Inceptisol');
const [selectedObjective, setSelectedObjective] = useState('value_for_money');
const [organisms, setOrganisms] = useState([]);

// On button click:
const fetchRanking = async () => {
  const { data } = await supabase.rpc('rank_organisms_by_objective', {
    p_soil_type: selectedSoil,
    p_objective: selectedObjective,
    p_limit: 10
  });
  setOrganisms(data);
};
```

---

## ✅ CURRENT STATUS (March 26, 2026)

| Objective | Database Function | Status |
|-----------|------------------|--------|
| 1. Value for Money | `value_for_money` | ✅ OPERATIONAL |
| 2. P-Release | `p_release` | ✅ OPERATIONAL |
| 3. Lignin | `lignin` | ✅ OPERATIONAL |
| 4. N-Fixing | `n_fixing` | ✅ OPERATIONAL |
| 5. BSF-Ready | `bsf_ready` | ✅ OPERATIONAL |
| 6. N-Trap | `n_trap` | ⏳ TO BE ADDED (30 min) |
| 7. K-Leaching | `k_leaching` | ⏳ TO BE ADDED (30 min) |
| 8. Liming Response | `liming_response` | ⏳ TO BE ADDED (30 min) |
| 9. Iron Management | `iron_management` | ⏳ TO BE ADDED (30 min) |
| 10. Acid Tolerance | `acid_tolerance` | ⏳ TO BE ADDED (30 min) |
| 11. N2O-Safe | `n2o_safe` | ⏳ TO BE ADDED (30 min) |
| 12. Soil-Optimized | `soil_specific` | ⏳ TO BE ADDED (30 min) |

**5/12 operational → 7 remaining to add**

---

## 🚀 NEXT STEPS

### **IMMEDIATE (30 min):**
Add 7 remaining ranking objectives to Supabase as functions

### **THEN (2-3 hours):**
Build React S3 Biological Tab UI with:
- 6 soil selector buttons
- 12 objective selector cards (4×3 grid)
- Ranked organism table (sortable)
- Mechanism tooltips (click ℹ️)
- "Add to Stack" functionality
- Stack summary panel

---

END OF RANKING OBJECTIVES SPEC
Ready for UI development!
