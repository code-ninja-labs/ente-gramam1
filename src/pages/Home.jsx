import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import AppIcons from "../components/AppIcons/AppIcons";
import "./Home.css";

const Home = () => {

  useEffect(() => {
    const loadShareusAdScript = () => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://securepubads.shareus.io/scripts/tag/js/gpt.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window._shareustag = window._shareustag || { cmd: [] };

        window._shareustag.cmd.push(function() {
          var slot1 = window._shareustag.defineSlot('/shareus-admanager/3311712454/aHrokQdEJZ/pan', [[970, 90], [728, 90], [320, 50], [300, 250], [336, 280]], 'shareus-admanager-3311712454-aHrokQdEJZ')
            .addService(window._shareustag.pubads());

          var slot2 = window._shareustag.defineSlot('/shareus-admanager/3311712454/zRjipJmaSH/mobile', [[320, 50], [320, 100], [468, 60]], 'shareus-admanager-3311712454-zRjipJmaSH')
            .addService(window._shareustag.pubads());

          window._shareustag.enableServices();
        });
      };
    };

    loadShareusAdScript();
  }, []);

  return (
    <div className="home-container">
      <Nav /> {/* Navigation Bar */}
      <main className="content">
        <h2>Welcome to Ente Gramam</h2>
        <p>Select a service below to proceed:</p>
        <AppIcons /> {/* App-Style Icons */}
        <div id="shareus-admanager-3311712454-aHrokQdEJZ"></div> {/* Ad Container */}
        <div id="shareus-admanager-3311712454-zRjipJmaSH"></div> {/* New Ad Container */}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ente Gramam. All rights reserved.</p> {/* Dynamic Year */}
      </footer>
    </div>
  );
};

export default Home;
