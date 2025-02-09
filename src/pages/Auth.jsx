import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css'; // CSS file

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(''); // Stores the OTP entered by the user
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // True if waiting for OTP after email submission

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up step: Create the user and send verification email (OTP)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            username, // Store additional user metadata in Supabase
          },
          phone, // Optional phone number (used for metadata only in this case)
        },
      });

      if (error) {
        alert(`Sign-up error: $
{error.message}`);
        setLoading(false);
        return;
      }

      alert(
        `Sign-up successful! We've sent a code to your email. Enter the code to verify your account.`
      );
      setOtpStep(true); // Switch to OTP verification form
    } catch (err) {
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
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
        alert('Login successful!');
        // Optionally redirect to your app's main page
      }
    } catch (err) {
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup', // Verifies the email specifically for sign-up
      });

      if (error) {
        alert(`OTP verification error: $
{error.message}`);
      } else {
        alert('Account verified successfully! You can now log in.');
        setOtpStep(false); // Go back to login
        setIsSigningUp(false); // Switch to login mode
      }
    } catch (err) {
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">{otpStep ? 'Verify Account' : isSigningUp ? 'Sign Up' : 'Log In'}</h2>

      <form
        className="form"
        onSubmit={!otpStep ? (isSigningUp ? handleSignUp : handleLogin) : handleVerifyOtp}
      >
        {/* Email Field */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
          disabled={otpStep}
        />

        {/* Password Field */}
        {!otpStep && (
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required={isSigningUp || !isSigningUp}
          />
        )}

        {/* Additional Fields for Sign-Up */}
        {isSigningUp && !otpStep && (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="Enter a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
            <input
              type="tel"
              placeholder="Optional: Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
          </>
        )}

        {/* OTP Verification Input */}
        {otpStep && (
          <input
            type="text"
            placeholder="Enter the code sent to your email"
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
            ? 'Verify Account'
            : isSigningUp
            ? 'Sign Up'
            : 'Log In'}
        </button>
      </form>

      {/* Switch Between Login and Sign-Up */}
      {!otpStep && (
        <button
          onClick={() => setIsSigningUp(!isSigningUp)}
          className="button switch"
        >
          {isSigningUp ? 'Switch to Log In' : 'Switch to Sign Up'}
        </button>
      )}
    </div>
  );
};

export default Auth;
          
