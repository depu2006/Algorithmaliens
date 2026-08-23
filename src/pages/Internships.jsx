import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Award, ArrowRight, BookOpen, ShieldCheck, GraduationCap, Briefcase, Activity, Loader2 } from 'lucide-react';

import SEO from '../components/SEO';
import { api } from '../services/api';

// Unsplash Images for Internship tracks
const trackImages = {
  "web-dev": "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop&q=80",
  "app-dev": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
  "ai-ml": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "python": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
  "full-stack": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&auto=format&fit=crop&q=80"
};

const Internships = () => {
  const [programs, setPrograms] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    api.public.getInternships()
      .then(data => {
        setPrograms(data);
        setLoadingPrograms(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingPrograms(false);
      });

    api.public.getTestimonials()
      .then(data => {
        const filtered = data.filter(
          (t) => t.category === 'internship' || t.category === 'training'
        );
        setSuccessStories(filtered);
        setLoadingTestimonials(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingTestimonials(false);
      });
  }, []);

  const steps = [
    { num: "01", label: "Apply Online", text: "Submit your details and select your preferred track." },
    { num: "02", label: "Tech Interview", text: "Brief call to assess your goals and current knowledge." },
    { num: "03", label: "Project Mentorship", text: "Work with core developers on active enterprise codebases." },
    { num: "04", label: "Get Certified", text: "Receive your industry-backed verification link." }
  ];

  return (
    <>
      <SEO 
        title="Internships & Technical Training"
        description="Launch your engineering career. Enroll in Web Development, Mobile Apps, and AI/ML internship programs guided by expert developers."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <GraduationCap size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Career Incubation</span>
          <h1 className="creative-heading lh-sm mb-3">
            Internships & <span className="text-gradient">Training</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            We bridge the gap between lecture slides and corporate engineering expectations through structured mentorship and real products.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#internships-body" className="scroll-down-btn">
          <BookOpen size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="internships-body" className="subpage-body">
        {/* Program Tracks */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-5 pb-3">
              <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Programs</span>
              <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Available Specialization Tracks</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                Choose a track that matches your tech interests and start building software.
              </p>
            </div>

            <div className="row g-4">
              {loadingPrograms ? (
                <div className="col-12 text-center py-5">
                  <Loader2 className="animate-spin text-gradient mb-3" size={32} />
                  <p className="text-muted-custom small">Loading internship tracks...</p>
                </div>
              ) : programs.length > 0 ? (
                programs.map((prog) => (
                  <div className="col-lg-4 col-md-6" key={prog.id}>
                    <div className="card-custom d-flex flex-column justify-content-between h-100">
                      <div>
                        {/* Visual Picture */}
                        <div className="card-image-wrap" style={{ height: '180px', marginBottom: '1.5rem' }}>
                          <img src={trackImages[prog.id] || "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600"} alt={prog.title} />
                        </div>

                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h4 className="fw-bold text-white mb-0" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem' }}>{prog.title}</h4>
                          <span className="badge rounded-pill" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--accent-cyan)', border: '1px solid var(--glass-border)', fontSize: '0.72rem' }}>
                            {prog.duration}
                          </span>
                        </div>
                        
                        <p className="text-muted-custom mb-4" style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>{prog.description}</p>
                        
                        <div className="mb-4">
                          <h6 className="fw-bold text-white mb-2.5 small text-uppercase" style={{ letterSpacing: '0.5px' }}>Core Technologies:</h6>
                          <div className="d-flex flex-wrap gap-1.5">
                            {prog.skills.map((skill) => (
                              <span 
                                key={skill}
                                className="badge rounded" 
                                style={{ 
                                  background: 'rgba(255, 255, 255, 0.04)', 
                                  color: 'var(--muted-text)',
                                  border: '1px solid var(--glass-border)',
                                  fontSize: '0.72rem'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                        <Link to="/book-call" className="text-gradient-cyan text-decoration-none fw-semibold d-inline-flex align-items-center gap-1" style={{ fontSize: '0.9rem' }}>
                          <span>Apply for this track</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted-custom">No internship tracks registered yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visual Career Flow / Stepper Section */}
        <section className="section-padding bg-black bg-opacity-20 border-top border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="container">
            <div className="text-center mb-5 pb-3">
              <span className="text-gradient-cyan fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Career Path</span>
              <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>How It Works</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                Our step-by-step incubation process guides you from onboarding to certification.
              </p>
            </div>

            <div className="row g-4">
              {steps.map((st, i) => (
                <div className="col-lg-3 col-sm-6" key={i}>
                  <div className="card-custom p-4 align-items-start position-relative">
                    {/* Glowing step count in corner */}
                    <span className="position-absolute top-0 end-0 p-3 fs-3 fw-bold text-gradient opacity-15">{st.num}</span>
                    
                    <div className="icon-3d-wrapper mb-4" style={{ width: '42px', height: '42px' }}>
                      <Activity size={18} className="text-white" />
                    </div>
                    <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>{st.label}</h5>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.5' }}>{st.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Benefits */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Advantages</span>
              <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Why Intern with AlgorithmAliens?</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                We ensure our training paths lead to real development capability and engineering confidence.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <Briefcase size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Production Code</h5>
                  <p className="text-muted-custom small mb-0">Contribute to active enterprise applications and client deliverables.</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <GraduationCap size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Expert Mentors</h5>
                  <p className="text-muted-custom small mb-0">Receive code reviews and design support from senior engineers.</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <ShieldCheck size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Industry Certificate</h5>
                  <p className="text-muted-custom small mb-0">Secure an industry-grade internship completion certificate.</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card-custom p-4 text-center">
                  <div className="icon-3d-wrapper mb-3 mx-auto" style={{ width: '46px', height: '46px' }}>
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>Career Referrals</h5>
                  <p className="text-muted-custom small mb-0">Receive mock interview feedback and referrals to partner firms.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="section-padding bg-black bg-opacity-20 border-top" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-gradient fw-bold text-uppercase tracking-wider d-block mb-2" style={{ fontSize: '0.8rem' }}>Success Stories</span>
              <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Graduates Reviews</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '480px' }}>
                Real reviews from students who completed our training pathways.
              </p>
            </div>

              {loadingTestimonials ? (
                <div className="col-12 text-center py-5">
                  <Loader2 className="animate-spin text-gradient mb-3" size={32} />
                  <p className="text-muted-custom small">Loading graduate reviews...</p>
                </div>
              ) : successStories.length > 0 ? (
                successStories.map((story) => (
                  <div className="col-md-6" key={story.id}>
                    <div className="card-custom p-4 d-flex flex-column justify-content-between h-100">
                      <p className="text-white small italic mb-4" style={{ lineHeight: '1.6' }}>
                        "{story.feedback}"
                      </p>
                      <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: 'var(--glass-border)' }}>
                        <img 
                          src={story.photo} 
                          alt={story.name} 
                          className="rounded-circle border border-secondary"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>{story.name}</h6>
                          <small className="text-gradient-cyan text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>{story.role}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted-custom">No reviews available yet.</p>
                </div>
              )}

            {/* Bottom CTA banner */}
            <div className="card-custom p-5 text-center mt-5 align-items-center" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
              <h3 className="fw-bold mb-2 text-white">Ready to Boost Your Technical Skills?</h3>
              <p className="text-muted-custom mx-auto mb-4" style={{ maxWidth: '450px', fontSize: '0.95rem' }}>
                Applications for our upcoming hybrid internship cohort are open. Select a track to apply.
              </p>
              <Link to="/book-call" className="btn-gradient">
                <span>Apply & Schedule Interview</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Internships;
