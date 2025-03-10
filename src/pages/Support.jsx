import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://YOUR-SUPABASE-PROJECT-URL.supabase.co",
  "YOUR-SUPABASE-ANON-KEY"
);

function Support() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Insert the new support request into Supabase
      const { data, error } = await supabase.from("support_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: "submitted", // Default status
        },
      ]);

      if (error) {
        setErrorMessage("Error submitting support request.");
        console.error("Supabase insert error:", error.message);
        return;
      }

      setSuccessMessage("Support request submitted successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
      fetchRequests(); // Refresh the requests
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  // Fetch all support requests from Supabase
  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("support_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error.message);
        return;
      }

      setRequests(data); // Save fetched data in state
    } catch (err) {
      console.error("Error fetching support requests:", err);
    }
  };

  // Fetch support requests on component mount
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

      {/* Display success or error message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
              <p>Status: <strong>{req.status}</strong></p>
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
