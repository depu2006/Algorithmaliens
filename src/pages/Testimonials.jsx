import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

import SEO from '../components/SEO';
import testimonialsData from '../data/testimonials.json';

const Testimonials = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Reviews' },
    { value: 'client', label: 'Client Feedback' },
    { value: 'internship', label: 'Internships' },
    { value: 'training', label: 'Academy Training' },
    { value: 'event', label: 'Event Participants' }
  ];

  const filteredData = filter === 'all' 
    ? testimonialsData 
    : testimonialsData.filter((t) => t.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <>
      <SEO 
        title="Testimonials & Community Reviews"
        description="Browse feedback, success stories, and verified client testimonials praising AlgorithmAliens Pvt. Ltd.'s custom software development."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Social Proof</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Verified Reviews</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            Explore testimonials from corporate executives, academic coordinators, and interns who experienced our workflows.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Testimonial Grid */}
      <section className="section-padding">
        <div className="container">
          {/* Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`btn ${filter === cat.value ? 'btn-gradient' : 'btn-outline-custom'} px-4 py-2`}
                style={{ fontSize: '0.9rem' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Testimonial Cards Grid */}
          <motion.div 
            className="row g-4"
            variants={containerVariants}
            key={filter} // Re-animate grid on filter change
            initial="hidden"
            animate="visible"
          >
            {filteredData.length > 0 ? (
              filteredData.map((test) => (
                <div className="col-lg-4 col-md-6" key={test.id}>
                  <motion.div 
                    className="card-custom p-4 d-flex flex-column justify-content-between h-100"
                    variants={cardVariants}
                  >
                    <div>
                      {/* Quote decoration */}
                      <div className="mb-3">
                        <MessageSquare className="text-gradient" size={24} style={{ opacity: 0.6 }} />
                      </div>
                      
                      {/* Star ratings */}
                      <div className="d-flex gap-1 mb-3 text-warning">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} fill="currentColor" size={14} />
                        ))}
                      </div>

                      <p className="text-white small italic mb-4" style={{ lineHeight: '1.6', fontFamily: "'Outfit', sans-serif" }}>
                        "{test.feedback}"
                      </p>
                    </div>

                    <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.12)' }}>
                      <img 
                        src={test.photo} 
                        alt={test.name} 
                        className="rounded-circle border"
                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderColor: 'var(--primary-purple) !important' }}
                      />
                      <div>
                        <h6 className="fw-bold text-white mb-0">{test.name}</h6>
                        <small className="text-gradient-cyan text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>{test.role}</small>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted-custom">No testimonials available under this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
