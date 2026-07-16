import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X, PhoneCall } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event to add background shadow/shrink navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0); // Scroll to top on navigation
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Events', path: '/events' },
    { name: 'Internships & Training', path: '/internships' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`navbar navbar-expand-xl navbar-dark fixed-top navbar-custom ${scrolled ? 'navbar-scrolled' : 'py-3'}`}>
      <div className="container-fluid px-lg-5 px-3">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand me-4">
          <Logo height={42} showText={true} textLight={true} />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{ background: 'transparent' }}
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>

        {/* Nav Items */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-3 mb-xl-0 gap-1 gap-xl-2">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Book A Call CTA */}
          <div className="d-flex align-items-center mt-3 mt-xl-0">
            <Link to="/book-call" className="btn-gradient navbar-btn">
              <PhoneCall size={18} />
              <span>Book A Call</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
