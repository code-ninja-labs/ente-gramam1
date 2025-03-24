import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from './Auth.module.css'; // Import the scoped CSS

const Auth = () => {
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error state
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const navigate = useNavigate(); // React router navigation hook

  // Handle form submission (for both login and signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear any previous error messages

    try {
      if (isSignup) {
        // Sign Up logic
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Signup successful! Please check your email to confirm your account.');
        }
      } else {
        // Login logic
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMessage(error.message);
        } else {
          navigate('/home'); // Redirect to home page on successful login
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop the spinner regardless of success or failure
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Decorative Background Circles */}
      <div className={`${styles.circle}${styles.circleYellow}`}></div>
      <div className={`${styles.circle}${styles.circlePink}`}></div>
      <div className={`${styles.circle}${styles.circleBlue}`}></div>

      {/* Main Auth Card */}
      <div className={styles.glassCard}>
        <div className={styles.logo}>EG</div>
        <h2 className={styles.header}>{isSignup ? 'Sign Up' : 'Welcome Back'}</h2>

        {/* Error message */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {/* Email Input */}
          <div className={styles.formGroup}>
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

          {/* Password Input */}
          <div className={styles.formGroup}>
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

          {/* Submit Button */}
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? <div className={styles.iosLoader}></div> : isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Footer with Signup/Login toggle */}
        <p className={styles.authFooter}>
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span className={styles.toggleLink} onClick={() => setIsSignup(false)}>
                Log in
              </span>
            </>
          ) : (
            <>
              Don’t have an account yet?{' '}
              <span className={styles.toggleLink} onClick={() => setIsSignup(true)}>
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
