import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ChevronDown, Loader2 } from 'lucide-react';

import SEO from '../components/SEO';
import { api } from '../services/api';

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getTestimonials()
      .then(data => {
        setTestimonialsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } }
  };

  return (
    <>
      <SEO 
        title="Testimonials & Community Reviews"
        description="Browse feedback, success stories, and verified client testimonials praising AlgorithmAliens Pvt. Ltd.'s custom software development."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <MessageSquare size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Social Proof</span>
          <h1 className="creative-heading lh-sm mb-3">
            Verified <span className="text-gradient">Reviews</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Explore testimonials from corporate executives, academic coordinators, and interns who experienced our workflows.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#testimonials-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="testimonials-body" className="subpage-body">
        {/* Testimonial Grid (Filters removed) */}
        <section className="section-padding">
          <div className="container">
            <motion.div 
              className="row g-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                <div className="col-12 text-center py-5">
                  <Loader2 className="animate-spin text-gradient mb-3" size={32} />
                  <p className="text-muted-custom small">Loading testimonials...</p>
                </div>
              ) : testimonialsData.length > 0 ? (
                testimonialsData.map((test) => (
                  <div className="col-lg-4 col-md-6" key={test.id}>
                    <motion.div 
                      className="card-custom p-4 d-flex flex-column justify-content-between h-100"
                      variants={cardVariants}
                    >
                      <div>
                        {/* Quote icon & Star ratings */}
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <div className="icon-3d-wrapper" style={{ width: '36px', height: '36px' }}>
                            <MessageSquare className="text-white" size={14} />
                          </div>
                          <div className="d-flex gap-0.5 text-warning">
                            {Array.from({ length: Math.max(1, Math.min(5, Number(test.rating) || 5)) }).map((_, i) => (
                              <Star key={i} fill="currentColor" size={12} />
                            ))}
                          </div>
                        </div>

                        <p className="text-white small italic mb-4" style={{ lineHeight: '1.6', fontFamily: "'Outfit', sans-serif" }}>
                          "{test.feedback}"
                        </p>
                      </div>

                      <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                        <img 
                          src={test.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                          alt={test.name} 
                          className="rounded-circle border border-secondary"
                          style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.88rem' }}>{test.name}</h6>
                          <small className="text-gradient-cyan text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>{test.role}</small>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted-custom">No testimonials registered yet.</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;
