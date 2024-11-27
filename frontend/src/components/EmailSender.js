import React from "react";
import { useLocation } from "react-router-dom";

const EmailSender = () => {
  const location = useLocation();
  const { coordinates } = location.state || {}; // Multiple coordinates
  const [email, setEmail] = React.useState("");

  const handleSendEmail = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, coordinates }), // Send all coordinates
      });

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div>
      <h2>Send Signing Request</h2>
      <p>Coordinates Selected: {JSON.stringify(coordinates)}</p>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default EmailSender;
