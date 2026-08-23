import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Calendar, Award, CheckCircle, ChevronRight, Activity, Terminal, Shield, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';

import SEO from '../components/SEO';
import AnimatedCounter from '../components/AnimatedCounter';
import Logo from '../components/Logo';
import { api } from '../services/api';

// Unsplash Images Map for High-Vibrancy styling
const serviceImages = {
  "web-development": "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop&q=80",
  "mobile-development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
  "ai-automation": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "custom-software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
};

// Fixed anx-clubs ID mapping to ensure the image loads
const productImages = {
  "academy": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
  "anx-clubs": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
};

const Home = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  // Dynamic data from backend
  const [servicesData, setServicesData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented or video load failed:", err);
        setVideoError(true);
      });
    }

    // Fetch all dynamic homepage content in parallel
    api.public.getServices().then(setServicesData).catch(console.error);
    api.public.getEvents().then(setEventsData).catch(console.error);
    api.public.getProducts().then(setProductsData).catch(console.error);
    api.public.getTestimonials().then(setTestimonialsData).catch(console.error);
    api.public.getStats().then(setStatsData).catch(console.error);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const fadeUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const scaleInVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <>
      <SEO 
        title="Engineering Innovation. Empowering Futures."
        description="Official portal of AlgorithmAliens Pvt. Ltd. We engineer advanced web applications, iOS/Android apps, AI-powered automation solutions, and manage Academy training and ANX college clubs."
      />

      {/* 1. HERO SECTION (Full Viewport Height) */}
      <section className="full-screen-hero position-relative d-flex align-items-center">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            {/* Left Side Info */}
            <div className="col-lg-7 text-center text-lg-start">

              {/* Tagline / Headline with Compiling Animation */}
              <motion.h1 
                className="creative-heading lh-sm"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="d-block d-sm-inline"
                >
                  Engineering
                </motion.span>{" "}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gradient"
                >
                  Innovation
                </motion.span>
                <br />
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="d-block d-sm-inline"
                >
                  Empowering
                </motion.span>{" "}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-gradient-cyan"
                >
                  Futures
                </motion.span>
              </motion.h1>

              {/* Supporting Sentence */}
              <motion.p
                className="lead text-muted-custom mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}
              >
                We build enterprise-grade applications, AI automation, and training pipelines that scale businesses and nurture the next generation of builders.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/book-call" className="btn-gradient">
                  <span>Book Free Consultation</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn-outline-custom">
                  <span>Explore Services</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Side 3D Graphic */}
            <div className="col-lg-5 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="position-relative d-inline-block w-100"
              >
                {/* Glowing backdrop circle */}
                <div 
                  className="position-absolute top-50 start-50 translate-middle rounded-circle" 
                  style={{ 
                    width: '350px', 
                    height: '350px', 
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    zIndex: -1,
                    filter: 'blur(50px)'
                  }} 
                />
                
                {/* Brand Logo video or animated fallback */}
                <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                  {!videoError ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={() => setVideoError(true)}
                      style={{
                        width: '100%',
                        maxWidth: '360px',
                        height: 'auto',
                        borderRadius: '16px',
                        mixBlendMode: 'screen',
                        filter: 'drop-shadow(0 0 35px rgba(6, 182, 212, 0.45))'
                      }}
                    >
                      <source src="/animation_video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Logo height={280} showText={false} className="animated-hero-logo" />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bouncing Scroll indicator */}
        <a href="#about-preview" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section id="about-preview" className="section-padding bg-black bg-opacity-30 border-top border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Visual Column Left (Rich colorful team pictures + badges) */}
            <div className="col-lg-6">
              <motion.div 
                className="position-relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Ambient glow behind image */}
                <div 
                  className="position-absolute top-50 start-50 translate-middle rounded-circle" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
                    zIndex: -1,
                    filter: 'blur(40px)'
                  }} 
                />
                
                {/* Image card with glass frame */}
                <div className="card-custom p-2 overflow-hidden" style={{ height: '340px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80" 
                    alt="AlgorithmAliens Team Collaboration" 
                    className="w-100 h-100" 
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
                  />
                  {/* Floating badge */}
                  <div className="position-absolute bottom-0 start-0 m-4 p-3 rounded" style={{ background: 'rgba(7,7,9,0.9)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="icon-3d-wrapper" style={{ width: '32px', height: '32px' }}>
                        <Sparkles size={14} className="text-white" />
                      </div>
                      <span className="fw-bold small text-white">Practical Learning Model</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Core Info Right */}
            <div className="col-lg-6">
              <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.8rem' }}>Who We Are</span>
              <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Leading the Wave of Technical & Educational Innovation</h2>
              <p className="text-muted-custom mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                AlgorithmAliens Pvt. Ltd. is a comprehensive tech house. We build state-of-the-art web interfaces, cross-platform apps, and AI automated pipelines for corporate clients, while running professional student chapters and bootcamps to mentor future engineers.
              </p>
              
              {/* Stepper with 3D nodes */}
              <div className="d-flex flex-column gap-3 mb-5">
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-3d-wrapper" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                    <Terminal size={16} className="text-white" />
                  </div>
                  <span className="text-white fw-semibold small">Custom Software and SaaS Platforms</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-3d-wrapper" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                    <Activity size={16} className="text-white" />
                  </div>
                  <span className="text-white fw-semibold small">Intelligent AI Chatbots and Workflow Automation</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-3d-wrapper" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                    <Shield size={16} className="text-white" />
                  </div>
                  <span className="text-white fw-semibold small">Student Communities and Hackathon Contests</span>
                </div>
              </div>

              <Link to="/about" className="btn-gradient">
                <span>Learn Our Story</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Our Capabilities</span>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>What We Specialize In</h2>
            <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '540px' }}>
              Custom software solutions designed to automate workflows and modernize digital interfaces.
            </p>
          </div>

          {/* Bento-style Services Grid */}
          <div className="row g-4">
            {servicesData.length === 0 ? (
              <div className="col-12 text-center py-5">
                <Loader2 className="animate-spin text-gradient mb-3" size={28} />
                <p className="text-muted-custom small">Loading services...</p>
              </div>
            ) : servicesData.map((service) => {
              const IconComponent = Icons[service.icon] || Icons.Cpu;
              return (
                <div className="col-lg-3 col-md-6" key={service.id}>
                  <motion.div 
                    className="card-custom"
                    variants={scaleInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {/* Visual Card Image */}
                    <div className="card-image-wrap">
                      <img src={serviceImages[service.id]} alt={service.title} />
                      <div className="position-absolute top-0 start-0 m-2.5">
                        <div className="icon-3d-wrapper" style={{ width: '38px', height: '38px' }}>
                          <IconComponent size={16} className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="fw-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem' }}>{service.title}</h4>
                    <p className="text-muted-custom mb-4" style={{ fontSize: '0.88rem', flexGrow: 1 }}>{service.description}</p>
                    
                    {/* Compact Tag Chips */}
                    <div className="d-flex flex-wrap gap-1.5 mb-4">
                      {(service.items || []).slice(0, 3).map((item, idx) => (
                        <span key={idx} className="badge rounded-pill" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.72rem', color: 'var(--white)' }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link to="/services" className="text-gradient-cyan text-decoration-none fw-semibold d-inline-flex align-items-center gap-1 mt-auto" style={{ fontSize: '0.9rem' }}>
                      <span>Explore service</span>
                      <ChevronRight size={15} />
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS / STUDENT ECOSYSTEM PREVIEW */}
      <section className="section-padding bg-black bg-opacity-30 border-top border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Connected Ecosystem</span>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Innovating Student Learning</h2>
            <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '540px' }}>
              Linking structured technical training with collaborative developer communities.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {productsData.length === 0 ? (
              <div className="col-12 text-center py-5">
                <Loader2 className="animate-spin text-gradient mb-3" size={28} />
                <p className="text-muted-custom small">Loading products...</p>
              </div>
            ) : productsData.map((prod) => (
              <div className="col-lg-6" key={prod.id}>
                <motion.div 
                  className="card-custom p-5 d-flex flex-column h-100 justify-content-between"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div>
                    {/* Header Image */}
                    <div className="card-image-wrap mb-4" style={{ height: '200px' }}>
                      <img src={prod.image || productImages[prod.id]} alt={prod.title} />
                      <div className="position-absolute top-0 start-0 m-3">
                        <div className="icon-3d-wrapper" style={{ width: '42px', height: '42px' }}>
                          {prod.id === 'academy' ? (
                            <Icons.BookOpen size={18} className="text-white" />
                          ) : (
                            <Icons.Users size={18} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="text-gradient-cyan fw-bold mb-2 d-block text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                      {prod.tagline}
                    </span>
                    <h3 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{prod.title}</h3>
                    <p className="text-muted-custom mb-4" style={{ fontSize: '0.95rem' }}>{prod.description}</p>
                    
                    {/* Key features */}
                    <div className="mb-4">
                      <h6 className="fw-bold text-white mb-2.5" style={{ fontSize: '0.85rem' }}>Core Modules:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {(prod.features || []).slice(0, 4).map((feat, idx) => (
                          <span key={idx} className="badge rounded px-2.5 py-1.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.78rem', color: 'var(--white)' }}>
                            <CheckCircle size={10} className="text-gradient-cyan me-1.5" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                    <Link to="/products" className="btn-gradient w-100 justify-content-center">
                      <span>Explore Details</span>
                      <ArrowRight size={14} />
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
            {statsData.length === 0 ? (
              <div className="col-12 text-center py-4">
                <Loader2 className="animate-spin text-gradient" size={24} />
              </div>
            ) : statsData.map((stat) => (
              <div className="col-lg-3 col-sm-6" key={stat.id}>
                <motion.div 
                  className="stat-card"
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h2 className="display-4 fw-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.03em' }}>
                    <AnimatedCounter value={stat.value} />
                    <span className="text-gradient">{stat.suffix}</span>
                  </h2>
                  <h6 className="fw-bold text-gradient-cyan mb-2" style={{ fontSize: '0.95rem' }}>{stat.label}</h6>
                  <p className="text-muted-custom small mb-0">{stat.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED EVENTS SECTION */}
      <section className="section-padding bg-black bg-opacity-30 border-top border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Timeline Log</span>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Featured Events</h2>
            <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '540px' }}>
              We regularly organize national hackathons, coding sprints, and technology symposiums.
            </p>
          </div>

          <div className="row g-4">
            {eventsData.length === 0 ? (
              <div className="col-12 text-center py-5">
                <Loader2 className="animate-spin text-gradient mb-3" size={28} />
                <p className="text-muted-custom small">Loading events...</p>
              </div>
            ) : eventsData.slice(0, 2).map((event) => (
              <div className="col-lg-6" key={event.id}>
                <motion.div 
                  className="card-custom p-0 overflow-hidden"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {/* Event Visual Banner */}
                  <div className="card-image-wrap rounded-0 mb-0" style={{ height: '220px' }}>
                    <img src={event.banner} alt={event.title} />
                    <div className="position-absolute top-0 start-0 m-3">
                      <div className="icon-3d-wrapper" style={{ width: '40px', height: '40px' }}>
                        <Calendar size={18} className="text-white" />
                      </div>
                    </div>
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(to top, rgba(7,7,9,0.9), transparent)' }}>
                      <span className="badge bg-secondary px-3 py-1.5 rounded-pill" style={{ background: 'var(--gradient-main) !important', border: 'none', fontSize: '0.75rem', color: 'var(--white)', fontWeight: 'bold' }}>
                        {event.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="fw-bold text-white mb-0" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem' }}>{event.title}</h3>
                      <span className="text-gradient fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '1px' }}>
                        {event.year} Edition
                      </span>
                    </div>
                    <p className="text-muted-custom mb-4" style={{ fontSize: '0.92rem' }}>{event.description}</p>
                    
                    {/* Highlights */}
                    <div className="mb-4 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="d-flex flex-wrap gap-2">
                        {(event.highlights || []).slice(0, 3).map((hl, i) => (
                          <span key={i} className="badge text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.72rem' }}>
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to="/events" className="btn-outline-custom justify-content-center py-2">
                      <span>View Gallery Details</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SLIDER SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Community Voices</span>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>What They Say About Us</h2>
            <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '540px' }}>
              Feedback from corporate sponsors, student interns, and university coordinators.
            </p>
          </div>

          <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4500">
            <div className="carousel-indicators" style={{ bottom: '-48px' }}>
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

            <div className="carousel-inner px-2 py-3">
              {testimonialsData.length === 0 ? (
                <div className="carousel-item active">
                  <div className="row justify-content-center">
                    <div className="col-12 text-center py-5">
                      <Loader2 className="animate-spin text-gradient mb-3" size={28} />
                      <p className="text-muted-custom small">Loading testimonials...</p>
                    </div>
                  </div>
                </div>
              ) : testimonialsData.slice(0, 4).map((test, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={test.id}>
                  <div className="row justify-content-center">
                    <div className="col-lg-7">
                      <div className="card-custom p-5 text-center position-relative">
                        
                        {/* Rating stars */}
                        <div className="d-flex justify-content-center gap-1 mb-4 text-warning">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <Star fill="currentColor" size={14} key={i} />
                          ))}
                        </div>
                        
                        {/* Quote Feedback */}
                        <p className="text-white fs-5 mb-5 lh-base fw-light italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          "{test.feedback}"
                        </p>

                        {/* Author info */}
                        <div className="d-flex align-items-center justify-content-center gap-3">
                          <img
                            src={test.photo}
                            alt={test.name}
                            className="rounded-circle border border-secondary"
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                          />
                          <div className="text-start">
                            <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '0.95rem' }}>{test.name}</h6>
                            <small className="text-gradient-cyan text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '1px' }}>{test.role}</small>
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
            width: '500px', 
            height: '250px', 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            zIndex: -1,
            filter: 'blur(50px)'
          }} 
        />
        <div className="container text-center">
          <div className="card-custom p-5 border align-items-center" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
            {/* 3D Floating indicator */}
            <div className="icon-3d-wrapper mb-4" style={{ width: '56px', height: '56px' }}>
              <Sparkles size={24} className="text-white" />
            </div>
            <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider mb-2.5" style={{ fontSize: '0.75rem' }}>Start A Conversation</span>
            <h2 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Ready to Build Something Impactful?</h2>
            <p className="text-muted-custom mx-auto mb-5" style={{ maxWidth: '560px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Whether you need website interfaces, cross-platform apps, or workflows automated by custom AI solutions, our engineering team is ready to assist.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/book-call" className="btn-gradient px-4 py-3">
                <span>Book Free Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-custom px-4 py-3">
                <span>Contact Details</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
