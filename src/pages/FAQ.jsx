import React, { useState, useEffect } from 'react';
import { Search, HelpCircle, ChevronDown, Loader2 } from 'lucide-react';

import SEO from '../components/SEO';
import { api } from '../services/api';

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getFAQ()
      .then(data => {
        setFaqData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredFAQ = faqData.filter((faq) => {
    return faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to questions about custom web development timelines, internships, ANX Clubs, and consultation scheduling."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <HelpCircle size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Help Center</span>
          <h1 className="creative-heading lh-sm mb-3">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Got questions? Search through our documentation and commonly asked support queries below.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#faq-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="faq-body" className="subpage-body">
        {/* Interactive Search & Q&A Grid (Filters removed, layout changed) */}
        <section className="section-padding">
          <div className="container">
            
            {/* Search bar */}
            <div className="position-relative mb-5 mx-auto" style={{ maxWidth: '680px' }}>
              <input
                type="text"
                className="form-control form-control-custom ps-5 py-3"
                style={{ fontSize: '1rem', borderRadius: '10px' }}
                placeholder="Search questions or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search 
                className="position-absolute top-50 start-0 translate-middle-y ms-3.5 text-muted-custom" 
                size={18} 
              />
            </div>

            {/* Q&A Bento Grid (No accordions) */}
            {loading ? (
              <div className="text-center py-5 card-custom align-items-center">
                <Loader2 className="animate-spin text-gradient mb-3" size={32} />
                <h5 className="fw-bold text-white mb-1">Loading FAQ Data</h5>
                <p className="text-muted-custom mb-0 small">Please wait while we connect to the database...</p>
              </div>
            ) : filteredFAQ.length > 0 ? (
              <div className="row g-4">
                {filteredFAQ.map((faq) => (
                  <div className="col-md-6" key={faq.id}>
                    <div 
                      className="card-custom p-4 h-100" 
                      style={{ 
                        borderLeft: '4px solid var(--accent-cyan)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
                      }}
                    >
                      <h5 className="fw-bold text-white mb-3" style={{ fontSize: '1.05rem', display: 'flex', gap: '8px' }}>
                        <span className="text-gradient">Q.</span> {faq.question}
                      </h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 card-custom align-items-center">
                <HelpCircle size={32} className="text-gradient mb-3" />
                <h5 className="fw-bold text-white mb-1">No Matching FAQs Found</h5>
                <p className="text-muted-custom mb-0 small">Try using different search queries.</p>
              </div>
            )}

          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;
