import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Notifications</h2>
      <p>Get alerts when racks are low on stock or nearing expiry.</p>

      {/* Notifications list or alert logic can be placed here */}

      <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default Notifications;