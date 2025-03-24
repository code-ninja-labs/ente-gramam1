import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import AppIcons from "../components/AppIcons/AppIcons";

const Home = () => {
  useEffect(() => {
    const loadShareusAdScript = () => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://securepubads.shareus.io/scripts/tag/js/gpt.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window._shareustag = window._shareustag || { cmd: [] };

        window._shareustag.cmd.push(function () {
          var slot1 = window._shareustag
            .defineSlot(
              "/shareus-admanager/3311712454/aHrokQdEJZ/pan",
              [[970, 90], [728, 90], [320, 50], [300, 250], [336, 280]],
              "shareus-admanager-3311712454-aHrokQdEJZ"
            )
            .addService(window._shareustag.pubads());

          var slot2 = window._shareustag
            .defineSlot(
              "/shareus-admanager/3311712454/zRjipJmaSH/mobile",
              [[320, 50], [320, 100], [468, 60]],
              "shareus-admanager-3311712454-zRjipJmaSH"
            )
            .addService(window._shareustag.pubads());

          window._shareustag.enableServices();
        });
      };
    };

    loadShareusAdScript();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Navigation */}
      <Nav />

      {/* Content Section */}
      <main className={styles.content}>
        <section className={styles.welcomeSection}>
          <h2>
            Welcome to <span>Ente Gramam</span>
          </h2>
          <p>Select a service below to proceed:</p>
        </section>

        {/* App Icons */}
        <section className={styles.appIconsContainer}>
          <AppIcons />
        </section>

        {/* Ad Slots */}
        <div className={styles.adContainer}>
          <div id="shareus-admanager-3311712454-aHrokQdEJZ" className={styles.adSlot}></div>
          <div id="shareus-admanager-3311712454-zRjipJmaSH" className={styles.adSlot}></div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Ente Gramam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
