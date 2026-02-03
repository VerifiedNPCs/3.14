// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  // Handle Dark Mode logic
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Page - Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard - User Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
