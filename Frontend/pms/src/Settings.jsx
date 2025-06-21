import React, { useEffect, useState } from 'react'; import { useNavigate } from 'react-router-dom'; import axios from 'axios';

const Settings = () => { const navigate = useNavigate(); const [notifyExpiry, setNotifyExpiry] = useState(true); const [notifyStock, setNotifyStock] = useState(true); const [theme, setTheme] = useState('Light');

useEffect(() => { axios.get('http://localhost:5000/settings') .then((res) => { if (res.data) { setNotifyExpiry(res.data.notifyExpiry); setNotifyStock(res.data.notifyStock); setTheme(res.data.theme); } }) .catch((err) => console.error('Error loading settings', err)); }, []);

const handleSave = async () => { try { await axios.post('http://localhost:5000/settings', { notifyExpiry, notifyStock, theme }); alert('✅ Settings saved!'); } catch (err) { alert('❌ Failed to save settings'); console.error(err); } };

const backgroundStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(-45deg, #fceabb, #f8b500, #fceabb, #f76b1c)', backgroundSize: '400% 400%', animation: 'gradientShift 12s ease infinite', };

const cardStyle = { background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', borderRadius: '1rem', padding: '2rem', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', width: '100%', maxWidth: '500px', };

const headingStyle = { textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', };

const descriptionStyle = { textAlign: 'center', color: '#555', marginBottom: '1.5rem', };

const buttonGroupStyle = { display: 'flex', justifyContent: 'space-between', marginTop: '1rem', };

return ( <> <style> {`@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`} </style>

<div style={backgroundStyle}>
    <div style={cardStyle}>
      <h2 style={headingStyle}>⚙ Settings</h2>
      <p style={descriptionStyle}>Customize your preferences and alerts.</p>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="notifyExpiry"
          checked={notifyExpiry}
          onChange={() => setNotifyExpiry(!notifyExpiry)}
        />
        <label className="form-check-label" htmlFor="notifyExpiry">
          Enable expiry notifications
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="notifyStock"
          checked={notifyStock}
          onChange={() => setNotifyStock(!notifyStock)}
        />
        <label className="form-check-label" htmlFor="notifyStock">
          Enable low stock alerts
        </label>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="themeSelect">Theme</label>
        <select
          className="form-control"
          id="themeSelect"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>

      <div style={buttonGroupStyle}>
        <button onClick={handleSave} className="btn btn-success">💾 Save</button>
        <button onClick={() => navigate('/')} className="btn btn-secondary">⬅ Back</button>
      </div>
    </div>
  </div>
</>

); };

export default Settings;