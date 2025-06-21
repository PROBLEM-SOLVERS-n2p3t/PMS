import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

const ProductList = () => { const [products, setProducts] = useState([]); const [searchTerm, setSearchTerm] = useState(''); const [filterBy, setFilterBy] = useState('name'); const navigate = useNavigate();

useEffect(() => { axios.get('http://localhost:5000/products') .then(res => { setProducts(res.data); }) .catch(err => { console.error("Failed to fetch products:", err); }); }, []);

const currentDate = new Date().toLocaleDateString();

const getFilteredValue = (prod) => { switch (filterBy) { case 'name': return prod.name.toLowerCase(); case 'rack': return prod.rack.toLowerCase(); case 'expiry': return new Date(prod.expiry).toLocaleDateString().toLowerCase(); default: return ''; } };

const filteredProducts = products.filter((prod) => { return getFilteredValue(prod).includes(searchTerm.toLowerCase()); });

const highlightMatch = (text, type) => { const search = searchTerm.trim(); if (!search) return text; const regex = new RegExp(`(${search})`, 'gi'); return text.replace(regex, '<mark>$1</mark>'); };

const exportToPDF = () => { const doc = new jsPDF(); doc.text("Product List", 14, 10); const tableData = filteredProducts.map(prod => [ prod.name, prod.rack, new Date(prod.expiry).toLocaleDateString(), prod.weight ?? 'N/A' ]); doc.autoTable({ head: [['Name', 'Rack Number', 'Expiry Date', 'Weight (kg)']], body: tableData, }); doc.save('product_list.pdf'); };

return ( <div className="min-vh-100 d-flex flex-column align-items-center justify-content-start py-5" style={{ background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)' }} > <div className="container bg-white p-4 rounded shadow" style={{ maxWidth: '1000px' }}> <h2 className="text-center mb-3">📦 Product List</h2> <p className="text-end text-muted">📅 {currentDate}</p>

<div className="text-start mb-3">
      <button className="btn btn-outline-primary" onClick={() => navigate('/')}>⬅ Back to Main</button>
    </div>

    {/* Search & Filter */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder={`Search by ${filterBy}`}
        style={{ maxWidth: '60%' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="form-select me-2"
        style={{ maxWidth: '200px' }}
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
        <option value="name">Product Name</option>
        <option value="rack">Rack Number</option>
        <option value="expiry">Expiry Date</option>
      </select>
      <button className="btn btn-outline-secondary me-2" onClick={() => setSearchTerm('')}>Clear</button>
      <button className="btn btn-outline-success" onClick={exportToPDF}>⬇ Export PDF</button>
    </div>

    <motion.table
      className="table table-striped table-hover"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <thead className="table-success">
        <tr>
          <th>Name</th>
          <th>Rack Number</th>
          <th>Expiry Date</th>
          <th>Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map(prod => (
          <tr key={prod._id}>
            <td dangerouslySetInnerHTML={{ __html: filterBy === 'name' ? highlightMatch(prod.name, 'name') : prod.name }} />
            <td dangerouslySetInnerHTML={{ __html: filterBy === 'rack' ? highlightMatch(prod.rack, 'rack') : prod.rack }} />
            <td dangerouslySetInnerHTML={{ __html: filterBy === 'expiry' ? highlightMatch(new Date(prod.expiry).toLocaleDateString(), 'expiry') : new Date(prod.expiry).toLocaleDateString() }} />
            <td>{prod.weight ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </motion.table>
  </div>
</div>

); };

export default ProductList;