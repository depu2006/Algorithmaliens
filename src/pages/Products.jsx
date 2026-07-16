import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, BookOpen, ChevronRight, HelpCircle, ChevronDown, Layers } from 'lucide-react';

import SEO from '../components/SEO';
import productsData from '../data/products.json';

// Fixed anx-clubs ID mapping to ensure the image loads
const productImages = {
  "academy": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
  "anx-clubs": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
};

const Products = () => {
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
        title="Our Products & Ecosystems"
        description="Nurturing the future of engineering. Explore the training paths at AlgorithmAliens Academy and college-based developer chapters through ANX Clubs."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <Layers size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Ecosystem</span>
          <h1 className="creative-heading lh-sm mb-3">
            Products & <span className="text-gradient">Clubs</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            We build training platforms and student-driven networks to cultivate coding culture, software leadership, and hands-on skill development.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#products-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="products-body" className="subpage-body">
        {/* Products Detail */}
        <section className="section-padding">
          <div className="container">
            <motion.div 
              className="row g-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {productsData.map((prod) => (
                <div className="col-lg-6" key={prod.id}>
                  <motion.div 
                    className="card-custom p-5 d-flex flex-column h-100 justify-content-between"
                    variants={cardVariants}
                  >
                    <div>
                      {/* High-Resolution Picture */}
                      <div className="card-image-wrap" style={{ height: '240px', marginBottom: '2rem' }}>
                        <img src={productImages[prod.id]} alt={prod.title} />
                        <div className="position-absolute top-0 start-0 m-3">
                          <div className="icon-3d-wrapper" style={{ width: '42px', height: '42px' }}>
                            {prod.id === 'academy' ? (
                              <BookOpen size={18} className="text-white" />
                            ) : (
                              <Users size={18} className="text-white" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mb-4">
                        <span className="text-gradient-cyan fw-bold text-uppercase small" style={{ letterSpacing: '0.5px', fontSize: '0.75rem' }}>{prod.tagline}</span>
                        <h3 className="fw-bold mb-0 text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem' }}>{prod.title}</h3>
                      </div>

                      <p className="text-muted-custom mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {prod.description}
                      </p>

                      {/* Programs */}
                      <div className="mb-4 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                        <h6 className="fw-bold text-white mb-3" style={{ fontSize: '0.85rem' }}>Core Modules:</h6>
                        <div className="row g-2">
                          {prod.features.map((prog) => (
                            <div className="col-sm-6" key={prog}>
                              <div className="d-flex align-items-center gap-2 text-muted-custom small" style={{ fontSize: '0.85rem' }}>
                                <CheckCircle size={12} className="text-gradient-cyan" />
                                <span>{prog}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-2">
                        <h6 className="fw-bold text-white mb-2.5" style={{ fontSize: '0.85rem' }}>Student Benefits:</h6>
                        <ul className="list-unstyled mb-0">
                          {prod.benefits.map((benefit, i) => (
                            <li className="d-flex align-items-start gap-2 mb-2 text-muted-custom" style={{ fontSize: '0.85rem' }} key={i}>
                              <Award size={14} className="text-gradient mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-5 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                      {prod.id === 'academy' ? (
                        <Link to="/internships" className="btn-gradient w-100 justify-content-center">
                          <span>Internship Tracks</span>
                          <ChevronRight size={15} />
                        </Link>
                      ) : (
                        <Link to="/contact" className="btn-outline-custom w-100 justify-content-center">
                          <span>Establish ANX Club Chapter</span>
                          <ChevronRight size={15} />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Future Products Pipeline */}
        <section className="section-padding bg-black bg-opacity-20 border-top" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Roadmap</span>
              <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Future Pipeline</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                Our R&D division is continuously engineering SaaS web products and automated developer utilities.
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="card-custom text-center p-4">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <HelpCircle size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>AlienIDE</h5>
                  <p className="text-muted-custom small mb-0">
                    A collaborative online code environment integrated with custom local LLMs for student hacking.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="card-custom text-center p-4">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <HelpCircle size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>ANX HackSpace</h5>
                  <p className="text-muted-custom small mb-0">
                    A custom environment to set up, track, and score college coding contests and review code.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="card-custom text-center p-4">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <HelpCircle size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>VoiceFlow Agent</h5>
                  <p className="text-muted-custom small mb-0">
                    Intelligent AI voice agents designed to schedule consultations and handle calls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
