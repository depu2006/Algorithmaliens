import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Star, ArrowRight, BookOpen, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';

import SEO from '../components/SEO';
import testimonialsData from '../data/testimonials.json';

const Internships = () => {
  // Filters testimonials related to internship or training
  const successStories = testimonialsData.filter(
    (t) => t.category === 'internship' || t.category === 'training'
  );

  const programs = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Master modern frontend libraries and backend databases. Learn state management, custom layouts, and API creation.",
      duration: "3 - 6 Months",
      skills: ["React.js", "Node.js", "Express", "Bootstrap 5", "MongoDB"]
    },
    {
      id: "app-dev",
      title: "App Development",
      description: "Build robust, cross-platform Android and iOS mobile applications with native UI transitions and local data management.",
      duration: "3 - 6 Months",
      skills: ["React Native", "Flutter", "Firebase", "Redux Toolkit", "REST APIs"]
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Deep dive into model integration, large language models (LLMs), prompt engineering, and smart automation agents.",
      duration: "3 Months",
      skills: ["OpenAI API", "LangChain", "Python", "NumPy & Pandas", "Vector Databases"]
    },
    {
      id: "python",
      title: "Python Development",
      description: "Acquire strong programming foundations. Build web scrapers, automated scripts, backend routers, and data analytics tools.",
      duration: "2 - 4 Months",
      skills: ["Python core", "Django", "Flask", "BeautifulSoup", "SQL databases"]
    },
    {
      id: "full-stack",
      title: "Full Stack Development",
      description: "Become a complete developer. Take care of frontend styling, backend routing, server setups, cloud deployment, and CI/CD.",
      duration: "6 Months",
      skills: ["MERN Stack", "TypeScript", "Docker", "AWS Essentials", "Git & GitHub"]
    }
  ];

  return (
    <>
      <SEO 
        title="Internships & Technical Training"
        description="Launch your engineering career. Enroll in Web Development, Mobile Apps, and AI/ML internship programs guided by expert engineers."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider mb-2 d-block">Career Incubation</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Internships & Training</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            We bridge the gap between classroom lecture notes and corporate engineering expectations through structured mentorship and real products.
          </p>
        </div>
      </section>

      {/* Program Tracks */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Programs</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Available Training Tracks</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '500px' }}>
              Choose a specialization path that matches your tech interests and start coding.
            </p>
          </div>

          <div className="row g-4">
            {programs.map((prog) => (
              <div className="col-lg-4 col-md-6" key={prog.id}>
                <div className="card-custom d-flex flex-column justify-content-between h-100">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="fw-bold text-white mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>{prog.title}</h4>
                      <span className="badge bg-secondary py-1.5 px-2.5 rounded-pill fs-8" style={{ background: 'rgba(138,92,255,0.15)', color: 'var(--primary-cyan)', border: '1px solid rgba(138,92,255,0.2)' }}>
                        {prog.duration}
                      </span>
                    </div>
                    
                    <p className="text-muted-custom small mb-4">{prog.description}</p>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold text-white mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>Core Technologies</h6>
                      <div className="d-flex flex-wrap gap-1.5">
                        {prog.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="badge" 
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.05)', 
                              color: 'var(--muted-text)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              fontSize: '0.75rem'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.12)' }}>
                    <Link to="/book-call" className="text-gradient-cyan text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                      <span>Apply for this track</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="section-padding bg-black bg-opacity-25 border-top border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Advantages</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Why Intern with AlgorithmAliens?</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '500px' }}>
              We ensure our educational experience translates directly into professional success.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <Briefcase size={36} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Live Production Projects</h5>
                <p className="text-muted-custom small mb-0">No dummy exercises. You will contribute to active codebases, SaaS utilities, and client deliverables.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <GraduationCap size={36} className="text-gradient-cyan mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Professional Mentorship</h5>
                <p className="text-muted-custom small mb-0">Receive code reviews, feedback, and architecture support directly from our core software engineers.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <ShieldCheck size={36} className="text-gradient-cyan mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Verification Certificate</h5>
                <p className="text-muted-custom small mb-0">Earn an industry-backed internship completion certificate along with verification links for LinkedIn.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-custom p-4 text-center">
                <BookOpen size={36} className="text-gradient mb-3 mx-auto" />
                <h5 className="fw-bold text-white mb-2">Placement Guidance</h5>
                <p className="text-muted-custom small mb-0">Get resumes critiqued, participate in mock coding rounds, and receive direct job referrals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2">Success Stories</span>
            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>What Our Graduates Say</h2>
            <p className="text-muted-custom mx-auto" style={{ maxWidth: '500px' }}>
              Real reviews from students who completed our training pathways.
            </p>
          </div>

          <div className="row g-4">
            {successStories.map((story) => (
              <div className="col-md-6" key={story.id}>
                <div className="card-custom p-4 d-flex flex-column justify-content-between h-100">
                  <p className="text-white small italic mb-4" style={{ lineHeight: '1.6' }}>
                    "{story.feedback}"
                  </p>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: 'rgba(138, 92, 255, 0.12)' }}>
                    <img 
                      src={story.photo} 
                      alt={story.name} 
                      className="rounded-circle border"
                      style={{ width: '45px', height: '45px', objectFit: 'cover', borderColor: 'var(--primary-purple) !important' }}
                    />
                    <div>
                      <h6 className="fw-bold text-white mb-0">{story.name}</h6>
                      <small className="text-gradient-cyan text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '1px' }}>{story.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <div className="card-custom p-5 text-center mt-5" style={{ background: 'linear-gradient(135deg, rgba(23,0,38,0.7) 0%, rgba(10,0,21,0.9) 100%)' }}>
            <h3 className="fw-bold mb-3 text-white">Ready to Boost Your Technical Skills?</h3>
            <p className="text-muted-custom mx-auto mb-4" style={{ maxWidth: '500px' }}>
              Applications for the upcoming hybrid internship cohort are open. Apply now to secure a slot.
            </p>
            <Link to="/book-call" className="btn-gradient">
              <span>Apply / Schedule Interview Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Internships;
