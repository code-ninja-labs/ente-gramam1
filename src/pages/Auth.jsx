import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure Supabase is configured properly
import './Auth.css'; // Your CSS for styling

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between Login and Signup
  const [loading, setLoading] = useState(false);

  // Sign up using email and password
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Supabase Auth's signUp method
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(`Sign-up error: $
{error.message}`);
      } else {
        alert('Sign-up successful! Check your email to confirm.');
      }
    } catch (err) {
      alert(`Unexpected error during sign up:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Log in using email and password
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Supabase Auth's signInWithPassword method
      const { data, error } = await supabase.auth.signInWithPassword({
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
      alert(`Unexpected error during login:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">{isSigningUp ? 'Sign Up' : 'Log In'}</h2>

      <form
        className="form"
        onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}
      >
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Loading...' : isSigningUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      {/* Toggle Button: Switch Between Sign Up and Log In */}
      <button
        onClick={() => setIsSigningUp(!isSigningUp)}
        className="button switch"
      >
        {isSigningUp ? 'Switch to Log In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
