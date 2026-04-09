-- ══════════════════════════════════════════════════════════════════════════
-- MIGRATION 31: Create Soil Amendments and Costs Tables
-- Date: March 26, 2026
-- Purpose: Track amendment products, costs, and soil-specific fertility
-- ══════════════════════════════════════════════════════════════════════════

-- Table 1: Soil Amendments (16 commercial products)
CREATE TABLE IF NOT EXISTS cfi_soil_amendments (
  id serial PRIMARY KEY,
  amendment_code varchar(50) NOT NULL UNIQUE,
  product_name text NOT NULL,
  category varchar(50) NOT NULL CHECK (category IN (
    'n_leach_reducer', 'p_fix_reducer', 'k_source', 
    'micronutrient', 'lime', 'gypsum'
  )),
  target_nutrient varchar(10),  -- N, P, K, B, Zn, Cu, etc.
  application_rate_kg_ha_low numeric,
  application_rate_kg_ha_high numeric,
  cost_usd_per_kg numeric NOT NULL,
  efficacy_pct numeric,  -- % improvement in target parameter
  soil_applicability text[],  -- Array of soil_key values
  is_mandatory_on_peat boolean DEFAULT false,
  notes text,
  source_ref text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Table 2: Soil Fertility by Management Practice
CREATE TABLE IF NOT EXISTS cfi_soil_fertility_by_mgmt (
  id serial PRIMARY KEY,
  soil_key varchar(20) NOT NULL,
  management_level varchar(20) NOT NULL CHECK (management_level IN ('poor', 'normal', 'vgam')),
  
  -- N leaching (%)
  n_leach_pct_low numeric,
  n_leach_pct_high numeric,
  
  -- P fixation (%)
  p_fix_pct_low numeric,
  p_fix_pct_high numeric,
  
  -- K leaching (%)
  k_leach_pct numeric,
  
  -- Industry overapplication multiplier
  industry_overapply_multiplier numeric DEFAULT 1.0,
  
  -- Recommended amendments (array of amendment_code)
  recommended_amendments text[],
  
  notes text,
  confidence_level varchar(20),
  source_ref text,
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  UNIQUE (soil_key, management_level)
);

-- Table 3: CFI Product Nutrients
CREATE TABLE IF NOT EXISTS cfi_product_nutrients (
  id serial PRIMARY KEY,
  product_code varchar(10) NOT NULL UNIQUE,
  product_name text NOT NULL,
  
  -- Macronutrients (% DM)
  n_pct_dm numeric,
  p_pct_dm numeric,
  k_pct_dm numeric,
  ca_pct_dm numeric,
  mg_pct_dm numeric,
  
  -- Micronutrients (mg/kg DM)
  b_mg_kg_dm numeric,
  zn_mg_kg_dm numeric,
  cu_mg_kg_dm numeric,
  fe_mg_kg_dm numeric,
  mn_mg_kg_dm numeric,
  
  -- Application
  application_rate_t_ha numeric,
  cost_usd_per_t numeric,
  
  -- Metadata
  confidence_tier varchar(20) DEFAULT 'LDE-MODERATE',
  lab_method text,
  lab_date date,
  notes text,
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add comments
COMMENT ON TABLE cfi_soil_amendments IS 'Commercial amendment products (lime, gypsum, micronutrients, etc.) with costs and efficacy data';
COMMENT ON TABLE cfi_soil_fertility_by_mgmt IS 'Soil fertility parameters by management level (poor/normal/vgam) for NPK leaching and fixation';
COMMENT ON TABLE cfi_product_nutrients IS 'CFI biofertiliser product nutrient profiles (S3W1, S5A, S5B) with micronutrient content';

COMMENT ON COLUMN cfi_soil_amendments.is_mandatory_on_peat IS 'TRUE for Cu and Zn amendments which are mandatory on Histosol (peat) soils';
COMMENT ON COLUMN cfi_soil_fertility_by_mgmt.industry_overapply_multiplier IS 'Multiplier for industry standard NPK rates (e.g., 1.2 = 20% overapplication)';
COMMENT ON COLUMN cfi_product_nutrients.confidence_tier IS 'LAB-CONFIRMED (ICP-OES tested) or LDE-MODERATE (estimated) or DATA GAP';
