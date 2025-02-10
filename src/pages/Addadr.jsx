import React, { useState } from "react";

function Addadr() {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend API
      const response = await fetch("http://localhost:5000/api/add-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Driver data added successfully!");
        setFormData({ name: "", phone: "" }); // Reset form after submission
      } else {
        alert("Failed to add driver data!");
      }
    } catch (error) {
      console.error("Error submitting the form: ", error);
    }
  };

  return (
    <div>
      <h2>Add Autorickshaw Driver</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Driver's Name"
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Driver's Phone Number"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
}

export default Addadr;
