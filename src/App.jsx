import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Supabase client
import Pages from "./Pages"; // Pages component handling all routes

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
    return () => subscription?.unsubscribe();
  }, []);

  return (
    <Router>
      {/* Pass session and isLoading state to the Pages component */}
      <Pages session={session} isLoading={isLoading} />
    </Router>
  );
}

export default App;
