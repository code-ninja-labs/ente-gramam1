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

  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    padding: '1.5rem',
    textAlign: 'center',
    margin: 'auto',
    zIndex: 1,
  };

  const circleStyle = {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(50px)',
    opacity: 0.3,
  };

  const yellowCircleStyle = {
    ...circleStyle,
    width: '300px',
    height: '300px',
    background: 'yellow',
    top: '-50px',
    left: '-70px',
  };

  const pinkCircleStyle = {
    ...circleStyle,
    width: '300px',
    height: '300px',
    background: 'pink',
    top: '-60px',
    right: '-60px',
  };

  const blueCircleStyle = {
    ...circleStyle,
    width: '300px',
    height: '300px',
    background: 'blue',
    bottom: '-80px',
    left: '-60px',
  };

  const cardStyle = {
    position: 'relative',
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '2rem',
    zIndex: 2,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  };

  const logoStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: 'black',
    margin: '0 auto 1.5rem',
    borderRadius: '50%',
    fontSize: '1.7rem',
    fontWeight: 700,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headerStyle = {
    fontSize: '1.8rem',
    color: 'white',
    marginBottom: '2rem',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  };

  const formStyle = {
    textAlign: 'left',
  };

  const formGroupStyle = {
    marginBottom: '1rem',
  };

  const labelStyle = {
    color: '#ccc',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.7rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#4caf50',
    background: 'rgba(255, 255, 255, 0.25)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.7rem 1rem',
    color: 'white',
    fontSize: '1rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #32ccbc, #90f7ec)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    opacity: 0.9,
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const footerStyle = {
    marginTop: '1.5rem',
    fontSize: '0.85rem',
    color: '#bbb',
  };

  const linkStyle = {
    color: '#4caf50',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const spinnerStyle = {
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={containerStyle}>
      <div style={yellowCircleStyle}></div>
      <div style={pinkCircleStyle}></div>
      <div style={blueCircleStyle}></div>

      <div style={cardStyle}>
        <div style={logoStyle}>EG</div>
        <h2 style={headerStyle}>{isSignup ? 'Sign Up' : 'Welcome Back'}</h2>

        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            style={loading ? buttonDisabledStyle : buttonStyle}
            disabled={loading}
          >
            {loading ? <div style={spinnerStyle}></div> : isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p style={footerStyle}>
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span style={linkStyle} onClick={() => setIsSignup(false)}>Log in</span>
            </>
          ) : (
            <>
              Don’t have an account yet?{' '}
              <span style={linkStyle} onClick={() => setIsSignup(true)}>Sign up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
  
