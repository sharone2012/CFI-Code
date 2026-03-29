/**
 * CFI BACKEND API HANDLERS — Add Organism Workflow
 * 
 * Three endpoints:
 * 1. POST /api/organism-search — Fuzzy search ATCC/DSMZ/NRRL databases
 * 2. POST /api/research-organism — Execute master prompt research workflow
 * 3. POST /api/insert-organism — Insert to Supabase with approval gate
 * 
 * Tech stack: Node.js + Express + Anthropic Claude API + Supabase
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

// Initialize clients
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============================================================
// ENDPOINT 1: ORGANISM SEARCH (Fuzzy Match)
// ============================================================

export async function searchOrganism(req, res) {
  const { query } = req.body;

  if (!query || query.trim().length < 3) {
    return res.status(400).json({ error: 'Query must be at least 3 characters' });
  }

  try {
    // Use Claude to search databases via web search
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `Search for organism: "${query}"

Find matches in:
1. ATCC (American Type Culture Collection) database
2. DSMZ (German Collection of Microorganisms) database  
3. NRRL (USDA culture collection) database

For each match, provide:
- Scientific name (exact)
- Common name (if any)
- Category (Fungus, Bacteria, Enzyme, AMF, Other)
- ATCC ID (if available)
- DSMZ ID (if available)
- Confidence score (0-100% how well it matches the query)

Return top 5 matches as JSON array:
[
  {
    "scientific_name": "Thermobifida fusca",
    "common_name": "Thermophilic actinomycete",
    "category": "Bacteria",
    "atcc_id": "27730",
    "dsmz_id": "43792",
    "confidence": 95
  }
]

ONLY return the JSON array, no additional text.`
      }]
    });

    // Parse Claude's response
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse search results' });
    }

    const matches = JSON.parse(jsonMatch[0]);

    return res.json({ matches });

  } catch (error) {
    console.error('Organism search error:', error);
    return res.status(500).json({ error: 'Search failed' });
  }
}

// ============================================================
// ENDPOINT 2: RESEARCH ORGANISM (Master Prompt Execution)
// ============================================================

export async function researchOrganism(req, res) {
  const { organism_name, common_name, category, atcc_id, dsmz_id } = req.body;

  if (!organism_name) {
    return res.status(400).json({ error: 'Organism name required' });
  }

  try {
    // Load master prompt from Supabase
    const { data: promptData, error: promptError } = await supabase
      .from('cfi_master_prompts')
      .select('full_prompt_text')
      .eq('prompt_code', 'ORGANISM_ONBOARD')
      .eq('is_active', true)
      .single();

    if (promptError || !promptData) {
      return res.status(500).json({ error: 'Master prompt not found' });
    }

    // Execute research workflow with Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `${promptData.full_prompt_text}

ORGANISM TO RESEARCH:
- Scientific name: ${organism_name}
- Common name: ${common_name || 'N/A'}
- Category: ${category}
- ATCC ID: ${atcc_id || 'N/A'}
- DSMZ ID: ${dsmz_id || 'N/A'}

Execute the full research workflow:
1. 13-professor expert panel research
2. Tropical palm sources priority (Indonesia/Malaysia)
3. Generic performance scores (1-9 scale)
4. Cost data (commercial inoculant pricing)
5. Soil-specific scores for all 6 soils (Inceptisol, Ultisol, Oxisol, Histosol, Spodosol, Andisol)
6. Mechanisms for each soil
7. Literature sources (≥3 peer-reviewed)
8. Safety assessment (N2O risk, pH constraints, liming conflicts)
9. Guardrail flags if needed

Return results as JSON:
{
  "organism_name": "...",
  "generic": {
    "one_nine_score": 6.0,
    "n_fixer_score": 0.0,
    "p_releaser_score": 1.0,
    "lignin_score": 3.5,
    "cp_score": 2.0,
    "bsf_score": 3.5,
    "cost_per_tonne_fw": 0.675,
    "wave_assignment": "2a",
    "mechanism": "...",
    "warnings": "..."
  },
  "soils": [
    {
      "soil_type": "Inceptisol",
      "score": 4.0,
      "mechanism": "...",
      "confidence": "MEDIUM",
      "constraints": "..."
    }
    // ... repeat for 6 soils
  ],
  "citations": ["Bugg 2011 Curr Opin Biotechnol", "Wilson 2004 Appl Microbiol Biotechnol", ...],
  "guardrail_flag": "THERMOPHILIC_PHASE_ONLY" // or null
}

ONLY return the JSON object, no additional text.`
      }]
    });

    // Parse Claude's response
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse research results' });
    }

    const results = JSON.parse(jsonMatch[0]);

    return res.json({ success: true, data: results });

  } catch (error) {
    console.error('Research organism error:', error);
    return res.status(500).json({ error: 'Research failed' });
  }
}

// ============================================================
// ENDPOINT 3: INSERT ORGANISM (Supabase with Approval Gate)
// ============================================================

export async function insertOrganism(req, res) {
  const { organism_name, generic, soils, citations, guardrail_flag } = req.body;

  if (!organism_name || !generic || !soils) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Insert to biological_library (generic data)
    const { data: libraryData, error: libraryError } = await supabase
      .from('biological_library')
      .insert({
        organism_name,
        cfi_category: generic.category || 'Bacteria',
        one_nine_score: generic.one_nine_score,
        n_fixer_score: generic.n_fixer_score,
        p_releaser_score: generic.p_releaser_score,
        lignin_score: generic.lignin_score,
        cp_score: generic.cp_score,
        bsf_score: generic.bsf_score,
        cost_per_tonne_fw: generic.cost_per_tonne_fw,
        wave_assignment: generic.wave_assignment,
        how_it_works: generic.mechanism,
        source_references: citations.join('; '),
        warnings: generic.warnings,
        recommended: false, // Awaiting Sharon approval
        guardrail_flag: guardrail_flag || null
      })
      .select()
      .single();

    if (libraryError) {
      throw new Error(`Library insert failed: ${libraryError.message}`);
    }

    // Insert to cfi_soil_organism_performance (6 soil-specific scores)
    const soilInserts = soils.map(soil => ({
      soil_type: soil.soil_type,
      organism_name,
      soil_specific_score: soil.score,
      mechanism: soil.mechanism,
      literature_source: citations.slice(0, 3).join('; '),
      confidence_level: soil.confidence,
      lignin_score_soil: soil.lignin_score_soil || soil.score,
      p_releaser_score_soil: soil.p_score_soil || null,
      constraint_notes: soil.constraints || 'None',
      is_approved: false // Sharon approval required
    }));

    const { error: soilError } = await supabase
      .from('cfi_soil_organism_performance')
      .insert(soilInserts);

    if (soilError) {
      // Rollback library insert if soil insert fails
      await supabase
        .from('biological_library')
        .delete()
        .eq('organism_name', organism_name);
      
      throw new Error(`Soil scores insert failed: ${soilError.message}`);
    }

    return res.json({
      success: true,
      organism_name,
      message: 'Organism added successfully. Awaiting Sharon approval (is_approved = FALSE).'
    });

  } catch (error) {
    console.error('Insert organism error:', error);
    return res.status(500).json({ error: error.message || 'Insert failed' });
  }
}

// ============================================================
// EXPRESS ROUTES
// ============================================================

/*
import express from 'express';
const app = express();

app.use(express.json());

app.post('/api/organism-search', searchOrganism);
app.post('/api/research-organism', researchOrganism);
app.post('/api/insert-organism', insertOrganism);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CFI Organism API running on port ${PORT}`);
});
*/
