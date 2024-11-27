import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const SignDocument = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [signature, setSignature] = useState(null);

  useEffect(() => {
    // Fetch the PDF file and coordinates from the server or predefined data
    const fetchData = async () => {
      // Mock PDF file and coordinates; replace with actual server fetch
      const pdfResponse = "http://localhost:8000/static/sample.pdf";
      const signingCoordinates = [
        { x: 100, y: 200 },
        { x: 150, y: 300 },
      ];

      setPdfFile(pdfResponse);
      setCoordinates(signingCoordinates);
    };

    fetchData();
  }, []);

  const handleSignatureSubmit = async () => {
    if (!signature) {
      alert("Please add a signature before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/save-signed-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signature,
          coordinates,
        }),
      });

      if (response.ok) {
        alert("Document signed successfully!");
      } else {
        alert("Failed to submit signed document.");
      }
    } catch (error) {
      console.error("Error submitting signed document:", error);
    }
  };

  return (
    <div>
      <h2>Sign the Document</h2>
      {pdfFile ? (
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            marginTop: "20px",
          }}
        >
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} />
          </Worker>
          {coordinates.map((coord, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: coord.y,
                left: coord.x,
                width: "50px",
                height: "20px",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                border: "1px solid red",
              }}
            >
              Sign Here
            </div>
          ))}
        </div>
      ) : (
        <p>Loading document...</p>
      )}

      <canvas
        id="signatureCanvas"
        width="400"
        height="200"
        style={{
          border: "1px solid black",
          display: "block",
          marginTop: "20px",
        }}
      ></canvas>
      <button onClick={handleSignatureSubmit}>Submit Signed Document</button>
    </div>
  );
};

export default SignDocument;
