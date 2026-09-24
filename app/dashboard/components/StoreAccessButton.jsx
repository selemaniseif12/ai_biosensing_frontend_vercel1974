"use client";

import { useState } from "react";
import { issueToken, validateToken, getStoredToken } from "./ServiceTokenClient.jsx";

export default function StoreAccessButton({ itemId, serviceName, userId }) {
  const [status, setStatus] = useState("");
  const [serviceData, setServiceData] = useState(null);

  const handleAccess = async () => {
    setStatus("Checking token...");

    const tokenKey = serviceName;

    // Step 1: Validate existing token
    const isValid = await validateToken(tokenKey);
    let token = getStoredToken(tokenKey);

    // Step 2: Issue new token if invalid or missing
    if (!isValid) {
      setStatus("Issuing new token...");
      token = await issueToken(tokenKey, userId);
    }

    // Step 3: Access the service
    setStatus("Accessing service...");

    try {
      const response = await fetch(
        `https://ai-biosensing-backend-1.onrender.com/services/store/${itemId}?token=${token}`
      );

      if (response.status === 403) {
        setStatus("Invalid or inactive token");
        return;
      }

      const data = await response.json();
      setServiceData(data);
      setStatus("Service access granted");
    } catch (error) {
      console.error("Error accessing store service:", error);
      setStatus("Error accessing store service");
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
        Access Store Item #{itemId}
      </button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      {serviceData && (
        <pre
          style={{
            marginTop: "10px",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {JSON.stringify(serviceData, null, 2)}
        </pre>
      )}
    </div>
  );
}
