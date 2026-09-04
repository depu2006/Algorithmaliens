import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Logo = ({ height = 40, showText = true, textLight = true, className = "" }) => {
  const themeContext = useTheme();
  const isLight = themeContext?.theme === 'light';

  return (
    <div className={`logo-container ${className}`} style={{ cursor: 'pointer' }}>
      <img
        src={isLight ? "/logo-light.png" : "/logo.png"}
        alt="AlgorithmAliens Pvt. Ltd."
        className="logo-image"
        style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  );
};

export default Logo;
