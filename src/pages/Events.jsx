import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, Star, X, ZoomIn, ChevronDown } from 'lucide-react';

import SEO from '../components/SEO';
import eventsData from '../data/events.json';

const Events = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <>
      <SEO 
        title="Hackathons & Technical Events"
        description="Stay updated with our flagship events, including Hack It On 2025, Code Crack, and the Aarohan Aethronix technology symposia."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <Calendar size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Community Initiatives</span>
          <h1 className="creative-heading lh-sm mb-3">
            Corporate & Student <span className="text-gradient">Events</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            We organize national hackathons, developer sprints, and technical symposiums to foster coding communities and highlight engineering breakthroughs.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#events-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="events-body" className="subpage-body">
        {/* Events List */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              className="row g-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {eventsData.map((event) => (
                <div className="col-12" key={event.id}>
                  <motion.div 
                    className="card-custom p-0 overflow-hidden"
                    variants={cardVariants}
                  >
                    <div className="row g-0">
                      {/* Event Banner Info (Left) */}
                      <div className="col-lg-5 position-relative" style={{ 
                        minHeight: '380px', 
                        background: `linear-gradient(rgba(11, 11, 12, 0.4), rgba(11, 11, 12, 0.85)), url(${event.banner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}>
                        {/* Ambient color ring in background */}
                        <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.2) 0%, transparent 70%)' }} />
                        
                        <div className="position-absolute top-50 start-50 translate-middle w-100 text-center px-4">
                          <span className="badge rounded-pill bg-secondary mb-3 px-3 py-1.5 fs-7" style={{ background: 'var(--gradient-main) !important', border: 'none', color: 'var(--white)', fontWeight: 'bold' }}>
                            <Calendar size={12} className="me-1.5" />
                            {event.date}
                          </span>
                          <h2 className="fw-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.75rem' }}>{event.title}</h2>
                          <span className="text-gradient fw-bold text-uppercase tracking-widest small" style={{ fontSize: '0.72rem', letterSpacing: '2px' }}>{event.year} Edition</span>
                        </div>
                      </div>

                      {/* Event Details (Right) */}
                      <div className="col-lg-7 p-5 d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.02), transparent)' }}>
                        <div>
                          <h5 className="fw-bold text-white mb-3" style={{ fontSize: '1.1rem', fontFamily: "'Outfit', sans-serif" }}>Overview</h5>
                          <p className="text-muted-custom mb-4" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                            {event.description}
                          </p>

                          <div className="row g-4 mb-4">
                            {/* Highlights */}
                            <div className="col-md-6">
                              <h6 className="fw-bold text-white mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                                <div className="icon-3d-wrapper" style={{ width: '28px', height: '28px' }}>
                                  <Star size={12} className="text-white" />
                                </div>
                                Key Highlights:
                              </h6>
                              <ul className="list-unstyled mb-0">
                                {event.highlights.map((hl, idx) => (
                                  <li className="text-muted-custom mb-1.5 d-flex align-items-start gap-2" style={{ fontSize: '0.82rem' }} key={idx}>
                                    <span className="text-gradient-cyan" style={{ fontSize: '0.9rem', lineHeight: '1' }}>•</span>
                                    <span>{hl}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Highlighted Winners (Separated, not mixed) */}
                            {event.winners && (
                              <div className="col-md-6">
                                <h6 className="fw-bold text-white mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                                  <div className="icon-3d-wrapper" style={{ width: '28px', height: '28px' }}>
                                    <Award size={12} className="text-white" />
                                  </div>
                                  Podiums & Winners:
                                </h6>
                                <div className="d-flex flex-column gap-2">
                                  {event.winners.split(',').map((w, idx) => (
                                    <div 
                                      key={idx} 
                                      className="p-2 px-3 rounded text-white d-flex align-items-center justify-content-between" 
                                      style={{ 
                                        background: 'rgba(255, 255, 255, 0.04)', 
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.1)'
                                      }}
                                    >
                                      <span className="fw-bold text-gradient" style={{ fontSize: '0.82rem' }}>{w.trim()}</span>
                                      <Award size={12} className="text-gradient-cyan flex-shrink-0" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Event Gallery (Made much more visible) */}
                        {event.gallery && event.gallery.length > 0 && (
                          <div className="pt-4 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                            <h6 className="fw-bold text-muted-custom mb-3 small text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '0.72rem' }}>Highlights Gallery (Click to Zoom)</h6>
                            <div className="row g-2">
                              {event.gallery.map((imgUrl, idx) => (
                                <div className="col-6 col-sm-4 col-md-3" key={idx}>
                                  <div 
                                    className="position-relative rounded overflow-hidden cursor-pointer" 
                                    style={{ height: '140px', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                                    onClick={() => setSelectedImage({ url: imgUrl, title: event.title })}
                                  >
                                    <img 
                                      src={imgUrl} 
                                      alt={`${event.title} gallery ${idx + 1}`} 
                                      className="w-100 h-100" 
                                      style={{ objectFit: 'cover', transition: 'all 0.3s' }} 
                                    />
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-40 opacity-0 hover-opacity-100" style={{ transition: 'opacity 0.2s' }}>
                                      <ZoomIn size={18} className="text-white" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="lightbox-content"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  className="lightbox-close" 
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close lightbox"
                >
                  <X size={28} />
                </button>

                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="lightbox-image" 
                />

                <div className="mt-3 p-3 rounded" style={{ background: 'rgba(11, 11, 12, 0.9)', border: '1px solid var(--glass-border)' }}>
                  <h5 className="fw-bold text-white mb-0" style={{ fontSize: '0.98rem' }}>{selectedImage.title} - Highlight Frame</h5>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Events;
