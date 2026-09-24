"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function VCE100V6Dashboard() {
  const [token, setToken] = useState("");
  const [v6, setV6] = useState(null);

  const [baseFreq, setBaseFreq] = useState("");
  const [thresholdHz, setThresholdHz] = useState(0);

  const [idStart, setIdStart] = useState(1);
  const [idEnd, setIdEnd] = useState(100);

  const [error, setError] = useState(null);

  const probChartRef = useRef(null);
  const massChartRef = useRef(null);
  const probChart = useRef(null);
  const massChart = useRef(null);

  // ---------------------------------------------------------
  // RUN V6 — sends ONLY base_frequency_hz + threshold_hz
  // ---------------------------------------------------------
  const runV6 = async () => {
    setError(null);
    setV6(null);

    if (!token) {
      setError("Token required");
      return;
    }

    try {
      // Get patented base frequency from V2-style simulate endpoint
      const sim = await axios.get("http://127.0.0.1:8000/simulate", {
        params: { token }
      });

      const base = sim.data.base_frequency_hz;
      setBaseFreq(base);

      // Build V6 request (restored physics version)
      const v6res = await axios.post(
        "http://127.0.0.1:8000/classify/v6",
        {
          base_frequency_hz: Number(base),
          threshold_hz: Number(thresholdHz)
        },
        { params: { token } }
      );

      setV6(v6res.data);
    } catch (err) {
      console.error("V6 error:", err);
      setError("Invalid token or server error");
    }
  };

  // ---------------------------------------------------------
  // CHART RENDERING
  // ---------------------------------------------------------
  useEffect(() => {
    if (!v6 || !v6.results) return;

    const ids = Object.keys(v6.results)
      .map(Number)
      .filter((id) => id >= idStart && id <= idEnd);

    const probs = ids.map((id) => Number(v6.results[id]));
    const masses = ids.map((id) => v6.virus_masses_fg[id]);

    if (probChart.current) probChart.current.destroy();
    if (massChart.current) massChart.current.destroy();

    probChart.current = new Chart(probChartRef.current, {
      type: "bar",
      data: {
        labels: ids,
        datasets: [
          {
            label: "Probability vs Virus ID",
            data: probs,
            backgroundColor: "#0078ff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: (value) => Number(value).toExponential(2)
            }
          }
        }
      }
    });

    massChart.current = new Chart(massChartRef.current, {
      type: "bar",
      data: {
        labels: masses,
        datasets: [
          {
            label: "Probability vs Virus Mass (fg)",
            data: probs,
            backgroundColor: "#ff8800"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: (value) => Number(value).toExponential(2)
            }
          }
        }
      }
    });
  }, [v6, idStart, idEnd]);

  // ---------------------------------------------------------
  // FRONTEND UI
  // ---------------------------------------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h2>VCE 100 V6 Dashboard (Restored Physics)</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "320px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Base Frequency (Hz):</label>
        <input
          type="number"
          value={baseFreq}
          readOnly
          style={{ marginLeft: "10px", width: "200px", background: "#eef" }}
        />
      </div>

      <label>Threshold Frequency (Hz):</label>
      <input
        type="number"
        step="0.0000001"
        value={thresholdHz}
        onChange={(e) => setThresholdHz(e.target.value)}
        style={{ width: "200px", marginLeft: "10px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <label>Virus ID Start:</label>
        <input
          type="number"
          min="1"
          max="100"
          value={idStart}
          onChange={(e) => setIdStart(Number(e.target.value))}
          style={{ width: "100px", marginLeft: "10px" }}
        />

        <label style={{ marginLeft: "20px" }}>Virus ID End:</label>
        <input
          type="number"
          min="1"
          max="100"
          value={idEnd}
          onChange={(e) => setIdEnd(Number(e.target.value))}
          style={{ width: "100px", marginLeft: "10px" }}
        />
      </div>

      <button
        onClick={runV6}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0078ff",
          color: "white",
          borderRadius: "6px",
          marginTop: "20px"
        }}
      >
        RUN V6
      </button>

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!v6 ? (
        <div style={{ marginTop: "30px", color: "#555" }}>
          <h3>V6 Model Offline</h3>
        </div>
      ) : (
        <>
          <h3 style={{ marginTop: "30px" }}>Probability vs Virus ID</h3>
          <div style={{ width: "100%", height: "120px" }}>
            <canvas ref={probChartRef} />
          </div>

          <h3 style={{ marginTop: "30px" }}>Probability vs Virus Mass (fg)</h3>
          <div style={{ width: "100%", height: "120px" }}>
            <canvas ref={massChartRef} />
          </div>

          <h3 style={{ marginTop: "40px" }}>V6 Virus Probability Table</h3>
          <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Virus ID</th>
                <th>Virus Name</th>
                <th>Mass (fg)</th>
                <th>Probability</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(v6.results)
                .map(Number)
                .filter((id) => id >= idStart && id <= idEnd)
                .map((id) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{v6.virus_names[id]}</td>
                    <td>{v6.virus_masses_fg[id]}</td>
                    <td>{v6.results[id].toExponential(3)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
