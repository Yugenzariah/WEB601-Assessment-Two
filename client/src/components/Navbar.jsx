import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <a className="navbar-brand" href="/">Note Taking App</a>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;