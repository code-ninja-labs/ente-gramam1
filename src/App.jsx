// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Autorickshaw from "./pages/Autorickshaw"; // Existing page
import Addadr from "./pages/Addadr"; // For adding an Autorickshaw driver
import Auth from "./pages/Auth"; // Auth (login/signup) page
import Upload from "./pages/Upload"; // Upload component
import LandingPage from "./pages/LandingPage"; // New landing page component
import { supabase } from "./supabaseClient"; // Supabase client

// Protected Route Component
const ProtectedRoute = ({ element, session }) => {
  // If session exists then show the requested element; if not, redirect to the Auth page.
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
        {/* New Landing Page ("/") */}
        <Route path="/" element={<LandingPage session={session} />} />

        {/* Route for logged-in Home. You can also make Home public if needed */}
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} session={session} />}
        />

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
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
