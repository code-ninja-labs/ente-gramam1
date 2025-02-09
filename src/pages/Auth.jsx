import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Make sure this works properly
import './Auth.css'; // Keep this for CSS styling

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles user sign-up submission.
   */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if email is already registered
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        alert('This email is already registered. Please use a different email or log in.');
        setIsSigningUp(false); // Switch back to login form
        return;
      } else if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 specifically handles 'row not found' (user not existing), which is expected
        throw checkError;
      }

      // Proceed with sign up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            username,
            phone: phone || null, // Save phone optionally, if provided
          },
        },
      });

      if (error) {
        alert(`Error:
${error.message}`);
      } else {
        alert('Sign-up successful! Please check your email for the verification link.');
      }
    } catch (err) {
      alert(`Unexpected error: $
{err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user login submission.
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if the user exists before logging in
      const { data: userExists, error: checkError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .eq('password', password) // Ensure it checks valid credentials
        .single();

      if (checkError?.code === 'PGRST116' || !userExists) {
        alert('The email and password do not match any account. Please sign up.');
        setIsSigningUp(true); // Switch to signup mode
        return;
      }

      // Proceed with login
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert(`Error during login:
${error.message}`);
      } else {
        alert('Login successful! Welcome back.');
      }
    } catch (err) {
      alert(`Unexpected error: ${err.message}`);
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
        {/* Email Field */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        {/* Additional Fields for Sign-Up */}
        {isSigningUp && (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="Enter a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
            <input
              type="tel"
              placeholder="Optional: Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
          </>
        )}

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Loading...' : isSigningUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      {/* Switch Between Login and Sign-Up */}
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
