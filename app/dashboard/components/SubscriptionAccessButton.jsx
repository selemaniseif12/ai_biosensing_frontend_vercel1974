"use client";

import { useState } from "react";
import { issueToken, validateToken, getStoredToken } from "./ServiceTokenClient.jsx";

export default function SubscriptionAccessButton({ subscriptionType, userId }) {
  const [status, setStatus] = useState("");
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handleAccess = async () => {
    setStatus("Checking token...");

    // Example subscriptionType:
    // "monthly", "yearly", "premium", "enterprise", "student"
    const serviceName = `subscription_${subscriptionType}`;

    // Step 1: Validate existing token
    const isValid = await validateToken(serviceName);

    let token = getStoredToken(serviceName);

    // Step 2: Issue new token if invalid or missing
    if (!isValid) {
      setStatus("Issuing new token...");
      token = await issueToken(serviceName, userId);
    }

    // Step 3: Access the subscription service
    setStatus("Accessing subscription service...");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/services/subscription/${subscriptionType}?token=${token}`
      );

      if (response.status === 403) {
        setStatus("Invalid or inactive token");
        return;
      }

      const data = await response.json();
      setSubscriptionData(data);
      setStatus("Subscription access granted");
    } catch (error) {
      console.error("Error accessing subscription service:", error);
      setStatus("Error accessing subscription service");
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
        Access Subscription: {subscriptionType}
      </button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      {subscriptionData && (
        <pre
          style={{
            marginTop: "10px",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {JSON.stringify(subscriptionData, null, 2)}
        </pre>
      )}
    </div>
  );
}
