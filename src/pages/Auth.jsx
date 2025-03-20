import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Supabase client import
import "./login.css"; // Use login.css for styling

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handle user signup
   */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://your-production-domain.com/auth", // Replace with your domain
        },
      });

      if (error) {
        alert(`Sign-up error: $
{error.message}`);
      } else {
        alert("Sign-up successful! Check your email to confirm your account.");
        window.location.href = "/"; // Redirect to home
      }
    } catch (err) {
      alert(`Unexpected error during sign-up:
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(`Login error: $
{error.message}`);
      } else {
        alert("Login successful! Welcome back.");
        window.location.href = "/"; // Redirect to home
      }
    } catch (err) {
      alert(`Unexpected error during login:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg flex items-center justify-center min-h-screen px-4 sm:px-6 relative">
      {/* Background Shapes */}
      <div className="login-shape login-shape-yellow w-40 h-40 sm:w-52 sm:h-52 opacity-80 top-8 left-10 lg:w-64 lg:h-64 lg:top-12 lg:left-16" />
      <div className="login-shape login-shape-pink w-36 h-36 sm:w-44 sm:h-44 opacity-80 top-16 right-12 lg:w-56 lg:h-56 lg:top-28 lg:right-24" />
      <div className="login-shape login-shape-blue w-32 h-32 sm:w-40 sm:h-40 opacity-70 bottom-6 left-6 lg:w-48 lg:h-48 lg:bottom-12 lg:left-12" />

      {/* Login/Signup Card */}
      <div className="login-glass rounded-lg shadow-lg w-full max-w-md p-8 relative z-10">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://i.imgur.com/NHGkS76.png"
            alt="Logo"
            className="h-16 w-16 rounded-[15px]"
          />
        </div>

        {/* Form Title */}
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          {isSigningUp ? "Create your account" : "Welcome back"}
        </h2>

        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          <button
            className="login-social-btn"
            disabled={loading} // Prevent clicking while loading
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="h-5 w-5 mr-3"
            />
            Sign in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="login-divider mb-6" />

        {/* Flexible Form */}
        <form
          onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}
          className="login-form"
        >
          {/* Email Input */}
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="login-form-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-form-input"
              required
            />
          </div>

          {/* Form Button */}
          <button
            type="submit"
            className="login-btn-gradient"
            disabled={loading}
          >
            {loading ? "Loading..." : isSigningUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* Switch Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="login-btn-secondary"
          >
            {isSigningUp
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
              
