"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function VCE100V6Dashboard() {
  const [features, setFeatures] = useState(null);
  const [v6, setV6] = useState(null);

  const [thresholdHz, setThresholdHz] = useState(0.1);
  const [idStart, setIdStart] = useState(1);
  const [idEnd, setIdEnd] = useState(100);

  // Chart refs
  const probChartRef = useRef(null);
  const massChartRef = useRef(null);
  let probChart = useRef(null);
  let massChart = useRef(null);

  const runV6 = async () => {
    try {
      const sim = await axios.get("http://127.0.0.1:8000/simulate");
      const feats = sim.data.features;

      setFeatures({
        base_frequency_hz: sim.data.base_frequency_hz,
        measured_frequency_hz: sim.data.measured_frequency_hz,
        features: feats
      });

      const v6res = await axios.post("http://127.0.0.1:8000/dashboard/v6", {
        features: feats,
        threshold_hz: thresholdHz
      });

      setV6(v6res.data);
    } catch (err) {
      console.error("V6 error:", err);
    }
  };

  useEffect(() => {
    if (!v6) return;

    const ids = Object.keys(v6.virus_probabilities)
      .map(Number)
      .filter((id) => id >= idStart && id <= idEnd);

    const probs = ids.map((id) => v6.virus_probabilities[id]);
    const masses = ids.map((id) => v6.virus_masses_fg[id]);

    if (probChart.current) probChart.current.destroy();
    if (massChart.current) massChart.current.destroy();

    // ⭐ Line Chart — Probability vs Virus ID
    probChart.current = new Chart(probChartRef.current, {
      type: "line",
      data: {
        labels: ids,
        datasets: [
          {
            label: "Probability",
            data: probs,
            borderColor: "#0078ff",
            backgroundColor: "rgba(0,120,255,0.2)",
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { title: { display: true, text: "Virus ID" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });

    // ⭐ Line Chart — Probability vs Mass
    massChart.current = new Chart(massChartRef.current, {
      type: "line",
      data: {
        labels: masses,
        datasets: [
          {
            label: "Probability",
            data: probs,
            borderColor: "#ff8800",
            backgroundColor: "rgba(255,136,0,0.2)",
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { title: { display: true, text: "Mass (fg)" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });
  }, [v6, idStart, idEnd]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>VCE‑100 v6 Dashboard</h2>

      <label>Frequency Threshold (Hz):</label>
      <input
        type="number"
        step="0.0000001"
        value={thresholdHz}
        onChange={(e) => setThresholdHz(Number(e.target.value))}
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

      {features && (
        <div style={{ marginTop: "20px" }}>
          <h3>Sensor Frequencies</h3>
          <p><strong>Base Frequency (Hz):</strong> {features.base_frequency_hz}</p>
          <p><strong>Measured Frequency (Hz):</strong> {features.measured_frequency_hz}</p>
        </div>
      )}

      {v6 && (
        <>
          <h3>V6 Virus Probabilities</h3>

          <canvas
            ref={probChartRef}
            style={{ width: "100%", height: "150px" }}
          />

          <canvas
            ref={massChartRef}
            style={{ width: "100%", height: "150px", marginTop: "20px" }}
          />

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
              {Object.keys(v6.virus_probabilities)
                .map(Number)
                .filter((id) => id >= idStart && id <= idEnd)
                .map((id) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{v6.virus_names[id]}</td>
                    <td>{v6.virus_masses_fg[id]}</td>
                    <td>{v6.virus_probabilities[id].toFixed(10)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
