# CFI Master Excel Automation

Production-ready Python calculator for the CFI Bioconversion Project.
Generates a fully-linked 17-tab Excel workbook from a single INPUTS tab.

## Overview

The system models processing of palm mill residues (60 TPH FFB mill, Indonesia)
into high-value outputs via Black Soldier Fly (BSF) bioconversion, composting,
and biological pre-treatment.

**Five-stage process:** Mill inputs -> Preprocessing -> Chemical treatment ->
Biological treatment -> BSF rearing -> Harvest & valuation.

## Quick Start

```bash
pip install -r requirements.txt
python cfi_master_calculator.py
```

Output: `CFI_Master_Excel.xlsx` (17 tabs, all formula-linked)

## Command-Line Arguments

| Argument      | Default              | Description                              |
|---------------|----------------------|------------------------------------------|
| `--output`    | CFI_Master_Excel.xlsx| Output filename                          |
| `--data-dir`  | data                 | Path to source Excel files               |
| `--blend`     | 60:40                | EFB:OPDC blend ratio                     |
| `--days`      | 12                   | BSF grow-out days (6-18)                 |
| `--area`      | 1000                 | BSF rearing area (m2)                    |
| `--cert`      | none                 | Certification: none / fssc / pharma      |
| `--soil`      | All                  | Soil type target                         |

### Examples

```bash
python cfi_master_calculator.py --blend 70:30 --days 14 --cert fssc
python cfi_master_calculator.py --cert pharma --soil Inceptisols --area 2000
```

## Workbook Tab Structure

| #  | Tab Name               | Description                                        |
|----|------------------------|----------------------------------------------------|
| 1  | INPUTS                 | All user-editable parameters (yellow cells)        |
| 2  | S0_Waste_Streams       | Mass balance from FFB throughput                   |
| 3  | S0_Lab_Analysis        | 19-parameter matrix for 10 residues + blend        |
| 4  | S1_Preprocessing       | Mechanical downsizing, PKSA soaking, energy costs  |
| 5  | S1_Lab_Analysis        | Post-preprocessing substrate parameters            |
| 6  | S2_Chemical_Treatment  | Chemical pre-treatment, pH trajectory, neutralisation |
| 7  | S2_Chemical_Library    | Full chemical reference (11 chemicals)             |
| 8  | S3_Biological_Treatment| Consortium recipe, wave schedule, 5-day bio rule   |
| 9  | S3_Biological_Library  | Full biological library (12 organisms)             |
| 10 | S4_BSF_Rearing         | Inoculation, yield formula, monthly production     |
| 11 | S4_BSF_Lab             | Pre-pupae composition (FW and DM basis)            |
| 12 | S5A_Frass_Pathway      | Frass mass, composition, fertiliser value           |
| 13 | S5B_BSF_Extraction     | Oil press, defatted meal, chitin, processing costs |
| 14 | S6_Product_Valuation   | Revenue by certification tier                       |
| 15 | Summary_Dashboard      | Executive summary: production, revenue, costs       |
| 16 | Soil_Fertiliser_Matrix | 5 Indonesian soil types, NPK substitution rates    |
| 17 | CAPEX_OPEX             | Capital costs, monthly OPEX, payback, NPV          |

## How to Change Inputs

1. Open the Excel file and go to the **INPUTS** tab
2. All **yellow cells** are user-editable with data validation dropdowns
3. Changes automatically propagate to all 16 downstream tabs via formula links
4. No macros required -- pure Excel formula chains

## Guardrails

| # | Rule | Enforcement |
|---|------|-------------|
| G1 | Bt (B. thuringiensis) triggers safety alert | Red warning cell + cell comment |
| G2 | NaOH triggers caustic PPE alert | Red warning cell + cell comment |
| G3 | PKSA cost = $0 at mill gate always | Hardcoded, cannot be overridden |
| G4 | Market prices from verified ranges only | Canonical constants in code |
| G5 | All formulas use =Sheet!Cell references | No hard-coded values in formula cells |
| G6 | 5-day minimum biological treatment | Hard-coded status flag in S3 tab |
| G7 | Reproducible output (seed=42, relative paths) | Set at script init |

## Data Sources

The script attempts to load from these files in the `data/` directory:
- `STAGE_0_CFI_Palm_Residues_All_Lab_Analysis.xlsx`
- `STAGE_0_Mill1_Capacity_60TPH_.xlsx`
- `STAGE_1__Preprocessing_EFB_OPDC_Master__includes_putting_in_chemicals.xlsx`
- `STAGE_2_Chemical_Library.xlsx`
- `STAGE_3__Biological_Library.xlsx`
- `STAGE_3_Biological_Recomendations.xlsx`
- `CFI_Lab_Analysis__Value_PKSA_Best_Biologicals.xlsx`

If files are not found, all values fall back to hardcoded canonical defaults
from verified project lab data. Console output shows which sources were loaded.

## Key Lab Data (Canonical Defaults)

- **EFB:** N=0.85%, P=0.34%, K=2.20%, Lignin=22%, C:N=60, Moisture=62.5%
- **OPDC:** N=2.45%, P=0.43%, K=2.20%, Lignin=30.7%, C:N=20, Moisture=70%
- **PKSA:** pH=11.2, K=12.5%, Ca=8.50%, P=2.94%, Cost=$0
- **60:40 Blend:** Lignin=25%, Protein=8.14%, C:N=32

## BSF Yield Formula

```
FW yield (kg/t) = 70 + (grow_days - 6) / 12 * (140 - 70)
```
- Day 6: 70 kg FW per tonne substrate
- Day 18: 140 kg FW per tonne substrate
- Consortium uplift: +15% (Wave 1) to +22% (Wave 1+2)

## Verified Market Prices (Guardrail 4)

| Product | None | FSSC 22000 | ISO 22716 |
|---------|------|-----------|-----------|
| Insect Meal | $1,200/t | $3,500-5,000/t | $4,500-6,500/t |
| Insect Oil | $900-1,200/t | $3,500-6,000/t | $9,000-18,000/t |
| Frass | $80/t | $80/t | $80/t |
| Chitin | $15,000-25,000/t | - | - |

## File Structure

```
CFI-Code/
  cfi_master_calculator.py   # Main calculator script
  requirements.txt            # Python dependencies
  README.md                   # This file
  data/                       # Source Excel files (optional)
  CFI_Master_Excel.xlsx       # Generated output (after running)
```

## Dependencies

- Python 3.8+
- openpyxl >= 3.1.0
- pandas >= 2.0.0
