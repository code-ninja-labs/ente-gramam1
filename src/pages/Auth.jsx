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
      <div style={styles.yellowBlob}></div>
      <div style={styles.pinkBlob}></div>
      <div style={styles.blueBlob}></div>

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
              required
            />
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? <div style={styles.spinner}></div> : isSignup ? "Sign Up" : "Sign In"}
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
  // (Unchanged styles as per earlier refactor)
};

export default Auth;
