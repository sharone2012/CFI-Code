import React, { useState } from 'react';
import { Search, Plus, Check, X, AlertCircle, Loader2 } from 'lucide-react';

/**
 * CFI ADD ORGANISM BUTTON — S3 Biological Tab
 * 
 * Features:
 * - Fuzzy search against ATCC/DSMZ/NRRL databases
 * - Web search fallback for organism validation
 * - Auto-execute master prompt research workflow
 * - Preview results before Supabase insert
 * - Approval gate with is_approved = FALSE
 * 
 * Usage: Add to any S3 page header
 * <AddOrganismButton onOrganismAdded={handleRefresh} />
 */

const AddOrganismButton = ({ onOrganismAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [researching, setResearching] = useState(false);
  const [researchResults, setResearchResults] = useState(null);
  const [error, setError] = useState(null);

  // Step 1: Search for organism matches
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    setError(null);
    setMatches([]);

    try {
      // Call backend API to search databases
      const response = await fetch('/api/organism-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      const data = await response.json();
      
      if (data.matches && data.matches.length > 0) {
        setMatches(data.matches);
      } else {
        setError('No matches found. Try different spelling or scientific name.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Organism search error:', err);
    } finally {
      setSearching(false);
    }
  };

  // Step 2: Execute master prompt research
  const handleSelectMatch = async (match) => {
    setSelectedMatch(match);
    setResearching(true);
    setError(null);

    try {
      // Trigger Claude research workflow
      const response = await fetch('/api/research-organism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organism_name: match.scientific_name,
          common_name: match.common_name,
          category: match.category,
          atcc_id: match.atcc_id,
          dsmz_id: match.dsmz_id
        })
      });

      const results = await response.json();
      
      if (results.success) {
        setResearchResults(results.data);
      } else {
        setError(results.error || 'Research failed. Please try again.');
      }
    } catch (err) {
      setError('Research workflow failed. Please try again.');
      console.error('Research error:', err);
    } finally {
      setResearching(false);
    }
  };

  // Step 3: Approve and insert to Supabase
  const handleApprove = async () => {
    try {
      const response = await fetch('/api/insert-organism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...researchResults,
          is_approved: false // Sharon review required
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Success! Close modal and refresh
        setIsOpen(false);
        setSearchQuery('');
        setMatches([]);
        setSelectedMatch(null);
        setResearchResults(null);
        
        if (onOrganismAdded) {
          onOrganismAdded(data.organism_name);
        }
      } else {
        setError(data.error || 'Insert failed.');
      }
    } catch (err) {
      setError('Database insert failed. Please try again.');
      console.error('Insert error:', err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSearchQuery('');
    setMatches([]);
    setSelectedMatch(null);
    setResearchResults(null);
    setError(null);
  };

  return (
    <>
      {/* Add Organism Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="add-organism-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'rgba(64,215,197,0.12)',
          border: '1.5px solid rgba(64,215,197,0.40)',
          borderRadius: '6px',
          color: '#40D7C5',
          fontFamily: 'DM Sans',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(64,215,197,0.20)';
          e.currentTarget.style.borderColor = 'rgba(64,215,197,0.60)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(64,215,197,0.12)';
          e.currentTarget.style.borderColor = 'rgba(64,215,197,0.40)';
        }}
      >
        <Plus size={18} />
        Add Organism
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(6,12,20,0.80)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
          }}
        >
          <div
            className="modal-content"
            style={{
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              background: '#0B1422',
              border: '1.5px solid #1E6B8C',
              borderRadius: '8px',
              overflow: 'auto'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid rgba(30,107,140,0.30)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                margin: 0,
                fontFamily: 'Syne',
                fontSize: '24px',
                fontWeight: '700',
                color: '#FFFFFF'
              }}>
                Add New Organism
              </h2>
              <button
                onClick={handleCancel}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8B9CB4',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              
              {/* STEP 1: Search Input */}
              {!selectedMatch && !researchResults && (
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontFamily: 'DM Sans',
                    fontSize: '14px',
                    color: '#8B9CB4'
                  }}>
                    Organism Scientific Name
                  </label>
                  
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                      placeholder="e.g., Thermobifida fusca"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        background: '#060C14',
                        border: '1px solid rgba(139,160,180,0.18)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontFamily: 'DM Sans',
                        fontSize: '14px'
                      }}
                    />
                    
                    <button
                      onClick={handleSearch}
                      disabled={searching || !searchQuery.trim()}
                      style={{
                        padding: '12px 24px',
                        background: searching ? '#0C1E33' : 'rgba(64,215,197,0.12)',
                        border: '1.5px solid rgba(64,215,197,0.40)',
                        borderRadius: '6px',
                        color: '#40D7C5',
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: searching ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {searching ? (
                        <>
                          <Loader2 size={18} className="spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search size={18} />
                          Search
                        </>
                      )}
                    </button>
                  </div>

                  <p style={{
                    margin: '0 0 24px 0',
                    fontFamily: 'DM Sans',
                    fontSize: '13px',
                    color: '#8B9CB4',
                    fontStyle: 'italic'
                  }}>
                    Searches ATCC, DSMZ, NRRL culture collections + web validation
                  </p>

                  {/* Error Message */}
                  {error && (
                    <div style={{
                      padding: '12px 16px',
                      background: 'rgba(245,166,35,0.12)',
                      border: '1px solid rgba(245,166,35,0.30)',
                      borderRadius: '6px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <AlertCircle size={20} color="#F5A623" />
                      <span style={{
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        color: '#F5A623'
                      }}>
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Search Results */}
                  {matches.length > 0 && (
                    <div>
                      <h3 style={{
                        margin: '0 0 16px 0',
                        fontFamily: 'DM Sans',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#FFFFFF'
                      }}>
                        Found {matches.length} Match{matches.length > 1 ? 'es' : ''}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {matches.map((match, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectMatch(match)}
                            style={{
                              padding: '16px',
                              background: '#060C14',
                              border: '1px solid rgba(139,160,180,0.18)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(64,215,197,0.40)';
                              e.currentTarget.style.background = 'rgba(64,215,197,0.06)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(139,160,180,0.18)';
                              e.currentTarget.style.background = '#060C14';
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{
                                fontFamily: 'DM Sans',
                                fontSize: '15px',
                                fontWeight: '600',
                                color: '#FFFFFF',
                                fontStyle: 'italic'
                              }}>
                                {match.scientific_name}
                              </span>
                              <span style={{
                                fontFamily: 'DM Mono',
                                fontSize: '13px',
                                color: match.confidence >= 90 ? '#00A249' : match.confidence >= 70 ? '#F5A623' : '#8B9CB4'
                              }}>
                                {match.confidence}% match
                              </span>
                            </div>

                            {match.common_name && (
                              <div style={{
                                fontFamily: 'DM Sans',
                                fontSize: '13px',
                                color: '#8B9CB4',
                                marginBottom: '4px'
                              }}>
                                Common: {match.common_name}
                              </div>
                            )}

                            <div style={{
                              fontFamily: 'DM Sans',
                              fontSize: '13px',
                              color: '#8B9CB4'
                            }}>
                              Category: {match.category} | 
                              {match.atcc_id && ` ATCC ${match.atcc_id}`}
                              {match.dsmz_id && ` | DSMZ ${match.dsmz_id}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Research in Progress */}
              {researching && (
                <div style={{
                  padding: '48px',
                  textAlign: 'center'
                }}>
                  <Loader2 size={48} color="#40D7C5" className="spin" style={{ marginBottom: '24px' }} />
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontFamily: 'DM Sans',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#FFFFFF'
                  }}>
                    Researching {selectedMatch?.scientific_name}...
                  </h3>
                  <p style={{
                    margin: 0,
                    fontFamily: 'DM Sans',
                    fontSize: '14px',
                    color: '#8B9CB4'
                  }}>
                    13-professor expert panel • 99-power research intensity<br/>
                    Tropical sources priority • 6 soil-specific analyses
                  </p>
                </div>
              )}

              {/* STEP 3: Research Results Preview */}
              {researchResults && !researching && (
                <div>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontFamily: 'DM Sans',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#FFFFFF'
                  }}>
                    Research Complete — Review Results
                  </h3>

                  {/* Generic Scores */}
                  <div style={{
                    padding: '16px',
                    background: '#060C14',
                    border: '1px solid rgba(139,160,180,0.18)',
                    borderRadius: '6px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#40D7C5',
                      marginBottom: '12px'
                    }}>
                      GENERIC PERFORMANCE
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#8B9CB4' }}>
                          Overall Score:
                        </span>
                        <span style={{ fontFamily: 'DM Mono', fontSize: '15px', color: '#FFFFFF', marginLeft: '8px' }}>
                          {researchResults.generic.one_nine_score}/9
                        </span>
                      </div>

                      <div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#8B9CB4' }}>
                          Cost:
                        </span>
                        <span style={{ fontFamily: 'DM Mono', fontSize: '15px', color: '#FFFFFF', marginLeft: '8px' }}>
                          ${researchResults.generic.cost_per_tonne_fw}/t
                        </span>
                      </div>

                      <div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#8B9CB4' }}>
                          Lignin:
                        </span>
                        <span style={{ fontFamily: 'DM Mono', fontSize: '15px', color: '#FFFFFF', marginLeft: '8px' }}>
                          {researchResults.generic.lignin_score}/5
                        </span>
                      </div>

                      <div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#8B9CB4' }}>
                          P-Release:
                        </span>
                        <span style={{ fontFamily: 'DM Mono', fontSize: '15px', color: '#FFFFFF', marginLeft: '8px' }}>
                          {researchResults.generic.p_releaser_score}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Soil-Specific Scores */}
                  <div style={{
                    padding: '16px',
                    background: '#060C14',
                    border: '1px solid rgba(139,160,180,0.18)',
                    borderRadius: '6px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#40D7C5',
                      marginBottom: '12px'
                    }}>
                      SOIL-SPECIFIC SCORES
                    </div>

                    {researchResults.soils.map((soil, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: idx < researchResults.soils.length - 1 ? '1px solid rgba(139,160,180,0.12)' : 'none'
                      }}>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#FFFFFF' }}>
                          {soil.soil_type}
                        </span>
                        <span style={{ fontFamily: 'DM Mono', fontSize: '14px', color: '#F5A623' }}>
                          {soil.score}★ ({soil.confidence})
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Citations */}
                  <div style={{
                    padding: '12px',
                    background: 'rgba(64,215,197,0.08)',
                    border: '1px solid rgba(64,215,197,0.20)',
                    borderRadius: '6px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontFamily: 'DM Sans',
                      fontSize: '13px',
                      color: '#40D7C5',
                      marginBottom: '4px'
                    }}>
                      ✓ {researchResults.citations.length} peer-reviewed citations
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      color: '#8B9CB4',
                      fontStyle: 'italic'
                    }}>
                      {researchResults.citations.slice(0, 2).join('; ')}...
                    </div>
                  </div>

                  {/* Warnings */}
                  {researchResults.warnings && (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(245,166,35,0.12)',
                      border: '1px solid rgba(245,166,35,0.30)',
                      borderRadius: '6px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <AlertCircle size={20} color="#F5A623" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontFamily: 'DM Sans',
                        fontSize: '13px',
                        color: '#F5A623'
                      }}>
                        {researchResults.warnings}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleCancel}
                      style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: '1.5px solid rgba(139,160,180,0.30)',
                        borderRadius: '6px',
                        color: '#8B9CB4',
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleApprove}
                      style={{
                        padding: '10px 20px',
                        background: 'rgba(0,162,73,0.15)',
                        border: '1.5px solid rgba(0,162,73,0.50)',
                        borderRadius: '6px',
                        color: '#00A249',
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Check size={18} />
                      Approve & Add to Database
                    </button>
                  </div>

                  <p style={{
                    margin: '12px 0 0 0',
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                    color: '#8B9CB4',
                    textAlign: 'right',
                    fontStyle: 'italic'
                  }}>
                    Will be added with is_approved = FALSE (pending Sharon's review)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
};

export default AddOrganismButton;
