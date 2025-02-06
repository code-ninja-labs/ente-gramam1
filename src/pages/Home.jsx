import React from "react";
import Nav from "../components/Nav/Nav"; // Updated path assuming Nav is in a Nav folder
import AppIcons from "../components/AppIcon/AppIcon"; // Assumes AppIcons is in a subfolder named AppIcons
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Nav /> {/* Navigation Bar */}
      <main className="content">
        <h2>Welcome to Ente Gramam</h2>
        <p>Select a service below to proceed:</p>
        <AppIcons /> {/* App-Style Icons */}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ente Gramam. All rights reserved.</p> {/* Dynamic Year */}
      </footer>
    </div>
  );
};

export default Home;
