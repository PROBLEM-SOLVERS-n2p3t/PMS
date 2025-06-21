import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [rack, setRack] = useState('');
  const [expiry, setExpiry] = useState('');
  const [weight, setWeight] = useState(null);
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate(); // ⬅ Needed for navigation

  useEffect(() => {
    const fetchWeight = async () => {
      if (rack.trim() !== '') {
        try {
          const res = await axios.get(`http://localhost:5000/get-weight/${rack}`);
          setWeight(res.data.weight);
        } catch (err) {
          console.error('❌ Failed to fetch weight:', err);
          setWeight(null);
        }
      } else {
        setWeight(null);
      }
    };

    fetchWeight();
  }, [rack]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/add-product', {
        name,
        rack,
        expiry,
        weight,
      });

      alert('✅ Product added successfully');
      setName('');
      setRack('');
      setExpiry('');
      setWeight(null);
    } catch (err) {
      console.error('❌ Failed to add product:', err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(to right, #e3f2fd, #e8f5e9)',
      }}
    >
      <motion.div
        className="container bg-white p-4 rounded shadow"
        style={{ maxWidth: '600px' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>➕ Add Product</h2>
          <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
            ⬅ Back to Main
          </button>
        </div>
        <p className="text-end text-muted">📅 {currentDate}</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Milk"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rack Number</label>
            <input
              type="text"
              className="form-control"
              value={rack}
              onChange={(e) => setRack(e.target.value)}
              placeholder="e.g. A1"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              value={weight !== null ? weight : ''}
              readOnly
              placeholder="Auto-fetched"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Product
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;