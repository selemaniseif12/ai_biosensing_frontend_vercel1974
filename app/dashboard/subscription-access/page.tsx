"use client";

import React from "react";

export default function SubscriptionAccessPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Subscription Access
      </h1>

      <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
        Your subscription grants access to premium biosensing dashboards,
        advanced ML tools, and full course modules.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Available Features
        </h2>

        <ul style={{ marginTop: "1rem", lineHeight: "1.8" }}>
          <li>✔ Full ML Training Dashboards</li>
          <li>✔ VCE100 Biosensing Dashboards</li>
          <li>✔ Virus Analysis Tools</li>
          <li>✔ Course Modules & API Lessons</li>
          <li>✔ Student Profile & Payment History</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Manage Subscription
        </button>
      </div>
    </div>
  );
}
