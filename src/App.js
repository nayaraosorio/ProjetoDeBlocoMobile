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
import MembersPage from './pages/MembersPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <main>
          <Banner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductPage />} />
            {/* Rotas protegidas */}
            <Route path="/members" element={<ProtectedRoute element={<MembersPage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/account" element={<ProtectedRoute element={<AccountPage />} />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
