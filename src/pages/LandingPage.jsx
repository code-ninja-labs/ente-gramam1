import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ session }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/home", { replace: true });
    }
  }, [session, navigate]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <>
      {/* Global Reset Styling */}
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
          }
          #root {
            width: 100%;
            height: 100%;
          }
        `}
      </style>

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          fontFamily: "'Arial', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", // Clips overflowing elements
        }}
      >
        {/* Background Gradient Blobs */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-100px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, #ffdd55, #ff6644)",
            filter: "blur(100px)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-120px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, #66ccff, #7755ee)",
            filter: "blur(150px)",
            zIndex: 1,
          }}
        />

        {/* Glassmorphic Section */}
        <div
          style={{
            zIndex: 2,
            backdropFilter: "blur(20px)", // Creates the glass effect
            background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "15px",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)", // Subtle shadow
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Welcome to Ente Gramam
          </h1>
          <p style={{ fontSize: "1rem", color: "#ddd", marginBottom: "24px" }}>
            Connecting Villagers Together
          </p>

          <button
            onClick={handleGetStarted}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              backgroundColor: "#38A169",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Login
          </button>
          <button
            onClick={() => alert("Sign Up Clicked")}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <footer
          style={{
            position: "absolute",
            bottom: "10px",
            textAlign: "center",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <p>&copy; {new Date().getFullYear()} Ente Gramam. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
