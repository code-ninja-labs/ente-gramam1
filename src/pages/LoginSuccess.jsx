import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Adjust path as needed

const LoginSuccess = () => {
  const [message, setMessage] = useState('Validating your login...');

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Validate the session when the user arrives at this page
        const { data: session, error } = await supabase.auth.getSession();

        if (error || !session?.session) {
          setMessage('Login confirmation failed. Please try logging in again.');
        } else {
          setMessage('Login successful! Welcome back!');
        }
      } catch (err) {
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    validateLogin();
  }, []);

  return (
    <div className="container">
      <h2>{message}</h2>
      <p>You can now start using our application.</p>
    </div>
  );
};

export default LoginSuccess;
