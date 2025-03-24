import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure your environment variables are properly set
import './Auth.css'; // Styles for the form

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between Login and Signup
  const [loading, setLoading] = useState(false);

  /**
   * Handle user signup
   */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call Supabase's sign up method
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://your-production-domain.com/auth', // Replace with your production domain
        },
      });

      if (error) {
        alert(`Sign-up error: $
{error.message}`);
      } else {
        alert('Sign-up successful! Please check your email to confirm your account.');
      }
    } catch (err) {
      alert(`Unexpected error during sign up:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user login
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call Supabase's sign-in method
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

      {/* Switch Between Sign Up and Log In */}
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
