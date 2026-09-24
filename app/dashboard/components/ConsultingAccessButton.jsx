"use client";
import { useState } from "react";
import { issueToken, validateToken, getStoredToken } from "./ServiceTokenClient.jsx";

export default function ConsultingAccessButton({ consultingService, userId }) {
  const [status, setStatus] = useState("");
  const [consultingData, setConsultingData] = useState(null);

  const handleAccess = async () => {
    setStatus("Checking token...");

    const serviceName = `consulting_${consultingService}`;

    // Step 1: Validate existing token
    const isValid = await validateToken(serviceName);

    let token = getStoredToken(serviceName);

    // Step 2: Issue new token if invalid or missing
    if (!isValid) {
      setStatus("Issuing new token...");
      token = await issueToken(serviceName, userId);
    }

    // Step 3: Access the consulting service
    setStatus("Accessing consulting service...");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/services/consulting/${consultingService}?token=${token}`
      );

      if (response.status === 403) {
        setStatus("Invalid or inactive token");
        return;
      }

      const data = await response.json();
      setConsultingData(data);
      setStatus("Consulting service access granted");
    } catch (error) {
      console.error("Error accessing consulting service:", error);
      setStatus("Error accessing consulting service");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <button
        onClick={handleAccess}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Access Consulting: {consultingService}
      </button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      {consultingData && (
        <pre
          style={{
            marginTop: "10px",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {JSON.stringify(consultingData, null, 2)}
        </pre>
      )}
    </div>
  );
}
