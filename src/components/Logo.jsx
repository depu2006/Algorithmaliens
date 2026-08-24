import React from 'react';

const Logo = ({ height = 40, showText = true, textLight = true, className = "" }) => {
  return (
    <div className={`logo-container ${className}`} style={{ cursor: 'pointer' }}>
      <img
        src="/logo.png"
        alt="AlgorithmAliens Pvt. Ltd."
        className="logo-image"
        style={{ height: `${height}px`, width: 'auto' }}
      />
    </div>
  );
};

export default Logo;
