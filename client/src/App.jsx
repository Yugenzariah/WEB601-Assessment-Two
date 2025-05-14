import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard (protected in future) */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;