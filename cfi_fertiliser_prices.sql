-- ═══════════════════════════════════════════════════════════════════════
-- CFI FERTILISER PRICES TABLE
-- ═══════════════════════════════════════════════════════════════════════
-- Purpose: Store CIF Indonesia fertiliser prices for value calculator
-- Updated by: Agent 6 (GitHub Actions price_agent.js)
-- Refresh: Every 15 days (1st + 16th of month)
-- ═══════════════════════════════════════════════════════════════════════

-- Drop table if exists (for clean migration)
DROP TABLE IF EXISTS public.cfi_fertiliser_prices;

-- Create table
CREATE TABLE public.cfi_fertiliser_prices (
  nutrient_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  price_usd_per_tonne NUMERIC(10,2) NOT NULL,
  source TEXT,
  price_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- Add indexes
CREATE INDEX idx_cfi_fertiliser_prices_updated ON public.cfi_fertiliser_prices(updated_at DESC);

-- Enable RLS
ALTER TABLE public.cfi_fertiliser_prices ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read access
CREATE POLICY "Allow public read access"
  ON public.cfi_fertiliser_prices
  FOR SELECT
  TO public
  USING (true);

-- RLS Policy: Allow service role full access
CREATE POLICY "Allow service role full access"
  ON public.cfi_fertiliser_prices
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add comment
COMMENT ON TABLE public.cfi_fertiliser_prices IS 
  'CIF Indonesia fertiliser prices. Updated every 15 days by Agent 6 GitHub Actions workflow.';

-- ═══════════════════════════════════════════════════════════════════════
-- SEED DATA — MARCH 2026 BASELINE PRICES
-- ═══════════════════════════════════════════════════════════════════════
-- Source: ICIS CIF Indonesia + Industry estimates
-- These are fallback values — Agent 6 will update with live data
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO public.cfi_fertiliser_prices 
  (nutrient_id, display_name, price_usd_per_tonne, source, price_date, notes)
VALUES
  -- NPK Commodity Fertilisers
  ('urea_46_0_0', 'Urea (46-0-0)', 285.00, 'ICIS baseline', '2026-03-01', 
   'CIF Indonesia bulk. N content: 46% (460 kg N/t)'),
  
  ('dap_18_46_0', 'DAP (18-46-0)', 520.00, 'ICIS baseline', '2026-03-01', 
   'CIF Indonesia bulk. N: 18% (180 kg/t), P₂O₅: 46% (460 kg/t)'),
  
  ('mop_0_0_60', 'MOP (0-0-60)', 310.00, 'ICIS baseline', '2026-03-01', 
   'Potassium Chloride CIF Indonesia. K₂O: 60% (600 kg/t)'),
  
  -- Secondary Nutrients
  ('kieserite', 'Kieserite (MgSO₄)', 180.00, 'Industry avg', '2026-03-01', 
   'Magnesium sulphate. MgO: 27%, SO₃: 55%'),
  
  ('ag_lime_caco3', 'Ag Lime (CaCO₃)', 45.00, 'Industry avg', '2026-03-01', 
   'Agricultural limestone. CaCO₃: 85-95%'),
  
  -- Derived Nutrient Values (for reference)
  ('elemental_n', 'Elemental N', 0.62, 'Calculated', '2026-03-01', 
   'Derived: $285 Urea ÷ 460 kg N = $0.62/kg N'),
  
  ('elemental_p2o5', 'Elemental P₂O₅', 1.13, 'Calculated', '2026-03-01', 
   'Derived: $520 DAP ÷ 460 kg P₂O₅ = $1.13/kg P₂O₅'),
  
  ('elemental_k2o', 'Elemental K₂O', 0.52, 'Calculated', '2026-03-01', 
   'Derived: $310 MOP ÷ 600 kg K₂O = $0.52/kg K₂O'),
  
  ('elemental_mgo', 'Elemental MgO', 0.67, 'Calculated', '2026-03-01', 
   'Derived: $180 Kieserite ÷ 270 kg MgO = $0.67/kg MgO')

ON CONFLICT (nutrient_id) 
DO UPDATE SET
  price_usd_per_tonne = EXCLUDED.price_usd_per_tonne,
  source = EXCLUDED.source,
  price_date = EXCLUDED.price_date,
  updated_at = NOW();

-- ═══════════════════════════════════════════════════════════════════════
-- VERIFICATION
-- ═══════════════════════════════════════════════════════════════════════

-- Query to verify data
SELECT 
  nutrient_id,
  display_name,
  price_usd_per_tonne,
  source,
  price_date,
  TO_CHAR(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
FROM public.cfi_fertiliser_prices
ORDER BY 
  CASE 
    WHEN nutrient_id LIKE 'urea%' THEN 1
    WHEN nutrient_id LIKE 'dap%' THEN 2
    WHEN nutrient_id LIKE 'mop%' THEN 3
    WHEN nutrient_id = 'kieserite' THEN 4
    WHEN nutrient_id = 'ag_lime_caco3' THEN 5
    ELSE 6
  END;
