import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { supabase } from "../supabaseClient"; // Ensure this is correctly set up
import "./Auth.css"; // Import the CSS file

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigation

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
        alert("Login successful! Redirecting to Home...");
        navigate("/home"); // Redirect to Home.jsx after a successful login
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="auth-container">
      {/* Background Circles */}
      <div className="circle yellow"></div>
      <div className="circle pink"></div>
      <div className="circle blue"></div>

      {/* Glassmorphic Card */}
      <div className="glass-card">
        <div className="logo">
          <span>EG</span>
        </div>
        <h2>Welcome Back</h2>

        <form onSubmit={handleLoginSubmit} className="auth-form">
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <div className="ios-loader"></div> : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account yet?{" "}
          <a href="#" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
