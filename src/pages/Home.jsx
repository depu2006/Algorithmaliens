import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Calendar, Award, CheckCircle, ChevronRight, Activity, Terminal, Shield, Sparkles, ChevronDown, Loader2, PhoneCall } from 'lucide-react';
import * as Icons from 'lucide-react';

import SEO from '../components/SEO';
import AnimatedCounter from '../components/AnimatedCounter';
import Logo from '../components/Logo';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { initialServices, initialEvents, initialProducts, initialTestimonials, initialStatistics } from '../data/initialData';

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
  const { theme } = useTheme() || {};

  // Dynamic data from backend (initialized with instant fallback data)
  const [servicesData, setServicesData] = useState(initialServices);
  const [eventsData, setEventsData] = useState(initialEvents);
  const [productsData, setProductsData] = useState(initialProducts);
  const [testimonialsData, setTestimonialsData] = useState(initialTestimonials);
  const [statsData, setStatsData] = useState(initialStatistics);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented or video load failed:", err);
        setVideoError(true);
      });
    }

    // Fetch all dynamic homepage content in parallel for background sync
    api.public.getServices().then(d => { if (Array.isArray(d) && d.length > 0) setServicesData(d); }).catch(console.warn);
    api.public.getEvents().then(d => { if (Array.isArray(d) && d.length > 0) setEventsData(d); }).catch(console.warn);
    api.public.getProducts().then(d => { if (Array.isArray(d) && d.length > 0) setProductsData(d); }).catch(console.warn);
    api.public.getTestimonials().then(d => { if (Array.isArray(d) && d.length > 0) setTestimonialsData(d); }).catch(console.warn);
    api.public.getStats().then(d => { if (Array.isArray(d) && d.length > 0) setStatsData(d); }).catch(console.warn);
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
      <section className="full-screen-hero position-relative d-flex align-items-center overflow-hidden" style={{ minHeight: '100vh', paddingTop: '130px', paddingBottom: '60px' }}>
        {/* Multi-point ambient glow */}
        <div className="position-absolute pointer-events-none" style={{ inset: 0, zIndex: 1, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '15%', left: '5%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '5%',
            width: '420px', height: '420px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }} />
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-4 g-lg-5">

            {/* ── LEFT COLUMN ── */}
            <div className="col-lg-6 text-center text-lg-start">

              {/* Status Pill with Live Pulse */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4"
                style={{
                  background: theme === 'light' ? 'rgba(139, 92, 246, 0.07)' : 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.28)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)'
                }}
              >
                <span className="position-relative d-inline-flex align-items-center justify-content-center" style={{ width: 10, height: 10 }}>
                  <span style={{
                    position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                    background: 'var(--accent-cyan)', opacity: 0.75,
                    animation: 'node-pulse 2s infinite ease-in-out'
                  }} />
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--accent-cyan)', zIndex: 1
                  }} />
                </span>
                <span className="text-muted-custom fw-semibold" style={{ fontSize: '0.8rem', letterSpacing: '0.4px' }}>
                  Pvt. Ltd. · Est. 2023 · Hyderabad, India
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="lh-1 mb-4"
                style={{
                  fontFamily: "'Sora', 'Outfit', sans-serif",
                  fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.08
                }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  style={{ display: 'block', marginBottom: '0.15em' }}
                >
                  Engineering{' '}
                  <span className="text-gradient">Innovation.</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.28 }}
                  style={{ display: 'block' }}
                >
                  Empowering{' '}
                  <span className="text-gradient-cyan">Futures.</span>
                </motion.span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                className="text-muted-custom mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  lineHeight: 1.72,
                  maxWidth: '520px',
                  fontWeight: 400
                }}
              >
                We build enterprise-grade web &amp; mobile applications, intelligent AI automation
                pipelines, and run structured Academy programs that turn students into job-ready engineers.
              </motion.p>



              {/* CTA Buttons */}
              <motion.div
                className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.64 }}
              >
                <Link
                  to="/book-call"
                  className="btn-gradient d-inline-flex align-items-center gap-2"
                  style={{ borderRadius: '10px', padding: '13px 28px', fontSize: '0.95rem' }}
                >
                  <PhoneCall size={16} />
                  <span>Book Free Consultation</span>
                </Link>
                <Link
                  to="/services"
                  className="btn-outline-custom d-inline-flex align-items-center gap-2"
                  style={{ borderRadius: '10px', padding: '13px 28px', fontSize: '0.95rem' }}
                >
                  <span>Explore Services</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN — Logo / Video ── */}
            <div className="col-lg-6 text-center position-relative d-flex align-items-center justify-content-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut', delay: 0.15 }}
                className="position-relative"
                style={{ width: '100%', maxWidth: '440px' }}
              >
                {/* Glow ring behind logo */}
                <div style={{
                  position: 'absolute', inset: '-20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.1) 50%, transparent 75%)',
                  filter: 'blur(30px)',
                  zIndex: 0
                }} />

                {/* Floating Badge — top right */}
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="position-absolute d-none d-md-flex align-items-center gap-2"
                  style={{
                    top: '-10px', right: '-10px',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    background: theme === 'light' ? 'rgba(255,255,255,0.96)' : 'rgba(14,18,36,0.88)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    backdropFilter: 'blur(14px)',
                    boxShadow: '0 8px 24px rgba(139,92,246,0.15)',
                    zIndex: 5, fontSize: '0.78rem', fontWeight: 700
                  }}
                >
                  <Sparkles size={13} className="text-gradient" />
                  <span className={theme === 'light' ? 'text-dark' : 'text-white'}>AI · Full-Stack · Mobile</span>
                </motion.div>

                {/* Floating Badge — bottom left */}
                <motion.div
                  animate={{ y: [0, 9, 0] }}
                  transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="position-absolute d-none d-md-flex align-items-center gap-2"
                  style={{
                    bottom: '-10px', left: '-10px',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    background: theme === 'light' ? 'rgba(255,255,255,0.96)' : 'rgba(14,18,36,0.88)',
                    border: '1px solid rgba(6,182,212,0.25)',
                    backdropFilter: 'blur(14px)',
                    boxShadow: '0 8px 24px rgba(6,182,212,0.12)',
                    zIndex: 5, fontSize: '0.78rem', fontWeight: 700
                  }}
                >
                  <Shield size={13} className="text-gradient-cyan" />
                  <span className={theme === 'light' ? 'text-dark' : 'text-white'}>Enterprise · Scalable</span>
                </motion.div>

                {/* Logo / Video — same size & card style in both themes */}
                <div
                  className="position-relative"
                  style={{ zIndex: 2, width: '100%', maxWidth: '380px', margin: '0 auto' }}
                >
                  {theme === 'light' ? (
                    /* ── LIGHT: mix-blend-mode removes white PNG bg on gradient ── */
                    <img
                      src="/logo-light.png"
                      alt="Algorithm Aliens Pvt. Ltd."
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        mixBlendMode: 'multiply',
                        filter: 'drop-shadow(0 12px 32px rgba(139,92,246,0.18))',
                      }}
                    />
                  ) : !videoError ? (
                    /* ── DARK: video in a dark card ── */
                    <div
                      className="rounded-4 overflow-hidden"
                      style={{
                        background: 'rgba(10,10,18,0.9)',
                        border: '1px solid rgba(139,92,246,0.22)',
                        boxShadow: '0 24px 60px rgba(139,92,246,0.3)',
                      }}
                    >
                      <video
                        ref={videoRef}
                        autoPlay loop muted playsInline
                        onError={() => setVideoError(true)}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      >
                        <source src="/animation_video.mp4" type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    /* ── DARK fallback: /logo.png in matching dark card ── */
                    <div
                      className="rounded-4 d-flex align-items-center justify-content-center"
                      style={{
                        background: 'rgba(10,10,18,0.9)',
                        border: '1px solid rgba(139,92,246,0.22)',
                        boxShadow: '0 24px 60px rgba(139,92,246,0.3)',
                        padding: '32px',
                      }}
                    >
                      <img
                        src="/logo.png"
                        alt="Algorithm Aliens Pvt. Ltd."
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#about-preview" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* ── TICKER BELT — scrolling keywords strip ── */}
      <div
        className="ticker-belt"
        style={{
          overflow: 'hidden',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '14px 0',
          background: theme === 'light'
            ? 'rgba(255,255,255,0.6)'
            : 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Two copies for seamless loop */}
        <div style={{ display: 'flex', width: 'max-content', animation: 'ticker-scroll 28s linear infinite' }}>
          {[...Array(2)].map((_, copyIdx) => (
            <div key={copyIdx} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {[
                'Web Development', 'AI Solutions', 'Mobile Apps', 'SaaS Platforms',
                'Workflow Automation', 'Student Training', 'Hackathons', 'Product Innovation',
                'Software Development', 'Cloud Deployment', 'UI/UX Design', 'API Integration',
              ].map((label, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: theme === 'light' ? '#374151' : 'var(--muted-text)',
                      padding: '0 28px',
                      letterSpacing: '0.2px',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--primary-violet)',
                      display: 'inline-block', flexShrink: 0,
                      opacity: 0.7,
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

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
                          {Array.from({ length: Math.max(1, Math.min(5, Number(test.rating) || 5)) }).map((_, i) => (
                            <Star fill="currentColor" size={14} key={i} />
                          ))}
                        </div>
                        
                        {/* Quote Feedback */}
                        <p className="text-white fs-5 mb-5 lh-base fw-light italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          "{test.feedback}"
                        </p>

                        {/* Author info */}
                        <div className="d-flex align-items-center justify-content-center gap-3">
                          <div
                            style={{
                              width: '44px',
                              height: '44px',
                              minWidth: '44px',
                              borderRadius: '50%',
                              background: 'var(--gradient-main)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                              color: '#fff',
                              fontFamily: "'Outfit', sans-serif"
                            }}
                          >
                            {test.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                          </div>
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
