# S3 OBJECTIVES — SOIL-SPECIFIC WARNINGS & TARGETS
## To be integrated into S3 Targeting Tab

---

## DESIGN SPECIFICATION

**LOCATION:** S3 Page → Tab 4 "Soil Targeting" → Top section "Objectives"

**LAYOUT:** 
- Green card with transparent interior (matching AG Calculator)
- Objectives listed by soil type
- Red warning banners for critical deficiencies
- Amber alerts for moderate risks

---

## SOIL-SPECIFIC OBJECTIVES

### **HISTOSOL / PEAT (7% Indonesian palm area)**

**CRITICAL WARNINGS:**

```jsx
<div style={{
  background: "rgba(239,68,68,0.15)",
  border: "2px solid #ef4444",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
}}>
  <div style={{fontSize: 14, fontWeight: 700, color: "#ef4444", marginBottom: 8}}>
    ⚠️ MANDATORY CU & ZN FERTILIZATION
  </div>
  <div style={{fontSize: 12, color: "#fca5a5", lineHeight: 1.6}}>
    • Cu deficiency = "peat yellows" disease<br/>
    • Zn: 0.20–0.40 mg/kg (threshold 1.00) — CRITICAL<br/>
    • Cu: 0.40–0.80 mg/kg (threshold 1.50) — CRITICAL<br/>
    • Apply Cu/Zn regardless of soil test results<br/>
    • Source: Akvopedia 2024, Yara Malaysia, Malaysian peat studies 2012-2024
  </div>
</div>
```

**S3 OBJECTIVES:**
1. ✅ Deliver K — Highest K demand of any soil (4.2 kg/palm/yr)
2. ⚠️ Address Cu deficiency — Mandatory supplementation
3. ⚠️ Address Zn deficiency — Mandatory supplementation
4. ✅ Provide Ca — Reduce dolomite costs (S5B excellent Ca source)
5. ℹ️ P fixation LOW (18%) — NOT the CFI value story on peat

---

### **OXISOL (8% Indonesian palm area)**

**HIGH-PRIORITY WARNINGS:**

```jsx
<div style={{
  background: "rgba(245,158,11,0.15)",
  border: "2px solid #f59e0b",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
}}>
  <div style={{fontSize: 14, fontWeight: 700, color: "#f59e0b", marginBottom: 8}}>
    ⚠️ SEVERE B & ZN DEFICIENCY + CATASTROPHIC P FIXATION
  </div>
  <div style={{fontSize: 12, color: "#fbbf24", lineHeight: 1.6}}>
    • B: 0.15–0.35 mg/kg (threshold 0.50) — HIGH RISK<br/>
    • Zn: 0.30–0.70 mg/kg (threshold 1.00) — HIGH RISK<br/>
    • P fixation: 72–80% — Industry applies 200–250% of crop P<br/>
    • CFI organic P bypasses goethite adsorption entirely (2-3× TSP)
  </div>
</div>
```

**S3 OBJECTIVES:**
1. 🎯 PRIMARY MARKET — P fixation bypass is strongest CFI value proposition
2. ✅ Deliver organic P — 2-3× availability vs TSP
3. ⚠️ Correct B deficiency — Intensified in sandy/acidic Oxisols
4. ⚠️ Correct Zn deficiency — Severely deficient
5. ✅ Reduce N leaching (60% baseline) — CFI delivers 34-40% reduction

---

### **SPODOSOL (5% Indonesian palm area — Sandy soils)**

**HIGH-PRIORITY WARNINGS:**

```jsx
<div style={{
  background: "rgba(245,158,11,0.15)",
  border: "2px solid #f59e0b",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
}}>
  <div style={{fontSize: 14, fontWeight: 700, color: "#f59e0b", marginBottom: 8}}>
    ⚠️ EXTREME N LEACHING + B/ZN DEFICIENCY
  </div>
  <div style={{fontSize: 12, color: "#fbbf24", lineHeight: 1.6}}>
    • N leaching: 70% (highest of all soils) — Slow-release/NBPT mandatory<br/>
    • B: 0.12–0.28 mg/kg (threshold 0.50) — HIGH RISK (sandy, low OM)<br/>
    • Zn: 0.25–0.45 mg/kg (threshold 1.00) — HIGH RISK (low mineral content)<br/>
    • CEC: 2.0 cmol/kg (lowest fertility) — OM rebuilding only long-term solution
  </div>
</div>
```

**S3 OBJECTIVES:**
1. 🎯 CEC rebuilding from OM — 5-year transformation story
2. ✅ Reduce N leaching (70% baseline) — CFI delivers 34-40% reduction
3. ⚠️ Correct B deficiency — Sandy soils inherently low
4. ⚠️ Correct Zn deficiency — Low mineral/clay content
5. ℹ️ P banded application only — Broadcast loses >50% to leaching

---

### **ULTISOL (24% Indonesian palm — SECOND MOST COMMON)**

**MODERATE WARNINGS:**

```jsx
<div style={{
  background: "rgba(234,179,8,0.15)",
  border: "2px solid #eab308",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
}}>
  <div style={{fontSize: 14, fontWeight: 700, color: "#eab308", marginBottom: 8}}>
    ⚠️ SEVERE N LEACHING + P FIXATION
  </div>
  <div style={{fontSize: 12, color: "#facc15", lineHeight: 1.6}}>
    • N leaching: 50% — Coated/NBPT-treated urea recommended<br/>
    • P fixation: 52–65% — Industry applies 140–160% of crop P<br/>
    • B: 0.45–0.65 mg/kg (threshold 0.50) — MODERATE risk<br/>
    • Zn: 1.00–1.40 mg/kg (threshold 1.00) — BORDERLINE
  </div>
</div>
```

**S3 OBJECTIVES:**
1. 🎯 PRIMARY MARKET — P fixation bypass is strongest CFI value proposition
2. ✅ Deliver organic P — 1.5-2× availability vs TSP
3. ✅ Reduce N leaching (50% baseline) — CFI delivers 34-40% reduction
4. ℹ️ Monitor B — Borderline deficiency, test annually
5. ℹ️ Monitor Zn — Right at threshold, preventive fertilization recommended

---

### **INCEPTISOL (39% Indonesian palm — MOST COMMON)**

**BEST FERTILITY — MINIMAL WARNINGS:**

```jsx
<div style={{
  background: "rgba(34,197,94,0.15)",
  border: "2px solid #22c55e",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
}}>
  <div style={{fontSize: 14, fontWeight: 700, color: "#22c55e", marginBottom: 8}}>
    ✅ BEST FERTILITY OF 6 SOIL TYPES
  </div>
  <div style={{fontSize: 12, color: "#86efac", lineHeight: 1.6}}>
    • B: 0.55–0.75 mg/kg (threshold 0.50) — ADEQUATE<br/>
    • Zn: 1.30–1.70 mg/kg (threshold 1.00) — ADEQUATE<br/>
    • Cu: 2.20–3.00 mg/kg (threshold 1.50) — ADEQUATE<br/>
    • N leaching: 35% (moderate) — Slow-release urea recommended<br/>
    • P fixation: 28% (low-moderate) — Standard application
  </div>
</div>
```

**S3 OBJECTIVES:**
1. ✅ Moderate substitution — Good soil doesn't need intensive correction
2. ✅ Certification story — PSB + mycorrhizal inoculants for sustainability
3. ℹ️ Routine micronutrient monitoring — All within adequate ranges
4. ℹ️ Standard NPK management — No extreme leaching/fixation issues

---

### **ANDISOL (3% Indonesian palm area — Volcanic soils)**

**EXCELLENT FERTILITY — NO WARNINGS:**

```jsx
<div style={{
  background: "rgba(34,197,94,0.15)",
  border: "2px solid #22c55e",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
}}>
  <div style={{fontSize: 14, fontWeight: 700, color: "#22c55e", marginBottom: 8}}>
    ✅ VOLCANIC SOILS — EXCELLENT FERTILITY
  </div>
  <div style={{fontSize: 12, color: "#86efac", lineHeight: 1.6}}>
    • All micronutrients ADEQUATE (volcanic parent material)<br/>
    • B: 0.70–0.90 mg/kg — ADEQUATE<br/>
    • Zn: 1.50–1.90 mg/kg — ADEQUATE<br/>
    • Cu: 2.60–3.40 mg/kg — ADEQUATE<br/>
    • Low N leaching (20-30%), Low P fixation (18-26%)
  </div>
</div>
```

**S3 OBJECTIVES:**
1. ✅ Maintain excellent fertility — Preventive rather than corrective
2. ℹ️ Focus on OM maintenance — Preserve natural advantages
3. ℹ️ Routine monitoring only — No critical deficiencies

---

## INTEGRATION NOTES

**WHERE TO PLACE:**
- S3 → Tab 4 "Soil Targeting" → Top section
- Display ONLY the warning + objectives for the selected soil type
- User selects soil in S0 → S3 pulls from `cfi_soil_profiles` table

**SUPABASE QUERY:**
```javascript
const { data: soilData } = await supabase
  .from('cfi_soil_profiles')
  .select(`
    *,
    b_deficiency_threshold_mg_kg,
    zn_deficiency_threshold_mg_kg,
    cu_deficiency_threshold_mg_kg,
    b_confidence_tier,
    zn_confidence_tier,
    cu_confidence_tier
  `)
  .eq('soil_key', selectedSoilKey)
  .single();

// Check if deficient
const bDeficient = soilData.avail_b_degraded_mg_kg_low < soilData.b_deficiency_threshold_mg_kg;
const znDeficient = soilData.avail_zn_degraded_mg_kg_low < soilData.zn_deficiency_threshold_mg_kg;
const cuDeficient = soilData.avail_cu_degraded_mg_kg_low < soilData.cu_deficiency_threshold_mg_kg;

// Display appropriate warning banner
if (soilData.soil_key === 'histosol') {
  // RED CRITICAL WARNING
} else if (bDeficient || znDeficient) {
  // AMBER HIGH-PRIORITY WARNING
} else {
  // GREEN ALL CLEAR
}
```

---

**READY TO INTEGRATE INTO S3 TAB 4**
