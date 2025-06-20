const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/productsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  rack: String,
  expiry: String,
  weight: Number,
});

const Product = mongoose.model('Product', ProductSchema);

// Routes
app.get('/products', async (req, res) => {
  const products = await Product.find().sort({ expiry: 1 });
  res.json(products);
});
app.post('/add-product', async (req, res) => {
  const { name, rack, expiry } = req.body;
  console.log('Received Add Product:', req.body); // 👈 Add this line

  try {
    const newProduct = new Product({ name, rack, expiry });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error('Error adding product:', error); // 👈 Add for debugging
    res.status(500).json({ error: "Error adding product" });
  }
});
// PUT route for update
app.put('/update-product/:id', async (req, res) => {
  const { name, rack, expiry } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { name, rack, expiry });
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE route for deletion
app.delete('/delete-product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Update weight by rack number
app.post('/update-weight', async (req, res) => {
  const { rack, weight } = req.body;
  try {
    await Product.updateMany({ rack }, { weight }); // or use findOne for a single product
    res.json({ message: "✅ Weight updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to update weight" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});