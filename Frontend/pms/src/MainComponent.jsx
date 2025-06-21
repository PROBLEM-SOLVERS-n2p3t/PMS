import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Howl } from 'howler';
import logo from './assets/logo.jpg'; // Ensure logo.jpg is in correct path

const MainComponent = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const sound = new Howl({
    src: ['/click-sound.mp3'], // File should be in /public
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: 'spring' },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const cards = [
    { title: "Product List", text: "View and manage all the available products sorted by expiry.", button: "View", class: "btn btn-primary", route: "/ProductList" },
    { title: "Add Product", text: "Add a new product with details like name, rack number, and expiry date.", button: "Go", class: "btn btn-success", route: "/AddProduct" },
    { title: "Edit Product", text: "Update product information like rack or expiry date.", button: "Edit", class: "btn btn-secondary", route: "/EditProduct" },
    { title: "Notifications", text: "Get alerts when racks are low on stock or nearing expiry.", button: "Check", class: "btn btn-warning", route: "/Notifications" },
    { title: "About Refrigerator", text: "To view the temperature of the refrigerator.", button: "View", class: "btn btn-info", route: "/AboutRefrigerator" },
    { title: "Settings", text: "Customize your dashboard preferences and notification options.", button: "Settings", class: "btn btn-dark", route: "/Settings" },
  ];

  const handleLogoClick = () => {
    sound.play();
    setShowModal(true);
  };

  // Generate floating circles
  const floatingCircles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      initial={{
        y: Math.random() * 100 + 100,
        x: Math.random() * 100 + '%',
        opacity: 0,
      }}
      animate={{
        y: -100,
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 5,
      }}
      style={{
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: '50%',
        zIndex: -1,
      }}
    />
  ));

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          background: 'linear-gradient(-45deg, #FFDEE9, #B5FFFC, #C9FFBF, #FDCBFF)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating particles */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        {floatingCircles}
      </div>

      {/* Logo */}
      <div
        onClick={handleLogoClick}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <img src={logo} alt="Team Logo" style={{ width: 60, borderRadius: '50%' }} />
      </div>

      {/* Heading */}
      <motion.h1
        className="text-center fw-bold text-danger text-decoration-underline mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typewriter
          options={{
            strings: ['Welcome to RESTOCK ALERT'],
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
      </motion.h1>

      <motion.p
        className="text-center fw-bold text-success text-decoration-underline mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        This is your smart inventory dashboard.
      </motion.p>

      {/* Cards */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cards.map((card, i) => (
            <motion.div
              className="col"
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <button onClick={() => navigate(card.route)} className={card.class}>
                    {card.button}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 10 }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white p-4 rounded shadow"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <h5 className="fw-bold text-center mb-3">Team Members</h5>
              <ul className="list-unstyled text-center">
                <li>P.Nattar Raj</li>
                <li>S. Praveen Kumar</li>
                <li>S. Thanisha</li>
              </ul>
              <div className="text-center mt-3">
                <button className="btn btn-outline-danger" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainComponent;