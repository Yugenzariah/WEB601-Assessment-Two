// Main application wrapper. Sets up routes and dark mode provider.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

const App = () => {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {/* Dashboard page (main app view) */}
          <Route path="/" element={<Dashboard />} />
          {/* Auth page (login/register) */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;