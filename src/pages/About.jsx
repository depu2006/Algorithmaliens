import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Eye, Heart, Shield, Flame, BookOpen, Users2 } from 'lucide-react';
import { LinkedIn as Linkedin, Twitter, GitHub as Github } from '../components/SocialIcons';

import SEO from '../components/SEO';
import teamData from '../data/team.json';

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about the origins, mission, vision, and core team at AlgorithmAliens Pvt. Ltd. Founded by Beeram Vasanth Kumar Reddy and Sai Ram Polsai."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Who We Are</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>About AlgorithmAliens</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            A forward-thinking software development firm and education facilitator bridging the gap between advanced technology and human capability.
          </p>
        </div>
      </section>

      {/* Corporate Story */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Our Journey</h2>
              <p className="text-muted-custom mb-3" style={{ lineHeight: '1.7' }}>
                AlgorithmAliens Pvt. Ltd. was founded with a clear directive: to design elite, production-grade applications for businesses while creating high-impact incubation hubs for aspiring engineers. In an era where tech moves at lightning speed, classroom theoretical knowledge is no longer sufficient.
              </p>
              <p className="text-muted-custom mb-3" style={{ lineHeight: '1.7' }}>
                We operate as a dual-engine corporate organization. Our software division engineers state-of-the-art web tools, custom apps, and AI integrations. Our community division operates the AlgorithmAliens Academy and college-based ANX Clubs, training students on real, production-ready code.
              </p>
              <p className="text-muted-custom" style={{ lineHeight: '1.7' }}>
                Today, we support multiple corporate enterprises globally and manage a community of thousands of students across engineering institutions, inspiring them to code, build, and lead.
              </p>
            </div>
            
            <div className="col-lg-6">
              <div className="card-custom p-5" style={{ background: 'linear-gradient(135deg, rgba(23,0,38,0.7) 0%, rgba(10,0,21,0.9) 100%)' }}>
                <h3 className="fw-bold mb-4 text-gradient">Our Core Pillars</h3>
                <div className="d-flex gap-3 mb-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 border border-primary p-3" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                    <Compass className="text-gradient" />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-1">Our Mission</h5>
                    <p className="text-muted-custom small mb-0">To deliver robust custom software and automate workflows via intelligent AI systems, while guiding the next generation of creators through hands-on education.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-info bg-opacity-10 border border-info p-3" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                    <Eye className="text-gradient-cyan" />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-1">Our Vision</h5>
                    <p className="text-muted-custom small mb-0">To become a global catalyst of technical excellence, where business automation and community learning merge seamlessly to power the future.</p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 border border-warning p-3" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                    <Heart className="text-warning" />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-1">Our Philosophy</h5>
                    <p className="text-muted-custom small mb-0">Real learning happens through creation. We don't just teach coding syntax; we build real products that solve actual business challenges.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-black bg-opacity-25 border-top border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Our Foundation</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Core Values We Live By</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '500px' }}>
              These guiding principles shape how we build products and mentor students.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <Shield size={36} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Integrity First</h5>
                <p className="text-muted-custom small mb-0">Transparent communication, honest pricing, and clean code in every single engagement.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <Flame size={36} className="text-gradient-cyan mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Constant Innovation</h5>
                <p className="text-muted-custom small mb-0">Always researching, integrating the latest LLM models, web frameworks, and engineering standards.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <BookOpen size={36} className="text-gradient-cyan mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Empowering Education</h5>
                <p className="text-muted-custom small mb-0">Providing open-source bootcamps, community clubs, and hands-on professional certificates.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <Users2 size={36} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Community Driven</h5>
                <p className="text-muted-custom small mb-0">Building college chapters that cultivate tech engagement, hackathons, and collaborative research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">The Brains</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Meet Our Team</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '600px' }}>
              The developers, educators, and leaders who guide AlgorithmAliens toward technological excellence.
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
                  <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(10,0,21,0.95), transparent)' }}>
                      <span className="badge bg-primary mb-1" style={{ background: 'var(--gradient-main) !important' }}>{member.role}</span>
                      <h4 className="fw-bold text-white mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>{member.name}</h4>
                    </div>
                  </div>
                  <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                    <p className="text-muted-custom small mb-4">{member.bio}</p>
                    
                    <div className="d-flex gap-3 pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.15)' }}>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-cyan">
                        <Linkedin size={20} />
                      </a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-cyan">
                        <Twitter size={20} />
                      </a>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-cyan">
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
