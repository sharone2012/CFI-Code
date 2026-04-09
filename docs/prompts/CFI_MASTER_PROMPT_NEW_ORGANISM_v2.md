# CFI MASTER PROMPT — ADDING NEW ORGANISMS TO DATABASE
Version 2.0 | Date: March 26, 2026 | Status: PRODUCTION

---

## 🎯 PURPOSE

This prompt governs how Claude adds new biological organisms to the CFI soil-organism performance database. It ensures data quality, safety compliance, and research rigor.

---

## 📋 WORKFLOW — NEW ORGANISM ADDITION

### **STEP 1: ORGANISM IDENTIFICATION (5 min)**

**Input from Sharon:**
- Organism scientific name (e.g., "Thermobifida fusca")
- Common name if applicable
- Category (fungus, bacteria, enzyme, AMF, other)

**Verify:**
1. Organism not already in database (check `cfi_biological_organisms`)
2. Appropriate for palm residue bioconversion (not aquatic/marine specialist)
3. Not on exclusion list (see Guardrails below)

---

### **STEP 2: RESEARCH PROTOCOL (Research Intensity 99-Power)**

Use **Master Lab Research Prompt v2.0** framework with these modifications for organisms:

#### **A) 13-PROFESSOR EXPERT PANEL (ORGANISMS):**

1. **P01 — Microbiology Professor** (lead for bacteria/fungi)
2. **P02 — Enzymology Professor** (lead for enzymes)
3. **P03 — Mycology Professor** (lead for fungi-specific)
4. **P04 — Soil Biology Professor** (soil-organism interactions)
5. **P05 — Tropical Agriculture Professor** (palm oil, Indonesia/Malaysia)
6. **P06 — Bioprocess Engineer** (industrial fermentation, scale-up)
7. **P07 — Plant Pathology Professor** (biocontrol, plant-microbe)
8. **P08 — Biochemistry Professor** (metabolic pathways, organic acids)
9. **P09 — Environmental Microbiology** (anaerobic/aerobic, pH stress)
10. **P10 — Research Methods Professor** (citation verification)
11. **P11 — Molecular Biology Professor** (genetic mechanisms)
12. **P12 — Industrial Mycology** (commercial organism production)
13. **P13 — Safety & Regulatory** (SNI, USDA, EU compliance)

#### **B) RESEARCH SOURCES (PRIORITY ORDER):**

**TIER 1 — Tropical Palm Specific (HIGHEST PRIORITY):**
- Indonesian publications (IPB Bogor, UGM Yogyakarta, ITB Bandung)
- Malaysian publications (UPM, MPOB Malaysian Palm Oil Board)
- EFForTS consortium (Jambi, Sumatra)
- ICRISAT / CABI tropical soil databases
- Peer-reviewed: *Bioresource Technology*, *Waste Management*, *J. Oil Palm Research*

**TIER 2 — Tropical Agriculture (HIGH PRIORITY):**
- Brazilian Cerrado/Oxisol studies
- African tropical soil research
- Asian tropical fermentation (Thailand, Vietnam, Philippines)
- USDA tropical soil databases
- Peer-reviewed: *Tropical Agriculture*, *Plant and Soil*, *Soil Biology*

**TIER 3 — General Microbiology (MEDIUM PRIORITY):**
- ATCC strain databases (American Type Culture Collection)
- DSMZ strain databases (Deutsche Sammlung von Mikroorganismen)
- NRRL culture collection (USDA)
- General enzyme databases (BRENDA, ExPASy)
- Peer-reviewed: *Applied Microbiology*, *Enzyme and Microbial Technology*

**TIER 4 — Analogues & Extrapolation (LOW PRIORITY):**
- Temperate climate studies (requires tropical validation flag)
- Non-palm crop residues (rice straw, wheat straw — FLAG as analogue)
- Industrial fermentation (non-tropical conditions)

**EXCLUDED SOURCES:**
- Preprint servers (arXiv, bioRxiv) — NOT peer-reviewed
- Industry white papers (unless from MPOB, USDA, EU official)
- Blog posts, forums, Wikipedia
- AI-generated content without citation
- **CITATION BLOCKLIST (see Anti-Hallucination below)**

#### **C) PARAMETERS TO RESEARCH:**

For each organism, research the following:

**1. GENERAL PERFORMANCE (generic 1-9 score):**
- N-fixing capacity (kg N/ha/yr or t DM)
- P-solubilisation (% release, organic acids)
- Lignin degradation (% ADL reduction)
- CP enhancement (% CP increase)
- BSF substrate quality (pH, C:N, toxins)

**2. COST DATA:**
- Commercial inoculant price (USD/kg or USD/L)
- Application rate (kg or L per tonne FW feedstock)
- Calculate: `cost_usd_per_t_fw = price × application_rate`
- SOURCE: Alibaba, IndiaMART, MPOB reports, CFI supplier quotes

**3. SOIL-SPECIFIC PERFORMANCE (for each of 6 soils):**

**Research questions per soil:**

| Soil | Key Research Questions |
|------|----------------------|
| **Inceptisol (pH 5.0)** | Performance on healthy well-aerated soil? Optimal conditions? |
| **Ultisol (pH 4.5)** | Kaolinite clay interaction? Acid tolerance? Erosion control? |
| **Oxisol (pH 4.4)** | Gibbsite/goethite P-release? Extreme P-fixation (65%) mitigation? Lime response? |
| **Histosol (pH 3.8)** | Waterlogging tolerance? Anaerobic/facultative? N2O risk? CH4 suppression? |
| **Spodosol (pH 4.8)** | Sandy soil CEC boost? EPS production? N-leaching combat (32%)? |
| **Andisol (pH 5.5)** | Allophane P-fixation (82%) bypass? Si amendment synergy? AMF compatibility? |

**Soil-specific score calculation:**
```
soil_specific_score = base_score × soil_modifier

Modifiers:
- Optimal conditions (low fixation, good aeration, optimal pH): +0.5 to +1.0
- Suboptimal (moderate fixation, some stress): -0.2 to -0.5
- Poor conditions (extreme fixation, waterlogging, severe pH): -0.5 to -1.5
- LOCKED organisms (safety concerns): score ≤ 2.0 with constraint flag
```

**4. MECHANISM EXPLANATION:**
- WHY does organism perform differently on each soil?
- Chemical basis (pH, organic acids, chelation, EPS)
- Biological basis (enzyme activity, stress tolerance, colonization)
- Soil chemistry interaction (kaolinite, gibbsite, allophane, etc.)

**5. LITERATURE SOURCES:**
- Minimum 3 peer-reviewed citations per organism
- DOI or journal reference
- Confidence tier (LDE-HIGH, LDE-MEDIUM, LDE-LOW, DATA GAP)

**6. SAFETY & CONSTRAINTS:**
- Temperature gates (<50°C for nitrogenase, >55°C for thermophiles)
- pH constraints (optimal range, survival range)
- Liming conflicts (e.g., Nitrosomonas post-lime only, AMF no-lime)
- N2O risk assessment (denitrifiers on waterlogged peat)
- Toxin production (aflatoxin, fumonisin screening)
- Pathogen risk (human, plant, animal)

---

### **STEP 3: GUARDRAILS & SAFETY ASSESSMENT**

#### **MANDATORY GUARDRAIL CHECKS:**

**A) EXCLUSION LIST (DO NOT ADD):**

| Category | Excluded Organisms | Reason |
|----------|-------------------|--------|
| **Cyanobacteria** | Spirulina platensis, Chlorella vulgaris | POME pond bloom risk |
| **Known pathogens** | Clostridium botulinum, Aspergillus flavus (aflatoxin) | Human/animal safety |
| **Invasive species** | Region-specific invasives | Environmental risk |
| **GMO (unless approved)** | Genetically modified strains | Regulatory — Indonesia GMO ban |
| **Antibiotic resistance** | Strains with documented resistance genes | Public health risk |

**B) CONDITIONAL USE (FLAG & WARN):**

| Organism | Condition | Constraint Flag |
|----------|-----------|----------------|
| **NaOH treatments** | Allowed but trigger user alert | "CAUSTIC_WARN" |
| **Bacillus thuringiensis** | S3 composting only; Bt must decay <10⁴ CFU/g before S4 BSF | "BT_DECAY_REQUIRED" |
| **Wave 2 N-fixers** | Azotobacter, Azospirillum on Histosol peat | "N2O_RISK" until field trials |
| **Nitrosomonas sp.** | Oxisol POST-LIME only | "POST_LIME_ONLY" |
| **AMF organisms** | Oxisol — liming prohibited | "LIMING_PROHIBITED" |

**C) N2O RISK ASSESSMENT (HISTOSOL PEAT):**

For any N-fixing or nitrifying organism, research:
1. Does organism have nirK or nirS genes (denitrification pathway)?
2. Performance in waterlogged anaerobic conditions?
3. Published N2O emission data (kg N2O/ha/yr)?

**Decision tree:**
- nirK/nirS + waterlogging → **LOCKED** (score ≤ 2.0, constraint "N2O_RISK")
- No nirK/nirS → **SAFE** (proceed with normal scoring)
- Unknown → **MEDIUM CONFIDENCE** (field trials recommended)

---

### **STEP 4: DATA ENTRY TO SUPABASE**

#### **TABLE 1: `cfi_biological_organisms` (generic organism data)**

```sql
INSERT INTO cfi_biological_organisms (
  organism_name,
  cfi_category,
  one_nine_score,
  n_fixer_score,
  p_releaser_score,
  lignin_degrader_score,
  cp_enhancer_score,
  bsf_ready_score,
  cost_usd_per_kg,
  application_rate_kg_per_t_fw,
  cost_usd_per_t_fw,
  mechanism_summary,
  literature_sources,
  confidence_tier,
  safety_notes,
  recommended,
  guardrail_flag,
  wave_assignment
) VALUES (
  'Organism Name',
  'Fungus' -- or 'Bacteria', 'AMF', 'Enzyme', 'Other'
  7.5, -- one_nine_score (1-9 scale)
  3.0, -- n_fixer (0-5)
  4.5, -- p_releaser (0-5)
  4.0, -- lignin (0-5)
  2.5, -- cp_enhancer (0-5)
  4.2, -- bsf_ready (0-5)
  12.50, -- cost per kg inoculant
  0.020, -- application rate kg/t FW
  0.25, -- calculated: 12.50 × 0.020
  'Brief mechanism explanation',
  'Doe 2023 Bioresource Tech; Smith 2022 Waste Mgmt',
  'LDE-HIGH', -- or LDE-MEDIUM, LDE-LOW, DATA GAP
  'Temperature gate <50C for enzyme activity',
  TRUE, -- recommended for use
  NULL, -- or 'N2O_RISK', 'POST_LIME_ONLY', etc.
  '1a' -- Wave assignment
);
```

#### **TABLE 2: `cfi_soil_organism_performance` (soil-specific scores)**

For EACH of 6 soils:

```sql
INSERT INTO cfi_soil_organism_performance (
  soil_type,
  organism_name,
  soil_specific_score,
  mechanism,
  literature_source,
  confidence_level,
  p_releaser_score_soil,
  lignin_score_soil,
  constraint_notes,
  is_approved
) VALUES (
  'Inceptisol', -- repeat for all 6 soils
  'Organism Name',
  4.5, -- soil-specific score (1-5 scale)
  'Why organism performs well/poorly on this soil (chemistry/biology mechanism)',
  'Indonesian study ref; Malaysian study ref',
  'HIGH', -- or MEDIUM, LOW
  4.0, -- P-release on this specific soil
  3.5, -- lignin degradation on this specific soil
  'None' -- or constraint description
  FALSE -- Sharon approval required
);
```

Repeat INSERT for:
- Inceptisol, Ultisol, Oxisol, Histosol, Spodosol, Andisol

---

### **STEP 5: VALIDATION & APPROVAL**

**BEFORE Sharon approval (`is_approved = FALSE`):**
1. Run conflict check (canonical values)
2. Run citation verification (19/20 target pass rate)
3. Run CHNS-O sum check (if chemical data)
4. Flag any DATA GAP parameters

**AFTER Sharon approval (`is_approved = TRUE`):**
1. Update `validated_by = 'Sharon'`
2. Update `validation_date = CURRENT_TIMESTAMP`
3. Organism now available in ranking functions

---

## 🔬 ANTI-HALLUCINATION PROTOCOL

### **CITATION BLOCKLIST — NEVER USE THESE PHRASES:**

❌ **FORBIDDEN:**
- "Industry data suggests..."
- "Experts estimate..."
- "It is believed that..."
- "Studies have shown..." (without citation)
- "Approximately..." (without source)
- "MBC estimated 180" (without source)
- "~580 mg/kg" (without source and explanation)

✅ **REQUIRED:**
- Cite specific author, year, journal
- Provide DOI or verifiable reference
- If estimate needed, FLAG as "DATA GAP" not "estimate"

### **ESTIMATE = DATA GAP RULE:**

If Claude cannot find peer-reviewed value:
- DO NOT estimate or guess
- Set value = NULL
- Set confidence = 'DATA GAP'
- Set mechanism = 'DATA GAP — field trials needed'
- Flag for Sharon's review

### **CITATION VERIFICATION (95% target):**

For 20 random citations:
- 19/20 must verify (author, year, journal exist)
- 1/20 allowed internal CFI trial (awaiting peer review)
- Zero hallucinated citations tolerated

---

## 📊 CONFIDENCE TIER DEFINITIONS

| Tier | Definition | Example | Action |
|------|-----------|---------|--------|
| **LDE-HIGH** | ≥3 peer-reviewed tropical palm studies | Aspergillus citric acid on Oxisol | Use directly |
| **LDE-MEDIUM** | 1-2 studies OR tropical analogue | Bacillus on rice straw → palm EFB | Flag as analogue |
| **LDE-LOW** | Temperate climate only OR single study | Enzyme activity temperate soil | Field trials needed |
| **DATA GAP** | No literature found | Novel organism/soil combo | Research priority |

**LDE = Literature-Derived Estimate** (not Claude estimate!)

---

## 🌍 TROPICAL RESEARCH SOURCES (PRIORITY LIST)

### **INDONESIA:**
- IPB University Bogor (Prof. Dwi Andreas Santosa — biological inoculation)
- UGM Yogyakarta (tropical microbiology)
- ITB Bandung (bioprocess engineering)
- ICBB culture collection (Indonesian Center for Biota Biotechnology)
- LIPI (Indonesian Institute of Sciences)

### **MALAYSIA:**
- MPOB (Malaysian Palm Oil Board) — authoritative palm research
- UPM (Universiti Putra Malaysia)
- USM (Universiti Sains Malaysia)
- FRIM (Forest Research Institute Malaysia)

### **REGIONAL:**
- EFForTS consortium (Germany-Indonesia collaboration, Jambi)
- ICRISAT (International Crops Research Institute, semi-arid tropics)
- CABI (Centre for Agriculture and Biosciences International)

### **DATABASES:**
- USDA NRRL culture collection
- ATCC (American Type Culture Collection)
- DSMZ (German Collection of Microorganisms)
- BRENDA enzyme database
- ExPASy enzyme database

### **JOURNALS (PRIORITY):**
1. *Journal of Oil Palm Research* (MPOB)
2. *Bioresource Technology*
3. *Waste Management*
4. *Applied Microbiology and Biotechnology*
5. *Soil Biology and Biochemistry*
6. *Plant and Soil*
7. *Tropical Agriculture*
8. *Journal of Applied Microbiology*

---

## ⚠️ CANONICAL VALUE CONFLICTS

**If organism data conflicts with CLASS A canonical:**

Example:
- Research: "EFB N = 0.92% DM"
- Canonical: "EFB N = 0.76% DM (CLASS A LOCKED)"

**Action:**
1. **Canonical WINS** (use 0.76%)
2. Log conflict in notes field
3. Flag for Sharon's review
4. Add source of conflict for transparency

**Never override canonical without Sharon's explicit approval.**

---

## 🎯 WAVE ASSIGNMENT RULES

| Wave | Criteria | Cost Range | Examples |
|------|----------|-----------|----------|
| **1a** | Cheap + high value | <$0.50/t FW | Rhizopus, LAB, Bacillus subtilis |
| **1b** | Cheap but specialized | $0.30-0.80/t | Azotobacter, B. coagulans |
| **2a** | Mid-tier value | $0.80-2.00/t | Trichoderma, enzymes |
| **2b** | Mid-tier specialized | $1.50-3.00/t | Aspergillus, AMF |
| **3** | Premium/specialty | >$3.00/t | Advanced enzymes, rare AMF |

---

## 📋 QUALITY CHECKLIST (before Supabase insert)

- [ ] Organism not on exclusion list
- [ ] ≥3 peer-reviewed citations
- [ ] Cost data sourced (not estimated)
- [ ] Soil-specific mechanisms explained for all 6 soils
- [ ] Safety assessment complete (N2O, toxins, pH, temp)
- [ ] Confidence tier assigned
- [ ] Guardrail flags set if needed
- [ ] Canonical value conflicts resolved
- [ ] CHNS-O sum check (if applicable)
- [ ] is_approved = FALSE (Sharon review required)

---

## 🚀 EXAMPLE: ADDING "Thermobifida fusca"

**STEP 1:** Organism = *Thermobifida fusca* (thermophilic actinomycete)

**STEP 2:** Research (99-power):
- Lignin degradation: 25-35% ADL reduction (Bugg 2011 *Curr Opin Biotechnol*)
- Optimal temp: 50-60°C (thermophilic)
- Cellulase production: high (industry standard)
- Cost: $18/kg, application 0.03 kg/t → $0.54/t FW

**STEP 3:** Soil-specific:
- Inceptisol: 4.0★ (thermophilic optimal, well-aerated)
- Oxisol: 3.5★ (acid stress pH 4.4)
- Histosol: 2.5★ (waterlogging limits thermophilic activity)
- Spodosol: 3.8★ (sandy soil OK if moisture managed)
- Andisol: 4.2★ (volcanic high OM supports activity)
- Ultisol: 3.8★ (moderate performance pH 4.5)

**STEP 4:** Guardrails:
- Temperature gate: Requires 50-60°C (S0 thermophilic phase COMPATIBLE)
- No N2O risk (not N-fixer/denitrifier)
- No toxin production
- **APPROVED** for use

**STEP 5:** Supabase insert (see SQL above)

---

## 📌 FINAL REMINDERS

1. **Research Intensity 99** — minimum 10 sources per organism
2. **Anti-Hallucination** — zero tolerance for fake citations
3. **Guardrails** — safety ALWAYS overrides performance
4. **Tropical priority** — Indonesia/Malaysia sources first
5. **Canonical respect** — CLASS A values unchangeable
6. **Sharon approval** — all new organisms `is_approved = FALSE` until reviewed

**This prompt ensures CFI maintains A- (90/100) data quality standard.**

---

END OF MASTER PROMPT v2.0
Ready for production use.
