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
          fontFamily: "'Arial', sans-serif",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Ente Gramam
          </div>
          <div>
            <button
              onClick={handleGetStarted}
              style={{
                padding: "10px 16px",
                backgroundColor: "#38A169",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#2F855A")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#38A169")
              }
            >
              Login
            </button>
          </div>
        </nav>

        {/* Header Section */}
        <header
          style={{
            backgroundColor: "#E7F5FE",
            padding: "64px 16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "auto",
              padding: "32px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              color: "#333",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#2D3748",
              }}
            >
              Connecting our village together
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main
          style={{
            maxWidth: "800px",
            margin: "auto",
            padding: "24px",
          }}
        >
          {/* Text Section */}
          <div style={{ marginBottom: "32px", color: "#4A5568" }}>
            <p>
              This web app is for the people of Edavannapara. Created by
              Sameem Kunnath. Discover local news, events, and a community
              that celebrates our traditions and heritage.
            </p>
          </div>

          {/* Button Group */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <button
              onClick={handleGetStarted}
              style={{
                padding: "12px 24px",
                backgroundColor: "#38A169",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#2F855A")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#38A169")
              }
            >
              Login
            </button>
            <a
              href="#"
              style={{
                padding: "12px 24px",
                backgroundColor: "#E2E8F0",
                color: "#2D3748",
                borderRadius: "5px",
                textDecoration: "none",
                textAlign: "center",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#CBD5E0")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#E2E8F0")
              }
            >
              About Us
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundImage: "linear-gradient(to right, #38A169, #4299E1)",
            color: "#fff",
            padding: "24px",
            marginTop: "auto",
            textAlign: "center",
          }}
        >
          <p>&copy; 2023 Ente Gramam. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
