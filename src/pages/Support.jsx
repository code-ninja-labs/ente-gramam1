// src/pages/Support.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function Support() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/support", formData); // Adjust API endpoint if needed
      setSuccessMessage("Support request created successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form fields
      fetchRequests(); // Refresh the list of requests after submission
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all support requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/support");
      setRequests(res.data); // Store fetched data
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Support</h1>

      {/* Form to submit a support request */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0", minHeight: "100px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>
      </form>

      {/* Display success message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <hr />

      {/* Display support requests */}
      <h2>Support Requests</h2>
      <ul>
        {requests.length > 0 ? (
          requests.map((req) => (
            <li key={req.id} style={{ marginBottom: "10px" }}>
              <p>
                <strong>{req.name}</strong> ({req.email}): {req.message}
              </p>
              <small>Submitted on: {new Date(req.created_at).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>No support requests found.</p>
        )}
      </ul>
    </div>
  );
}

export default Support;
        
