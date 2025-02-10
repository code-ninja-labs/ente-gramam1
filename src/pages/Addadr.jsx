import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Make sure your Supabase client is correctly imported

export default function AddAutorickshawDriver() {
  // Updated state to reflect 'phone' instead of 'number'
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !phone) {
      setMessage("Error: Please provide both name and phone."); // Input validation
      setLoading(false);
      return;
    }

    try {
      // Replace 'number' with 'phone'
      const { error } = await supabase.from("autorickshaw-drivers").insert([
        {
          name: name.trim(),   // Insert 'name' column
          phone: phone.trim(), // Insert 'phone' column
        },
      ]);

      if (error) {
        setMessage(`Error: $
{error.message}`); // Handle Supabase errors
      } else {
        setMessage("Driver added successfully!");
        setName(""); // Reset name field
        setPhone(""); // Reset phone field
      }
    } catch (err) {
      setMessage(`Error:
${err.message}`); // Handle unexpected errors
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

        {/* Phone Input */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>
            Phone
          </label>
          <input
            type="text"
            id="phone"
            aria-label="Driver Phone"
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
