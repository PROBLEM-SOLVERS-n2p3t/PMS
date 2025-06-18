// SplashScreen.js
import React from 'react';
import './SplashScreen.css'; // Optional animations

const SplashScreen = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
      <img src="/logo.jpg" alt="Group Logo" className="mb-4 splash-logo" />
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-info">Getting things ready...</p>
    </div>
  );
};

export default SplashScreen;