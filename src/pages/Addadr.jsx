import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure this is correctly imported

export default function AddAutorickshawDriver() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setLoading(true); // Trigger loading state

    if (!name.trim() || !phone.trim()) {
      setMessage("Error: Name and phone are required."); // Validate inputs
      setLoading(false);
      return;
    }

    try {
      // Insert into the new table 'autorickshaw-drivers-list'
      const { data, error } = await supabase
        .from("autorickshaw-drivers-list") // New table name
        .insert([{ name: name.trim(), phone: phone.trim() }]); // Insert data as objects

      if (error) {
        setMessage(`Error: $
{error.message}`); // Handle errors
      } else {
        setMessage("Driver added successfully!"); // Show success
        setName(""); // Clear the form fields
        setPhone("");
      }
    } catch (err) {
      // Handle unexpected errors
      setMessage(`Unexpected error:
${err.message}`);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Add Autorickshaw Driver</h1>

      {/* Message Display */}
      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            color: message.includes("Error") ? "red" : "green",
            border: `1px solid $
{message.includes("Error") ? "red" : "green"}`,
            borderRadius: "5px",
          }}
          role="alert"
        >
          {message}
        </div>
      )}

      {/* Form for Input */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Name
          </label>
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
          <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>
            Phone
          </label>
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
