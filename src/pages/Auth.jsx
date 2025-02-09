import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css'; // CSS file

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (forgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://yourdomain.com/update-password',
        });
        if (error) alert(`Password reset error: $
{error.message}`);
        else alert('Password reset email sent! Check your email.');
      } else if (isSigningUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(`Sign-up error:
${error.message}`);
        else alert('Sign-up successful! Check your email for a magic link to confirm your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(`Login error: $
{error.message}`);
        else alert('Login successful!');
      }
    } catch (error) {
      alert(`Unexpected error:
${error.message}`);
    }

    setLoading(false);
  };

  const handleMagicLink = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: 'http://yourdomain.com/welcome' },
      });
      if (error) alert(`Magic link login error: $
{error.message}`);
      else alert('Magic link sent! Check your inbox to log in.');
    } catch (error) {
      alert(`Unexpected error:
${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">
        {forgotPassword
          ? 'Reset Password'
          : isSigningUp
          ? 'Sign Up'
          : 'Log In'}
      </h2>
      <form className="form" onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        
        {/* Show Password Field only in Sign-Up and Log-In Mode */}
        {!forgotPassword && (
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        )}

        <button type="submit" className="button" disabled={loading}>
          {loading
            ? 'Loading...'
            : forgotPassword
            ? 'Send Reset Email'
            : isSigningUp
            ? 'Sign Up'
            : 'Log In'}
        </button>
      </form>

      {!forgotPassword && (
        <button
          onClick={handleMagicLink}
          className="button magic-link"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      )}

      <button
        onClick={() => setForgotPassword(!forgotPassword)}
        className="button switch"
      >
        {forgotPassword
          ? 'Back to Log In'
          : 'Forgot Password?'}
      </button>

      {!forgotPassword && (
        <button
          onClick={() => setIsSigningUp(!isSigningUp)}
          className="button switch"
        >
          {isSigningUp
            ? 'Switch to Log In'
            : 'Switch to Sign Up'}
        </button>
      )}
    </div>
  );
};

export default Auth;
