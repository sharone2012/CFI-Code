-- ══════════════════════════════════════════════════════════════════════════
-- MIGRATION 33: Populate Soil Fertility by Management Level
-- Date: March 26, 2026
-- Purpose: NPK leaching/fixation ranges for poor/normal/vgam management
-- Source: CFI soil science database + tropical agriculture research
-- ══════════════════════════════════════════════════════════════════════════

-- Insert 9 soil × management combinations (6 soils × poor/normal/vgam minus Histosol vgam)
INSERT INTO cfi_soil_fertility_by_mgmt 
(soil_key, management_level, n_leach_pct_low, n_leach_pct_high, p_fix_pct_low, p_fix_pct_high, k_leach_pct, industry_overapply_multiplier, recommended_amendments, notes, confidence_level, source_ref) VALUES

-- INCEPTISOL (best fertility baseline)
('INCEPTISOL', 'poor', 45, 60, 35, 50, 30, 1.3, ARRAY['NLR-001', 'KSO-001'], 'Poor drainage increases leaching', 'LDE-HIGH', 'Indonesian soil surveys + field trials'),
('INCEPTISOL', 'normal', 30, 40, 25, 35, 20, 1.2, ARRAY['KSO-001'], 'Baseline fertility management', 'LDE-HIGH', 'IOPRI data 2015-2023'),
('INCEPTISOL', 'vgam', 15, 25, 15, 25, 10, 1.0, ARRAY['PFR-002'], 'Very good agronomy + mycorrhizal', 'LDE-MODERATE', 'Best practice estates'),

-- ULTISOL (clay-rich, moderate fixation)
('ULTISOL', 'poor', 55, 70, 60, 75, 25, 1.4, ARRAY['NLR-001', 'PFR-001', 'KSO-001'], 'High P fixation in degraded clay soils', 'LDE-HIGH', 'Malaysian Ultisol studies'),
('ULTISOL', 'normal', 40, 55, 45, 60, 18, 1.2, ARRAY['NLR-002', 'PFR-002'], 'Moderate fixation management', 'LDE-HIGH', 'MPOB Technical Bulletins'),
('ULTISOL', 'vgam', 25, 35, 30, 40, 12, 1.0, ARRAY['PFR-002'], 'AMF reduces P fixation 25-40%', 'LDE-MODERATE', 'VGAM estate data'),

-- OXISOL (severe P fixation)
('OXISOL', 'poor', 50, 65, 75, 85, 20, 1.5, ARRAY['PFR-001', 'PFR-002', 'MCR-ZN1', 'MCR-B01'], 'CRITICAL P fixation + micronutrient deficiency', 'LDE-HIGH', 'Brazilian + Indonesian Oxisol data'),
('OXISOL', 'normal', 35, 50, 65, 78, 15, 1.3, ARRAY['PFR-002', 'MCR-ZN1'], 'High P fixation persists even with management', 'LDE-HIGH', 'IOPRI Oxisol trials'),
('OXISOL', 'vgam', 20, 30, 50, 65, 10, 1.0, ARRAY['PFR-002', 'MCR-ZN1', 'MCR-B01'], 'AMF critical for P availability', 'LDE-MODERATE', 'Best practice + research'),

-- HISTOSOL (peat - CRITICAL)
('HISTOSOL', 'poor', 40, 55, 10, 20, 35, 1.4, ARRAY['MCR-ZN1', 'MCR-CU1', 'MCR-B01', 'GYP-001'], 'MANDATORY Cu/Zn amendments, high N leaching', 'LDE-HIGH', 'MPOB peat guidelines'),
('HISTOSOL', 'normal', 25, 40, 8, 15, 25, 1.2, ARRAY['MCR-ZN1', 'MCR-CU1', 'MCR-B01'], 'Water table management reduces leaching', 'LDE-HIGH', 'Sarawak peat research'),
-- Note: No 'vgam' for Histosol - peat drainage always limits best practices

-- SPODOSOL (sandy, highest leaching)
('SPODOSOL', 'poor', 65, 80, 30, 45, 40, 1.5, ARRAY['NLR-001', 'NLR-003', 'MCR-ZN1', 'MCR-B01'], 'Severe N/K leaching in sandy texture', 'LDE-HIGH', 'Sandy tropical soil studies'),
('SPODOSOL', 'normal', 50, 65, 20, 35, 30, 1.3, ARRAY['NLR-003', 'MCR-ZN1'], 'Biochar helps but leaching still high', 'LDE-HIGH', 'Field trials Indonesia'),
('SPODOSOL', 'vgam', 35, 50, 15, 25, 20, 1.1, ARRAY['NLR-003', 'PFR-002'], 'Organic amendments + AMF reduce losses', 'LDE-MODERATE', 'Research trials'),

-- ANDISOL (volcanic, high P fixation)
('ANDISOL', 'poor', 35, 50, 70, 85, 18, 1.3, ARRAY['PFR-001', 'PFR-002'], 'High P fixation by allophane minerals', 'LDE-MODERATE', 'Volcanic soil research'),
('ANDISOL', 'normal', 20, 35, 55, 70, 12, 1.2, ARRAY['PFR-002'], 'Organic P helps but fixation persists', 'LDE-MODERATE', 'Indonesian volcanic soils'),
('ANDISOL', 'vgam', 10, 20, 40, 55, 8, 1.0, ARRAY['PFR-002'], 'AMF + Si synergy unlocks fixed P', 'LDE-LOW', 'Limited field data');

-- Add metadata comment
COMMENT ON TABLE cfi_soil_fertility_by_mgmt IS '9 soil×management combinations populated Mar 2026. Leaching/fixation ranges from Indonesian palm research + tropical soil science.';
