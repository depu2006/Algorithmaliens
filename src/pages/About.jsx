import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Eye, Heart, Shield, Flame, BookOpen, Users2, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { LinkedIn as Linkedin, Twitter, GitHub as Github } from '../components/SocialIcons';

import SEO from '../components/SEO';
import teamData from '../data/team.json';

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about the origins, mission, vision, and core team at AlgorithmAliens Pvt. Ltd. Founded by Beeram Vasanth Kumar Reddy and Sai Ram Polsai."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <Sparkles size={32} className="text-white" />
            </div>
          </div>
          
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Who We Are</span>
          <h1 className="creative-heading lh-sm mb-3">
            About <span className="text-gradient">AlgorithmAliens</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '620px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            A forward-thinking software development firm and education facilitator bridging the gap between advanced technology and human capability.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#about-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="about-body" className="subpage-body">
        {/* Corporate Story */}
        <section className="section-padding">
          <div className="container">
            <div className="row align-items-center g-5">
              {/* Story text */}
              <div className="col-lg-6">
                <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.75rem' }}>Our History</span>
                <h2 className="display-6 fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Bridging the Tech Gap</h2>
                <p className="text-muted-custom mb-3.5" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
                  AlgorithmAliens Pvt. Ltd. was founded to build production-grade custom applications while incubating aspiring developer talent. We believe theoretical learning alone is insufficient in today's fast-moving industry.
                </p>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
                  We bridge this gap through a dual model: engineering state-of-the-art web tools, custom apps, and AI automations for corporate clients, while simultaneously guiding student development through AA Academy bootcamps and college ANX Clubs.
                </p>
                <div className="d-flex align-items-center gap-4 text-white fw-semibold" style={{ fontSize: '0.95rem' }}>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-gradient font-bold fs-3">100%</span>
                    <span className="small text-muted-custom">Practical-Based</span>
                  </div>
                  <span>|</span>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-gradient-cyan font-bold fs-3">Active</span>
                    <span className="small text-muted-custom">SaaS Operations</span>
                  </div>
                </div>
              </div>
              
              {/* Core pillars with 3D icons */}
              <div className="col-lg-6">
                <div className="card-custom p-5" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
                  <h3 className="fw-bold mb-5 text-white" style={{ fontSize: '1.35rem', fontFamily: "'Outfit', sans-serif" }}>Our Three Core Pillars</h3>
                  
                  <div className="d-flex gap-4 mb-4.5">
                    <div className="icon-3d-wrapper" style={{ width: '46px', height: '46px', minWidth: '46px' }}>
                      <Compass size={18} className="text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-1">Our Mission</h6>
                      <p className="text-muted-custom small mb-0">Deliver robust custom software, integrate custom AI workflows, and mentor developers through project incubation.</p>
                    </div>
                  </div>

                  <div className="d-flex gap-4 mb-4.5">
                    <div className="icon-3d-wrapper" style={{ width: '46px', height: '46px', minWidth: '46px' }}>
                      <Eye size={18} className="text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-1">Our Vision</h6>
                      <p className="text-muted-custom small mb-0">Become a global catalyst where corporate engineering and student development merge seamlessly to shape tech futures.</p>
                    </div>
                  </div>

                  <div className="d-flex gap-4">
                    <div className="icon-3d-wrapper" style={{ width: '46px', height: '46px', minWidth: '46px' }}>
                      <Heart size={18} className="text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-1">Our Philosophy</h6>
                      <p className="text-muted-custom small mb-0">Real learning happens by creating. We don't just teach code syntax; we compile products that solve actual client demands.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-black bg-opacity-20 border-top border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="container">
            <div className="text-center mb-5 pb-3">
              <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Guiding Lights</span>
              <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Core Values We Live By</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                These rules frame how we review code, build applications, and guide student chapters.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-lg-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <Shield size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Integrity First</h5>
                  <p className="text-muted-custom small mb-0">Clear, transparent client communications and solid architecture code.</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <Flame size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Continuous R&D</h5>
                  <p className="text-muted-custom small mb-0">Actively testing and incorporating the latest frameworks and AI utilities.</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Practical Mentorship</h5>
                  <p className="text-muted-custom small mb-0">Class lessons don't suffice. We focus on launching live software packages.</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <Users2 size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Community Cohesion</h5>
                  <p className="text-muted-custom small mb-0">Cultivating college developer chapters that organize hackathons and events.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-5 pb-3">
              <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Leadership</span>
              <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Meet Our Team</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                The developers, core team members, and directors driving AlgorithmAliens forward.
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              {teamData.map((member) => (
                <div className="col-lg-4 col-md-6" key={member.id}>
                  <motion.div
                    className="card-custom p-0 overflow-hidden d-flex flex-column h-100"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    {/* Photo area */}
                    <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(7,7,9,0.95), transparent)' }}>
                        <span className="badge rounded-pill bg-secondary mb-1.5 px-3 py-1" style={{ fontSize: '0.75rem', background: 'var(--gradient-main) !important', border: 'none' }}>{member.role}</span>
                        <h4 className="fw-bold text-white mb-0" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem' }}>{member.name}</h4>
                      </div>
                    </div>

                    {/* Body bio */}
                    <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                      <p className="text-muted-custom mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{member.bio}</p>
                      
                      {/* Social networks links */}
                      <div className="d-flex gap-3 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-cyan" style={{ transition: 'color 0.2s' }}>
                          <Linkedin size={18} />
                        </a>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-cyan" style={{ transition: 'color 0.2s' }}>
                          <Twitter size={18} />
                        </a>
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-cyan" style={{ transition: 'color 0.2s' }}>
                          <Github size={18} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
