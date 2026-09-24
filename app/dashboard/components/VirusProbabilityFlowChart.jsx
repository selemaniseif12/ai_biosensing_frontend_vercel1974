"use client";

import React, { useState, useEffect } from "react";

export default function VirusProbabilityFlowChart() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [fromID, setFromID] = useState(1);
  const [toID, setToID] = useState(175);

  const [probMin, setProbMin] = useState(0);
  const [probMax, setProbMax] = useState(1);
  const [flowMin, setFlowMin] = useState(0);
  const [flowMax, setFlowMax] = useState(1);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/chart/probability-flow?from_id=${fromID}&to_id=${toID}`
      );
      const json = await res.json();
      setData(json.viruses || []);
    } catch (err) {
      console.error("Chart data fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((v) => {
    if (filter !== "all" && !v.transmission.includes(filter)) return false;
    if (v.probability < probMin || v.probability > probMax) return false;
    if (v.flow_rate < flowMin || v.flow_rate > flowMax) return false;
    return true;
  });

  // Simple bar chart using divs (you can replace with a chart library later)
  const maxProb = Math.max(...filtered.map((v) => v.probability), 1);

  const colorForTransmission = (t) => {
    if (t.includes("airborne")) return "#1f77b4";
    if (t.includes("contact")) return "#ff7f0e";
    if (t.includes("blood")) return "#d62728";
    if (t.includes("fecal")) return "#2ca02c";
    return "#7f7f7f";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Probability vs Flow Rate (Bar Chart)</h2>

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
          onClick={fetchData}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Refresh
        </button>
      </div>

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

      <div style={{ marginBottom: "15px" }}>
        <label>Probability range:</label>
        <input
          type="number"
          step="0.01"
          value={probMin}
          onChange={(e) => setProbMin(parseFloat(e.target.value))}
          style={{ marginLeft: "10px", width: "80px" }}
        />
        <span style={{ margin: "0 10px" }}>to</span>
        <input
          type="number"
          step="0.01"
          value={probMax}
          onChange={(e) => setProbMax(parseFloat(e.target.value))}
          style={{ width: "80px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Flow rate range:</label>
        <input
          type="number"
          step="0.001"
          value={flowMin}
          onChange={(e) => setFlowMin(parseFloat(e.target.value))}
          style={{ marginLeft: "10px", width: "80px" }}
        />
        <span style={{ margin: "0 10px" }}>to</span>
        <input
          type="number"
          step="0.001"
          value={flowMax}
          onChange={(e) => setFlowMax(parseFloat(e.target.value))}
          style={{ width: "80px" }}
        />
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {filtered.length === 0 && <p>No data in selected filters.</p>}

        {filtered.map((v) => {
          const barHeight = (v.probability / maxProb) * 200; // px
          return (
            <div
              key={v.virus_id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "200px",
                  fontSize: "12px",
                  marginRight: "10px",
                }}
              >
                {v.virus_id} — {v.name} ({v.transmission})
              </div>
              <div
                style={{
                  height: barHeight,
                  width: "20px",
                  backgroundColor: colorForTransmission(v.transmission),
                  marginRight: "10px",
                }}
                title={`Prob: ${v.probability.toFixed(
                  2
                )}, Flow: ${v.flow_rate.toFixed(3)}`}
              ></div>
              <div style={{ fontSize: "12px" }}>
                P={v.probability.toFixed(2)}, Q={v.flow_rate.toFixed(3)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
