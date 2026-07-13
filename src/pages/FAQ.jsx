import React, { useState } from 'react';
import { Search, Info, HelpCircle } from 'lucide-react';

import SEO from '../components/SEO';
import faqData from '../data/faq.json';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All FAQs' },
    { value: 'general', label: 'General' },
    { value: 'services', label: 'Services' },
    { value: 'products', label: 'Products' },
    { value: 'internships', label: 'Internships' },
    { value: 'events', label: 'Events' },
    { value: 'contact', label: 'Contact' }
  ];

  // Filters faq based on category and search query
  const filteredFAQ = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to questions about custom web development timelines, internships, ANX Clubs, and consultation scheduling."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Help Center</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Frequently Asked Questions</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            Got queries? Search through our documentation and commonly asked support logs below.
          </p>
        </div>
      </section>

      {/* Interactive Search & Accordion FAQ */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '850px' }}>
          
          {/* Search bar */}
          <div className="position-relative mb-5">
            <input
              type="text"
              className="form-control form-control-custom ps-5 py-3 fs-5"
              placeholder="Search questions or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search 
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted-custom" 
              size={22} 
            />
          </div>

          {/* Categories Filter Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`btn ${activeCategory === cat.value ? 'btn-gradient' : 'btn-outline-custom'} px-3 py-1.5`}
                style={{ fontSize: '0.85rem' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          {filteredFAQ.length > 0 ? (
            <div className="accordion" id="faqAccordion">
              {filteredFAQ.map((faq, index) => (
                <div className="accordion-item accordion-item-custom" key={faq.id}>
                  <h2 className="accordion-header" id={`heading-${faq.id}`}>
                    <button
                      className="accordion-button accordion-button-custom collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${faq.id}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${faq.id}`}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <HelpCircle size={18} className="text-gradient" />
                        {faq.question}
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${faq.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${faq.id}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body accordion-body-custom">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 card-custom">
              <Info size={36} className="text-gradient mb-3 mx-auto" />
              <h5 className="fw-bold text-white mb-2">No Matching FAQs Found</h5>
              <p className="text-muted-custom mb-0">Try using different search queries or change the category filter.</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default FAQ;
