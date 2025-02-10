import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure this is correctly imported

export default function AddAutorickshawDriver() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);

    if (!name.trim() || !phone.trim()) {
      setMessage("Error: Name and phone are required."); // Validate fields
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("autorickshaw-drivers-list") // Match the exact table name
        .insert([{ name: name.trim(), phone: phone.trim() }]); // Insert into table

      if (error) {
        setMessage(`Error: $
{error.message}`); // Show error if available
      } else {
        setMessage("Driver added successfully!");
        setName(""); // Clear input fields
        setPhone("");
      }
    } catch (err) {
      setMessage(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Add Autorickshaw Driver</h1>

      {/* Display success or error messages */}
      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            color: message.includes("Error") ? "red" : "green",
            border: `1px solid ${
              message.includes("Error") ? "red" : "green"
            }`,
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}

      {/* Data input form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
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
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter driver phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
