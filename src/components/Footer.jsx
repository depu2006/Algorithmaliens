import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';
import { LinkedIn as Linkedin, Twitter, GitHub as Github } from './SocialIcons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand & Tagline */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-inline-block mb-3">
              <Logo height={42} showText={true} />
            </Link>
            <p className="text-muted-custom mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Engineering Innovation. Empowering Futures.<br />
              AlgorithmAliens Pvt. Ltd. builds futuristic applications, AI automation, and training ecosystems for student and corporate success.
            </p>
            <div className="d-flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                <Twitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6 col-md-3">
            <h5 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link"><ChevronRight size={14} className="me-1" /> About Us</Link></li>
              <li><Link to="/events" className="footer-link"><ChevronRight size={14} className="me-1" /> Events</Link></li>
              <li><Link to="/internships" className="footer-link"><ChevronRight size={14} className="me-1" /> Internships & Training</Link></li>
              <li><Link to="/testimonials" className="footer-link"><ChevronRight size={14} className="me-1" /> Testimonials</Link></li>
              <li><Link to="/faq" className="footer-link"><ChevronRight size={14} className="me-1" /> FAQs</Link></li>
              <li><Link to="/gallery" className="footer-link"><ChevronRight size={14} className="me-1" /> Gallery</Link></li>
            </ul>
          </div>

          {/* Services & Products */}
          <div className="col-lg-2 col-6 col-md-3">
            <h5 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>What We Do</h5>
            <ul className="list-unstyled">
              <li><Link to="/services" className="footer-link"><ChevronRight size={14} className="me-1" /> Web Development</Link></li>
              <li><Link to="/services" className="footer-link"><ChevronRight size={14} className="me-1" /> Mobile Apps</Link></li>
              <li><Link to="/services" className="footer-link"><ChevronRight size={14} className="me-1" /> AI Automation</Link></li>
              <li><Link to="/products" className="footer-link"><ChevronRight size={14} className="me-1" /> AA Academy</Link></li>
              <li><Link to="/products" className="footer-link"><ChevronRight size={14} className="me-1" /> ANX Clubs</Link></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Stay Updated</h5>
            <p className="text-muted-custom mb-3" style={{ fontSize: '0.9rem' }}>
              Subscribe to our newsletter to receive news, course details, event launches, and tech updates.
            </p>
            <form onSubmit={handleSubscribe} className="position-relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="form-control form-control-custom pe-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-gradient"
                style={{ border: 'none', background: 'transparent' }}
              >
                <Send size={18} />
              </button>
            </form>
            {subscribed && (
              <p className="text-gradient-cyan mt-2 fw-semibold" style={{ fontSize: '0.85rem' }}>
                ✓ Thank you for subscribing!
              </p>
            )}

            {/* Contact Details */}
            <div className="mt-4">
              <div className="d-flex align-items-center gap-2 text-muted-custom mb-2" style={{ fontSize: '0.9rem' }}>
                <Mail size={16} className="text-white" />
                <span>info@algorithmaliens.com</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted-custom mb-2" style={{ fontSize: '0.9rem' }}>
                <Phone size={16} className="text-white" />
                <span>+91 98765 43210</span>
              </div>
              <div className="d-flex align-items-start gap-2 text-muted-custom" style={{ fontSize: '0.9rem' }}>
                <MapPin size={16} className="text-white mt-1" />
                <span>IT Park Road, Tech Innovation Center, Hyderabad, TS, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" style={{ borderColor: 'rgba(138, 92, 255, 0.15)' }} />

        {/* Copyright */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted-custom" style={{ fontSize: '0.85rem' }}>
              © 2025 AlgorithmAliens Pvt. Ltd. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><Link to="/faq" className="text-muted-custom text-decoration-none me-3" style={{ fontSize: '0.85rem' }}>Privacy Policy</Link></li>
              <li className="list-inline-item"><Link to="/faq" className="text-muted-custom text-decoration-none" style={{ fontSize: '0.85rem' }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
