import React, { useState } from "react";
import supabase from "../supabaseClient"; // Correct the relative path to your supabaseClient.js file

function Addadr() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Handles submit state
  const [errorMessage, setErrorMessage] = useState(""); // Handles errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Insert new record into the Supabase table
      const { data, error } = await supabase.from("autorickshaw_drivers_list").insert([
        {
          name: formData.name,
          phone: formData.phone,
        },
      ]);

      if (error) {
        console.error("Error while inserting data:", error.message);
        setErrorMessage("Failed to add driver. Please try again!");
        return;
      }

      // Success! Clear the form
      alert("Driver added successfully!");
      setFormData({ name: "", phone: "" });

    } catch (err) {
      console.error("Unexpected error:", err.message);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Add Autorickshaw Driver</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter driver's name"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter driver's phone number"
            required
          />
        </div>

        {/* Submission Feedback */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Driver"}
        </button>
      </form>
    </div>
  );
}

export default Addadr;
