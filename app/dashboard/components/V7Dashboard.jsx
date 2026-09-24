"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function V7Dashboard() {
  const [data, setData] = useState(null);

  // FILTER STATES
  const [freqThreshold, setFreqThreshold] = useState(0.1);
  const [startVirusId, setStartVirusId] = useState(1);
  const [endVirusId, setEndVirusId] = useState(175);

  // EXECUTION STATE
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const res = await fetch("http://127.0.0.1:8000/virus/dashboard_data", {
        method: "POST"
      });

      const json = await res.json();
      console.log("dashboard_data:", json); // debug
      setData(json);
      runAnalysis(json);
    }

    loadDashboard();
  }, []);

  if (!data) {
    return <div>Loading V7 Dashboard...</div>;
  }

  function runAnalysis(source) {
    const probs = source.probabilities || [];
    const ids = source.virus_ids || [];
    const masses = source.mass_fg || []; // MUST be array from backend

    const base = probs.map((p, i) => ({
      virus: Number(ids[i]),
      prob: p,
      mass: masses[i]
    }));

    const filtered = base
      .filter((v) => v.prob >= freqThreshold)
      .filter((v) => v.virus >= startVirusId && v.virus <= endVirusId);

    console.log("filteredData:", filtered); // debug
    setFilteredData(filtered);
  }

  const chartData1 = {
    labels: filteredData.map((v) => v.virus),
    datasets: [
      {
        label: "Probability",
        data: filteredData.map((v) => v.prob),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  const chartOptions1 = {
    scales: {
      x: { title: { display: true, text: "Virus ID" } },
      y: { title: { display: true, text: "Probability" } }
    }
  };

  const chartData2 = {
    labels: filteredData.map((v) => v.mass),
    datasets: [
      {
        label: "Probability",
        data: filteredData.map((v) => v.prob),
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }
    ]
  };

  const chartOptions2 = {
    scales: {
      x: { title: { display: true, text: "Mass of Virus (fg)" } },
      y: { title: { display: true, text: "Probability" } }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Virus Detection Dashboard — V7 (175 Viruses)</h1>

      <h3>Model Version: {data.model_version}</h3>

      <div style={{ marginTop: "10px" }}>
        <strong>Measured Frequency (Hz):</strong> {data.measured_frequency_hz}
      </div>

      <div>
        <strong>Sensor Offset:</strong> {data.sensor_frequency_offset}
      </div>

      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h2>Filters</h2>

        <label>Frequency Threshold (Hz): </label>
        <input
          type="number"
          value={freqThreshold}
          min="0"
          max="1"
          step="0.0000000001"
          inputMode="decimal"
          pattern="[0-9]*"
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            const num = Number(v);
            if (!isNaN(num)) setFreqThreshold(num);
          }}
          style={{ marginLeft: "10px", padding: "6px", width: "150px" }}
        />

        <br /><br />

        <label>Start Virus ID: </label>
        <input
          type="number"
          value={startVirusId}
          onChange={(e) => setStartVirusId(parseInt(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px", width: "80px" }}
        />

        <label style={{ marginLeft: "20px" }}>End Virus ID: </label>
        <input
          type="number"
          value={endVirusId}
          onChange={(e) => setEndVirusId(parseInt(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px", width: "80px" }}
        />

        <br /><br />

        <button
          onClick={() => runAnalysis(data)}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Run Analysis
        </button>
      </div>

      <h2>Probability vs Virus ID</h2>
      <Bar data={chartData1} options={chartOptions1} />

      <h2 style={{ marginTop: "40px" }}>Probability vs Mass of Virus</h2>
      <Bar data={chartData2} options={chartOptions2} />
    </div>
  );
}
