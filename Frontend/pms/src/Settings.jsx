import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Settings</h2>
      <p>Customize your dashboard preferences and notification options.</p>

      {/* Settings UI can be added here */}

      <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default Settings;