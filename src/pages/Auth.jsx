import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css'; // CSS file

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // Stores the OTP entered by the user
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // True if waiting for OTP after email submission

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSigningUp) {
        // Initial Sign Up Step: Send OTP to email
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          alert(`Sign-up error: $
{error.message}`);
        } else {
          alert('Sign-up successful! Check your email for the verification code.');
          setOtpStep(true); // Switch to OTP form
        }
      } else {
        // Initial Log In Step: Send OTP to email
        const { error } = await supabase.auth.signInWithOtp({
          email,
        });
        if (error) {
          alert(`Login error:
${error.message}`);
        } else {
          alert('Login OTP sent! Check your email.');
          setOtpStep(true); // Switch to OTP form
        }
      }
    } catch (error) {
      alert(`Unexpected error: $
{error.message}`);
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email', // Verification type
      });
      if (error) {
        alert(`OTP verification error:
${error.message}`);
      } else {
        alert('Verification successful! You are now logged in.');
        console.log('User session:', data);
        // Optionally redirect or update UI after successful login
      }
    } catch (error) {
      alert(`Unexpected error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">
        {otpStep
          ? 'Enter Verification Code'
          : isSigningUp
          ? 'Sign Up'
          : 'Log In'}
      </h2>

      <form
        className="form"
        onSubmit={otpStep ? handleVerifyOtp : handleAuth} // Handle different steps
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
          disabled={otpStep} // Disable email input after the OTP step
        />

        {/* Show Password Field Only During Signup */}
        {!otpStep && isSigningUp && (
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        )}

        {/* OTP Input Field for Verification Step */}
        {otpStep && (
          <input
            type="text"
            placeholder="Enter the code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input"
            required
          />
        )}

        <button type="submit" className="button" disabled={loading}>
          {loading
            ? 'Loading...'
            : otpStep
            ? 'Verify Code'
            : isSigningUp
            ? 'Sign Up'
            : 'Send Login Code'}
        </button>
      </form>

      {!otpStep && (
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
