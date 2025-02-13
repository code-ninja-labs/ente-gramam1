import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'; // Home page (public)
import Autorickshaw from './pages/Autorickshaw'; // Protected route for Autorickshaw
import Addadr from './pages/Addadr'; // Protected route for Adding Autorickshaw Driver
import Auth from './pages/Auth'; // Public route for login/signup
import { supabase } from './supabaseClient'; // Import Supabase client for authentication

// Protected Route Component
const ProtectedRoute = ({ element, session }) => {
  // If no session, redirect user to "/auth"
  return session ? element : <Navigate to="/auth" replace />;
};

function App() {
  const [session, setSession] = useState(null); // State to track Supabase session

  useEffect(() => {
    // Fetch session on initial app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state (e.g., login or logout)
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the subscription listener when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route: Home */}
        <Route path="/" element={<Home />} />

        {/* Public Route: Auth (Login/Signup) */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Route: Autorickshaw Page */}
        <Route
          path="/autorickshaw"
          element={<ProtectedRoute element={<Autorickshaw />} session={session} />}
        />

        {/* Protected Route: Add Autorickshaw Driver Page */}
        <Route
          path="/addadr"
          element={<ProtectedRoute element={<Addadr />} session={session} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
