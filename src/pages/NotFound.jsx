import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 - Lost in Space"
        description="The resource coordinates you requested do not exist in the AlgorithmAliens index."
      />

      <section className="hero-padding d-flex align-items-center justify-content-center min-vh-100 text-center">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="card-custom p-5 mx-auto" style={{ maxWidth: '550px', background: 'linear-gradient(135deg, rgba(23,0,38,0.7) 0%, rgba(10,0,21,0.95) 100%)' }}>
            
            {/* Warning Ring */}
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 p-3 bg-danger bg-opacity-10 border border-danger animate-pulse" style={{ width: '80px', height: '80px' }}>
              <AlertCircle size={40} className="text-danger" />
            </div>

            <h1 className="display-4 fw-extrabold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>404</h1>
            <h3 className="fw-bold text-gradient mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Coordinates Lost</h3>
            <p className="text-muted-custom mb-5">
              The page you are trying to reach has drifted out of our planetary orbit. Double-check your URL or return to home base.
            </p>

            <Link to="/" className="btn-gradient justify-content-center w-100">
              <Home size={18} />
              <span>Return to Home Base</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
