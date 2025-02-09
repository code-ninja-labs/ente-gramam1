import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from './Auth.module.css'; // Importing CSS module

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSigningUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(`Sign-up error: $
{error.message}`);
      else alert('Sign-up successful! Check your email.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(`Login error:
${error.message}`);
      else alert('Login successful!');
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isSigningUp ? 'Sign Up' : 'Log In'}</h2>
      <form className={styles.form} onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Loading...' : isSigningUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <button
        onClick={() => setIsSigningUp(!isSigningUp)}
        className={`${styles.button}${styles.switch}`}
      >
        {isSigningUp ? 'Switch to Log In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
