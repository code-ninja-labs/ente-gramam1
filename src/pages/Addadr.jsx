import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure this is correctly imported and set up

export default function AddAutorickshawDriver() {
  // State management
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior (like refreshing the page)
    setLoading(true); // Show loading state during submission

    // Ensure the user provided the required inputs
    if (!name || !phone) {
      setMessage("Error: Please provide both name and phone."); // Alert about missing fields
      setLoading(false);
      return; // Exit early from the function
    }

    try {
      // Insert into 'autorickshaw-drivers' in your Supabase database
      const { error } = await supabase.from("autorickshaw-drivers").insert([
        {
          name: name.trim(), // Clean and send 'name'
          phone: phone.trim(), // Clean and send 'phone'
        },
      ]);

      if (error) {
        // Handle errors returned by Supabase
        setMessage(`Error: $
{error.message}`); // Display error message
      } else {
        // Handle success
        setMessage("Driver added successfully!"); // Display success message
        setName(""); // Reset input field for 'name'
        setPhone(""); // Reset input field for 'phone'
      }
    } catch (err) {
      // Handle unexpected errors (e.g., network issues)
      setMessage(`Error:
${err.message}`);
    } finally {
      setLoading(false); // Disable loading state regardless of success or failure
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
          role="alert"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable the button while loading
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
