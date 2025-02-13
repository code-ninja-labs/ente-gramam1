import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null); // File to be uploaded
  const [preview, setPreview] = useState(null); // For displaying file preview
  const [message, setMessage] = useState(null); // To show success/failure message
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // URL of the uploaded image

  // Access environment variables
  const IMGHIPPO_API_KEY = import.meta.env.VITE_IMGHIPPO_API_KEY; // API key
  const IMGHIPPO_API_URL = import.meta.env.VITE_IMGHIPPO_API_URL; // API endpoint

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Generate a preview URL for the selected file
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle the file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    // Check if a file is selected
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select an image to upload!" });
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("image", selectedFile); // Assumes the API expects the key "image" for the uploaded file

    try {
      // Make a POST request to the Imghippo API
      const response = await axios.post(IMGHIPPO_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${IMGHIPPO_API_KEY}`, // Pass API key securely
        },
      });

      // Handle successful upload
      const uploadedUrl = response?.data?.data?.display_url; // Adjust based on the Imghippo API response
      setUploadedImageUrl(uploadedUrl);
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error) {
      // Handle error
      console.error("Upload failed:", error);
      setMessage({ type: "error", text: "Failed to upload image. Please try again." });
    }
  };

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h1>Image Upload</h1>

      {/* File input for uploading */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Upload
      </button>

      {/* Display image preview */}
      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: "150px", height: "auto" }} />
        </div>
      )}

      {/* Display success or error message */}
      {message && (
        <div
          style={{
            marginTop: "20px",
            color: message.type === "success" ? "green" : "red",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Display the uploaded image */}
      {uploadedImageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" style={{ width: "200px", height: "auto" }} />
        </div>
      )}
    </div>
  );
};

export default Upload;
                                             
