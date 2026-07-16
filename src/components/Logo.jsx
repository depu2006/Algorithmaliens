import React from 'react';

const Logo = ({ height = 40, showText = true, textLight = true, className = "" }) => {
  return (
    <div className={`d-flex align-items-center gap-2 logo-container ${className}`} style={{ cursor: 'pointer' }}>
      {/* Stylized A Icon */}
      <svg
        height={height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <defs>
          <linearGradient id="logo-brand-gradient" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="logo-silver" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#888888" />
            <stop offset="50%" stopColor="#DDDDDD" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Curved / Stylized gradient leg */}
        <path
          d="M 25 95 C 20 95 15 90 20 80 L 52 20 C 55 15 62 15 65 20 L 75 40 L 63 43 L 58 32 L 32 82 C 30 86 32 90 38 90 L 48 90 L 45 95 Z"
          fill="url(#logo-brand-gradient)"
          filter="url(#neon-glow)"
        />

        {/* Right metallic leg overlapping */}
        <path
          d="M 65 20 L 98 80 C 102 90 97 95 90 95 L 60 95 L 65 90 L 85 90 C 90 90 92 86 89 82 L 68 45 L 78 35 Z"
          fill="url(#logo-silver)"
        />

        {/* Cybernet connection nodes */}
        <circle cx="58" cy="26" r="4" fill="#06B6D4" />
        <circle cx="32" cy="82" r="3" fill="#2563EB" />
        <circle cx="89" cy="82" r="3" fill="#FFFFFF" />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="d-flex flex-column lh-1">
          <span 
            className="fw-bold tracking-wider" 
            style={{ 
              fontSize: '1.1rem', 
              color: textLight ? '#FFFFFF' : '#0B0B0C',
              letterSpacing: '1.2px',
              fontFamily: "'Outfit', 'Inter', sans-serif"
            }}
          >
            ALGORITHM ALIENS
          </span>
          <span 
            className="fw-semibold text-uppercase" 
            style={{ 
              fontSize: '0.62rem', 
              color: textLight ? '#06B6D4' : '#2563EB',
              letterSpacing: '2.5px',
              marginTop: '3px',
              fontFamily: "'Outfit', 'Inter', sans-serif"
            }}
          >
            Private Limited
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
