import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutRefrigerator = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Refrigerator Temperature</h2>
      <p>This page displays the temperature of the refrigerator.</p>

      {/* Display actual temperature here */}

      <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default AboutRefrigerator;