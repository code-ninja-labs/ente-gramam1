import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Autorickshaw.css";

const Autorickshaw = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("autorickshaw-drivers") 
          .select("*");

        if (error) throw error;

        if (data.length === 0) {
          setError("No drivers found.");
          setDrivers([]);
        } else {
          setDrivers(data);
          setError(null);
        }
      } catch (err) {
        if (err.message.includes("Invalid API key")) {
          setError("Invalid API key: Please check your Supabase configuration.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      {/* Heading and description */}
      <h1 className="autorickshaw-header">Autorickshaw Drivers</h1>
      <p className="autorickshaw-description">
        Find details about autorickshaw drivers available in your area.
      </p>

      {/* Driver list with background shapes */}
      <div className="autorickshaw-list">
        {/* Background shapes */}
        <div className="shapes-background">
          <div className="circle-shape"></div>
          <div className="triangle-shape"></div>
        </div>

        {/* Driver Cards */}
        {loading ? (
          <p className="autorickshaw-loading">Loading driver details...</p>
        ) : error ? (
          <p className="autorickshaw-error">{error}</p>
        ) : (
          drivers.map((driver, index) => (
            <div key={index} className="autorickshaw-card">
              <div className="autorickshaw-details">
                <p className="autorickshaw-name">{driver.name}</p>
                <p className="autorickshaw-phone">{driver.phone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Autorickshaw;
