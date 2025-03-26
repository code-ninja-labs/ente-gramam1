import React, { useState, useEffect } from "react";
import Nav from "../components/Nav/Nav";
import AppIcons from "../components/AppIcons/AppIcons";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [viewCount, setViewCount] = useState(0); // Track total views for this page
  const [loading, setLoading] = useState(false); // Loading state while updating

  /**
   * Fetch view count on component mount and increment it.
   */
  useEffect(() => {
    const fetchAndIncrementViewCount = async () => {
      setLoading(true);
      try {
        // Fetch current view count for the "home" page from Supabase
        const { data: pageData, error: fetchError } = await supabase
          .from("view_counts")
          .select("total_views")
          .eq("page_name", "home")
          .single();

        if (fetchError) {
          throw new Error(`Error fetching view count: $
{fetchError.message}`);
        }

        const currentViewCount = pageData?.total_views || 0;

        // Increment view count in the database
        const { error: updateError } = await supabase
          .from("view_counts")
          .update({ total_views: currentViewCount + 1 })
          .eq("page_name", "home");

        if (updateError) {
          throw new Error(`Error updating view count:
${updateError.message}`);
        }

        // Update state with the new view count
        setViewCount(currentViewCount + 1);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAndIncrementViewCount();
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

      {/* Main Content */}
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
        {/* Welcome Section */}
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

        {/* View Count Section */}
        <section
          style={{
            textAlign: "center",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h3
            style={{
              fontSize: "1.8rem",
              color: "rgba(0, 0, 0, 0.8)"
            }}
          >
            Total Page Views:{" "}
            <span>{loading ? "Loading..." : viewCount}</span>
          </h3>
        </section>

        {/* App Icons Section */}
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
