// SplashScreen.js
import React from 'react';
import './SplashScreen.css'; // Optional animations

const SplashScreen = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
      <img src="/problem_solvers_logo.png" alt="Group Logo" className="mb-4 splash-logo" />
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-secondary">Getting things ready...</p>
    </div>
  );
};

export default SplashScreen;