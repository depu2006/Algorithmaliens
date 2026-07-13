import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CyberBackground from '../components/CyberBackground';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Dynamic Cybernetic Background */}
      <CyberBackground />

      {/* Header / Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow-1" style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default MainLayout;

