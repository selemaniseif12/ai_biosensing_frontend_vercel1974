"use client";

import { useState } from "react";
import { issueToken, validateToken, getStoredToken } from "./ServiceTokenClient";

export default function MLAccessDropdown({ userId }) {
  const [modelId, setModelId] = useState("v2");
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);

  const handleAccess = async () => {
    const serviceName = modelId; // must match backend

    setStatus("Checking token...");

    // Get stored token
    let token = getStoredToken();

    // Validate token
    const validation = await validateToken(token);

    if (!validation.success || !validation.valid) {
      setStatus("Issuing new token...");
      const issued = await issueToken(serviceName, userId);

      if (!issued.success) {
        setStatus("Failed to issue token");
        return;
      }

      token = issued.token;
    }

    setStatus(`Accessing ML model ${modelId}...`);

    try {
      const response = await fetch(
        `https://ai-biosensing-backend-trial2.onrender.com/services/ml/${modelId}?token=${token}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setStatus("Invalid or inactive token");
        return;
      }

      const json = await response.json();
      setData(json);
      setStatus("Access granted");
    } catch (err) {
      console.error(err);
      setStatus("Failed to access ML model");
    }
  };

  return (
    <div>
      <select
        value={modelId}
        onChange={(e) => setModelId(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        <option value="v2">ML Model V2</option>
        <option value="v6">ML Model V6</option>
        <option value="v2v6">ML Model V2/V6</option>
      </select>

      <button onClick={handleAccess} style={{ padding: "10px 20px" }}>
        Access ML Model
      </button>

      <p>{status}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
