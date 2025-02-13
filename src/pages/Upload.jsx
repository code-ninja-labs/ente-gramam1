import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file.size > maxSize) {
      alert("File size exceeds 5MB.");
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG and PNG formats are allowed.");
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "No file selected." });
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.post(import.meta.env.VITE_IMGHIPPO_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${import.meta.env.VITE_IMGHIPPO_API_KEY}`,
        },
      });
      setUploadedImageUrl(response.data?.data?.display_url);
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage({ type: "error", text: "Failed to upload image. Please try again." });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
      {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" />}
    </div>
  );
};

export default Upload;
