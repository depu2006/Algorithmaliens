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
          {/* Brand & Details */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-inline-block mb-3">
              <Logo height={38} showText={true} />
            </Link>
            <p className="text-muted-custom mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '320px' }}>
              AlgorithmAliens Pvt. Ltd. builds software platforms, custom AI automation workflows, and high-impact developer ecosystems.
            </p>
            {/* Quick Contact info */}
            <div className="mb-4 text-muted-custom" style={{ fontSize: '0.85rem' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Mail size={14} className="text-white" />
                <span>info@algorithmaliens.com</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Phone size={14} className="text-white" />
                <span>+91 98765 43210</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={14} className="text-white mt-1" />
                <span>HITEC City, Hyderabad, India</span>
              </div>
            </div>
            {/* Socials */}
            <div className="d-flex gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-outline-custom p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', minWidth: '36px' }}>
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn-outline-custom p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', minWidth: '36px' }}>
                <Twitter size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline-custom p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', minWidth: '36px' }}>
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6 col-md-3">
            <h6 className="fw-bold mb-3 text-white text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/events" className="footer-link">Events</Link></li>
              <li><Link to="/testimonials" className="footer-link">Reviews</Link></li>
              <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
              <li><Link to="/faq" className="footer-link">FAQs</Link></li>
            </ul>
          </div>

          {/* Services & Products */}
          <div className="col-lg-2 col-6 col-md-3">
            <h6 className="fw-bold mb-3 text-white text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>Offerings</h6>
            <ul className="list-unstyled">
              <li><Link to="/services" className="footer-link">Web Dev</Link></li>
              <li><Link to="/services" className="footer-link">Mobile Apps</Link></li>
              <li><Link to="/services" className="footer-link">AI Automation</Link></li>
              <li><Link to="/products" className="footer-link">AA Academy</Link></li>
              <li><Link to="/products" className="footer-link">ANX Clubs</Link></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3 text-white text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>Newsletter</h6>
            <p className="text-muted-custom mb-3.5" style={{ fontSize: '0.85rem' }}>
              Subscribe to receive new course launches, event invites, and tech summaries.
            </p>
            <form onSubmit={handleSubscribe} className="position-relative">
              <input
                type="email"
                required
                placeholder="john@company.com"
                className="form-control form-control-custom pe-5"
                style={{ fontSize: '0.85rem', padding: '10px 14px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-gradient-cyan"
                style={{ border: 'none', background: 'transparent' }}
              >
                <Send size={15} />
              </button>
            </form>
            {subscribed && (
              <p className="text-gradient-cyan mt-2 fw-semibold" style={{ fontSize: '0.8rem' }}>
                ✓ Subscribed successfully
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" style={{ borderColor: 'var(--glass-border)', opacity: 1 }} />

        {/* Copyright */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted-custom" style={{ fontSize: '0.8rem' }}>
              © 2025 AlgorithmAliens Pvt. Ltd. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><Link to="/faq" className="text-muted-custom text-decoration-none me-3" style={{ fontSize: '0.8rem' }}>Privacy</Link></li>
              <li className="list-inline-item"><Link to="/faq" className="text-muted-custom text-decoration-none" style={{ fontSize: '0.8rem' }}>Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
