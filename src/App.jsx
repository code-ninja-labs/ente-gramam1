import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Autorickshaw from './pages/Autorickshaw'; // Existing page
import Addadr from './pages/Addadr'; // Single import for Add Autorickshaw Driver
import Auth from './pages/Auth'; // Auth page for login/signup
import Upload from './pages/Upload'; // Import the Upload component
import { supabase } from './supabaseClient'; // Import Supabase client

// Protected Route Component
const ProtectedRoute = ({ element, session }) => {
  // Redirect if no session (not logged in)
  return session ? element : <Navigate to="/auth" replace />;
};

function App() {
  const [session, setSession] = useState(null); // State to track Supabase session

  useEffect(() => {
    // Get session on initial app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state (login/logout)
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup listener on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route: Home */}
        <Route path="/" element={<Home />} />

        {/* Public Route: Auth (Login/Signup) */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Route: Autorickshaw */}
        <Route
          path="/autorickshaw"
          element={<ProtectedRoute element={<Autorickshaw />} session={session} />}
        />

        {/* Protected Route: Add Autorickshaw Driver */}
        <Route
          path="/addadr"
          element={<ProtectedRoute element={<Addadr />} session={session} />}
        />
        
        {/* Public Route: Upload Page */}
        <Route path="/upload" element={<Upload />} /> {/* New Upload route */}
      </Routes>
    </Router>
  );
}

export default App;
