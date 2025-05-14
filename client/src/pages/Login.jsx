import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow bg-white rounded" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Welcome Back</h3>
        <h6 className="text-center text-muted mb-4">Username</h6>
        <form>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="username@gmail.com" required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="password" required />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Sign In</button>
          <p className="text-danger mt-2 small text-end">Forgot your password?</p>
        </form>
        <p className="text-center mt-3 small">
          Don’t have an account yet? <Link to="/register" className="text-danger">Register here!!!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;