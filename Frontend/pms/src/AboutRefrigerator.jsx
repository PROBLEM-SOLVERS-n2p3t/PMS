import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutRefrigerator = () => {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTemperature = async () => {
    try {
      const res = await axios.get('http://localhost:5000/refrigerator-temperature');
      setTemperature(res.data.temperature);
    } catch (err) {
      console.error("Failed to fetch temperature:", err);
      setTemperature(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemperature();
  }, []);

  const getStatusTag = (temp) => {
    if (temp < 2) return <span className="badge bg-warning text-dark ms-2">⚠ Too Cold</span>;
    if (temp >= 2 && temp <= 5) return <span className="badge bg-success ms-2">✅ Normal</span>;
    return <span className="badge bg-danger ms-2">🔥 Danger</span>;
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(to right, #e3f2fd, #fff3e0)',
        padding: '30px',
      }}
    >
      <motion.div
        className="container bg-white p-4 rounded shadow text-center"
        style={{ maxWidth: '600px', width: '100%' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-3">
          ❄ Refrigerator Temperature Monitor
        </h2>
        <p className="text-muted mb-4">
          This page displays the current internal temperature of the refrigerator in °C.
        </p>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-info" role="status"></div>
            <p className="mt-2">Fetching temperature...</p>
          </div>
        ) : (
          <div className="bg-light p-4 rounded shadow-sm">
            <h3 className="display-4">
              🌡 {temperature !== null ? `${temperature}°C` : 'N/A'}
              {temperature !== null && getStatusTag(temperature)}
            </h3>
            <p className="text-muted mt-2">Updated just now</p>
          </div>
        )}

        <div className="mt-4 d-flex justify-content-between">
          <button className="btn btn-outline-primary" onClick={fetchTemperature}>
            🔄 Refresh
          </button>
          <button className="btn btn-outline-dark" onClick={() => navigate('/')}>
            ⬅ Back to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutRefrigerator;