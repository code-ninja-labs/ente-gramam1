import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setErrorMessage(error.message);
        else setErrorMessage('Signup successful! Please check your email to confirm your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setErrorMessage(error.message);
        else navigate('/home');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.gradientOverlay}></div>
      <div style={styles.yellowBlob}></div>
      <div style={styles.pinkBlob}></div>
      <div style={styles.blueBlob}></div>

      {/* Glassmorphism Card */}
      <div style={styles.card}>
        <div style={styles.logo}>EG</div>
        <h2 style={styles.header}>{isSignup ? 'Sign Up' : 'Welcome Back'}</h2>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              onFocus={(e) => e.target.style.border = '1px solid #4caf50'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              onFocus={(e) => e.target.style.border = '1px solid #4caf50'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              required
            />
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? <div style={styles.spinner}></div> : isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span style={styles.link} onClick={() => setIsSignup(false)}>Log in</span>
            </>
          ) : (
            <>
              Don’t have an account yet?{' '}
              <span style={styles.link} onClick={() => setIsSignup(true)}>Sign up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #090979, #00d4ff)',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  yellowBlob: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'rgba(255, 235, 59, 0.4)',
    borderRadius: '50%',
    top: '-50px',
    left: '-70px',
    filter: 'blur(70px)',
    zIndex: 1,
  },
  pinkBlob: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'rgba(255, 64, 129, 0.4)',
    borderRadius: '50%',
    top: '-60px',
    right: '-60px',
    filter: 'blur(70px)',
    zIndex: 1,
  },
  blueBlob: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'rgba(63, 81, 181, 0.4)',
    borderRadius: '50%',
    bottom: '-80px',
    left: '-60px',
    filter: 'blur(70px)',
    zIndex: 1,
  },
  card: {
    position: 'relative',
    zIndex: 2,
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
  },
  logo: {
    width: '60px',
    height: '60px',
    background: '#000',
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: '700',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    margin: '0 auto 20px',
  },
  header: {
    fontSize: '1.8rem',
    color: '#fff',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  form: {
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    color: '#fff',
    fontSize: '0.9rem',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #32ccbc, #90f7ec)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  footer: {
    marginTop: '20px',
    fontSize: '0.85rem',
    color: '#ddd',
  },
  link: {
    color: '#4caf50',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Auth;
    
