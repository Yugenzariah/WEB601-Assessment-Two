import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow bg-white rounded" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Sign In</button>
          {message && <p className="text-center mt-3 text-danger small">{message}</p>}
        </form>
        <p className="text-danger mt-2 small text-end">Forgot your password?</p>
        <p className="text-center mt-3 small">
          Don’t have an account yet? <Link to="/register" className="text-danger">Register here!!!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;