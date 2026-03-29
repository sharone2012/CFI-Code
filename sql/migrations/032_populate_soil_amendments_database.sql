-- ══════════════════════════════════════════════════════════════════════════
-- MIGRATION 32: Populate Soil Amendments Database
-- Date: March 26, 2026
-- Purpose: 16 commercial amendment products with costs and efficacy
-- ══════════════════════════════════════════════════════════════════════════

-- Insert 16 amendment products
INSERT INTO cfi_soil_amendments (amendment_code, product_name, category, target_nutrient, application_rate_kg_ha_low, application_rate_kg_ha_high, cost_usd_per_kg, efficacy_pct, soil_applicability, is_mandatory_on_peat, notes, source_ref) VALUES

-- N LEACH REDUCERS (3 products)
('NLR-001', 'Nitrification Inhibitor (DMPP)', 'n_leach_reducer', 'N', 1.0, 2.0, 12.50, 25, ARRAY['ULTISOL', 'SPODOSOL'], false, 'Reduces N leaching by 25-35% in sandy/clay soils', 'Industry supplier data 2024'),
('NLR-002', 'Urease Inhibitor (NBPT)', 'n_leach_reducer', 'N', 0.5, 1.5, 15.00, 20, ARRAY['ALL'], false, 'Slows urea hydrolysis, reduces NH3 volatilization', 'Fertilizer product catalogs'),
('NLR-003', 'Biochar (Palm Shell)', 'n_leach_reducer', 'N', 500, 2000, 0.08, 15, ARRAY['SPODOSOL', 'ULTISOL'], false, 'Increases CEC, reduces N leaching 15-20%', 'Research trials Indonesia'),

-- P FIXATION REDUCERS (2 products)
('PFR-001', 'Rock Phosphate (Reactive)', 'p_fix_reducer', 'P', 250, 500, 0.35, 30, ARRAY['OXISOL', 'ULTISOL', 'ANDISOL'], false, 'Slow-release P, reduces fixation by organic complexation', 'IFDC phosphate compendium'),
('PFR-002', 'Mycorrhizal Inoculant', 'p_fix_reducer', 'P', 2.0, 5.0, 25.00, 40, ARRAY['OXISOL', 'ULTISOL'], false, 'AMF colonization unlocks fixed P', 'CFI biological library data'),

-- K SOURCES (3 products)
('KSO-001', 'Muriate of Potash (KCl)', 'k_source', 'K', 100, 300, 0.45, 100, ARRAY['ALL'], false, 'Standard K fertilizer, 60% K2O', 'Industry standard'),
('KSO-002', 'Kieserite (MgSO4)', 'k_source', 'K', 150, 400, 0.38, 80, ARRAY['HISTOSOL', 'SPODOSOL'], false, 'Mg source + some K, low leaching', 'Fertilizer catalogs'),
('KSO-003', 'Palm Ash (PKSA)', 'k_source', 'K', 200, 600, 0.00, 90, ARRAY['ALL'], false, 'Mill waste, high K (30-40% K2O), free', 'CFI canonical data'),

-- MICRONUTRIENTS (6 products)
('MCR-B01', 'Borax (Na2B4O7)', 'micronutrient', 'B', 10, 25, 1.80, 100, ARRAY['HISTOSOL', 'OXISOL', 'SPODOSOL'], false, 'Standard B source, 11% B', 'Supplier quotes 2024'),
('MCR-ZN1', 'Zinc Sulfate (ZnSO4)', 'micronutrient', 'Zn', 15, 40, 2.20, 100, ARRAY['HISTOSOL', 'OXISOL', 'SPODOSOL'], true, 'MANDATORY on peat, 23% Zn', 'MPOB guidelines + supplier data'),
('MCR-CU1', 'Copper Sulfate (CuSO4)', 'micronutrient', 'Cu', 10, 30, 3.50, 100, ARRAY['HISTOSOL', 'SPODOSOL'], true, 'MANDATORY on peat, 25% Cu', 'MPOB guidelines + supplier data'),
('MCR-FE1', 'Ferrous Sulfate (FeSO4)', 'micronutrient', 'Fe', 20, 50, 0.60, 100, ARRAY['ALL'], false, 'Fe source for chlorosis, 20% Fe', 'Supplier catalogs'),
('MCR-MN1', 'Manganese Sulfate (MnSO4)', 'micronutrient', 'Mn', 15, 40, 1.40, 100, ARRAY['ALL'], false, 'Mn source, 32% Mn', 'Supplier catalogs'),
('MCR-MIX', 'Complete Micronutrient Mix', 'micronutrient', 'Multi', 25, 60, 4.50, 90, ARRAY['HISTOSOL', 'OXISOL'], false, 'B+Zn+Cu+Fe+Mn blend', 'Industry suppliers'),

-- LIME (1 product)
('LIM-001', 'Dolomitic Lime (CaCO3+MgCO3)', 'lime', 'pH', 1000, 3000, 0.12, 100, ARRAY['ULTISOL', 'OXISOL', 'SPODOSOL'], false, 'Raises pH, supplies Ca+Mg. PROHIBITED on peat (Histosol)', 'Industry standard'),

-- GYPSUM (1 product)
('GYP-001', 'Gypsum (CaSO4)', 'gypsum', 'Ca', 500, 1500, 0.15, 100, ARRAY['HISTOSOL', 'ULTISOL'], false, 'Ca source without pH change, safe for peat', 'Industry standard');

-- Add metadata comment
COMMENT ON TABLE cfi_soil_amendments IS '16 commercial amendments populated Mar 2026. Costs from Indonesian suppliers, efficacy from research trials.';
