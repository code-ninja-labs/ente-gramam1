import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Supabase client for auth
import './Auth.css'; // CSS for styling

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between Sign Up and Log In
  const [loading, setLoading] = useState(false);

  // Handle Sign-Up
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/auth', // Add redirect URL for email confirmation
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

  // Handle Login
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
      alert(`Unexpected error during login:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">{isSigningUp ? 'Sign Up' : 'Log In'}</h2>

      {/* Auth Form */}
      <form
        className="form"
        onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
        
