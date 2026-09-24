"use client";

import React from "react";

export default function VirusAccessPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Virus Access Dashboard
      </h1>

      <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
        Access advanced virus‑analysis dashboards including probability flow
        charts, virus counts, and biosensing comparison tools.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Available Tools
        </h2>

        <ul style={{ marginTop: "1rem", lineHeight: "1.8" }}>
          <li>✔ Virus Count Dashboard</li>
          <li>✔ Virus List Viewer</li>
          <li>✔ Probability Flow Chart</li>
          <li>✔ VCE100 Biosensing Comparison</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#16a34a",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Open Virus Tools
        </button>
      </div>
    </div>
  );
}
