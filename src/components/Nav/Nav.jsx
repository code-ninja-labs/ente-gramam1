import React from "react";
import "./../styles/Nav.css"; // Adjust the path based on your folder structure

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <h1 className="navbar-title">Ente Gramam</h1>
      </div>
    </nav>
  );
};

export default Nav;
