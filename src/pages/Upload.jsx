import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null); // Store selected file
  const [previewUrl, setPreviewUrl] = useState(null); // Store preview URL of selected file
  const [uploadedUrl, setUploadedUrl] = useState(null); // Store Cloudinary URL of uploaded image
  const [isUploading, setIsUploading] = useState(false); // Control uploading state

  const CLOUD_NAME = "dzsj1tls1"; // Your Cloudinary Cloud Name
  const UPLOAD_PRESET = "upload"; // Your unsigned upload preset name

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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setIsUploading(true);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/$
{CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setUploadedUrl(data.secure_url); // Cloudinary URL after upload
        alert("Upload successful!");
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>File Upload with Cloudinary</h1>

      {/* File Input */}
      <input
        type="file"
        accept="image/*" // Accepts image files only
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
