import React from 'react';
import { Link } from 'react-router-dom';
import { FaFeather } from 'react-icons/fa';

const Homepage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light position-relative">

      {/* Top left logo */}
      <div className="position-absolute top-0 start-0 m-3">
        <div className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
          <FaFeather size={24} />
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        <h1 className="display-4 fw-bold">Welcome To NovaMind</h1>
        <p className="lead">Unleash your bright ideas in this note taking application</p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-dark me-2">Sign In</Link>
          <Link to="/register" className="btn btn-outline-dark">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;