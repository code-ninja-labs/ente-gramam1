import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure Supabase is already initialized

import './Auth.css'; // Link the CSS file here

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(`Login error: $
{error.message}`);
      } else {
        alert('Login successful! Welcome back.');
      }
    } catch (err) {
      console.error(err.message);
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background Circles */}
      <div className="circle yellow"></div>
      <div className="circle pink"></div>
      <div className="circle blue"></div>

      {/* Glassmorphic Form */}
      <div className="glass-card">
        <div className="logo">
          <span>EG</span>
        </div>
        <h2>Welcome back</h2>

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="footer">
          Don’t have an account yet?{' '}
          <a href="#" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
