import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle user signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://your-production-domain.com/auth",
        },
      });

      if (error) {
        alert(`Sign-up error: $
{error.message}`);
      } else {
        alert("Sign-up successful! Check your email to confirm your account.");
        window.location.href = "/";
      }
    } catch (err) {
      alert(`Unexpected error during sign-up:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle user login
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
        window.location.href = "/";
      }
    } catch (err) {
      alert(`Unexpected error during login:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-bg flex items-center justify-center min-h-screen px-4 sm:px-6 relative"
      style={styles.wrapper}
    >
      {/* Background Shapes */}
      <div
        style={styles.shapeYellow}
        className="login-shape login-shape-yellow"
      />
      <div
        style={styles.shapePink}
        className="login-shape login-shape-pink"
      />
      <div
        style={styles.shapeBlue}
        className="login-shape login-shape-blue"
      />

      {/* Login/Signup card */}
      <div style={styles.glassEffect}>
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://i.imgur.com/NHGkS76.png"
            alt="Logo"
            style={styles.logo}
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-white mb-8">
          {isSigningUp ? "Create your account" : "Welcome back"}
        </h2>

        <div style={styles.socialButtonContainer}>
          <button
            style={styles.socialButton}
            disabled={loading}
            className="login-social-btn"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              style={styles.socialButtonIcon}
            />
            Sign in with Google
          </button>
        </div>

        <form
          onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}
          style={styles.form}
        >
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Loading..." : isSigningUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div style={styles.textCenter}>
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            style={styles.secondaryButton}
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

const styles = {
  // Wrapper styles
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    position: "relative",
    background: "#1a202c",
  },

  // Background shapes
  shapeYellow: {
    position: "absolute",
    background:
      "linear-gradient(135deg, rgba(255,235,102,1), rgba(255,165,0,1))",
    borderRadius: "40%",
    width: "160px",
    height: "160px",
    top: "32px",
    left: "40px",
  },
  shapePink: {
    position: "absolute",
    background:
      "linear-gradient(135deg, rgba(255,102,204,1), rgba(255,0,128,1))",
    borderRadius: "40%",
    width: "144px",
    height: "144px",
    top: "64px",
    right: "48px",
  },
  shapeBlue: {
    position: "absolute",
    background:
      "linear-gradient(135deg, rgba(0,204,255,1), rgba(0,128,255,1))",
    borderRadius: "40%",
    width: "128px",
    height: "128px",
    bottom: "24px",
    left: "24px",
  },

  // Glass effect container
  glassEffect: {
    backdropFilter: "blur(12.5px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "32px",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "100%",
    position: "relative",
    zIndex: 10,
  },

  // Logo
  logo: {
    height: "64px",
    width: "64px",
    borderRadius: "15px",
  },

  // Form
  form: {
    marginTop: "16px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  formLabel: {
    display: "block",
    marginBottom: "8px",
    color: "#d1d5db",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #4b5563",
    backgroundColor: "rgba(55,65,81,0.6)",
    color: "#fff",
  },
  submitButton: {
    background:
      "linear-gradient(to right, #22c55e, #3b82f6)",
    color: "#fff",
    border: "none",
    padding: "12px",
    width: "100%",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "16px",
  },

  // Text
  textCenter: {
    textAlign: "center",
    marginTop: "16px",
  },
  secondaryButton: {
    color: "#3b82f6",
    background: "transparent",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
  },

  // Social button
  socialButtonContainer: {
    marginBottom: "24px",
    textAlign: "center",
  },
  socialButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "12px",
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
  },
  socialButtonIcon: {
    marginRight: "8px",
    width: "20px",
    height: "20px",
  },
};

export default Auth;
      
