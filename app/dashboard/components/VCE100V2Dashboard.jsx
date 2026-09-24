"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function VCE100V2Dashboard() {
  const [token, setToken] = useState("");
  const [v2, setV2] = useState(null);

  const [baseFreq, setBaseFreq] = useState("");
  const [measuredFreq, setMeasuredFreq] = useState("");
  const [thresholdHz, setThresholdHz] = useState(0.1);

  const [idStart, setIdStart] = useState(1);
  const [idEnd, setIdEnd] = useState(100);

  const [error, setError] = useState(null);

  const probChartRef = useRef(null);
  const massChartRef = useRef(null);
  const probChart = useRef(null);
  const massChart = useRef(null);

  const runV2 = async () => {
    setError(null);
    setV2(null);

    if (!token) {
      setError("Token required");
      return;
    }

    try {
      // AUTO‑FILL FREQUENCIES FROM SIMULATE ENDPOINT
      const sim = await axios.get("http://127.0.0.1:8000/simulate", {
        params: { token }
      });

      const base_frequency_hz = sim.data.base_frequency_hz;
      const measured_frequency_hz = sim.data.measured_frequency_hz;

      setBaseFreq(base_frequency_hz);
      setMeasuredFreq(measured_frequency_hz);

      // RUN V2 CLASSIFICATION
      const res = await axios.post(
        "http://127.0.0.1:8000/classify/v2",
        {
          base_frequency_hz,
          measured_frequency_hz,
          threshold_hz: thresholdHz
        },
        { params: { token } }
      );

      setV2(res.data);
    } catch (err) {
      console.error("V2 error:", err);
      setError("Invalid token or server error");
    }
  };

  useEffect(() => {
    if (!v2 || !v2.results || !v2.chart_data) return;

    const ids = Object.keys(v2.results)
      .map(Number)
      .filter(id => id >= idStart && id <= idEnd);

    const probs = ids.map(id => v2.results[id]);

    const masses = ids.map(id => {
      const entry = v2.chart_data.find(x => x.virus_id === id);
      return entry ? entry.mass_fg : 0;
    });

    if (probChart.current) probChart.current.destroy();
    if (massChart.current) massChart.current.destroy();

    // CHART 1 — Probability vs Virus ID
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
          x: { title: { display: true, text: "Virus ID" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });

    // CHART 2 — Probability vs Virus Mass (fg)
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
          x: { title: { display: true, text: "Mass (fg)" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });
  }, [v2, idStart, idEnd]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>VCE‑100 V2 Dashboard</h2>

      {/* TOKEN */}
      <div style={{ marginBottom: "20px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          placeholder="Enter your V2 token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "320px" }}
        />
      </div>

      {/* AUTO‑FILLED FREQUENCIES */}
      <div style={{ marginBottom: "20px" }}>
        <label>Base Frequency (Hz):</label>
        <input
          type="number"
          value={baseFreq}
          readOnly
          style={{ marginLeft: "10px", width: "200px", background: "#eef" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Measured Frequency (Hz):</label>
        <input
          type="number"
          value={measuredFreq}
          readOnly
          style={{ marginLeft: "10px", width: "200px", background: "#eef" }}
        />
      </div>

      {/* THRESHOLD */}
      <label>Threshold Frequency (Hz):</label>
      <input
        type="number"
        step="0.0000001"
        value={thresholdHz}
        onChange={(e) => setThresholdHz(Number(e.target.value))}
        style={{ width: "200px", marginLeft: "10px" }}
      />

      {/* ID FILTERS */}
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

      {/* RUN BUTTON */}
      <button
        onClick={runV2}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0078ff",
          color: "white",
          borderRadius: "6px",
          marginTop: "20px"
        }}
      >
        RUN V2
      </button>

      {/* ERRORS */}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* OFFLINE */}
      {!v2 || !v2.results ? (
        <div style={{ marginTop: "30px", color: "#555" }}>
          <h3>V2 Model Offline</h3>
          <p>The V2 classifier is currently offline.</p>
        </div>
      ) : (
        <>
          {/* CHARTS */}
          <h3 style={{ marginTop: "30px" }}>Probability vs Virus ID</h3>
          <div style={{ width: "100%", height: "120px" }}>
            <canvas ref={probChartRef} />
          </div>

          <h3 style={{ marginTop: "30px" }}>Probability vs Virus Mass (fg)</h3>
          <div style={{ width: "100%", height: "120px" }}>
            <canvas ref={massChartRef} />
          </div>

          {/* TABLE */}
          <h3 style={{ marginTop: "40px" }}>Virus ID vs Probability (Table)</h3>
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
              {Object.keys(v2.results)
                .map(Number)
                .filter(id => id >= idStart && id <= idEnd)
                .map(id => {
                  const entry = v2.chart_data.find(x => x.virus_id === id);
                  const mass = entry ? entry.mass_fg : 0;
                  const name = v2.virus_names[id];

                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{mass}</td>
                      <td>{v2.results[id].toFixed(10)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
