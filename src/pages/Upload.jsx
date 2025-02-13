import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust relative path based on Upload.jsx's location

const Upload = () => {
  const [file, setFile] = useState(null); // Store selected file
  const [previewUrl, setPreviewUrl] = useState(null); // Store preview URL of selected file
  const [uploadedUrl, setUploadedUrl] = useState(null); // Store URL of uploaded image
  const [isUploading, setIsUploading] = useState(false); // Control uploading state

  const bucketName = "image"; // Your Supabase bucket name

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Set local preview URL
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading!");
      return;
    }

    const fileExt = file.name.split(".").pop(); // Extract file extension
    const fileName = `${Date.now()}.${fileExt}`; // Create a unique file name
    const filePath = `${fileName}`;

    setIsUploading(true);

    try {
      // Upload the file to Supabase Storage
      let { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get a public URL for the uploaded file
      const { data: publicData, error: publicError } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (publicError) {
        throw publicError;
      }

      setUploadedUrl(publicData.publicUrl); // Set the public URL for the uploaded image
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error.message);
      alert("Failed to upload the file!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>File Upload with Supabase</h1>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={styles.input}
      />

      {/* File Preview */}
      {previewUrl && (
        <div style={styles.previewContainer}>
          <h2>Preview</h2>
          <img src={previewUrl} alt="Preview" style={styles.previewImage} />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        style={{
          ...styles.uploadButton,
          backgroundColor: isUploading ? "#ddd" : "#007BFF",
          cursor: isUploading ? "not-allowed" : "pointer",
        }}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Uploaded File Output */}
      {uploadedUrl && (
        <div style={styles.uploadedContainer}>
          <h2>Uploaded File</h2>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            <img src={uploadedUrl} alt="Uploaded file" style={styles.previewImage} />
          </a>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    marginBottom: "20px",
  },
  previewContainer: {
    marginBottom: "20px",
  },
  previewImage: {
    width: "100%",
    maxHeight: "250px",
    objectFit: "contain",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  uploadButton: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },
  uploadedContainer: {
    marginTop: "20px",
  },
};

export default Upload;
