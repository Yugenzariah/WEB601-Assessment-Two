import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await registerUser({ fullName: formData.fullName, email: formData.email, password: formData.password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow bg-white rounded" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Hi Welcome!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" name="fullName" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Sign Up</button>
          {message && <p className="text-center mt-3 text-danger small">{message}</p>}
        </form>
        <p className="text-center mt-3 small">
          Already have an account? <Link to="/login" className="text-danger">Login here!!!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;