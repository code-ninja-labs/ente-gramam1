import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: 'https://your-production-domain.com/auth' },
      });
      if (error) {
        alert(`Sign-up error: $
{error.message}`);
      } else {
        alert('Sign-up successful! Check your email for confirmation.');
      }
    } catch (err) {
      alert(`Unexpected error during sign-up:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-indigo-500">
      <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isSigningUp ? 'Sign Up' : 'Log In'}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/70 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-white/70 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-md text-white font-semibold bg-purple-600 hover:bg-purple-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Loading...' : isSigningUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <button
          onClick={() => setIsSigningUp(!isSigningUp)}
          className="text-center w-full mt-4 py-2 border border-dashed border-gray-300 text-white hover:bg-gray-200 hover:text-black transition"
        >
          {isSigningUp ? 'Switch to Log In' : 'Switch to Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
