#!/bin/bash
# CFI GitHub Push Script — COMPLETE PACKAGE
# Date: March 26, 2026
# Total Files: 17 (components + calculators + API + documentation)

echo "=========================================="
echo "CFI GitHub Push — COMPLETE PACKAGE"
echo "March 26, 2026"
echo "=========================================="
echo ""

# Navigate to your CFI-Code repository
echo "Step 1: Navigate to CFI-Code repository"
echo "cd ~/path/to/CFI-Code"
echo ""

# Create directory structure
echo "Step 2: Create directory structure"
cat << 'EOF'
mkdir -p components calculators backend/api docs/prompts docs/guides docs/status docs/specifications sql/migrations
EOF
echo ""

# Add all files
echo "Step 3: Add files to git"
cat << 'EOF'
git add README.md
git add FILE_MANIFEST.txt

# Components
git add components/CFI_AddOrganismButton.jsx
git add calculators/CFI_AG_Management_Calculator_v1.jsx
git add calculators/Value_Calculator.html

# Backend
git add backend/api/CFI_AddOrganism_API.js

# Documentation - Prompts
git add docs/prompts/CFI_MASTER_PROMPT_NEW_ORGANISM_v2.md

# Documentation - Guides
git add docs/guides/CFI_AddOrganism_INTEGRATION_GUIDE.txt
git add docs/guides/CFI_AUTO_PROMPT_SETUP_GUIDE.txt
git add docs/guides/CFI_RANKING_OBJECTIVES_PER_SOIL.txt
git add docs/guides/CFI_S3_SOILs_design_UI_12_RANKING_OBJECTIVES.md

# Documentation - Status
git add docs/status/CFI_COMPLETE_DEPLOYMENT_STACKS.txt
git add docs/status/CFI_ULTISOL_GAP_ANALYSIS.txt
git add docs/status/CFI_SOILS_method_of_research_QUICK_BASELINE_COMPLETE.txt
git add docs/status/CFI_SOIILS_for_investors_COMPLETION_SUMMARY_WITH_CANONICAL.txt
git add docs/status/CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt

# Documentation - Specifications
git add docs/specifications/S3_Soil_Objectives_With_Warnings.md
EOF
echo ""

# Commit
echo "Step 4: Commit changes"
cat << 'EOF'
git commit -m "Add complete biological system + calculators - March 26, 2026

COMPLETE PACKAGE (17 files):
- 2 React components (Add Organism Button, AG Management Calculator)
- 1 HTML calculator (Value Calculator)
- 1 Backend API (3 endpoints: search, research, insert)
- 13 Documentation files (prompts, guides, status, specifications)

Components:
- CFI_AddOrganismButton.jsx — Add Organism modal workflow
- CFI_AG_Management_Calculator_v1.jsx — Fertiliser planning tool

Calculators:
- Value_Calculator.html — Standalone economic analysis

Backend:
- CFI_AddOrganism_API.js — 3 API endpoints for organism research

Documentation:
PROMPTS:
- CFI_MASTER_PROMPT_NEW_ORGANISM_v2.md (454 lines, 13-professor panel)

GUIDES:
- CFI_AddOrganism_INTEGRATION_GUIDE.txt — Deployment instructions
- CFI_AUTO_PROMPT_SETUP_GUIDE.txt — Auto-trigger configuration
- CFI_RANKING_OBJECTIVES_PER_SOIL.txt — 72 ranked organism lists
- CFI_S3_SOILs_design_UI_12_RANKING_OBJECTIVES.md — UI specifications

STATUS:
- CFI_COMPLETE_DEPLOYMENT_STACKS.txt — 54 deployment stacks
- CFI_ULTISOL_GAP_ANALYSIS.txt — Gap analysis methodology
- CFI_SOILS_method_of_research_QUICK_BASELINE_COMPLETE.txt — Research method
- CFI_SOIILS_for_investors_COMPLETION_SUMMARY_WITH_CANONICAL.txt — Investor summary
- CFI_SOILS_tecnical_team_FINAL_STATUS_CANONICAL_VALUES.txt — Technical status

SPECIFICATIONS:
- S3_Soil_Objectives_With_Warnings.md — S3 Tab 4 integration specs

System Status:
- 6/6 soils operational (100% Indonesian palm coverage)
- 57 organism-soil scores approved
- Master prompt tested with Thermobifida fusca
- Grade: A- (90/100)

Next Steps:
- Deploy backend API (Supabase Edge Functions)
- Add 7 remaining ranking objectives
- Build S3 Biological Tab UI
- Integrate S3 Tab 4 soil objectives"
EOF
echo ""

# Push to GitHub
echo "Step 5: Push to GitHub"
echo "git push origin main"
echo ""

echo "=========================================="
echo "PACKAGE READY!"
echo "Location: /tmp/cfi-github-complete/"
echo "Total files: 17"
echo "=========================================="
echo ""
echo "File breakdown:"
echo "  Components:      2 files (React)"
echo "  Calculators:     1 file (HTML)"
echo "  Backend API:     1 file (Node.js)"
echo "  Documentation:  13 files"
echo "    - Prompts:     1 file"
echo "    - Guides:      4 files"
echo "    - Status:      5 files"
echo "    - Specs:       1 file"
echo "  + README.md"
echo "  + FILE_MANIFEST.txt"
echo ""
