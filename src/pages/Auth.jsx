import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Make sure this points to your Supabase initialization file

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Supabase Login Logic
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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://your-production-domain.com/auth', // Update to your production domain
        },
      });

      if (error) {
        alert(`Signup error: $
{error.message}`);
      } else {
        alert(
          'Sign-up successful! Please check your email to confirm your account.'
        );
      }
    } catch (err) {
      alert(`Unexpected error during signup:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute w-80 h-80 bg-yellow-500 rounded-full opacity-30 top-[-4rem] left-[-4rem] blur-3xl"></div>
      <div className="absolute w-80 h-80 bg-pink-500 rounded-full opacity-30 top-[-4rem] right-[-4rem] blur-3xl"></div>
      <div className="absolute w-80 h-80 bg-blue-500 rounded-full opacity-30 bottom-[-4rem] left-[-4rem] blur-3xl"></div>

      {/* Glassmorphic Login Box */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg p-8 max-w-sm w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black">
            <span className="text-white text-2xl font-bold">EG</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-8">Welcome back</h2>

        {/* Social Login Buttons */}
        <div className="flex flex-col space-y-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-lg shadow hover:bg-gray-100 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-lg shadow hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 1024 1024"
              fill="currentColor"
            >
              <path
                d="M512 512c186.2 0 338-151.8 338-338S698.2 0 512 0 174 151.8 174 338s151.8 338 338 338zM512 1024c186.2 0 338-151.8 338-338 0-186.2-151.8-338-338-338s-338 151.8-338 338c0 186.2 151.8 338 338 338z"
              />
            </svg>
            Sign in with Apple
          </button>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-200 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-200 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            } transition`}
          >
            {loading ? 'Loading...' : 'Sign in to your account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account yet?{' '}
          <a
            href="#"
            onClick={handleSignUpSubmit}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
              
