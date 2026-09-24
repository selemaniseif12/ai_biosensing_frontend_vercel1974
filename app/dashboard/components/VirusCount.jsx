"use client";

import React, { useState } from "react";
import axios from "axios";

export default function VirusCount() {
  const [virusId, setVirusId] = useState(1);
  const [deviceId, setDeviceId] = useState(1);

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCount = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/virus/count?virus_id=${virusId}&device_id=${deviceId}`
      );

      setResult(response.data);
      setError(null);
    } catch (err) {
      console.error("Error calling /virus/count:", err);
      setError("Failed to fetch virus count");
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Virus Count (Simple Math)</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Virus ID:</label>
        <input
          type="number"
          min="1"
          value={virusId}
          onChange={(e) => setVirusId(Number(e.target.value))}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        />

        <label>Device ID:</label>
        <input
          type="number"
          min="1"
          value={deviceId}
          onChange={(e) => setDeviceId(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <button
        style={{ padding: "10px 20px", marginBottom: "20px" }}
        onClick={handleCount}
      >
        Calculate Virus Count
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <p><strong>Virus Name:</strong> {result.virus_name}</p>
          <p><strong>Mass (fg):</strong> {result.mass_fg}</p>
          <p><strong>Device Sensitivity (fg):</strong> {result.device_sensitivity_fg}</p>
          <p><strong>Virus Count:</strong> {result.virus_count}</p>
        </div>
      )}
    </div>
  );
}
