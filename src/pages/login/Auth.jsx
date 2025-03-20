import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

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
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://i.imgur.com/NHGkS76.png"
            alt="Logo"
            className="h-16 w-16 rounded-[15px]"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-white mb-8">
          {isSigningUp ? "Create your account" : "Welcome back"}
        </h2>

        <div className="space-y-3 mb-6">
          <button className="login-social-btn" disabled={loading}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="h-5 w-5 mr-3"
            />
            Sign in with Google
          </button>
        </div>

        <div className="login-divider mb-6" />

        <form
          onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}
          className="login-form"
        >
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

          <button
            type="submit"
            className="login-btn-gradient"
            disabled={loading}
          >
            {loading ? "Loading..." : isSigningUp ? "Sign Up" : "Log In"}
          </button>
        </form>

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

      {/* Inline Styles */}
      <style jsx>{`
        /* Glass Effect */
        .login-glass {
          backdrop-filter: blur(12.5px);
          background-color: rgba(255, 255, 255, 0.15);
        }

        /* Background Shape Styles */
        .login-shape {
          position: absolute;
          border-radius: 40%;
        }
        .login-shape-pink {
          background: linear-gradient(135deg, rgba(255, 102, 204, 1), rgba(255, 0, 128, 1));
        }
        .login-shape-yellow {
          background: linear-gradient(135deg, rgba(255, 235, 102, 1), rgba(255, 165, 0, 1));
        }
        .login-shape-blue {
          background: linear-gradient(135deg, rgba(0, 204, 255, 1), rgba(0, 128, 255, 1));
        }

        /* Social Button */
        .login-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: #333;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-weight: bold;
          width: 100%;
          transition: background-color 0.2s;
        }
        .login-social-btn:hover {
          background-color: #f7f7f7;
        }

        /* Divider */
        .login-divider {
          border-top: 1px solid #4b5563;
        }

        /* Form Fields */
        .login-form-group {
          margin-bottom: 1rem;
        }
        .login-form-label {
          display: block;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
        .login-form-input {
          width: 100%;
          background-color: rgba(55, 65, 81, 0.6);
          padding: 0.5rem;
          color: white;
          border: 1px solid #4b5563;
          border-radius: 6px;
        }

        /* Buttons */
        .login-btn-gradient {
          background: linear-gradient(to right, #22c55e, #3b82f6);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: bold;
          width: 100%;
          transition: background 0.3s;
        }
        .login-btn-gradient:hover {
          background: linear-gradient(to right, #16a34a, #2563eb);
        }

        .login-btn-secondary {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Auth;
