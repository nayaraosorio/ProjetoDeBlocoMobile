// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ServicePage from './pages/ServicePage';
import Banner from './components/Banner';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <main>
          <Banner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
