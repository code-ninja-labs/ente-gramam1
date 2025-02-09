import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure your client is correctly imported

export default function AddAutorickshawDriver() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert data into the Supabase table
      const { error } = await supabase.from("autorickshaw-drivers").insert([
        {
          name, // "name" column in your table; value comes from state
          number, // "number" column in your table; value comes from state
        },
      ]);

      if (error) {
        setMessage(`Error: $
{error.message}`); // Show error message if submission fails
      } else {
        setMessage("Submitted successfully!"); // Show success message
        setName(""); // Reset name field
        setNumber(""); // Reset number field
      }
    } catch (err) {
      setMessage(`Error:
${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Add Autorickshaw Driver</h1>
      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            color: message.includes("Error") ? "red" : "green",
            border: `1px solid ${message.includes("Error") ? "red" : "green"}`,
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Name
          </label>
          <input
            type="text"
            id="name"
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
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="number" style={{ display: "block", marginBottom: "5px" }}>
            Number
          </label>
          <input
            type="text"
            id="number"
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
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
