import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

import SEO from '../components/SEO';
import productsData from '../data/products.json';

const Products = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <>
      <SEO 
        title="Our Products & Ecosystems"
        description="Nurturing the future of engineering. Explore the training paths at AlgorithmAliens Academy and college-based developer chapters through ANX Clubs."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Ecosystem</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Products & Clubs</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            We build collaborative hubs, technical bootcamps, and developer networks to cultivate coding culture and leadership skills.
          </p>
        </div>
      </section>

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
                    {/* Header */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '56px', height: '56px', background: 'rgba(92, 225, 230, 0.12)', border: '1px solid rgba(92, 225, 230, 0.2)' }}>
                        {prod.id === 'academy' ? (
                          <BookOpen size={28} className="text-gradient-cyan" />
                        ) : (
                          <Users size={28} className="text-gradient-cyan" />
                        )}
                      </div>
                      <div>
                        <span className="text-gradient fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>{prod.tagline}</span>
                        <h2 className="fw-bold mb-0 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{prod.title}</h2>
                      </div>
                    </div>

                    <p className="text-muted-custom mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                      {prod.description}
                    </p>

                    {/* Programs */}
                    <div className="mb-4">
                      <h5 className="fw-bold text-white mb-3">Core Programs</h5>
                      <div className="row g-2">
                        {prod.features.map((prog) => (
                          <div className="col-sm-6" key={prog}>
                            <div className="d-flex align-items-center gap-2 text-muted-custom small">
                              <CheckCircle size={14} className="text-gradient-cyan" />
                              <span>{prog}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h5 className="fw-bold text-white mb-3">Student Benefits</h5>
                      <ul className="list-unstyled mb-0">
                        {prod.benefits.map((benefit, i) => (
                          <li className="d-flex align-items-start gap-2 mb-2 text-muted-custom" style={{ fontSize: '0.92rem' }} key={i}>
                            <Award size={16} className="text-gradient mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 pt-4 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.15)' }}>
                    {prod.id === 'academy' ? (
                      <Link to="/internships" className="btn-gradient w-100 justify-content-center">
                        <span>Enroll / View Internship Programs</span>
                        <ChevronRight size={16} />
                      </Link>
                    ) : (
                      <Link to="/contact" className="btn-outline-custom w-100 justify-content-center">
                        <span>Establish ANX Club Chapter</span>
                        <ChevronRight size={16} />
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
      <section className="section-padding bg-black bg-opacity-25 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider d-block mb-2">Roadmap</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Future Products Under Development</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '500px' }}>
              Our R&D division is continuously engineering SaaS web products and automated developer utilities.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="card-custom text-center p-4">
                <HelpCircle size={32} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">AlienIDE</h5>
                <p className="text-muted-custom small mb-0">
                  A collaborative online code editor integrated with custom local LLMs for student team hacking.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card-custom text-center p-4">
                <HelpCircle size={32} className="text-gradient-cyan mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">ANX HackSpace</h5>
                <p className="text-muted-custom small mb-0">
                  A custom platform to set up, track, and score college coding contests and code-reviews automatically.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card-custom text-center p-4">
                <HelpCircle size={32} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">VoiceFlow Agent</h5>
                <p className="text-muted-custom small mb-0">
                  Next-gen AI voice assistant designed to handle booking schedules and customer calls seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
