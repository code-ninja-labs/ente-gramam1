import React from 'react';
import './Home.css'; // We’ll style the page here

const Home = () => {
  return (
    <div>
      {/* Sticky Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title">Ente Gramam</h1>
          <ul className="navbar-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content Section */}
      <main className="content">
        <h2>Welcome to Ente Gramam</h2>
        <p>Here's what's happening in our village:</p>

        {/* Cards Section */}
        <div className="cards-container">
          <div className="card">
            <h3>Event 1</h3>
            <p>Description of the event or activity happening in the village.</p>
          </div>
          <div className="card">
            <h3>Event 2</h3>
            <p>Details about another exciting event happening soon.</p>
          </div>
          <div className="card">
            <h3>Event 3</h3>
            <p>Don't miss this upcoming event! Catch all the details here.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2023 Ente Gramam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
