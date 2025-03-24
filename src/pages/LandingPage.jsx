import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ session }) => {
  const navigate = useNavigate();

  // Redirect to Home if a session exists
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
    <div className="LDP-container">
      {/* Navbar */}
      <nav className="LDP-navbar flex justify-between items-center p-4">
        <div className="LDP-nav-title font-bold text-lg">Ente Gramam</div>
        <div className="LDP-nav-links">
          <button
            onClick={handleGetStarted}
            className="LDP-login-btn px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <header className="LDP-welcome bg-[#E7F5FE] py-16">
        <div className="LDP-glass-container max-w-3xl mx-auto p-8 bg-white/20 backdrop-blur-sm rounded-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Connecting our village together
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="LDP-main max-w-3xl mx-auto p-6 space-y-8">
        {/* Text Section */}
        <div className="LDP-text-section">
          <p className="text-gray-700">
            This web app is for the people of Edavannapara. Created by Sameem
            Kunnath. Discover local news, events, and a community that celebrates
            our traditions and heritage.
          </p>
        </div>

        {/* Button Group */}
        <div className="LDP-btn-group flex justify-center space-x-4">
          <button
            onClick={handleGetStarted}
            className="LDP-login-btn px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Login
          </button>
          <a
            href="#"
            className="LDP-about-btn px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            About Us
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="LDP-footer bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2023 Ente Gramam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
