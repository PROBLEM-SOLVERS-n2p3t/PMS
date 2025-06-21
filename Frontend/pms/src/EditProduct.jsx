import React, { useState, useEffect } from 'react'; import axios from 'axios'; import { motion } from 'framer-motion'; import { useNavigate } from 'react-router-dom';

const EditProduct = () => { const [products, setProducts] = useState([]); const [filteredProducts, setFilteredProducts] = useState([]); const [editId, setEditId] = useState(''); const [name, setName] = useState(''); const [rack, setRack] = useState(''); const [expiry, setExpiry] = useState(''); const [weight, setWeight] = useState(''); const [searchTerm, setSearchTerm] = useState(''); const currentDate = new Date().toLocaleDateString(); const navigate = useNavigate();

const fetchProducts = async () => { try { const res = await axios.get('http://localhost:5000/products'); setProducts(res.data); setFilteredProducts(res.data); } catch (err) { console.error("❌ Error loading products", err); } };

useEffect(() => { fetchProducts(); }, []);

useEffect(() => { if (rack.trim() !== '') { axios.get(`http://localhost:5000/get-weight?rack=${rack}`) .then(res => { setWeight(res.data.weight || ''); }) .catch(() => setWeight('')); } }, [rack]);

useEffect(() => { const term = searchTerm.toLowerCase(); const filtered = products.filter(prod => prod.name.toLowerCase().includes(term) || prod.rack.toLowerCase().includes(term) ); setFilteredProducts(filtered); }, [searchTerm, products]);

const handleEditClick = (product) => { setEditId(product._id); setName(product.name); setRack(product.rack); setExpiry(product.expiry.slice(0, 10)); };

const handleUpdate = async (e) => { e.preventDefault(); try { await axios.put(`http://localhost:5000/update-product/${editId}`, { name, rack, expiry, }); alert("✅ Product updated"); fetchProducts(); setEditId(''); setName(''); setRack(''); setExpiry(''); setWeight(''); } catch (err) { alert("❌ Update failed"); } };

const handleDelete = async (id) => { if (window.confirm("Are you sure you want to delete this product?")) { try { await axios.delete(`http://localhost:5000/delete-product/${id}`); alert("🗑 Product deleted"); fetchProducts(); } catch (err) { alert("❌ Failed to delete"); } } };

return ( <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(to right, #f3e5f5, #e1f5fe)', }} > <motion.div className="container bg-white rounded shadow p-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} > <div className="d-flex justify-content-between align-items-center mb-3"> <h2>📋 Edit Products</h2> <button className="btn btn-outline-primary" onClick={() => navigate('/')}>⬅ Back to Main</button> </div> <p className="text-end text-muted">📅 {currentDate}</p>

<div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="🔍 Search by name or rack"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <table className="table table-striped table-bordered">
      <thead className="table-info">
        <tr>
          <th>Name</th>
          <th>Rack</th>
          <th>Expiry</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map(prod => (
          <tr key={prod._id}>
            <td>{prod.name}</td>
            <td>{prod.rack}</td>
            <td>{new Date(prod.expiry).toLocaleDateString()}</td>
            <td>
              <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(prod)}>✏ Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod._id)}>🗑 Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {editId && (
      <motion.div
        className="mt-4 bg-light p-4 rounded border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h4>✍ Edit Product</h4>
        <form onSubmit={handleUpdate}>
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
          <div className="mb-3">
            <label>Weight (from server)</label>
            <input
              type="text"
              className="form-control"
              value={weight}
              readOnly
            />
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-success me-2">💾 Update</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditId('');
                setName('');
                setRack('');
                setExpiry('');
                setWeight('');
              }}
            >❌ Cancel</button>
          </div>
        </form>
      </motion.div>
    )}
  </motion.div>
</div>

); };

export default EditProduct;