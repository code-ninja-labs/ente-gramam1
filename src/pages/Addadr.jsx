import React, { useState } from "react";
import supabase from "../config/supabaseClient"; // Adjust this path if needed

function Addadr() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert data into Supabase table
      const { data, error } = await supabase.from("autorickshaw_drivers_list").insert([
        {
          name: formData.name,
          phone: formData.phone,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Failed to add driver data.");
      } else {
        alert("Driver data added successfully!");
        setFormData({ name: "", phone: "" }); // Clear form inputs
      }
    } catch (err) {
      console.error("Error submitting the form: ", err);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Autorickshaw Driver</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter driver's name"
            required
          />
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter driver's phone"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Driver"}
        </button>
      </form>
    </div>
  );
}

export default Addadr;
