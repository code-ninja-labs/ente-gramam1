import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Autorickshaw from './pages/Autorickshaw'; // Import the new component
import Auth from './pages/Auth'; // Import the Auth component
import { supabase } from './supabaseClient'; // Import Supabase client

// Protected Route Component
const ProtectedRoute = ({ element, session }) => {
  return session ? element : <Navigate to="/auth" replace />;
};

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Retrieve the current session from Supabase on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes to authentication state
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route: Home */}
        <Route path="/" element={<Home />} />

        {/* Public Route: Login/Signup */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Route: Autorickshaw */}
        <Route
          path="/autorickshaw"
          element={<ProtectedRoute element={<Autorickshaw />} session={session} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
    
