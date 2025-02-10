import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AddAutorickshawDriver() {
  // State for form fields and feedback
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setLoading(true); // Start loading

    // Validate input fields
    if (!name.trim() || !phone.trim()) {
      setMessage("Error: Name and phone are required.");
      setLoading(false);
      return;
    }

    try {
      // Insert data into 'autorickshaw-drivers-list' table in Supabase
      const { data, error } = await supabase.from("autorickshaw-drivers-list") // Exact table name
        .insert([{ name: name.trim(), phone: phone.trim() }]);

      if (error) {
        // Handle Supabase-specific errors
        setMessage(`Error: $
{error.message}`);
      } else {
        // Success feedback and reset form fields
        setMessage("Driver added successfully!");
        setName("");
        setPhone("");
      }
    } catch (err) {
      // Handle unexpected errors (like network issues)
      setMessage(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Add Autorickshaw Driver</h1>

      {/* Display feedback message */}
      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            color: message.includes("Error") ? "red" : "green",
            border: `1px solid $
{message.includes("Error") ? "red" : "green"}`,
            borderRadius: "5px",
            backgroundColor: message.includes("Error")
              ? "rgba(255, 0, 0, 0.1)"
              : "rgba(0, 255, 0, 0.1)",
          }}
        >
          {message}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Driver Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter driver name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Phone Input */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>
            Driver Phone
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Enter driver phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#6c757d" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
