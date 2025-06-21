import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Notification = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpiring = async () => {
      try {
        const res = await axios.get('http://localhost:5000/notifications/expiry');
        setProducts(res.data);
        if (res.data.length > 0) setShowModal(true);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };
    fetchExpiring();
  }, []);

  const getExpiryTag = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return <span className="badge bg-danger ms-2">🔴 Today</span>;
    if (diffDays === 1) return <span className="badge bg-warning text-dark ms-2">🟡 Tomorrow</span>;
    return <span className="badge bg-secondary ms-2">🕒 {diffDays} Days</span>;
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-start py-5"
      style={{ background: 'linear-gradient(to right, #ffe0e0, #e0f7fa)' }}
    >
      <motion.div
        className="container bg-white p-4 rounded shadow"
        style={{ maxWidth: '800px', width: '90%' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-danger">⚠ Expiry Notifications</h2>
          <span className="text-muted">📅 {currentDate}</span>
        </div>

        {products.length === 0 ? (
          <motion.p className="text-success fs-5">✅ No products expiring soon.</motion.p>
        ) : (
          <ul className="list-group mb-3">
            {products.map((product) => (
              <li
                key={product._id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div>
                  <strong>{product.name}</strong> on rack <strong>{product.rack}</strong><br />
                  <small className="text-muted">
                    📅 {new Date(product.expiry).toLocaleDateString()}
                    {getExpiryTag(product.expiry)}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button onClick={() => navigate('/')} className="btn btn-outline-dark mt-3">
          ⬅ Back to Dashboard
        </button>
      </motion.div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal show fade" style={{ display: 'block', backgroundColor: '#00000080' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">⚠ Expiring Products</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>The following products are about to expire:</p>
                <ul>
                  {products.map((p) => (
                    <li key={p._id}>
                      <strong>{p.name}</strong> (Rack: {p.rack}) - {new Date(p.expiry).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;