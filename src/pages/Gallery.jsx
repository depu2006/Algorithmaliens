import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Play, X, Info, ChevronDown, Image, Loader2 } from 'lucide-react';

import SEO from '../components/SEO';
import { api } from '../services/api';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getGallery()
      .then(data => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { value: 'all', label: 'All Media' },
    { value: 'events', label: 'Events' },
    { value: 'workshops', label: 'Workshops' },
    { value: 'internships', label: 'Internships' },
    { value: 'team', label: 'Team' },
    { value: 'projects', label: 'Projects' }
  ];

  const filteredData = filter === 'all'
    ? galleryData
    : galleryData.filter((item) => item.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } }
  };

  return (
    <>
      <SEO 
        title="Gallery & Video Showcases"
        description="Browse photos, team activities, bootcamps, and video demonstrations showcasing technical milestones at AlgorithmAliens Pvt. Ltd."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <Image size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Visual Highlights</span>
          <h1 className="creative-heading lh-sm mb-3">
            Corporate <span className="text-gradient">Gallery</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            A visual directory of our coding meetups, student hackathons, platform launches, and team workshops.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#gallery-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="gallery-body" className="subpage-body">
        {/* Media Grid & Lightbox Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-gradient fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.85rem' }}>Workshop Highlights</span>
              <h2 className="creative-heading lh-sm mb-2">Craft, <span className="text-gradient">Design, Create</span></h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '620px' }}>
                Explore the Canva workshop and see the students who joined this hands-on creative session.
              </p>
            </div>
            
            {/* Filters */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`btn ${filter === cat.value ? 'btn-gradient' : 'btn-outline-custom'} px-4 py-2`}
                  style={{ fontSize: '0.85rem' }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid Layout */}
            <motion.div 
              className="row g-4"
              variants={containerVariants}
              key={filter} 
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                <div className="col-12 text-center py-5">
                  <Loader2 className="animate-spin text-gradient mb-3" size={32} />
                  <p className="text-muted-custom small">Loading gallery...</p>
                </div>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div className="col-lg-4 col-md-6 col-12" key={item.id}>
                    <motion.div 
                      className="card-custom p-0 overflow-hidden position-relative group"
                      variants={itemVariants}
                      style={{ height: '260px', cursor: 'pointer' }}
                      onClick={() => setSelectedMedia(item)}
                    >
                      {/* Media Thumbnail */}
                      {item.type === 'video' ? (
                        <div className="w-100 h-100 position-relative bg-dark d-flex align-items-center justify-content-center">
                          <div className="position-absolute" style={{ zIndex: 2 }}>
                            <div className="icon-3d-wrapper" style={{ width: '48px', height: '48px' }}>
                              <Play fill="#FFFFFF" color="#FFFFFF" size={18} className="ms-0.5" />
                            </div>
                          </div>
                          <video src={item.url} muted className="gallery-card-video w-100 h-100" style={{ objectFit: 'cover', opacity: 0.35 }} />
                        </div>
                      ) : (
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-100 h-100" 
                          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        />
                      )}

                      {/* Hover Overlay */}
                      <div 
                        className="gallery-card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4" 
                        style={{ 
                          background: 'linear-gradient(to top, rgba(11,11,12,0.96) 0%, rgba(11,11,12,0.4) 60%, transparent 100%)',
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        <span className="badge align-self-start text-uppercase mb-1.5" style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--accent-cyan)' }}>
                          {item.category}
                        </span>
                        <h5 className="fw-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem' }}>{item.title}</h5>
                        <p className="text-muted-custom small mb-0 text-truncate">{item.description}</p>
                        
                        <div className="position-absolute top-0 end-0 m-3 p-2 rounded-circle bg-black bg-opacity-40 text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                          <Maximize2 size={13} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5 align-items-center">
                  <Info size={32} className="text-gradient mb-3" />
                  <h5 className="fw-bold text-white mb-1">No Media Available</h5>
                  <p className="text-muted-custom small">Currently, no items are tagged in this gallery group.</p>
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
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  className="lightbox-close" 
                  onClick={() => setSelectedMedia(null)}
                  aria-label="Close lightbox"
                >
                  <X size={28} />
                </button>

                {/* Render Media content */}
                {selectedMedia.type === 'video' ? (
                  <video 
                    src={selectedMedia.url} 
                    controls 
                    autoPlay 
                    className="lightbox-video"
                    style={{ width: '100%', maxHeight: '70vh', outline: 'none' }} 
                  />
                ) : (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.title} 
                    className="lightbox-image" 
                  />
                )}

                {/* Information Overlay */}
                <div className="gallery-lightbox-info mt-3 p-3.5 rounded" style={{ background: 'rgba(11, 11, 12, 0.9)', border: '1px solid var(--glass-border)' }}>
                  <span className="badge text-uppercase mb-1.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--accent-cyan)', fontSize: '0.68rem' }}>
                    {selectedMedia.category}
                  </span>
                  <h4 className="fw-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem' }}>{selectedMedia.title}</h4>
                  <p className="text-muted-custom small mb-0">{selectedMedia.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;
