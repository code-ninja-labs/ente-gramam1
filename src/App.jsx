import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Autorickshaw from './pages/Autorickshaw'; 
import Addadr from './pages/Addadr'; 
import Auth from './pages/Auth'; 
import Upload from './pages/Upload'; 
import { supabase } from './supabaseClient';
import AdComponent from './components/AdComponent'; // Import the AdComponent

// Protected Route Component
const ProtectedRoute = ({ element, session }) => session ? element : <Navigate to="/auth" replace />;

function App() {
  const [session, setSession] = useState(null); 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Place the ad component somewhere at the top or bottom of the page layout */}
        <AdComponent />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<Upload />} />

          {/* Protected Routes */}
          <Route
            path="/autorickshaw"
            element={<ProtectedRoute element={<Autorickshaw />} session={session} />}
          />
          <Route
            path="/addadr"
            element={<ProtectedRoute element={<Addadr />} session={session} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
