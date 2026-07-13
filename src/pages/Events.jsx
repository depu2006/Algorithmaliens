import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Star, ListCollapse } from 'lucide-react';

import SEO from '../components/SEO';
import eventsData from '../data/events.json';

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <>
      <SEO 
        title="Hackathons & Technical Events"
        description="Stay updated with our flagship events, including Hack It On 2025, Code Crack, and the Aarohan Aethronix technology symposia."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Community Initiatives</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Corporate & Student Events</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            We organize national hackathons, algorithm challenges, and technical symposiums to foster developer engagement and highlight breakthroughs.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {eventsData.map((event) => (
              <div className="col-12 mb-4" key={event.id}>
                <motion.div 
                  className="card-custom p-0 overflow-hidden"
                  variants={cardVariants}
                >
                  <div className="row g-0">
                    {/* Event Banner Info (Left) */}
                    <div className="col-lg-5 position-relative" style={{ 
                      minHeight: '300px', 
                      background: `linear-gradient(rgba(23, 0, 38, 0.7), rgba(7, 0, 16, 0.85)), url(${event.banner})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}>
                      <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(138, 92, 255, 0.25) 0%, transparent 70%)' }} />
                      
                      <div className="position-absolute top-50 start-50 translate-middle w-100 text-center px-4">
                        <span className="badge bg-primary mb-3 px-3 py-2 fs-7" style={{ background: 'var(--gradient-main) !important' }}>
                          <Calendar size={14} className="me-1" />
                          {event.date}
                        </span>
                        <h2 className="fw-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{event.title}</h2>
                        <span className="text-gradient-cyan fw-bold text-uppercase tracking-widest small">{event.year} Edition</span>
                      </div>
                    </div>

                    {/* Event Details (Right) */}
                    <div className="col-lg-7 p-5 d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-bold text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Overview</h4>
                        <p className="text-muted-custom mb-4" style={{ lineHeight: '1.7', fontSize: '1.02rem' }}>
                          {event.description}
                        </p>

                        <div className="row g-4 mb-4">
                          {/* Highlights */}
                          <div className="col-md-6">
                            <h6 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
                              <Star size={16} className="text-gradient" />
                              Key Highlights
                            </h6>
                            <ul className="list-unstyled mb-0">
                              {event.highlights.map((hl, idx) => (
                                <li className="text-muted-custom small mb-1 d-flex align-items-start gap-1" key={idx}>
                                  <span className="text-gradient-cyan">&#8226;</span>
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Winners */}
                          {event.winners && (
                            <div className="col-md-6">
                              <h6 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
                                <Award size={16} className="text-gradient-cyan" />
                                Podiums / Winners
                              </h6>
                              <p className="text-muted-custom small mb-0 p-2 rounded" style={{ background: 'rgba(92, 225, 230, 0.05)', border: '1px solid rgba(92, 225, 230, 0.12)' }}>
                                {event.winners}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Gallery inside Card */}
                      {event.gallery && event.gallery.length > 0 && (
                        <div className="pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.12)' }}>
                          <h6 className="fw-bold text-muted-custom mb-3 small text-uppercase" style={{ letterSpacing: '1px' }}>Event Highlights Gallery</h6>
                          <div className="row g-2">
                            {event.gallery.map((imgUrl, idx) => (
                              <div className="col-3" key={idx}>
                                <img 
                                  src={imgUrl} 
                                  alt={`${event.title} gallery ${idx + 1}`} 
                                  className="img-fluid rounded border border-secondary" 
                                  style={{ height: '50px', width: '100%', objectFit: 'cover' }} 
                                />
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
    </>
  );
};

export default Events;
