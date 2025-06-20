// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Product List</h2>

      {/* Back button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/')}
      >
        ⬅ Back to Main
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rack Number</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.rack}</td>
              <td>{new Date(prod.expiry).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;