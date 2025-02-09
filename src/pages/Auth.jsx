import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css'; // CSS file

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState(''); // Stores OTP entered by the user
  const [phone, setPhone] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // Switch between form and OTP step
  const [loading, setLoading] = useState(false);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Send Signup OTP
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            username,
          },
          phone, // Optionally save phone as metadata
        },
      });
      if (error) {
        alert(`Error: $
{error.message}`);
      } else {
        alert('Sign-up successful! Check your email for the verification code.');
        setOtpStep(true); // Switch to OTP step
      }
    } catch (err) {
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Send Login OTP
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        alert(`Error: $
{error.message}`);
      } else {
        alert('Login OTP sent! Check your email.');
        setOtpStep(true); // Switch to OTP step
      }
    } catch (err) {
      alert(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 2: Verify OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp, // The OTP entered by the user
        type: isSigningUp ? 'signup' : 'magiclink', // Specify the type of verification
      });

      if (error) {
        alert(`OTP verification error: $
{error.message}`);
      } else {
        alert('Account verified successfully!');
        setOtpStep(false); // Reset the view
        setIsSigningUp(false); // Return to login mode
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
        onSubmit={otpStep ? handleOtpVerify : isSigningUp ? handleSignupSubmit : handleLoginSubmit}
      >
        {/* Email Field */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
          disabled={otpStep} // Disable email input during the OTP step
        />

        {/* Password Field */}
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

        {/* Additional Fields for Sign-Up */}
        {!otpStep && isSigningUp && (
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

        {/* OTP Field for Verification Step */}
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
        
