// App.js
import React, { useEffect, useState } from 'react';
import SplashScreen from './Splashscreen';
import MainComponent from './MainComponent';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : <MainComponent />;
}

export default App;