import React from "react";
import Nav from "./components/Nav";
import AppIcons from "./components/AppIcons";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Nav /> {/* Navigation Bar */}
      <main className="content">
        <h2>Welcome to Ente Gramam</h2>
        <p>Select a service:</p>
        <AppIcons /> {/* App-Style Icons */}
      </main>
      <footer className="footer">
        <p>© 2025 Ente Gramam. All rights reserved.</p> {/* Updated year */}
      </footer>
    </div>
  );
};

export default Home;
