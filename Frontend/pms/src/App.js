import React, { useEffect, useState } from 'react';
import SplashScreen from './Splashscreen';
import MainComponent from './MainComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList'; // Create this file
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Notifications from './Notifications';
import AboutRefrigerator from './AboutRefrigerator';
import Settings from './Settings';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/EditProduct" element={<EditProduct />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/AboutRefrigerator" element={<AboutRefrigerator />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;