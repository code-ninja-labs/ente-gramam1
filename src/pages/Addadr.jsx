import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Import the Supabase client

const AddAdr = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(""); // To show success/error messages
  const [error, setError] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage(""); // Clear any previous success message
    setError(""); // Clear any previous error message

    if (!name || !phone) {
      setError("Please fill in both fields."); // Basic form validation
      return;
    }

    try {
      // Insert data into the Supabase table
      const { data, error } = await supabase
        .from("autorickshaw-drivers") // Table name
        .insert([{ name, phone }]); // Data to insert (as an array of objects)

      if (error) throw error; // Throw error if the query fails

      setMessage("Autorickshaw driver added successfully!"); // Successful insertion message
      setName(""); // Clear the form fields
      setPhone("");
    } catch (error) {
      console.error("Error adding driver:", error.message);
      setError(`Error: ${error.message}`); // Display error message
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Add Autorickshaw Driver</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Enter driver's name"
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            placeholder="Enter driver's phone number"
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Submit
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AddAdr;
