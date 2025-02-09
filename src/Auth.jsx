import { supabase } from './supabaseClient';
import { useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between signup and login modes
  const [loading, setLoading] = useState(false);

  // Handle Sign Up
  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Account created successfully! Please check your email for a confirmation link.');
    }

    setLoading(false);
  };

  // Handle Login
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Welcome back!');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>{isSigningUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={isSigningUp ? handleSignup : handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSigningUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <p>
        {isSigningUp
          ? 'Already have an account? '
          : "Don't have an account? "}
        <button onClick={() => setIsSigningUp(!isSigningUp)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'blue' }}>
          {isSigningUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
