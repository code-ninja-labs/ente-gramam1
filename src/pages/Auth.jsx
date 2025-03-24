import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { supabase } from "../supabaseClient"; // Supabase instance
import "./Auth.css"; // Import the CSS file

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  const navigate = useNavigate(); // React Router navigation

  // Handle Login or Signup Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error message

    if (isSignup) {
      // Sign Up Logic
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorMessage(`Signup failed: $
{error.message}`);
        } else {
          setErrorMessage(
            "Signup successful! Please check your email to confirm your account."
          );
        }
      } catch (err) {
        setErrorMessage(`Unexpected error:
${err.message}`);
      }
    } else {
      // Login Logic
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(`Login failed: $
{error.message}`);
        } else {
          navigate("/home"); // Redirect to Home on success
        }
      } catch (err) {
        setErrorMessage(`Unexpected error:
${err.message}`);
      }
    }

    setLoading(false); // Stop loading spinner
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
        <h2>{isSignup ? "Sign Up" : "Welcome Back"}</h2>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
            {loading ? <div className="ios-loader"></div> : isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                className="toggle-link"
                onClick={() => setIsSignup(false)}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                className="toggle-link"
                onClick={() => setIsSignup(true)}
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
            
