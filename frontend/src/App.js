import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfRenderer from "./components/PdfRenderer";
import EmailSender from "./components/EmailSender";
import SignDocument from "./components/signDocument";
import PdfUploader from "./components/PdfUploader";

function App() {
  return (
    <Router>
      <div>
        <h1>PDF Signing Tool</h1>
        <Routes>
          <Route path="/" element={<PdfRenderer />} />
          <Route path="/send-email" element={<EmailSender />} />
          <Route path="/sign-document" element={<SignDocument />} />
          <Route path="/upload-pdf" element={<PdfUploader/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
