<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CFI TARV Widget</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@500;700&family=Roboto+Mono:wght@400;500;700&display=swap"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0B1422; font-family: 'DM Sans', sans-serif; color: #F0F4F8; padding: 24px; }

  .wrap { max-width: 920px; border: 1.5px solid #1E6B8C; border-radius: 10px; overflow: hidden; }

  /* Header — LOCKED except .hdr-title (changes A + B) */
  .hdr { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:#070D16; border-bottom:1px solid #1E6B8C; }

  /* CHANGE B — matches .ph h1 from S3: Syne 700 17px teal */
  .hdr-title { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:#00C9B1; letter-spacing:0; text-transform:none; }

  .hdr-sub { font-size:10px; color:#A8B8C7; margin-top:3px; }
  .toggle { display:flex; gap:4px; }
  .toggle button { padding:5px 12px; font-size:11px; font-family:'DM Sans',sans-serif; font-weight:600; cursor:pointer; border-radius:5px; border:1px solid #1A3A5C; background:#111E33; color:#A8B8C7; transition:all 0.15s; }
  .toggle button.active { background:#00C9B1; color:#070D16; border-color:#00C9B1; }

  /* col-hdr — DM Sans 700 12px #A8B8C7 matching S3 .col-hdr th; first col centred */
  .col-hdr { display:grid; grid-template-columns:201px 72px 76px 1fr 1fr 90px 90px 110px; gap:8px; padding:5px 16px; background:#070E1C; border-bottom:1px solid #1E6B8C; }
  .col-hdr span { font-size:12px; font-family:'DM Sans',sans-serif; font-weight:700; text-transform:none; letter-spacing:0; color:#A8B8C7; text-align:center; }
  .col-hdr span:first-child { text-align:left; padding-left:4px; }

  /* ── COLLAPSIBLE GROUPS ── */
  .g-hdr { display:flex; align-items:center; justify-content:space-between; padding:5px 16px; border-left:3px solid; border-top:1px solid rgba(30,107,140,.3); border-bottom:1px solid rgba(30,107,140,.2); background:rgba(0,201,177,.04); cursor:pointer; user-select:none; }
  .g-hdr span { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; color:#40D9C8; letter-spacing:0; text-transform:none; }
  /* Change 1: "Details" label instead of arrow */
  .g-chevron { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:400; color:#C4D3E0 !important; letter-spacing:0.03em; cursor:pointer; transition:opacity 0.15s; }
  .g-chevron::before { content:'See more ▾'; }
  .g-chevron.open::before { content:'See less ▴'; }
  .g-rows { overflow:hidden; transition:max-height 0.3s ease; max-height:0; }
  .g-rows.open { max-height:600px; }

  /* Nutrient row — S3 color/font scheme */
  .n-row { display:grid; grid-template-columns:201px 72px 76px 1fr 1fr 90px 90px 110px; gap:8px; align-items:center; padding:7px 16px; border-bottom:1px solid rgba(30,107,140,.14); background:#060C14; }
  .n-row:hover { background:rgba(26,58,92,.45); }
  /* ── UNIFIED GREY: #A8B8C7 — every grey text in this document uses this single value ── */
  .n-name { font-size:12px; font-family:'DM Sans',sans-serif; font-weight:600; color:#C4A882; text-align:left; }
  .n-note { font-size:10px; font-family:'DM Sans',sans-serif; color:#C4A882; margin-top:2px; text-align:left; }
  .num { font-size:13px; font-family:'DM Mono',monospace; font-weight:700; text-align:center; color:#40D9C8; }
  /* synth col: price and /t in light red */
  .synth-price { font-size:13px; font-family:'DM Mono',monospace; font-weight:700; color:#C4A882; text-align:center; }
  .synth-name { font-size:13px; font-family:'DM Sans',sans-serif; color:#C4A882; text-align:center; }
  .bar-track { height:7px; background:#0D1B2A; border-radius:4px; overflow:hidden; }
  .bar-fill { height:100%; border-radius:4px; transition:width 0.45s ease; opacity:0.85; }
  .val-num { font-size:13px; font-family:'DM Sans',sans-serif; font-weight:700; text-align:center; color:#C4A882; }
  .val-fw  { font-size:13px; font-family:'DM Sans',sans-serif; font-weight:700; text-align:center; color:#40D9C8; }

  /* ── UNIFIED REPLACEMENT VALUE + TARV SECTION ── */
  .rv-section { border-top:1px solid #1E6B8C; }

  /* Top row: "Replacement Value" label + 4 category columns */
  .rv-row { display:grid; grid-template-columns:130px 1fr 1fr 1fr 1fr; align-items:center; padding:10px 16px; border-bottom:1px solid rgba(0,201,177,.18); gap:0; background:rgba(0,201,177,0.07); }
  .rv-row-lbl { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#C4A882; text-align:left; line-height:1.3; }
  .rv-col { text-align:center; padding:0 6px; border-right:1px solid rgba(0,201,177,.15); }
  .rv-col:last-child { border-right:none; }
  /* category name — 11px label above */
  .rv-cat { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:#C4A882; margin-bottom:4px; }
  /* dollar number + /t DM — 16px */
  .rv-num { font-family:'DM Sans',sans-serif; font-size:16px; font-weight:700; color:#C4A882; }
  .rv-unit { font-family:'DM Sans',sans-serif; font-size:14px; color:#C4A882; margin-left:2px; }

  /* TARV row: full width, left label + right total */
  .tarv-row { display:grid; grid-template-columns:130px 1fr 1fr 1fr 1fr; align-items:center; padding:10px 16px; background:rgba(0,201,177,0.07); border-top:1px solid rgba(0,201,177,.18); gap:0; }
  .tarv-left { text-align:left; grid-column:1 / 5; }
  .tarv-lbl { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#F5A623; }
  /* tarv-desc → 12px */
  .tarv-desc { font-family:'DM Sans',sans-serif; font-size:11px; color:#F5A623; margin-top:3px; opacity:0.75; }
  .tarv-right { text-align:center; grid-column:5 / 6; }
  /* tarv-hero (amber $) → 16px */
  .tarv-hero { font-family:'DM Sans',sans-serif; font-size:16px; font-weight:700; color:#F5A623; }
  /* tarv-fw (row below amber) → 12px */
  .tarv-fw { font-family:'DM Sans',sans-serif; font-size:11px; color:#F5A623; margin-top:3px; }


  /* ── HOW WE CALCULATE MODAL ── */
  .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.72); z-index:1000; align-items:center; justify-content:center; }
  .modal-overlay.open { display:flex; }
  .modal-box { background:#0B1422; border:1.5px solid #1E6B8C; border-radius:10px; width:660px; max-width:95vw; max-height:88vh; overflow-y:auto; font-family:'DM Sans',sans-serif; }
  .modal-box::-webkit-scrollbar { width:4px; }
  .modal-box::-webkit-scrollbar-thumb { background:#1E6B8C; border-radius:2px; }
  .modal-hdr { display:flex; justify-content:space-between; align-items:center; padding:14px 18px; background:#070D16; border-bottom:1px solid #1E6B8C; position:sticky; top:0; }
  .modal-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#00C9B1; }
  .modal-close { background:transparent; border:1px solid #1A3A5C; color:#A8B8C7; border-radius:5px; padding:4px 12px; font-family:'DM Sans',sans-serif; font-size:11px; cursor:pointer; }
  .modal-close:hover { border-color:#00C9B1; color:#00C9B1; }
  .modal-body { padding:16px 18px; }
  .modal-section { margin-bottom:18px; }
  .modal-step-label { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:700; color:#00C9B1; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:6px; }
  .modal-step-title { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#F0F4F8; margin-bottom:8px; }
  .modal-table { width:100%; border-collapse:collapse; font-size:11px; margin-bottom:6px; }
  .modal-table th { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:700; color:#A8B8C7; padding:5px 8px; text-align:center; background:#070E1C; border-bottom:1px solid #1E6B8C; }
  .modal-table th.lft { text-align:left; }
  .modal-table td { font-family:'DM Sans',sans-serif; font-size:11px; color:#C4A882; padding:6px 8px; text-align:center; border-bottom:1px solid rgba(30,107,140,.18); }
  .modal-table td.lft { font-family:'DM Sans',sans-serif; color:#F0F4F8; text-align:left; }
  .modal-table td.teal { color:#40D9C8; }
  .modal-table td.amber { color:#F5A623; font-weight:700; }
  .modal-table td.grey { color:#A8B8C7; }
  .modal-formula { background:#060C14; border-left:3px solid #1E6B8C; border-radius:0 4px 4px 0; padding:8px 12px; font-family:'DM Sans',sans-serif; font-size:11px; color:#40D9C8; line-height:1.8; margin-bottom:6px; }
  .modal-note { font-family:'DM Sans',sans-serif; font-size:10px; color:#A8B8C7; font-style:italic; line-height:1.6; padding:6px 0; }
  .modal-divider { border:none; border-top:1px solid rgba(30,107,140,.3); margin:14px 0; }
  .modal-tier { border-radius:6px; padding:10px 12px; margin-bottom:10px; border:1px solid rgba(30,107,140,.3); }
  .modal-tier-label { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:6px; }
  /* trigger button */
  .calc-explain-btn { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; background:rgba(0,201,177,0.07); border:1px solid #00C9B1; border-radius:5px; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:700; color:#F5A623; cursor:pointer; transition:all 0.15s; }
  .calc-explain-btn:hover { background:rgba(0,201,177,0.16); border-color:#40D9C8; color:#F5A623; }
  .note { padding:8px 16px; background:#070D16; border-top:1px solid #1A2F45; font-size:10px; color:#A8B8C7; line-height:1.6; font-style:italic; }
  /* ── PER-ROW CALCULATE BUTTON ── */
  .row-calc-btn { display:inline-flex; align-items:center; justify-content:center; padding:6px 14px; background:rgba(0,201,177,0.07); border:1px solid #00C9B1; border-radius:5px; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:700; color:#00C9B1; cursor:pointer; white-space:nowrap; transition:all 0.15s; }
  .row-calc-btn:hover { background:rgba(0,201,177,0.16); border-color:#40D9C8; color:#40D9C8; }
  /* ── PER-ROW INLINE CALCULATOR (removed) ── */
  .row-calc { margin:0 12px 6px; padding:6px 14px; background:rgba(0,201,177,0.07); border:1px solid rgba(0,201,177,0.45); border-radius:5px; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .row-calc-label { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:700; color:#00C9B1; letter-spacing:0.08em; text-transform:uppercase; white-space:nowrap; }
  .row-calc-formula { font-family:'DM Sans',sans-serif; font-size:10px; line-height:1.6; }
  .row-calc-formula .op  { color:#A8B8C7; }
  .row-calc-formula .val { color:#F5A623; font-weight:700; }
  .row-calc-formula .lbl { color:#C4A882; }
</style>
</head>
<body>

<div class="wrap">

  <!-- Header -->
  <div class="hdr">
    <div>
      <!-- CHANGE: title text + font matches .ph h1 in S3 -->
      <div class="hdr-title">Value Calculator</div>
      <!-- sub text LOCKED -->
      <div class="hdr-sub">Per tonne DM · synthetic price equivalent · March 2026</div>
    </div>
    <!-- LOCKED — buttons, order, labels unchanged from v2 -->
    <div class="toggle">
      <button class="active" onclick="setPathway('s5a',this)">S5A BioFert</button>
      <button onclick="setPathway('s5b',this)">S5B BioFert+</button>
    </div>
  </div>

  <!-- Column header — all centred; Signal renamed to Value Bar -->
  <div class="col-hdr">
    <span>Nutrient / Component</span>
    <span>% DM</span>
    <span>kg / t DM</span>
    <span>Synthetic Mineral</span>
    <span>Ref Price</span>
    <span>$ / t FW</span>
    <span>$ / t DM</span>
    <span></span>
  </div>

  <!-- Rows -->
  <div id="rows"></div>

  <!-- Unified replacement value + TARV section -->
  <div id="rv-section"></div>

  <!-- Footnote + How We Calculate button -->
  <div class="note">
    1:1 synthetic mass equivalence. CFI nutrients release more slowly, leach less and resist P fixation
    on acid soils — real agronomic value exceeds this figure.
    Prices: Urea $394/t · DAP $665/t · MOP $380/t · Indonesia Nov 2025.
  </div>

</div>

<!-- ── HOW WE CALCULATE MODAL ── -->
<div class="modal-overlay" id="calcModal" onclick="closeOnOverlay(event)">
  <div class="modal-box">

    <div class="modal-hdr">
      <div class="modal-title">How We Calculate This</div>
      <button class="modal-close" onclick="closeCalcModal()">Close ✕</button>
    </div>

    <div class="modal-body">

      <!-- Source -->
      <div class="modal-section">
        <div class="modal-step-label">Source</div>
        <div class="modal-step-title">Indonesia Synthetic Mineral Prices</div>
        <div class="modal-note">All prices from Indonesia market reference, November 2025. CFI nutrient content from lab-verified canonical values per product pathway.</div>
      </div>

      <hr class="modal-divider">

      <!-- Step 1 -->
      <div class="modal-section">
        <div class="modal-step-label">Step 1</div>
        <div class="modal-step-title">Synthetic fertiliser — price per kg of nutrient</div>
        <table class="modal-table">
          <thead><tr>
            <th class="lft">Nutrient</th>
            <th>Synthetic source</th>
            <th>$/t product</th>
            <th>Nutrient kg/t</th>
            <th>$/kg nutrient</th>
          </tr></thead>
          <tbody>
            <tr><td class="lft">N</td><td class="grey">Urea (46% N)</td><td>$394</td><td>460 kg</td><td class="teal">$0.856</td></tr>
            <tr><td class="lft">P₂O₅</td><td class="grey">DAP (46% P₂O₅)</td><td>$665</td><td>460 kg</td><td class="teal">$1.446</td></tr>
            <tr><td class="lft">K₂O</td><td class="grey">MOP (60% K₂O)</td><td>$380</td><td>600 kg</td><td class="teal">$0.633</td></tr>
          </tbody>
        </table>
        <div class="modal-formula">$/kg nutrient = Cost per tonne ÷ Nutrient content (kg/t)</div>
      </div>

      <hr class="modal-divider">

      <!-- Step 2 -->
      <div class="modal-section">
        <div class="modal-step-label">Step 2</div>
        <div class="modal-step-title">CFI product — nutrient kg per tonne (1:1 mass equivalence)</div>
        <div class="modal-note">CFI frass contains N, P₂O₅ and K₂O. We apply the same $/kg nutrient from Step 1 to calculate what it would cost to buy those nutrients synthetically.</div>
        <div class="modal-formula">
          CFI value = CFI nutrient kg/t DM × $/kg nutrient (from Step 1)<br>
          Example (S5B BioFert+): 42 kg/t DM × $1.465/kg N = $61.54 /t DM
        </div>
        <div class="modal-note">This is a 1:1 mass comparison only. CFI nutrients have additional agronomic advantages not captured here — see management tier adjustments below.</div>
      </div>

      <hr class="modal-divider">

      <!-- Step 3 — Ag management tiers -->
      <div class="modal-section">
        <div class="modal-step-label">Step 3</div>
        <div class="modal-step-title">Agricultural management tier — true synthetic cost</div>
        <div class="modal-note">Synthetic fertilisers suffer losses through leaching, volatilisation and P fixation. To deliver the same plant-available nutrient as CFI product, more synthetic must be applied. These tiers are from your Indonesia dataset.</div>

        <div class="modal-tier" style="background:rgba(0,201,177,0.05);">
          <div class="modal-tier-label" style="color:#40D9C8;">Very Good Agricultural Management (VGAM)</div>
          <table class="modal-table">
            <thead><tr><th class="lft">Nutrient</th><th>Loss/fixation</th><th>Extra kg required</th><th>Extra cost</th><th class="amber">True $/kg</th></tr></thead>
            <tbody>
              <tr><td class="lft">N</td><td>10%</td><td>+46 kg</td><td>+$39.40</td><td class="amber">$0.943</td></tr>
              <tr><td class="lft">P₂O₅</td><td>20%</td><td>+92 kg</td><td>+$133</td><td class="amber">$1.735</td></tr>
              <tr><td class="lft">K₂O</td><td>0%</td><td>—</td><td>—</td><td class="amber">$0.633</td></tr>
            </tbody>
          </table>
        </div>

        <div class="modal-tier" style="background:rgba(245,166,35,0.04);">
          <div class="modal-tier-label" style="color:#C4A882;">Normal Agricultural Management</div>
          <table class="modal-table">
            <thead><tr><th class="lft">Nutrient</th><th>Loss/fixation</th><th>Extra kg required</th><th>Extra cost</th><th class="amber">True $/kg</th></tr></thead>
            <tbody>
              <tr><td class="lft">N</td><td>20%</td><td>+92 kg</td><td>+$78.80</td><td class="amber">$1.027</td></tr>
              <tr><td class="lft">P₂O₅</td><td>40%</td><td>+184 kg</td><td>+$266</td><td class="amber">$2.024</td></tr>
              <tr><td class="lft">K₂O</td><td>0%</td><td>—</td><td>—</td><td class="amber">$0.633</td></tr>
            </tbody>
          </table>
        </div>

        <div class="modal-tier" style="background:rgba(232,64,64,0.04);">
          <div class="modal-tier-label" style="color:#E84040;">Poor Agricultural Management</div>
          <table class="modal-table">
            <thead><tr><th class="lft">Nutrient</th><th>Loss/fixation</th><th>Extra kg required</th><th>Extra cost</th><th class="amber">True $/kg</th></tr></thead>
            <tbody>
              <tr><td class="lft">N</td><td>50%</td><td>+230 kg</td><td>+$197</td><td class="amber">$1.284</td></tr>
              <tr><td class="lft">P₂O₅</td><td>80%</td><td>+368 kg</td><td>+$532</td><td class="amber">$2.603</td></tr>
              <tr><td class="lft">K₂O</td><td>0%</td><td>—</td><td>—</td><td class="amber">$0.633</td></tr>
            </tbody>
          </table>
        </div>

        <div class="modal-note">CFI biofertiliser does not suffer these losses: organic N releases slowly via microbial mineralisation; organic P bypasses Fe/Al fixation; K is retained by humic acid CEC. The value calculator on this widget uses 1:1 parity (VGAM equivalent) as the conservative baseline.</div>
      </div>

      <hr class="modal-divider">

      <!-- Step 4 — TARV -->
      <div class="modal-section">
        <div class="modal-step-label">Step 4</div>
        <div class="modal-step-title">TARV — Total Agronomic Replacement Value</div>
        <div class="modal-formula">
          TARV /t DM = N value + P₂O₅ value + K₂O value + Ca value + Mg value<br>
                     + Organic Matter value + Humic acid value + Fulvic acid value<br>
                     + Chitin value (S5B/S5A pathways only)<br><br>
          TARV /t FW = TARV /t DM × DM fraction (S5B = 70%, S5A = 75%)
        </div>
        <div class="modal-note">TARV is NOT the CFI selling price. It is the cost to replicate all components synthetically — an investment justification tool showing the estate what it would cost to buy equivalent inputs on the open market.</div>
      </div>

    </div>
  </div>
</div>

<script>
/* LOCKED */
const P = {
  n:      674  / 460,
  p:      720  / 201,
  k:      488  / 498,
  ca:     80   / 350,
  mg:     290  / 150,
  om:     60   / 1000,
  humic:  500  / 1000,
  fulvic: 900  / 1000,
  chitin: 200  / 1000,
};

/* LOCKED */
const DATA = {
  s5b: [
    { g:"npk",     name:"Nitrogen (N)",      note:"Full N retained — no larval loss",     pct:4.20, kg:42.0,  pk:"n",     synth:"Urea 46-0-0",        sp:"$674/t",  col:"#00C9B1", bar:62 },
    { g:"npk",     name:"Phosphorus (P)",    note:"Element basis · P₂O₅ × 0.437",        pct:0.55, kg:5.5,   pk:"p",     synth:"TSP 0-46-0",         sp:"$720/t",  col:"#F5A623", bar:29 },
    { g:"npk",     name:"Potassium (K)",     note:"Element basis · K₂O × 0.830",         pct:1.15, kg:11.5,  pk:"k",     synth:"MOP 0-0-60",         sp:"$488/t",  col:"#3DCB7A", bar:17 },
    { g:"mineral", name:"Calcium (Ca)",      note:"pH buffering + structural balance",    pct:3.00, kg:30.0,  pk:"ca",    synth:"Ag lime",            sp:"$80/t",   col:"#4A9EDB", bar:34 },
    { g:"mineral", name:"Magnesium (Mg)",    note:"Chlorophyll co-factor",               pct:0.25, kg:2.5,   pk:"mg",    synth:"Kieserite 15% Mg",   sp:"$290/t",  col:"#9B59B6", bar:48 },
    { g:"beyond",  name:"Organic matter",    note:"Soil carbon + CEC building",          pct:70.0, kg:700.0, pk:"om",    synth:"OM concentrate",     sp:"$60/t",   col:"#8BA0B4", bar:35 },
    { g:"beyond",  name:"Humic acid",        note:"Fe/Al chelator · root stimulant",     pct:11.5, kg:115.0, pk:"humic", synth:"Humic granules IDN", sp:"$500/t",  col:"#C4D3E0", bar:48 },
    { g:"beyond",  name:"Fulvic acid",       note:"Bioavailable · critical pH 3.8 soils",pct:3.5,  kg:35.0,  pk:"fulvic",synth:"Fulvic acid IDN",    sp:"$900/t",  col:"#8BA0B4", bar:26 },
    { g:"beyond",  name:"Chitin",      note:"Nematode ISR trigger · S5B max",      pct:4.0,  kg:40.0,  pk:"chitin",synth:"Shrimp shell equiv", sp:"$200/t",  col:"#9B59B6", bar:7  },
  ],
  s5a: [
    { g:"npk",     name:"Nitrogen (N)",      note:"Larvae extracted — N in insect meal",  pct:1.80, kg:18.0,  pk:"n",     synth:"Urea 46-0-0",        sp:"$674/t",  col:"#00C9B1", bar:26 },
    { g:"npk",     name:"Phosphorus (P)",    note:"Conserved through bioconversion",      pct:0.55, kg:5.5,   pk:"p",     synth:"TSP 0-46-0",         sp:"$720/t",  col:"#F5A623", bar:29 },
    { g:"npk",     name:"Potassium (K)",     note:"Conserved",                            pct:1.15, kg:11.5,  pk:"k",     synth:"MOP 0-0-60",         sp:"$488/t",  col:"#3DCB7A", bar:17 },
    { g:"mineral", name:"Calcium (Ca)",      note:"pH buffering + structural balance",    pct:3.00, kg:30.0,  pk:"ca",    synth:"Ag lime",            sp:"$80/t",   col:"#4A9EDB", bar:34 },
    { g:"mineral", name:"Magnesium (Mg)",    note:"Chlorophyll co-factor",               pct:0.25, kg:2.5,   pk:"mg",    synth:"Kieserite 15% Mg",   sp:"$290/t",  col:"#9B59B6", bar:48 },
    { g:"beyond",  name:"Organic matter",    note:"Slightly lower — larvae consumed some",pct:65.0, kg:650.0, pk:"om",    synth:"OM concentrate",     sp:"$60/t",   col:"#8BA0B4", bar:33 },
    { g:"beyond",  name:"Humic acid",        note:"Unchanged — microbial backbone",       pct:11.5, kg:115.0, pk:"humic", synth:"Humic granules IDN", sp:"$500/t",  col:"#C4D3E0", bar:48 },
    { g:"beyond",  name:"Fulvic acid",       note:"Unchanged",                            pct:3.5,  kg:35.0,  pk:"fulvic",synth:"Fulvic acid IDN",    sp:"$900/t",  col:"#8BA0B4", bar:26 },
    { g:"beyond",  name:"Chitin",      note:"Reduced — exoskeleton in insect meal", pct:1.5,  kg:15.0,  pk:"chitin",synth:"Shrimp shell equiv", sp:"$200/t",  col:"#9B59B6", bar:3  },
  ]
};

/* LOCKED */
const GROUPS = {
  npk:     { label:"Macro N · P · K",    border:"#00C9B1" },
  mineral: { label:"Secondary minerals", border:"#4A9EDB" },
  beyond:  { label:"Beyond NPK",         border:"#8BA0B4" },
};

/* LOCKED */
function barCol(g) {
  if (g === 'npk')     return '#00C9B1';
  if (g === 'mineral') return '#4A9EDB';
  return '#8BA0B4';
}

function v(row)   { return row.kg * P[row.pk]; }
function fmtD(n)  { return '$' + n.toFixed(2); }

/* LOCKED */
function valCol(val) {
  if (val >= 50) return '#F5A623';
  if (val >= 15) return '#3DCB7A';
  return '#8BA0B4';
}

function toggleGroup(gid) {
  const rows = document.getElementById('g-rows-' + gid);
  const chev = document.getElementById('g-chev-' + gid);
  if (!rows) return;
  rows.classList.toggle('open');
  chev.classList.toggle('open');
}

function render(pw) {
  const rows = DATA[pw];
  const dmFrac = pw === 's5b' ? 0.35 : 0.30;
  const groups = ['npk','mineral','beyond'];
  let html = '';

  groups.forEach(gid => {
    const g = GROUPS[gid];
    const gRows = rows.filter(r => r.g === gid);
    const isOpen = gid === 'npk';

    html += `<div>
      <div class="g-hdr" style="border-left-color:${g.border}" onclick="toggleGroup('${gid}')">
        <span>${g.label}</span>
        <span class="g-chevron${isOpen?' open':''}" id="g-chev-${gid}"></span>
      </div>
      <div class="g-rows${isOpen?' open':''}" id="g-rows-${gid}">`;

    gRows.forEach(r => {
      const rv    = v(r);
      const rvFW  = rv * dmFrac;
      html += `<div class="n-row">
        <div style="text-align:left; padding-left:4px;">
          <div class="n-name">${r.name}</div>
          <div class="n-note">${r.note}</div>
        </div>
        <div style="text-align:center">
          <div class="num">${r.pct < 1 ? r.pct.toFixed(2) : r.pct.toFixed(1)}<span style="font-size:10px;font-weight:400;margin-left:2px;color:#40D9C8;">% DM</span></div>
        </div>
        <div style="text-align:center">
          <div class="num">${r.kg >= 100 ? Math.round(r.kg) : r.kg.toFixed(1)}<span style="font-size:10px;font-weight:400;margin-left:2px;color:#40D9C8;">kg/t DM</span></div>
        </div>
        <div style="text-align:center;">
          <div class="synth-name">${r.synth}</div>
        </div>
        <div style="text-align:center;">
          <div class="synth-price">${r.sp}</div>
        </div>
        <div style="text-align:center">
          <div class="val-fw">${fmtD(rvFW)}<span style="font-size:10px;font-weight:400;margin-left:2px;color:#40D9C8;">/t FW</span></div>
        </div>
        <div style="text-align:center">
          <div class="val-num">${fmtD(rv)}<span style="font-size:10px;font-weight:400;margin-left:2px;color:#C4A882;">/t DM</span></div>
        </div>
        <div style="display:flex; align-items:center; justify-content:center; padding-right:12px;">
          <button class="row-calc-btn" onclick="event.stopPropagation(); openCalcModal()">Calculate</button>
        </div>
      </div>`;
    });

    html += `</div></div>`;
  });

  document.getElementById('rows').innerHTML = html;

  /* compute individual component groups */
  const npkT    = rows.filter(r=>r.g==='npk').reduce((s,r)=>s+v(r),0);
  const minT    = rows.filter(r=>r.g==='mineral').reduce((s,r)=>s+v(r),0);
  const chitinR = rows.find(r=>r.id==='chitin' || r.name.toLowerCase().includes('chitin'));
  const chitinT = chitinR ? v(chitinR) : 0;
  const omHumic = rows.filter(r=>r.g==='beyond' && !r.name.toLowerCase().includes('chitin')).reduce((s,r)=>s+v(r),0);
  const total   = npkT + minT + omHumic + chitinT;
  const fd2 = n => '$' + n.toFixed(2);

  document.getElementById('rv-section').innerHTML = `
    <div class="rv-section">
      <div class="rv-row">
        <div class="rv-row-lbl">Replacement<br>Value</div>
        <div class="rv-col">
          <div class="rv-cat">Chitin</div>
          <div><span class="rv-num">${fd2(chitinT)}</span><span class="rv-unit">/t DM</span></div>
        </div>
        <div class="rv-col">
          <div class="rv-cat">N · P · K</div>
          <div><span class="rv-num">${fd2(npkT)}</span><span class="rv-unit">/t DM</span></div>
        </div>
        <div class="rv-col">
          <div class="rv-cat">Ca &amp; Mg minerals</div>
          <div><span class="rv-num">${fd2(minT)}</span><span class="rv-unit">/t DM</span></div>
        </div>
        <div class="rv-col">
          <div class="rv-cat">OM · Humic · Fulvic</div>
          <div><span class="rv-num">${fd2(omHumic)}</span><span class="rv-unit">/t DM</span></div>
        </div>
      </div>
      <div class="tarv-row">
        <div class="tarv-left">
          <div class="tarv-lbl">TARV — Total Agronomic Replacement Value</div>
          <div class="tarv-desc">Cost to replicate synthetically · not the CFI selling price</div>
        </div>
        <div class="tarv-right">
          <div class="tarv-hero">${fd2(total)}<span style="font-size:14px;margin-left:2px;font-weight:400;">/t DM</span></div>
          <div class="tarv-fw">≈ ${fd2(total * dmFrac)} /t FW · ${Math.round(dmFrac*100)}% DM</div>
        </div>
      </div>
    </div>`;
}

function setPathway(pw, btn) {
  document.querySelectorAll('.toggle button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render(pw);
}

render('s5a');

function openCalcModal()  { document.getElementById('calcModal').classList.add('open');    document.body.style.overflow='hidden'; }
function closeCalcModal() { document.getElementById('calcModal').classList.remove('open'); document.body.style.overflow=''; }
function closeOnOverlay(e){ if(e.target === document.getElementById('calcModal')) closeCalcModal(); }
</script>
</body>
</html>
