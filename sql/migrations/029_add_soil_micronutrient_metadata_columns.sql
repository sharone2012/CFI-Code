-- ══════════════════════════════════════════════════════════════════════════
-- MIGRATION 29: Add Soil Micronutrient Metadata Columns
-- Date: March 26, 2026
-- Purpose: Add B, Zn, Cu, Fe, Mn columns to cfi_soil_profiles
-- ══════════════════════════════════════════════════════════════════════════

-- Add Boron (B) columns
ALTER TABLE cfi_soil_profiles
ADD COLUMN avail_b_degraded_mg_kg_low numeric,
ADD COLUMN avail_b_degraded_mg_kg_high numeric,
ADD COLUMN avail_b_target_mg_kg_low numeric,
ADD COLUMN avail_b_target_mg_kg_high numeric,
ADD COLUMN b_deficiency_threshold_mg_kg numeric,
ADD COLUMN b_source text,
ADD COLUMN b_notes text,
ADD COLUMN b_confidence_tier text DEFAULT 'LDE-MODERATE';

-- Add Zinc (Zn) columns
ALTER TABLE cfi_soil_profiles
ADD COLUMN avail_zn_degraded_mg_kg_low numeric,
ADD COLUMN avail_zn_degraded_mg_kg_high numeric,
ADD COLUMN avail_zn_target_mg_kg_low numeric,
ADD COLUMN avail_zn_target_mg_kg_high numeric,
ADD COLUMN zn_deficiency_threshold_mg_kg numeric,
ADD COLUMN zn_source text,
ADD COLUMN zn_notes text,
ADD COLUMN zn_confidence_tier text DEFAULT 'LDE-MODERATE';

-- Add Copper (Cu) columns
ALTER TABLE cfi_soil_profiles
ADD COLUMN avail_cu_degraded_mg_kg_low numeric,
ADD COLUMN avail_cu_degraded_mg_kg_high numeric,
ADD COLUMN avail_cu_target_mg_kg_low numeric,
ADD COLUMN avail_cu_target_mg_kg_high numeric,
ADD COLUMN cu_deficiency_threshold_mg_kg numeric,
ADD COLUMN cu_source text,
ADD COLUMN cu_notes text,
ADD COLUMN cu_deficiency_notes text,
ADD COLUMN cu_confidence_tier text DEFAULT 'LDE-MODERATE';

-- Add Iron (Fe) columns
ALTER TABLE cfi_soil_profiles
ADD COLUMN avail_fe_degraded_mg_kg_low numeric,
ADD COLUMN avail_fe_degraded_mg_kg_high numeric,
ADD COLUMN avail_fe_target_mg_kg_low numeric,
ADD COLUMN avail_fe_target_mg_kg_high numeric,
ADD COLUMN fe_confidence_tier text,
ADD COLUMN fe_source text;

-- Add Manganese (Mn) columns
ALTER TABLE cfi_soil_profiles
ADD COLUMN avail_mn_degraded_mg_kg_low numeric,
ADD COLUMN avail_mn_degraded_mg_kg_high numeric,
ADD COLUMN avail_mn_target_mg_kg_low numeric,
ADD COLUMN avail_mn_target_mg_kg_high numeric,
ADD COLUMN mn_confidence_tier text,
ADD COLUMN mn_source text;

-- Add general micronutrient source tracking
ALTER TABLE cfi_soil_profiles
ADD COLUMN micronutrient_sources text[];

-- Add comments
COMMENT ON COLUMN cfi_soil_profiles.b_confidence_tier IS 'Confidence level for B data: LAB-CONFIRMED, LDE-HIGH, LDE-MODERATE, LDE-LOW, DATA GAP';
COMMENT ON COLUMN cfi_soil_profiles.zn_confidence_tier IS 'Confidence level for Zn data: LAB-CONFIRMED, LDE-HIGH, LDE-MODERATE, LDE-LOW, DATA GAP';
COMMENT ON COLUMN cfi_soil_profiles.cu_confidence_tier IS 'Confidence level for Cu data: LAB-CONFIRMED, LDE-HIGH, LDE-MODERATE, LDE-LOW, DATA GAP';
COMMENT ON COLUMN cfi_soil_profiles.micronutrient_sources IS 'Array of research sources for micronutrient data';
