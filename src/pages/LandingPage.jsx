// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ session }) => {
  const navigate = useNavigate();

  // If a user session exists, redirect to the Home page
  useEffect(() => {
    if (session) {
      navigate("/home", { replace: true });
    }
  }, [session, navigate]);

  // Handle "Get Started" click to go to the auth (login/signup) page
  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div>
      <h1>Ente Gramam</h1>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default LandingPage;
