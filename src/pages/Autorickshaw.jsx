import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Make sure your Supabase client is correctly configured and imported

export default function AddAutorickshawDriver() {
  // State for form fields and messages
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh on submit
    setLoading(true);

    // Input validation
    if (!name || !phone) {
      setMessage("Error: Please provide both name and phone."); // Validation error
      setLoading(false);
      return;
    }

    try {
      // Insert into Supabase table
      const { error } = await supabase
        .from("autorickshaw-drivers")
        .insert([{ name: name.trim(), phone: phone.trim() }]); // Clean inputs

      if (error) {
        // Proper string interpolation for error message
        setMessage(`Error: $
{error.message}`);
      } else {
        // Success
        setMessage("Driver added successfully!");
        setName(""); // Clear form fields
        setPhone("");
      }
    } catch (err) {
      // Catch unexpected errors
      setMessage(`Error:
${err.message}`);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Add Autorickshaw Driver</h1>

      {/* Message Area */}
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
        >
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
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

        {/* Phone Input */}
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

        {/* Submit Button */}
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

export default Autorickshaw;
