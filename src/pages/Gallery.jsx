import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Play, X, Info } from 'lucide-react';

import SEO from '../components/SEO';
import galleryData from '../data/gallery.json';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const categories = [
    { value: 'all', label: 'All Photos & Videos' },
    { value: 'events', label: 'Events' },
    { value: 'workshops', label: 'Workshops' },
    { value: 'internships', label: 'Internships' },
    { value: 'team', label: 'Team Activities' },
    { value: 'projects', label: 'Client Projects' }
  ];

  const filteredData = filter === 'all'
    ? galleryData
    : galleryData.filter((item) => item.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <>
      <SEO 
        title="Gallery & Video Showcases"
        description="Browse photos, team activities, bootcamps, and video demonstrations showcasing technical milestones at AlgorithmAliens Pvt. Ltd."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Visual Highlights</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Corporate Gallery</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            A look back at our coding meetups, student hackathons, system launches, and corporate work culture.
          </p>
        </div>
      </section>

      {/* Media Grid & Lightbox Section */}
      <section className="section-padding">
        <div className="container">
          
          {/* Filters */}
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

          {/* Grid Layout */}
          <motion.div 
            className="row g-4"
            variants={containerVariants}
            key={filter} // Re-animate grid when filter shifts
            initial="hidden"
            animate="visible"
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div className="col-lg-4 col-md-6 col-12" key={item.id}>
                  <motion.div 
                    className="card-custom p-0 overflow-hidden position-relative group"
                    variants={itemVariants}
                    style={{ height: '280px', cursor: 'pointer' }}
                    onClick={() => setSelectedMedia(item)}
                  >
                    {/* Media Thumbnail */}
                    {item.type === 'video' ? (
                      <div className="w-100 h-100 position-relative bg-dark d-flex align-items-center justify-content-center">
                        <div className="position-absolute" style={{ zIndex: 2 }}>
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', background: 'rgba(92,225,230,0.85)', boxShadow: 'var(--glow-shadow-cyan)' }}>
                            <Play fill="#0A0015" color="#0A0015" size={24} className="ms-1" />
                          </div>
                        </div>
                        <video src={item.url} muted className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.4 }} />
                      </div>
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-100 h-100" 
                        style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      />
                    )}

                    {/* Hover Overlay info */}
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3" 
                      style={{ 
                        background: 'linear-gradient(to top, rgba(10,0,21,0.97) 0%, rgba(10,0,21,0.5) 55%, transparent 100%)',
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <span className="badge align-self-start text-uppercase mb-1" style={{ fontSize: '0.65rem', background: 'rgba(138,92,255,0.25)', border: '1px solid rgba(138,92,255,0.3)', color: 'var(--primary-cyan)' }}>
                        {item.category}
                      </span>
                      <h5 className="fw-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }}>{item.title}</h5>
                      <p className="text-muted-custom small mb-0 text-truncate">{item.description}</p>
                      <div className="position-absolute top-0 end-0 m-2 p-2 rounded-circle bg-dark bg-opacity-50 text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <Info size={36} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">No Media Available</h5>
                <p className="text-muted-custom">Currently, no items are tagged in this gallery group.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="lightbox-close" 
                onClick={() => setSelectedMedia(null)}
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>

              {/* Render Media content */}
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  controls 
                  autoPlay 
                  className="lightbox-video"
                  style={{ width: '100%', maxHeight: '75vh', outline: 'none' }} 
                />
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.title} 
                  className="lightbox-image" 
                />
              )}

              {/* Information Overlay */}
              <div className="mt-3 p-3 rounded" style={{ background: 'rgba(23,0,38,0.7)', border: '1px solid rgba(138,92,255,0.15)' }}>
                <span className="badge bg-primary text-uppercase mb-1.5" style={{ background: 'var(--gradient-main) !important', fontSize: '0.7rem' }}>
                  {selectedMedia.category}
                </span>
                <h4 className="fw-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{selectedMedia.title}</h4>
                <p className="text-muted-custom small mb-0">{selectedMedia.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
