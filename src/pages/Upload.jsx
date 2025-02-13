import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMessage(null);
    setUploadedImageUrl(null);

    if (!file) {
      setMessage({ type: "error", text: "No file selected." });
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: "error", text: "Only JPEG and PNG formats are allowed." });
      e.target.value = ""; // Reset input
      return;
    }

    if (file.size > maxSize) {
      setMessage({ type: "error", text: "File size exceeds 5MB." });
      e.target.value = ""; // Reset input
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "No file selected." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        import.meta.env.VITE_IMGHIPPO_API_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${import.meta.env.VITE_IMGHIPPO_API_KEY}`,
          },
        }
      );

      if (response.data?.data?.display_url) {
        setUploadedImageUrl(response.data.data.display_url);
        setMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to upload image. Please try again.",
      });
      setUploadedImageUrl(null);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      document.querySelector("input[type='file']").value = ""; // Reset input
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <button 
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}

      {uploadedImageUrl && (
        <div className="preview-container">
          <h3>Uploaded Image:</h3>
          <img 
            src={uploadedImageUrl} 
            alt="Uploaded content" 
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;
