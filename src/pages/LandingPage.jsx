import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import scoped CSS for additional custom styles

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
    <div className="landing-page-container bg-[#E7F5FE] min-h-screen w-full font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white font-bold rounded-lg">
            E
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Ente Gramam</h1>
        </div>

        {/* Nav Links */}
        <nav className="flex space-x-8 text-gray-700">
          <a href="#how" className="hover:text-gray-900">
            How It Works
          </a>
          <a href="#use-case" className="hover:text-gray-900">
            Features
          </a>
          <a href="#company" className="hover:text-gray-900">
            About Us
          </a>
        </nav>

        {/* Get Started Button (Login/Signup) */}
        <button
          onClick={handleGetStarted}
          className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start p-6 lg:space-x-12">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-xl text-green-600 uppercase font-semibold">
            Welcome to Ente Gramam
          </h2>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Experience the beauty of our village
          </h1>
          <p className="text-gray-600">
            Join us in discovering and preserving the heritage, culture, and
            scenic beauty of our village, connecting landowners and communities.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            Get Started
          </button>
        </div>

        {/* Right Illustration */}
        <div className="lg:w-1/2">
          <img
            src="/illustration.png" // Provide the correct path to your illustration
            alt="Village Landscape"
            className="w-full"
          />
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 pb-4">
          Explore the Features
        </h2>
        <p className="text-gray-600 pb-6">
          Discover what Ente Gramam has to offer.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Cultural Heritage
            </h3>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Scenic Locations
            </h3>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Landowner Opportunities
            </h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2023 Ente Gramam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
