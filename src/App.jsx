import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Autorickshaw from "./pages/Autorickshaw"; // Existing page
import Addadr from "./pages/Addadr"; // For adding an Autorickshaw driver
import Auth from "./pages/Auth"; // Auth (login/signup) page
import Upload from "./pages/Upload"; // Upload component
import LandingPage from "./pages/LandingPage"; // New landing page component
import Support from "./pages/Support"; // New support page
import { supabase } from "./supabaseClient"; // Supabase client

// Protected Route Component
const ProtectedRoute = ({ element, session, isLoading }) => {
  // Show a loading screen while session is being determined
  if (isLoading) return <div>Loading...</div>;

  // Redirect to auth page if there's no session (user is not logged in)
  return session ? element : <Navigate to="/auth" replace />;
};

function App() {
  const [session, setSession] = useState(null); // State to track Supabase session
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  useEffect(() => {
    // Initial fetch of session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false); // Done loading
    });

    // Listen for changes in authentication state
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing Page ("/") */}
        <Route path="/" element={<LandingPage session={session} />} />

        {/* Logged-in Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={<Home />}
              session={session}
              isLoading={isLoading}
            />
          }
        />

        {/* Public Route: Auth (Login/Signup) */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Route: Autorickshaw */}
        <Route
          path="/autorickshaw"
          element={
            <ProtectedRoute
              element={<Autorickshaw />}
              session={session}
              isLoading={isLoading}
            />
          }
        />

        {/* Protected Route: Add Autorickshaw Driver */}
        <Route
          path="/addadr"
          element={
            <ProtectedRoute
              element={<Addadr />}
              session={session}
              isLoading={isLoading}
            />
          }
        />

        {/* Public Route: Upload Page */}
        <Route path="/upload" element={<Upload />} />

        {/* Public Route: Support Page */}
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}

export default App;
