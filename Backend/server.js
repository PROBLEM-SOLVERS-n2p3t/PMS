const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/productsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

/* ---------------------------------
   Product Schema & Routes
--------------------------------- */
const ProductSchema = new mongoose.Schema({
  name: String,
  rack: String,
  expiry: String,
  weight: Number,
});
const Product = mongoose.model('Product', ProductSchema);

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find().sort({ expiry: 1 });
  res.json(products);
});

// Add product
app.post('/add-product', async (req, res) => {
  const { name, rack, expiry } = req.body;
  try {
    const newProduct = new Product({ name, rack, expiry });
    await newProduct.save();
    res.status(201).json({ message: "✅ Product added successfully" });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ error: "Error adding product" });
  }
});

app.get('/get-weight/:rack', async (req, res) => {
  const { rack } = req.params;

  try {
    // Simulate DB fetch or sensor data
    const weightData = await Product.findOne({ rack });
    if (!weightData) return res.status(404).json({ weight: null });

    res.json({ weight: weightData.weight });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching weight' });
  }
});

// Update product
app.put('/update-product/:id', async (req, res) => {
  const { name, rack, expiry } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { name, rack, expiry });
    res.json({ message: '✅ Product updated' });
  } catch (err) {
    res.status(500).json({ error: '❌ Update failed' });
  }
});

// Delete product
app.delete('/delete-product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Product deleted' });
  } catch (err) {
    res.status(500).json({ error: '❌ Delete failed' });
  }
});

// Update weight by rack number
app.post('/update-weight', async (req, res) => {
  const { rack, weight } = req.body;
  try {
    await Product.updateMany({ rack }, { weight });
    res.json({ message: "✅ Weight updated" });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to update weight" });
  }
});

// Get near expiry notifications
app.get('/notifications/expiry', async (req, res) => {
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

  try {
    const nearExpiryProducts = await Product.find({
      expiry: {
        $gte: today.toISOString().split('T')[0],
        $lte: threeDaysLater.toISOString().split('T')[0],
      }
    });
    res.json(nearExpiryProducts);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching near expiry products" });
  }
});

/* ---------------------------------
   Settings Schema & Routes
--------------------------------- */
const SettingsSchema = new mongoose.Schema({
  notifyExpiry: { type: Boolean, default: true },
  notifyStock: { type: Boolean, default: true },
  theme: { type: String, default: 'Light' },
});
const Setting = mongoose.model('Setting', SettingsSchema);

// Get settings
app.get('/settings', async (req, res) => {
  try {
    const settings = await Setting.findOne();
    res.json(settings);
  } catch (err) {
    console.error('❌ Error fetching settings:', err);
    res.status(500).json({ error: 'Error fetching settings' });
  }
});

// Save/update settings
app.post('/settings', async (req, res) => {
  const { notifyExpiry, notifyStock, theme } = req.body;
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting({ notifyExpiry, notifyStock, theme });
    } else {
      settings.notifyExpiry = notifyExpiry;
      settings.notifyStock = notifyStock;
      settings.theme = theme;
    }
    await settings.save();
    res.status(200).json({ message: '✅ Settings updated successfully' });
  } catch (error) {
    console.error('❌ Error saving settings:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});