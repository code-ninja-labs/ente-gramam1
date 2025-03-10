import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client using Vite's .env variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Supabase URL from .env
  import.meta.env.VITE_SUPABASE_ANON_KEY // Supabase Anon Key from .env
);

function Support() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Attempt to insert data into Supabase
      const { data, error } = await supabase.from("support_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: "submitted", // Default status for new entries
        },
      ]);

      if (error) {
        console.error("Error inserting into Supabase:", error.message);
        setErrorMessage("Error submitting support request. Please try again.");
        return;
      }

      setSuccessMessage("Support request submitted successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset the form
      fetchRequests(); // Update the displayed list of requests
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Unexpected error occurred. Please try again.");
    }
  };

  // Fetch all support requests
  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("support_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data from Supabase:", error.message);
        return;
      }

      setRequests(data); // Update state with the fetched requests
    } catch (err) {
      console.error("Error fetching support requests:", err);
    }
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Support Form</h1>

      {/* Form for creating support requests */}
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

      {/* Success/Error notifications */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <hr />

      {/* Display support requests */}
      <h2>Support Requests</h2>
      <ul>
        {requests.length > 0 ? (
          requests.map((req) => (
            <li key={req.id} style={{ marginBottom: "20px" }}>
              <p>
                <strong>{req.name}</strong> ({req.email}): {req.message}
              </p>
              <p>
                <em>Status:</em> <strong>{req.status}</strong>
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
