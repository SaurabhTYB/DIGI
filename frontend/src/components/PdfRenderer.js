import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useNavigate } from "react-router-dom";

const PdfRenderer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [coordinates, setCoordinates] = useState([]); // Array of coordinates
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF.");
    }
  };

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newCoordinate = { x, y };
    setCoordinates((prev) => [...prev, newCoordinate]); // Add to the array
    alert(`Selected coordinate: X=${x}, Y=${y}`);
  };

  const handleSendEmail = () => {
    if (coordinates.length === 0) {
      alert("Please select at least one area for signing.");
      return;
    }
    navigate("/send-email", { state: { coordinates } });
  };

  return (
    <div>
      <h2>Upload and Select Signing Areas</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div>
        {pdfFile && (
          <div
            style={{
              border: "1px solid black",
              cursor: "crosshair",
              marginTop: "20px",
            }}
            onClick={handleCanvasClick}
          >
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
              <Viewer fileUrl={URL.createObjectURL(pdfFile)} />
            </Worker>
          </div>
        )}
      </div>
      <button onClick={handleSendEmail} disabled={coordinates.length === 0}>
        Send for Signing
      </button>
    </div>
  );
};

export default PdfRenderer;
