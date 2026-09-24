"use client";
import { useState } from "react";
import { validateToken } from "./ServiceTokenClient.jsx";

export default function MLAccessDropdown({ userId, token }) {
  const [modelId, setModelId] = useState("v2");
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);

  const handleAccess = async () => {
    const serviceName = modelId; // must match backend validator

    if (!token) {
      setStatus("Token required");
      return;
    }

    setStatus("Validating token...");

    const isValid = await validateToken(serviceName, token);

    if (!isValid) {
      setStatus("Invalid or inactive token");
      return;
    }

    setStatus(`Accessing ML model ${modelId}...`);

    const response = await fetch(`http://127.0.0.1:8000/ml/${modelId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      setStatus("Invalid or inactive token");
      return;
    }

    const json = await response.json();
    setData(json);
    setStatus("Access granted");
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
