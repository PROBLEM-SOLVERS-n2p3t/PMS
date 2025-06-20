// src/pages/AddProduct.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [rack, setRack] = useState('');
  const [expiry, setExpiry] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/add-product', {
        name,
        rack,
        expiry,
      });

      alert('✅ Product added successfully');
      // Clear inputs
      setName('');
      setRack('');
      setExpiry('');
    } catch (err) {
      console.error('❌ Failed to add product:', err);
      alert('❌ Failed to add product');
    }
  };
    
  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Rack</label>
          <input
            type="text"
            className="form-control"
            value={rack}
            onChange={(e) => setRack(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Expiry Date</label>
          <input
            type="date"
            className="form-control"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
    
  );
};

export default AddProduct;