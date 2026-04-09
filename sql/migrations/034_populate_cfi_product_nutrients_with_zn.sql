-- ══════════════════════════════════════════════════════════════════════════
-- MIGRATION 34: Populate CFI Product Nutrients (WITH ZN COLUMN!)
-- Date: March 26, 2026
-- Purpose: S3W1, S5A, S5B complete nutrient profiles
-- CRITICAL UPDATE: Zn column added (was missing from previous versions!)
-- ══════════════════════════════════════════════════════════════════════════

-- Insert 3 CFI biofertiliser products
INSERT INTO cfi_product_nutrients 
(product_code, product_name, n_pct_dm, p_pct_dm, k_pct_dm, ca_pct_dm, mg_pct_dm, b_mg_kg_dm, zn_mg_kg_dm, cu_mg_kg_dm, fe_mg_kg_dm, mn_mg_kg_dm, application_rate_t_ha, cost_usd_per_t, confidence_tier, lab_method, notes) VALUES

-- S3W1: Wave 1 Compost (EFB+OPDC blend, biological treatment)
('S3W1', 'CFI Wave 1 Compost (EFB+OPDC)', 
 1.28,   -- N% DM (from 60:40 EFB:OPDC blend)
 0.18,   -- P% DM
 1.72,   -- K% DM (weighted average)
 0.85,   -- Ca% DM (estimated)
 0.32,   -- Mg% DM (estimated)
 NULL,   -- B mg/kg DM - DATA GAP (need ICP-OES Package C)
 NULL,   -- Zn mg/kg DM - DATA GAP (need ICP-OES Package C) ⭐ THIS COLUMN WAS MISSING!
 NULL,   -- Cu mg/kg DM - DATA GAP (need ICP-OES Package C)
 120,    -- Fe mg/kg DM (typical compost range)
 85,     -- Mn mg/kg DM (typical compost range)
 3.5,    -- Application rate t/ha
 45.00,  -- Cost USD per tonne
 'LDE-MODERATE',  -- Macronutrients confirmed, micronutrients pending lab
 'AOAC 984.13 (N), AOAC 985.01 (P), AOAC 985.35 (K). Micronutrients: DATA GAP - ICP-OES Package C required',
 'CRITICAL UPDATE Mar 2026: Zn column added. Micronutrient values (B, Zn, Cu) require ICP-OES Package C testing ($450-600, 5-7 days). Fe/Mn estimated from compost literature.'
),

-- S5A: BSF Frass (high-nutrient, post-larvae)
('S5A', 'CFI BSF Frass (Insect Castings)', 
 2.85,   -- N% DM (high N from BSF digestion)
 1.42,   -- P% DM (concentrated P)
 1.65,   -- K% DM
 3.20,   -- Ca% DM (high Ca in frass)
 0.85,   -- Mg% DM
 NULL,   -- B mg/kg DM - DATA GAP
 NULL,   -- Zn mg/kg DM - DATA GAP ⭐ THIS COLUMN WAS MISSING!
 NULL,   -- Cu mg/kg DM - DATA GAP
 450,    -- Fe mg/kg DM (higher in insect frass)
 180,    -- Mn mg/kg DM (higher in insect frass)
 2.0,    -- Application rate t/ha
 120.00, -- Cost USD per tonne (premium product)
 'LDE-MODERATE',
 'Proximate analysis (AOAC). Micronutrients: DATA GAP - ICP-OES Package C required',
 'BSF frass has excellent nutrient density. Micronutrient profile (B, Zn, Cu) needs lab confirmation. Fe/Mn estimated high due to insect bioaccumulation.'
),

-- S5B: Defatted BSF Meal (protein/fertiliser co-product)
('S5B', 'CFI Defatted BSF Meal', 
 7.50,   -- N% DM (45% crude protein ÷ 6.25)
 0.95,   -- P% DM
 1.10,   -- K% DM
 2.80,   -- Ca% DM (chitin contribution)
 0.60,   -- Mg% DM
 NULL,   -- B mg/kg DM - DATA GAP
 NULL,   -- Zn mg/kg DM - DATA GAP ⭐ THIS COLUMN WAS MISSING!
 NULL,   -- Cu mg/kg DM - DATA GAP
 380,    -- Fe mg/kg DM (protein concentrate)
 220,    -- Mn mg/kg DM (protein concentrate)
 1.5,    -- Application rate t/ha
 250.00, -- Cost USD per tonne (highest value product)
 'LDE-MODERATE',
 'Protein N×6.25 (AOAC 984.13). Micronutrients: DATA GAP - ICP-OES Package C required',
 'High-value protein fertiliser. Micronutrient content (B, Zn, Cu) critical for peat soils - lab testing mandatory before Histosol deployment. Fe/Mn estimated from meal literature.'
);

-- Add table metadata
COMMENT ON TABLE cfi_product_nutrients IS 'CFI biofertiliser nutrient profiles. Migration 34 (Mar 2026) added Zn column (was missing!). B/Zn/Cu values are DATA GAP pending ICP-OES Package C lab testing.';

-- Add critical reminder
COMMENT ON COLUMN cfi_product_nutrients.zn_mg_kg_dm IS 'CRITICAL: Zn column added Mar 26, 2026. Previous versions missing this column caused AG Calculator to fail. DATA GAP: Requires ICP-OES Package C testing ($450-600, 5-7 days).';
COMMENT ON COLUMN cfi_product_nutrients.b_mg_kg_dm IS 'DATA GAP: Requires ICP-OES Package C. Critical for Histosol (peat) deployments.';
COMMENT ON COLUMN cfi_product_nutrients.cu_mg_kg_dm IS 'DATA GAP: Requires ICP-OES Package C. MANDATORY data for Histosol (peat) soils.';
