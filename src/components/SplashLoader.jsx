import React, { useEffect, useState } from 'react';
import './SplashLoader.css';

const SplashLoader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    const removeTimer = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="logo-wrapper">
          <div className="pulse-ring"></div>
          <div className="pulse-ring secondary"></div>
          
          {/* Reference directly from public/ */}
          <img 
            src="/etc-logo.png" 
            alt="Department of Electronics & Telecommunication Engineering Logo" 
            className="splash-logo" 
          />
        </div>
        <h2 className="splash-title">Department of Electronics & Telecommunication Engineering</h2>
        <p className="splash-subtitle">SBJITMR, Nagpur</p>
        
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;