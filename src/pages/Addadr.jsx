import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure this is correctly setup and points to your Supabase client

export default function AddAutorickshawDriver() {
  // State to manage form data, loading status, and success/error messages
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent browser from refreshing the page on form submission
    setLoading(true); // Set loading state to true

    // Validate user input
    if (!name || !number) {
      setMessage("Error: Please provide both name and number.");
      setLoading(false);
      return;
    }

    try {
      // Insert data into the "autorickshaw-drivers" table in Supabase
      const { error } = await supabase.from("autorickshaw-drivers").insert([
        {
          name: name.trim(),   // Trim spaces from name input
          number: number.trim(), // Trim spaces from number input
        },
      ]);

      if (error) {
        // Handle Supabase errors
        setMessage(`Error:
${error.message}`); // Corrected string template issues
      } else {
        // If insert was successful
        setMessage("Driver added successfully!");
        setName(""); // Reset the form field for 'name'
        setNumber(""); // Reset the form field for 'number'
      }
    } catch (err) {
      // Handle any other unexpected errors
      setMessage(`Error: $
{err.message}`);
    } finally {
      setLoading(false); // Always stop loading after the process
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Add Autorickshaw Driver</h1>

      {/* Message Section */}
      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            color: message.includes("Error") ? "red" : "green",
            border: `1px solid
${message.includes("Error") ? "red" : "green"}`,
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            aria-label="Driver Name"
            placeholder="Enter driver name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Number Input */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="number" style={{ display: "block", marginBottom: "5px" }}>
            Number
          </label>
          <input
            type="text"
            id="number"
            aria-label="Driver Number"
            placeholder="Enter driver number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable the button while submitting
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
