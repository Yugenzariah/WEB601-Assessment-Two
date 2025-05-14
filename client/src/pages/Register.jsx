import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow bg-white rounded" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Hi Welcome!</h3>
        <form>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" className="form-control" placeholder="your name here" required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="username@gmail.com" required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="password" required />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control" placeholder="confirm password" required />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Sign Up</button>
        </form>
        <p className="text-center mt-3 small">
          Already have an account? <Link to="/login" className="text-danger">Login here!!!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;