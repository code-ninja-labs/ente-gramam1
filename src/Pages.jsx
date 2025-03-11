import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home"; 
import Autorickshaw from "./pages/Autorickshaw"; 
import Addadr from "./pages/Addadr"; 
import Auth from "./pages/Auth"; 
import Upload from "./pages/Upload"; 
import LandingPage from "./pages/LandingPage"; 
import Support from "./pages/Support"; 

// Protected Route Component
const ProtectedRoute = ({ element, session, isLoading }) => {
  if (isLoading) return <div>Loading...</div>; 
  return session ? element : <Navigate to="/auth" replace />;
};

// Pages Component
const Pages = ({ session, isLoading }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? <Navigate to="/home" replace /> : <LandingPage />
        }
      />
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
      <Route path="/auth" element={<Auth />} />
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
      <Route path="/upload" element={<Upload />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
};

export default Pages;
