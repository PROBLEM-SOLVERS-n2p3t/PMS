import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [rack, setRack] = useState('');
  const [expiry, setExpiry] = useState('');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error loading products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Load product into form for editing
  const handleEditClick = (product) => {
    setEditId(product._id);
    setName(product.name);
    setRack(product.rack);
    setExpiry(product.expiry);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-product/${editId}`, {
        name, rack, expiry
      });
      alert("✅ Product updated");
      fetchProducts(); // refresh product list
      setEditId('');
      setName('');
      setRack('');
      setExpiry('');
    } catch (err) {
      alert("❌ Update failed");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-product/${id}`);
        alert("🗑 Product deleted");
        fetchProducts();
      } catch (err) {
        alert("❌ Failed to delete");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Products</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rack</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.rack}</td>
              <td>{prod.expiry}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(prod)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editId && (
        <div className="mt-4">
          <h3>Edit Product</h3>
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
            <button type="submit" className="btn btn-success me-2">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => {
              setEditId('');
              setName('');
              setRack('');
              setExpiry('');
            }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProduct;