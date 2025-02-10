import React, { useState } from "react";
import supabase from "../supabaseClient"; // Ensure this points to your client setup

const AddAdr = () => {
  // States for form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage(""); // Clear any previous messages

    // Insert the data into Supabase table
    const { data, error } = await supabase
      .from("autorickshaw-drivers-list") // Table name
      .insert([{ name, phone }]); // Insert rows as an array of objects

    if (error) {
      console.error("Error adding record:", error.message);
      setMessage("Error adding autorickshaw driver: " + error.message);
    } else {
      setMessage("Autorickshaw driver added successfully!");
      // Clear the form fields
      setName("");
      setPhone("");
      console.log("Added data:", data);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Add Autorickshaw Driver</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter driver's name"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter driver's phone number"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            background: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
};

export default AddAutorickshawDriver;
