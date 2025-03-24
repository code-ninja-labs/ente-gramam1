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
          const slot1 = window._shareustag
            .defineSlot(
              "/shareus-admanager/3311712454/aHrokQdEJZ/pan",
              [[970, 90], [728, 90], [320, 50], [300, 250], [336, 280]],
              "shareus-admanager-3311712454-aHrokQdEJZ"
            )
            .addService(window._shareustag.pubads());

          const slot2 = window._shareustag
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Navigation */}
      <Nav />

      {/* Content Section */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "1200px",
          gap: "40px"
        }}
      >
        <section
          style={{
            textAlign: "center"
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.8)",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)"
            }}
          >
            Welcome to{" "}
            <span
              style={{
                color: "#007bff",
                background: "rgba(255, 255, 255, 0.4)",
                padding: "5px 10px",
                borderRadius: "8px"
              }}
            >
              Ente Gramam
            </span>
          </h2>
          <p
            style={{
              marginTop: "10px",
              fontSize: "1.2rem",
              color: "rgba(0, 0, 0, 0.6)"
            }}
          >
            Select a service below to proceed:
          </p>
        </section>

        {/* App Icons */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "30px",
            width: "100%"
          }}
        >
          <AppIcons />
        </section>

        {/* Ad Slots */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-around",
            width: "100%"
          }}
        >
          <div
            id="shareus-admanager-3311712454-aHrokQdEJZ"
            style={{
              width: "100%",
              maxWidth: "300px",
              minHeight: "250px",
              background: "rgba(255, 255, 255, 0.4)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)"
            }}
          ></div>
          <div
            id="shareus-admanager-3311712454-zRjipJmaSH"
            style={{
              width: "100%",
              maxWidth: "300px",
              minHeight: "250px",
              background: "rgba(255, 255, 255, 0.4)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)"
            }}
          ></div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "10px 0",
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: "0.9rem",
          marginTop: "auto"
        }}
      >
        <p>© {new Date().getFullYear()} Ente Gramam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
        
