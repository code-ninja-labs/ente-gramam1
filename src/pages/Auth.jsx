import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setErrorMessage(error.message);
        else
          setErrorMessage(
            "Signup successful! Please check your email to confirm your account."
          );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) setErrorMessage(error.message);
        else navigate("/home");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.yellowBlob}></div>
      <div style={styles.pinkBlob}></div>
      <div style={styles.blueBlob}></div>

      {/* Glassmorphic Card */}
      <div style={styles.card}>
        <div style={styles.logo}>EG</div>
        <h2 style={styles.header}>{isSignup ? "Sign Up" : "Welcome Back"}</h2>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              onFocus={(e) => (e.target.style.border = "1px solid #4caf50")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255, 255, 255, 0.3)")
              }
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              onFocus={(e) => (e.target.style.border = "1px solid #4caf50")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255, 255, 255, 0.3)")
              }
              required
            />
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? (
              <div style={styles.spinner}></div>
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p style={styles.footer}>
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => setIsSignup(false)}>
                Log in
              </span>
            </>
          ) : (
            <>
              Don’t have an account yet?{" "}
              <span style={styles.link} onClick={() => setIsSignup(true)}>
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, rgba(9, 9, 121, 1) 0%, rgba(0, 212, 255, 1) 100%)",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: "0 20px",
  },
  yellowBlob: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "rgba(255, 235, 59, 0.6)",
    borderRadius: "50%",
    top: "-200px",
    left: "-300px",
    filter: "blur(100px)",
    zIndex: 1,
  },
  pinkBlob: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(255, 64, 129, 0.6)",
    borderRadius: "50%",
    bottom: "-200px",
    left: "35%",
    filter: "blur(100px)",
    zIndex: 1,
  },
  blueBlob: {
    position: "absolute",
    width: "700px",
    height: "700px",
    background: "rgba(63, 81, 181, 0.6)",
    borderRadius: "50%",
    bottom: "-250px",
    right: "-300px",
    filter: "blur(150px)",
    zIndex: 1,
  },
  card: {
    position: "relative",
    zIndex: 2,
    backdropFilter: "blur(20px)",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "16px",
    padding: "40px 20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
  },
  logo: {
    width: "60px",
    height: "60px",
    background: "#000",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 20px",
  },
  header: {
    fontSize: "1.8rem",
    color: "#fff",
    margin: "20px 0",
  },
  errorMessage: {
    color: "#ff6b6b",
    fontSize: "0.9rem",
    marginBottom: "15px",
  },
  form: {
    textAlign: "left",
    marginTop: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    color: "#ddd",
    fontSize: "0.85rem",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "6px",
    background: "rgba(0, 0, 0, 0.2)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #32ccbc, #90f7ec)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
  footer: {
    marginTop: "20px",
    fontSize: "0.85rem",
    color: "#ddd",
  },
  link: {
    color: "#4caf50",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Auth;
      
