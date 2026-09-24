"use client";
console.log("RUNNING UPDATED VIRUS LIST FILE — TOKEN PROTECTED");

import React, { useState } from "react";

export default function VirusList({ viruses = [] }) {
  const [token, setToken] = useState("");
  const [fromID, setFromID] = useState(1);
  const [toID, setToID] = useState(175);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

  const executeSearch = async () => {
    setError(null);
    setResults([]);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        setError("API URL is not configured. Add NEXT_PUBLIC_API_URL to .env.local");
        return;
      }

      const cleanToken = token.trim();
      const url = `${API_URL}/virus/list?from_id=${fromID}&to_id=${toID}&token=${cleanToken}`;

      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid token or server error");
        return;
      }

      setResults(data.viruses || []);
    } catch (err) {
      console.error("Virus list fetch error:", err);
      setError("Network error");
    }
  };

  const filteredResults = results.filter((v) => {
    if (filter === "all") return true;
    return v.transmission.includes(filter);
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Virus List (Token Protected)</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Token:</label>
        <input
          type="text"
          placeholder="Enter your token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>From ID:</label>
        <input
          type="number"
          value={fromID}
          onChange={(e) => setFromID(parseInt(e.target.value))}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        />

        <label>To ID:</label>
        <input
          type="number"
          value={toID}
          onChange={(e) => setToID(parseInt(e.target.value))}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        />

        <button
          onClick={executeSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "20px",
          }}
        >
          Execute
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: "15px", color: "red" }}>
          <strong>Error:</strong>{" "}
          {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      <div style={{ marginBottom: "15px" }}>
        <label>Transmission filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="all">All</option>
          <option value="airborne">Airborne</option>
          <option value="contact">Contact</option>
          <option value="blood">Blood-borne</option>
          <option value="fecal">Fecal-oral</option>
        </select>
      </div>

      {/* FIRST TABLE */}
      <div style={{ marginTop: "10px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Virus ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Mass (fg)</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Antigen</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Antibody</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Transmission</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((v, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.virus_id}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.name}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.mass_fg}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.antigen}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.antibody}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.transmission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECOND TABLE */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "10px" }}>Environmental & Detection Parameters</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Virus ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Antigen</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Antibody</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Temp (°C)</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Flow Rate (L/min)</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Deposition Rate (s)</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Humidity (%)</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Time to Detection (s)</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((v) => (
              <tr key={v.virus_id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.virus_id}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.name}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.antigen}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.antibody}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.temperature_c}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.flow_rate}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.deposition_rate_s}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.humidity}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{v.time_to_detection_s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
