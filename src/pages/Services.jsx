import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Cpu, Zap, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';

import SEO from '../components/SEO';
import { api } from '../services/api';

// Service pictures map
const serviceImages = {
  "web-development": "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
  "mobile-development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
  "ai-automation": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  "custom-software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
};

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.public.getServices()
      .then(data => {
        setServicesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <>
      <SEO 
        title="Our Services"
        description="Explore custom website development, mobile app construction, smart AI automation processes, and bespoke SaaS solutions engineered by AlgorithmAliens Pvt. Ltd."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <Cpu size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Capabilities</span>
          <h1 className="creative-heading lh-sm mb-3">
            Technical <span className="text-gradient">Services</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            We design, build, and integrate digital products that automate workflows, modernize interfaces, and optimize core business operations.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#services-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="services-body" className="subpage-body">
        {/* Services Detail Sections */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                <div className="text-center py-5 card-custom align-items-center">
                  <Loader2 className="animate-spin text-gradient mb-3" size={32} />
                  <h5 className="fw-bold text-white mb-1">Loading Services</h5>
                  <p className="text-muted-custom mb-0 small">Connecting to our database...</p>
                </div>
              ) : servicesData.length > 0 ? (
                servicesData.map((service, index) => {
                const IconComponent = Icons[service.icon] || Icons.Cpu;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={service.id}
                    className="row align-items-center g-5 mb-5 pb-5"
                    variants={sectionVariants}
                    viewport={{ once: true, amount: 0.15 }}
                    style={{
                      borderBottom: index !== servicesData.length - 1 ? '1px solid var(--glass-border)' : 'none',
                      paddingBottom: index !== servicesData.length - 1 ? '5rem' : '0'
                    }}
                  >
                    {/* Service Graphic/Mockup Card with Image */}
                    <div className={`col-lg-6 ${!isEven ? 'order-lg-2' : ''}`}>
                      <div className="card-custom p-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)' }}>
                        
                        {/* High Quality Picture */}
                        <div className="card-image-wrap" style={{ height: '220px', marginBottom: '1.5rem' }}>
                          <img src={serviceImages[service.id]} alt={service.title} />
                          <div className="position-absolute top-0 start-0 m-3">
                            <div className="icon-3d-wrapper" style={{ width: '42px', height: '42px' }}>
                              <IconComponent size={18} className="text-white" />
                            </div>
                          </div>
                        </div>

                        <h3 className="fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.35rem' }}>Integrated Tech Stack</h3>
                        
                        {/* Tech stack tags */}
                        <div className="d-flex flex-wrap gap-1.5 mb-4">
                          {service.tech.map((t) => (
                            <span 
                              key={t}
                              className="px-3 py-1 rounded-pill small"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.04)', 
                                border: '1px solid var(--glass-border)',
                                color: 'var(--accent-cyan)',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                          <h6 className="fw-bold text-muted-custom mb-3 small text-uppercase" style={{ letterSpacing: '0.5px' }}>Service Deliverables:</h6>
                          <div className="row g-2">
                            {service.items.map((item) => (
                              <div className="col-sm-6" key={item}>
                                <span className="text-white small d-flex align-items-center gap-2">
                                  <Zap size={11} className="text-gradient-cyan flex-shrink-0" />
                                  <span>{item}</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Text Description */}
                    <div className={`col-lg-6 ${!isEven ? 'order-lg-1' : ''}`}>
                      <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block" style={{ fontSize: '0.75rem' }}>
                        {service.title === "Website Development" ? "Web Architecture Solutions" : service.title}
                      </span>
                      <h2 className="display-6 fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {service.title}
                      </h2>
                      <p className="text-muted-custom mb-4" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                        {service.longDescription}
                      </p>

                      {/* Service Key Benefits */}
                      <div className="mb-4">
                        <div className="row g-3">
                          {service.benefits.map((benefit, i) => (
                            <div className="col-12" key={i}>
                              <div className="d-flex align-items-start gap-3 text-muted-custom" style={{ fontSize: '0.95rem' }}>
                                <CheckCircle size={16} className="text-gradient-cyan mt-1 flex-shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link to="/book-call" className="btn-gradient mt-3">
                        <span>Book consultation</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })
              ) : (
                <div className="text-center py-5 card-custom align-items-center">
                  <p className="text-muted-custom mb-0">No services registered yet.</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
