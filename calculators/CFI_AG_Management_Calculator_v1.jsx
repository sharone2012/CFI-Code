import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

// ══════════════════════════════════════════════════════════════════════════
// CFI AG MANAGEMENT PLANNING CALCULATOR
// Company-specific soil nutrient gap analysis + CFI biofertiliser solutions
// Green theme matching NPK Value Calculator
// ══════════════════════════════════════════════════════════════════════════

const C = {
  // Green theme (matching Value Calculator)
  bg: "#07120A",
  card: "#0C1B0E",
  card2: "#0F220F",
  border: "#193519",
  border2: "#234A23",
  
  // Accent colors
  green: "#3CB371",      // Primary green (for border + highlights)
  greenBg: "#0A1F0E",    // Transparent green interior
  greenLt: "#86efac",
  teal: "#00C4A1",
  tealDk: "#009E85",
  
  // Supporting colors
  gold: "#D4A017",
  amber: "#E8A020",
  red: "#E74C3C",
  blue: "#5B9BD5",
  
  // Text
  text: "#C8E8C8",
  muted: "#6A8A6A",
  white: "#EEF8EE",
  black: "#000000",      // Interior tables use black
};

const fmt = (n, d=0) => Number(n || 0).toLocaleString("en-US", { minimumFractionDigits:d, maximumFractionDigits:d });
const fmtUSD = (n) => "$" + fmt(n, 2);

// ═══ SUBCOMPONENTS (matching Value Calculator style) ═══
const GreenCard = ({children, style={}}) => (
  <div style={{
    background: C.greenBg,
    border: `3px solid ${C.green}`,  // Bigger green border
    borderRadius: 12,
    padding: 24,
    ...style
  }}>
    {children}
  </div>
);

const BlackTable = ({children}) => (
  <div style={{
    background: C.black,  // Interior is black
    border: `1px solid ${C.border2}`,
    borderRadius: 8,
    padding: 16,
  }}>
    {children}
  </div>
);

const SectionTitle = ({icon, title, sub}) => (
  <div style={{marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.border}`}}>
    <div style={{display: "flex", alignItems: "center", gap: 10}}>
      <span style={{fontSize: 18}}>{icon}</span>
      <span style={{
        color: C.green,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase"
      }}>{title}</span>
    </div>
    {sub && <div style={{color: C.muted, fontSize: 11, marginTop: 6, fontStyle: "italic"}}>{sub}</div>}
  </div>
);

const Lbl = ({children}) => (
  <div style={{
    color: C.muted,
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 4
  }}>{children}</div>
);

const Row = ({label, children}) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  }}>
    <span style={{color: C.text, fontSize: 12}}>{label}</span>
    {children}
  </div>
);

const Inp = ({value, onChange, min, max, step=1, unit, w=80}) => (
  <div style={{display: "flex", alignItems: "center", gap: 6}}>
    <input
      type="number"
      value={value}
      onChange={e => onChange(+e.target.value)}
      min={min}
      max={max}
      step={step}
      style={{
        width: w,
        background: "#060F08",
        border: `1px solid ${C.border2}`,
        borderRadius: 4,
        color: "#7CC8FF",
        fontSize: 13,
        fontFamily: "'DM Mono', monospace",
        padding: "4px 8px",
        textAlign: "right",
        outline: "none"
      }}
    />
    {unit && <span style={{color: C.muted, fontSize: 11, minWidth: 30}}>{unit}</span>}
  </div>
);

const Metric = ({label, value, sub, col}) => (
  <GreenCard style={{textAlign: "center", minWidth: 140}}>
    <Lbl>{label}</Lbl>
    <div style={{
      color: col || C.green,
      fontSize: 28,
      fontFamily: "'DM Mono', monospace",
      fontWeight: 700,
      marginTop: 8,
      lineHeight: 1
    }}>{value}</div>
    {sub && <div style={{color: C.muted, fontSize: 10, marginTop: 6}}>{sub}</div>}
  </GreenCard>
);

// ═══ COMPANY DATA (pulled from Supabase in production) ═══
const COMPANY_INFO = {
  name: "DEMO ESTATE",
  location: "West Java, Indonesia",
  totalHa: 3500,
  palmAge: 12,
  soilType: "ultisol",
};

// Soil types (will pull from cfi_soil_profiles in production)
const SOILS = [
  {
    id: "inceptisol",
    name: "Inceptisols",
    local: "Alluvial Soils",
    pct: "39%",
    color: C.teal,
    nLeach: 35,
    pFix: 28,
    kLeach: 25,
  },
  {
    id: "ultisol",
    name: "Ultisols",
    local: "Podsolik Merah Kuning",
    pct: "24%",
    color: C.amber,
    nLeach: 50,
    pFix: 58,
    kLeach: 28,
  },
  {
    id: "oxisol",
    name: "Oxisols",
    local: "Latosol / Ferralsol",
    pct: "8%",
    color: "#f97316",
    nLeach: 60,
    pFix: 76,
    kLeach: 33,
  },
  {
    id: "histosol",
    name: "Histosols (Peat)",
    local: "Tanah Gambut",
    pct: "7%",
    color: "#a855f7",
    nLeach: 20,
    pFix: 18,
    kLeach: 40,
    cuZnMandatory: true,
  },
  {
    id: "spodosol",
    name: "Spodosols",
    local: "Sandy Entisols",
    pct: "5%",
    color: "#64748b",
    nLeach: 70,
    pFix: 35,
    kLeach: 43,
  },
];

// CFI Products (will pull from cfi_product_nutrients in production)
const CFI_PRODUCTS = [
  {
    id: "s3w1",
    name: "BIO-COMPOST+ (Wave 1)",
    stage: "S3",
    moisture: 55,
    nKgPerT: 9.00,
    pKgPerT: 0.675,
    kKgPerT: 3.825,
    caKgPerT: 0.585,
    mgKgPerT: 0.45,
    znGPerT: null, // DATA GAP
    bGPerT: null,  // DATA GAP
    cuGPerT: null, // DATA GAP
    defaultRateTHa: 25,
    valueUSDPerT: 32.14,
    nLeachReduction: 35,
  },
  {
    id: "s5a",
    name: "BIO-FERTILISER+ (Concentrated)",
    stage: "S5A",
    moisture: 25,
    nKgPerT: 22.50,
    pKgPerT: 3.15,
    kKgPerT: 7.875,
    caKgPerT: 8.625,
    mgKgPerT: 1.35,
    znGPerT: null,
    bGPerT: null,
    cuGPerT: null,
    defaultRateTHa: 10,
    valueUSDPerT: 59.96,
    nLeachReduction: 37,
  },
  {
    id: "s5b",
    name: "BIO-FERTILISER+ PROTEIN (BSF Frass)",
    stage: "S5B",
    moisture: 30,
    nKgPerT: 29.40,
    pKgPerT: 3.85,
    kKgPerT: 8.05,
    caKgPerT: 21.00,
    mgKgPerT: 1.75,
    znGPerT: null,
    bGPerT: null,
    cuGPerT: null,
    defaultRateTHa: 8,
    valueUSDPerT: 63.76,
    nLeachReduction: 37,
  },
];

// ═══ MAIN COMPONENT ═══
export default function CFI_AG_Management_Calculator() {
  const [companyName, setCompanyName] = useState(COMPANY_INFO.name);
  const [hectares, setHectares] = useState(COMPANY_INFO.totalHa);
  const [palmAge, setPalmAge] = useState(COMPANY_INFO.palmAge);
  const [selectedSoilId, setSelectedSoilId] = useState(COMPANY_INFO.soilType);
  const [selectedProductId, setSelectedProductId] = useState("s5a");
  const [applicationRate, setApplicationRate] = useState(10);

  const selectedSoil = SOILS.find(s => s.id === selectedSoilId);
  const selectedProduct = CFI_PRODUCTS.find(p => p.id === selectedProductId);

  // Calculate nutrient gaps (simplified for mockup)
  const palmsPerHa = 148;
  const totalPalms = hectares * palmsPerHa;
  
  // Soil baseline gaps (kg/ha/yr) - simplified
  const soilGaps = {
    n: palmAge < 8 ? 120 : palmAge < 15 ? 180 : 160,
    p: palmAge < 8 ? 30 : palmAge < 15 ? 45 : 40,
    k: palmAge < 8 ? 140 : palmAge < 15 ? 220 : 200,
    mg: 25,
    ca: 40,
    zn: 0.8,  // kg/ha/yr (NEW - was missing!)
    b: 0.15,
    cu: selectedSoilId === 'histosol' ? 0.5 : 0.1,
  };

  // CFI delivery (kg/ha/yr or g/ha/yr for micros)
  const cfiDelivery = {
    n: selectedProduct.nKgPerT * applicationRate,
    p: selectedProduct.pKgPerT * applicationRate,
    k: selectedProduct.kKgPerT * applicationRate,
    mg: selectedProduct.mgKgPerT * applicationRate,
    ca: selectedProduct.caKgPerT * applicationRate,
    zn: selectedProduct.znGPerT ? (selectedProduct.znGPerT * applicationRate) / 1000 : null,
    b: selectedProduct.bGPerT ? (selectedProduct.bGPerT * applicationRate) / 1000 : null,
    cu: selectedProduct.cuGPerT ? (selectedProduct.cuGPerT * applicationRate) / 1000 : null,
  };

  // Remaining gap after CFI
  const remainingGap = {
    n: Math.max(0, soilGaps.n - cfiDelivery.n),
    p: Math.max(0, soilGaps.p - cfiDelivery.p),
    k: Math.max(0, soilGaps.k - cfiDelivery.k),
    mg: Math.max(0, soilGaps.mg - cfiDelivery.mg),
    ca: Math.max(0, soilGaps.ca - cfiDelivery.ca),
    zn: cfiDelivery.zn ? Math.max(0, soilGaps.zn - cfiDelivery.zn) : soilGaps.zn,
    b: cfiDelivery.b ? Math.max(0, soilGaps.b - cfiDelivery.b) : soilGaps.b,
    cu: cfiDelivery.cu ? Math.max(0, soilGaps.cu - cfiDelivery.cu) : soilGaps.cu,
  };

  // Cost calculations (simplified)
  const synthCostUSD = {
    n: 0.35,
    p: 0.45,
    k: 0.38,
    mg: 0.42,
    ca: 0.12,
    zn: 1.85,  // per kg Zn
    b: 2.80,   // per kg B
    cu: 3.20,  // per kg Cu
  };

  const totalSynthCost = (
    soilGaps.n * synthCostUSD.n +
    soilGaps.p * synthCostUSD.p +
    soilGaps.k * synthCostUSD.k +
    soilGaps.mg * synthCostUSD.mg +
    soilGaps.ca * synthCostUSD.ca +
    soilGaps.zn * synthCostUSD.zn +
    soilGaps.b * synthCostUSD.b +
    soilGaps.cu * synthCostUSD.cu
  ) * hectares;

  const cfiCost = selectedProduct.valueUSDPerT * applicationRate * hectares;

  const remainingSynthCost = (
    remainingGap.n * synthCostUSD.n +
    remainingGap.p * synthCostUSD.p +
    remainingGap.k * synthCostUSD.k +
    remainingGap.mg * synthCostUSD.mg +
    remainingGap.ca * synthCostUSD.ca +
    (remainingGap.zn || 0) * synthCostUSD.zn +
    (remainingGap.b || 0) * synthCostUSD.b +
    (remainingGap.cu || 0) * synthCostUSD.cu
  ) * hectares;

  const totalWithCFI = cfiCost + remainingSynthCost;
  const savings = totalSynthCost - totalWithCFI;
  const savingsPerHa = savings / hectares;

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      padding: 32,
      fontFamily: "'DM Sans', sans-serif",
      color: C.text
    }}>
      
      {/* Header */}
      <div style={{maxWidth: 1400, margin: "0 auto 32px"}}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: C.green,
          marginBottom: 8,
          letterSpacing: "-0.02em"
        }}>
          AG Management Planning Calculator
        </h1>
        <p style={{color: C.muted, fontSize: 14}}>
          Company-specific nutrient gap analysis + CFI biofertiliser solutions
        </p>
      </div>

      {/* Main Content */}
      <div style={{maxWidth: 1400, margin: "0 auto", display: "grid", gap: 24}}>
        
        {/* Company Info */}
        <GreenCard>
          <SectionTitle
            icon="🏢"
            title="Company Information"
            sub="Enter estate details for tailored nutrient analysis"
          />
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16}}>
            <div>
              <Lbl>Company / Estate Name</Lbl>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                style={{
                  width: "100%",
                  background: "#060F08",
                  border: `1px solid ${C.border2}`,
                  borderRadius: 4,
                  color: C.text,
                  fontSize: 13,
                  padding: "6px 10px",
                  outline: "none"
                }}
              />
            </div>
            <div>
              <Lbl>Total Hectares</Lbl>
              <Inp value={hectares} onChange={setHectares} min={100} max={50000} step={100} unit="ha" w={120} />
            </div>
            <div>
              <Lbl>Average Palm Age (Years)</Lbl>
              <Inp value={palmAge} onChange={setPalmAge} min={3} max={25} unit="yrs" w={80} />
            </div>
            <div>
              <Lbl>Total Oil Palms</Lbl>
              <div style={{color: C.green, fontSize: 20, fontFamily: "'DM Mono', monospace", fontWeight: 700, marginTop: 8}}>
                {fmt(totalPalms, 0)}
              </div>
            </div>
          </div>
        </GreenCard>

        {/* Soil Selection */}
        <GreenCard>
          <SectionTitle
            icon="🌱"
            title="Soil Type Selection"
            sub="Select primary soil type for nutrient baseline calculations"
          />
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12}}>
            {SOILS.map(soil => (
              <div
                key={soil.id}
                onClick={() => setSelectedSoilId(soil.id)}
                style={{
                  padding: 16,
                  background: selectedSoilId === soil.id ? "#0D2A10" : "#060F08",
                  border: `2px solid ${selectedSoilId === soil.id ? C.green : C.border}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
                  <span style={{color: soil.color, fontSize: 12, fontWeight: 700}}>{soil.name}</span>
                  <span style={{color: C.muted, fontSize: 10}}>{soil.pct}</span>
                </div>
                <div style={{color: C.muted, fontSize: 10, marginBottom: 8}}>{soil.local}</div>
                <div style={{display: "flex", gap: 8, fontSize: 9, color: C.muted}}>
                  <span>N↓{soil.nLeach}%</span>
                  <span>P↓{soil.pFix}%</span>
                  <span>K↓{soil.kLeach}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Peat Warning */}
          {selectedSoilId === 'histosol' && (
            <div style={{
              marginTop: 16,
              background: "rgba(239,68,68,0.15)",
              border: "2px solid #ef4444",
              borderRadius: 8,
              padding: 16
            }}>
              <div style={{fontSize: 14, fontWeight: 700, color: "#ef4444", marginBottom: 6}}>
                ⚠️ MANDATORY FERTILIZATION REQUIRED
              </div>
              <div style={{fontSize: 12, color: "#fca5a5"}}>
                Cu & Zn fertilization is MANDATORY on peat soils regardless of soil test results.
                Peat inherently deficient due to mineral/clay deficiency. Cu deficiency = "peat yellows" disease.
                (Source: Akvopedia 2024, Yara Malaysia)
              </div>
            </div>
          )}
        </GreenCard>

        {/* CFI Product Selection */}
        <GreenCard>
          <SectionTitle
            icon="🌾"
            title="CFI Product Selection"
            sub="Choose CFI biofertiliser product + application rate"
          />
          <div style={{display: "grid", gridTemplateColumns: "1fr 200px", gap: 16}}>
            <div style={{display: "grid", gap: 10}}>
              {CFI_PRODUCTS.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  style={{
                    padding: 14,
                    background: selectedProductId === prod.id ? "#0D2A10" : "#060F08",
                    border: `2px solid ${selectedProductId === prod.id ? C.green : C.border}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
                    <span style={{color: C.green, fontSize: 13, fontWeight: 700}}>{prod.name}</span>
                    <span style={{color: C.amber, fontSize: 12, fontFamily: "'DM Mono', monospace"}}>
                      {fmtUSD(prod.valueUSDPerT)}/t
                    </span>
                  </div>
                  <div style={{display: "flex", gap: 12, fontSize: 10, color: C.muted}}>
                    <span>N {prod.nKgPerT} kg/t</span>
                    <span>P {prod.pKgPerT} kg/t</span>
                    <span>K {prod.kKgPerT} kg/t</span>
                    <span>MC {prod.moisture}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Lbl>Application Rate</Lbl>
              <Inp value={applicationRate} onChange={setApplicationRate} min={1} max={50} unit="t/ha/yr" w={100} />
              <div style={{marginTop: 12, fontSize: 10, color: C.muted}}>
                Default: {selectedProduct.defaultRateTHa} t/ha/yr
              </div>
            </div>
          </div>
        </GreenCard>

        {/* Nutrient Gap Analysis */}
        <GreenCard>
          <SectionTitle
            icon="📊"
            title="Nutrient Gap Analysis"
            sub={`${companyName} • ${selectedSoil.name} • Age ${palmAge} years • ${hectares.toLocaleString()} ha`}
          />
          
          <BlackTable>
            <div style={{overflowX: "auto"}}>
              <table style={{width: "100%", borderCollapse: "collapse"}}>
                <thead>
                  <tr style={{borderBottom: `1px solid ${C.border2}`}}>
                    <th style={{textAlign: "left", padding: 10, color: C.muted, fontSize: 11, fontWeight: 600}}>NUTRIENT</th>
                    <th style={{textAlign: "right", padding: 10, color: C.muted, fontSize: 11, fontWeight: 600}}>SOIL GAP<br/><span style={{fontSize: 9}}>(kg/ha/yr)</span></th>
                    <th style={{textAlign: "right", padding: 10, color: C.green, fontSize: 11, fontWeight: 600}}>CFI DELIVERS<br/><span style={{fontSize: 9}}>(kg/ha/yr)</span></th>
                    <th style={{textAlign: "right", padding: 10, color: C.amber, fontSize: 11, fontWeight: 600}}>REMAINING GAP<br/><span style={{fontSize: 9}}>(kg/ha/yr)</span></th>
                    <th style={{textAlign: "right", padding: 10, color: C.muted, fontSize: 11, fontWeight: 600}}>SYNTH COST<br/><span style={{fontSize: 9}}>($/ha/yr)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {label: "N (Nitrogen)", gap: soilGaps.n, deliv: cfiDelivery.n, remaining: remainingGap.n, cost: synthCostUSD.n},
                    {label: "P (Phosphorus)", gap: soilGaps.p, deliv: cfiDelivery.p, remaining: remainingGap.p, cost: synthCostUSD.p},
                    {label: "K (Potassium)", gap: soilGaps.k, deliv: cfiDelivery.k, remaining: remainingGap.k, cost: synthCostUSD.k},
                    {label: "Mg (Magnesium)", gap: soilGaps.mg, deliv: cfiDelivery.mg, remaining: remainingGap.mg, cost: synthCostUSD.mg},
                    {label: "Ca (Calcium)", gap: soilGaps.ca, deliv: cfiDelivery.ca, remaining: remainingGap.ca, cost: synthCostUSD.ca},
                    {label: "Zn (Zinc)", gap: soilGaps.zn, deliv: cfiDelivery.zn, remaining: remainingGap.zn, cost: synthCostUSD.zn, isMicro: true},
                    {label: "B (Boron)", gap: soilGaps.b, deliv: cfiDelivery.b, remaining: remainingGap.b, cost: synthCostUSD.b, isMicro: true},
                    {label: "Cu (Copper)", gap: soilGaps.cu, deliv: cfiDelivery.cu, remaining: remainingGap.cu, cost: synthCostUSD.cu, isMicro: true},
                  ].map((row, i) => (
                    <tr key={i} style={{borderBottom: `1px solid ${C.border}`}}>
                      <td style={{padding: 10, color: C.text, fontSize: 12}}>{row.label}</td>
                      <td style={{padding: 10, textAlign: "right", color: C.text, fontSize: 12, fontFamily: "'DM Mono', monospace"}}>
                        {fmt(row.gap, row.isMicro ? 2 : 1)}
                      </td>
                      <td style={{padding: 10, textAlign: "right", color: C.green, fontSize: 12, fontFamily: "'DM Mono', monospace"}}>
                        {row.deliv ? fmt(row.deliv, row.isMicro ? 2 : 1) : <span style={{color: C.red}}>DATA GAP</span>}
                      </td>
                      <td style={{padding: 10, textAlign: "right", color: C.amber, fontSize: 12, fontFamily: "'DM Mono', monospace"}}>
                        {row.remaining !== null ? fmt(row.remaining, row.isMicro ? 2 : 1) : <span style={{color: C.red}}>—</span>}
                      </td>
                      <td style={{padding: 10, textAlign: "right", color: C.muted, fontSize: 11, fontFamily: "'DM Mono', monospace"}}>
                        {fmtUSD(row.remaining * row.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(cfiDelivery.zn === null || cfiDelivery.b === null || cfiDelivery.cu === null) && (
              <div style={{
                marginTop: 16,
                padding: 12,
                background: "rgba(245,158,11,0.1)",
                border: "1px solid #f59e0b",
                borderRadius: 6
              }}>
                <div style={{fontSize: 11, color: "#fbbf24", fontWeight: 600, marginBottom: 4}}>
                  ⚠️ MICRONUTRIENT DATA GAP
                </div>
                <div style={{fontSize: 10, color: C.muted}}>
                  B, Zn, Cu delivery values require ICP-OES Package C lab analysis on S3/S5 products ($450-600, 5-7 day turnaround).
                  Contact lab@cfi.com to schedule testing.
                </div>
              </div>
            )}
          </BlackTable>
        </GreenCard>

        {/* Cost Summary */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16}}>
          <Metric
            label="Synthetic Only Cost"
            value={fmtUSD(totalSynthCost / hectares)}
            sub="per hectare per year"
            col={C.red}
          />
          <Metric
            label="CFI Product Cost"
            value={fmtUSD(cfiCost / hectares)}
            sub="per hectare per year"
            col={C.green}
          />
          <Metric
            label="Remaining Synth Cost"
            value={fmtUSD(remainingSynthCost / hectares)}
            sub="after CFI application"
            col={C.amber}
          />
          <Metric
            label="Annual Savings"
            value={fmtUSD(savingsPerHa)}
            sub="per hectare per year"
            col={C.teal}
          />
        </div>

        <GreenCard>
          <div style={{textAlign: "center"}}>
            <div style={{color: C.muted, fontSize: 12, marginBottom: 8}}>TOTAL ESTATE SAVINGS</div>
            <div style={{color: C.green, fontSize: 48, fontWeight: 700, fontFamily: "'DM Mono', monospace"}}>
              {fmtUSD(savings)}
            </div>
            <div style={{color: C.muted, fontSize: 11, marginTop: 6}}>
              per year across {hectares.toLocaleString()} hectares
            </div>
          </div>
        </GreenCard>

      </div>
    </div>
  );
}
