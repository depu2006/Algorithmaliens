import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

import SEO from '../components/SEO';
import servicesData from '../data/services.json';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <>
      <SEO 
        title="Our Services"
        description="Explore custom website development, mobile app construction, smart AI automation processes, and bespoke SaaS solutions engineered by AlgorithmAliens Pvt. Ltd."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1)' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Capabilities</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Technical Services</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            We design, develop, and deliver futuristic solutions designed to automate workflows, scale operations, and modernize systems.
          </p>
        </div>
      </section>

      {/* Services Detail Sections */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {servicesData.map((service, index) => {
              const IconComponent = Icons[service.icon] || Icons.Cpu;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  className="row align-items-center g-5 mb-5 pb-5"
                  variants={sectionVariants}
                  viewport={{ once: true, amount: 0.2 }}
                  style={{
                    borderBottom: index !== servicesData.length - 1 ? '1px solid rgba(138, 92, 255, 0.08)' : 'none',
                    paddingBottom: index !== servicesData.length - 1 ? '4rem' : '0'
                  }}
                >
                  {/* Service Graphic/Mockup (Left or Right depending on alternating) */}
                  <div className={`col-lg-6 ${!isEven ? 'order-lg-2' : ''}`}>
                    <div className="card-custom p-5 position-relative" style={{ background: 'linear-gradient(135deg, rgba(23,0,38,0.4) 0%, rgba(10,0,21,0.7) 100%)' }}>
                      <div className="position-absolute top-0 end-0 p-4" style={{ opacity: 0.05 }}>
                        <IconComponent size={140} className="text-white" />
                      </div>
                      
                      <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" style={{ width: '60px', height: '60px', background: 'rgba(138, 92, 255, 0.15)', border: '1px solid rgba(138, 92, 255, 0.2)' }}>
                        <IconComponent size={28} className="text-gradient" />
                      </div>

                      <h3 className="fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Tech Stack</h3>
                      
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        {service.tech.map((t) => (
                          <span 
                            key={t}
                            className="px-3 py-1.5 rounded-pill fs-7 fw-semibold"
                            style={{ 
                              background: 'rgba(138, 92, 255, 0.1)', 
                              border: '1px solid rgba(138, 92, 255, 0.2)',
                              color: 'var(--primary-cyan)',
                              fontSize: '0.82rem'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.12)' }}>
                        <h6 className="fw-semibold text-muted-custom mb-3">Service Deliverables:</h6>
                        <div className="row g-2">
                          {service.items.map((item) => (
                            <div className="col-sm-6" key={item}>
                              <span className="text-white small d-flex align-items-center gap-2">
                                <ChevronRight size={14} className="text-gradient" />
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Text Description */}
                  <div className={`col-lg-6 ${!isEven ? 'order-lg-1' : ''}`}>
                    <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider mb-2 d-block">
                      {service.title === "Website Development" ? "Web Application Services" : service.title}
                    </span>
                    <h2 className="display-6 fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {service.title}
                    </h2>
                    <p className="text-muted-custom mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                      {service.longDescription}
                    </p>

                    <div className="mb-5">
                      <h5 className="fw-bold text-white mb-3">Key Benefits</h5>
                      <div className="row g-3">
                        {service.benefits.map((benefit, i) => (
                          <div className="col-12" key={i}>
                            <div className="d-flex align-items-start gap-2 text-muted-custom">
                              <CheckCircle size={18} className="text-gradient mt-1 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link to="/book-call" className="btn-gradient">
                      <span>Book consultation</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
