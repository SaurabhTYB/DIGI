import React, { useState } from "react";

const PdfUploader = () => {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`File uploaded successfully: ${data.filePath}`);
      } else {
        setUploadStatus("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <h2>Select a PDF for Signing</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <p>{uploadStatus}</p>
    </div>
  );
};

export default PdfUploader;
