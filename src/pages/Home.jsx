import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Calendar, Award, CheckCircle, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

import SEO from '../components/SEO';
import AnimatedCounter from '../components/AnimatedCounter';
import Logo from '../components/Logo';
import InteractiveScene3D from '../components/InteractiveScene3D';

// JSON data
import servicesData from '../data/services.json';
import eventsData from '../data/events.json';
import productsData from '../data/products.json';
import testimonialsData from '../data/testimonials.json';
import statsData from '../data/statistics.json';

const Home = () => {
  // Framer Motion animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const scaleInVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <>
      <SEO 
        title="Engineering Innovation. Empowering Futures."
        description="Official portal of AlgorithmAliens Pvt. Ltd. We engineer advanced web applications, iOS/Android apps, AI-powered automation solutions, and manage Academy training and ANX college clubs."
      />

      {/* 1. HERO SECTION */}
      <section className="hero-padding position-relative overflow-hidden d-flex align-items-center min-vh-100">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-center text-lg-start">
              {/* Logo block */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="d-flex justify-content-center justify-content-lg-start mb-4"
              >
                <div className="px-3 py-1 rounded-pill" style={{ background: 'rgba(138, 92, 255, 0.1)', border: '1px solid rgba(138, 92, 255, 0.2)' }}>
                  <Logo height={30} showText={true} />
                </div>
              </motion.div>

              {/* Tagline / Headline */}
              <motion.h1 
                className="display-4 fw-bold mb-3 lh-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Engineering <span className="text-gradient">Innovation</span>.<br />
                Empowering <span className="text-gradient-cyan">Futures</span>.
              </motion.h1>

              {/* Description */}
              <motion.p
                className="lead text-muted-custom mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ fontSize: '1.2rem', maxWidth: '600px' }}
              >
                Building innovative software solutions, AI-powered automation systems, and technology ecosystems that empower businesses and future innovators.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/book-call" className="btn-gradient">
                  <span>Book Free Consultation</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="btn-outline-custom">
                  <span>Explore Services</span>
                </Link>
              </motion.div>
            </div>

            {/* Glowing Tech Graphic */}
            <div className="col-lg-5 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="position-relative d-inline-block"
              >
                {/* Glow rings in background */}
                <div 
                  className="position-absolute top-50 start-50 translate-middle rounded-circle" 
                  style={{ 
                    width: '350px', 
                    height: '350px', 
                    background: 'radial-gradient(circle, rgba(138, 92, 255, 0.2) 0%, transparent 70%)',
                    zIndex: -1,
                    filter: 'blur(30px)'
                  }} 
                />
                
                {/* Main 3D Canvas element */}
                <div style={{ width: '450px', maxWidth: '100%', margin: '0 auto' }}>
                  <InteractiveScene3D />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="section-padding bg-black bg-opacity-25 border-top border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Who We Are</span>
              <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Leading the Wave of Technical & Educational Innovation</h2>
              <p className="text-muted-custom mb-3" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                AlgorithmAliens Pvt. Ltd. is a comprehensive tech house where we develop high-end web tools, hybrid mobile platforms, and AI systems. Concurrently, we run professional student organizations, coding bootcamps, and career incubation centers.
              </p>
              <p className="text-muted-custom mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                Our double-sided mission empowers global businesses with cutting-edge solutions while nurturing young software engineers to build the tech of tomorrow.
              </p>
              <Link to="/about" className="btn-outline-custom">
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="card-custom p-4 text-center">
                    <Award size={36} className="text-gradient mb-2 mx-auto" />
                    <h5 className="fw-bold">Enterprise SaaS</h5>
                    <p className="text-muted-custom mb-0 small">Secure applications</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-custom p-4 text-center">
                    <Icons.Cpu size={36} className="text-gradient-cyan mb-2 mx-auto" />
                    <h5 className="fw-bold">AI Workflow</h5>
                    <p className="text-muted-custom mb-0 small">Voice & Chat Agents</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-custom p-4 text-center">
                    <Icons.GraduationCap size={36} className="text-gradient-cyan mb-2 mx-auto" />
                    <h5 className="fw-bold">Tech Academy</h5>
                    <p className="text-muted-custom mb-0 small">Live project internships</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card-custom p-4 text-center">
                    <Icons.Users size={36} className="text-gradient mb-2 mx-auto" />
                    <h5 className="fw-bold">ANX Clubs</h5>
                    <p className="text-muted-custom mb-0 small">Nationwide Student network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Our Offerings</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>What We Specialize In</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '600px' }}>
              We design, develop, and integrate state-of-the-art applications and workflows for businesses seeking modernization.
            </p>
          </div>

          <div className="row g-4">
            {servicesData.map((service, index) => {
              // Map icon string to Lucide icon component
              const IconComponent = Icons[service.icon] || Icons.Cpu;
              
              return (
                <div className="col-lg-3 col-md-6" key={service.id}>
                  <motion.div 
                    className="card-custom"
                    variants={scaleInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" style={{ width: '56px', height: '56px', background: 'rgba(138, 92, 255, 0.12)', border: '1px solid rgba(138, 92, 255, 0.2)' }}>
                      <IconComponent size={24} className="text-gradient" />
                    </div>
                    <h4 className="fw-bold text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>{service.title}</h4>
                    <p className="text-muted-custom mb-4" style={{ fontSize: '0.92rem', minHeight: '66px' }}>{service.description}</p>
                    
                    <ul className="list-unstyled mb-4 text-muted-custom" style={{ fontSize: '0.85rem' }}>
                      {service.items.slice(0, 3).map((item, i) => (
                        <li className="d-flex align-items-center gap-2 mb-2" key={i}>
                          <CheckCircle size={14} className="text-gradient-cyan flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/services" className="text-gradient-cyan text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                      <span>Explore service</span>
                      <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS PREVIEW SECTION */}
      <section className="section-padding bg-black bg-opacity-30 border-top border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Our Ecosystem</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Innovating Student Ecosystems</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '600px' }}>
              We build specialized platforms that allow students and future developers to learn and collaborate.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {productsData.map((prod) => (
              <div className="col-md-6" key={prod.id}>
                <motion.div 
                  className="card-custom d-flex flex-column justify-content-between p-5"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div>
                    <span className="text-gradient-cyan fw-bold mb-2 d-block text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                      {prod.tagline}
                    </span>
                    <h3 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{prod.title}</h3>
                    <p className="text-muted-custom mb-4">{prod.description}</p>
                    
                    <div className="mb-4">
                      <h6 className="fw-semibold text-white mb-2">Core Features Included:</h6>
                      <div className="row">
                        {prod.features.slice(0, 4).map((feat, i) => (
                          <div className="col-6 mb-2" key={i}>
                            <span className="text-muted-custom small d-flex align-items-center gap-2">
                              <CheckCircle size={12} className="text-gradient" />
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.15)' }}>
                    <Link to="/products" className="btn-gradient">
                      <span>Explore Product Details</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {statsData.map((stat, idx) => (
              <div className="col-lg-3 col-sm-6" key={stat.id}>
                <motion.div 
                  className="stat-card"
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h2 className="display-4 fw-extrabold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <AnimatedCounter value={stat.value} />
                    <span className="text-gradient">{stat.suffix}</span>
                  </h2>
                  <h6 className="fw-bold text-gradient-cyan mb-2">{stat.label}</h6>
                  <p className="text-muted-custom small mb-0">{stat.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED EVENTS SECTION */}
      <section className="section-padding bg-black bg-opacity-20 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider d-block mb-2">What's Happening</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Featured Technology Events</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '600px' }}>
              We regularly host, sponsor, and co-organize high-energy tech meetups, hackathons, and symposiums.
            </p>
          </div>

          <div className="row g-4">
            {eventsData.map((event) => (
              <div className="col-lg-6" key={event.id}>
                <motion.div 
                  className="card-custom p-0"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {/* Decorative Banner Mockup */}
                  <div className="position-relative" style={{ height: '200px', background: 'linear-gradient(135deg, #170026 0%, #070010 100%)', overflow: 'hidden' }}>
                    <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(138, 92, 255, 0.25) 0%, transparent 60%)' }} />
                    <div className="position-absolute bottom-0 start-0 p-4">
                      <span className="badge bg-primary mb-2 d-inline-flex align-items-center gap-1" style={{ background: 'var(--gradient-main) !important' }}>
                        <Calendar size={12} />
                        {event.date}
                      </span>
                      <h4 className="fw-bold text-white mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>{event.title}</h4>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-muted-custom mb-4" style={{ fontSize: '0.95rem' }}>{event.description}</p>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold text-white mb-2">Event Highlights:</h6>
                      <ul className="list-unstyled">
                        {event.highlights.slice(0, 3).map((hl, i) => (
                          <li className="d-flex align-items-center gap-2 mb-1 text-muted-custom small" key={i}>
                            <Award size={12} className="text-gradient" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to="/events" className="btn-outline-custom w-100 justify-content-center">
                      <span>View Event Gallery</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SLIDER SECTION */}
      <section className="section-padding border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Testimonials</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>What the Community Says</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '600px' }}>
              Hear feedback from our clients, students, interns, and college coordinators.
            </p>
          </div>

          <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4500">
            <div className="carousel-indicators" style={{ bottom: '-40px' }}>
              {testimonialsData.slice(0, 4).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  data-bs-target="#testimonialsCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? 'active' : ''}
                  aria-current={i === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner px-2 py-4">
              {testimonialsData.slice(0, 4).map((test, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={test.id}>
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="card-custom p-5 text-center">
                        {/* Rating stars */}
                        <div className="d-flex justify-content-center gap-1 mb-4 text-warning">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <Star fill="currentColor" size={16} key={i} />
                          ))}
                        </div>
                        
                        <p className="text-white fs-5 font-italic mb-4" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '300', lineHeight: '1.6' }}>
                          "{test.feedback}"
                        </p>

                        <div className="d-flex align-items-center justify-content-center gap-3">
                          <img
                            src={test.photo}
                            alt={test.name}
                            className="rounded-circle border"
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderColor: 'var(--primary-purple) !important' }}
                          />
                          <div className="text-start">
                            <h6 className="fw-bold mb-0 text-white">{test.name}</h6>
                            <small className="text-gradient-cyan text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>{test.role}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="section-padding position-relative overflow-hidden">
        {/* Background glow overlay */}
        <div 
          className="position-absolute top-50 start-50 translate-middle rounded-circle" 
          style={{ 
            width: '600px', 
            height: '250px', 
            background: 'radial-gradient(circle, rgba(138, 92, 255, 0.15) 0%, transparent 80%)',
            zIndex: -1,
            filter: 'blur(40px)'
          }} 
        />
        <div className="container text-center">
          <div className="card-custom p-5 border" style={{ borderColor: 'rgba(138,92,255,0.2) !important', background: 'linear-gradient(135deg, rgba(23,0,38,0.8) 0%, rgba(10,0,21,0.95) 100%)' }}>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Ready to Build Something Amazing?</h2>
            <p className="text-muted-custom mx-auto mb-5" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
              Whether you need custom web tools, dynamic mobile applications, or custom workflows automated by artificial intelligence, our engineering team is here to assist.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/book-call" className="btn-gradient px-4 py-3 fs-5">
                <span>Book Free Consultation</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-outline-custom px-4 py-3 fs-5">
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
