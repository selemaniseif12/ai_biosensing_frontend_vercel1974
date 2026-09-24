"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function VCE100CompareDashboard() {
  const [token, setToken] = useState("");
  const [features, setFeatures] = useState(null);
  const [v2, setV2] = useState(null);
  const [v6, setV6] = useState(null);

  const [thresholdHz, setThresholdHz] = useState(0.1);
  const [idStart, setIdStart] = useState(1);
  const [idEnd, setIdEnd] = useState(100);

  const [error, setError] = useState(null);

  const chartV2_ID = useRef(null);
  const chartV6_ID = useRef(null);
  const chartV2_Mass = useRef(null);
  const chartV6_Mass = useRef(null);

  let instV2_ID = useRef(null);
  let instV6_ID = useRef(null);
  let instV2_Mass = useRef(null);
  let instV6_Mass = useRef(null);

  const runCompare = async () => {
    setError(null);
    setV2(null);
    setV6(null);

    if (!token) {
      setError("Token required");
      return;
    }

    try {
      const sim = await axios.get("http://127.0.0.1:8000/simulate", {
        params: { token }
      });

      const feats = sim.data.features;

      setFeatures({
        base_frequency_hz: sim.data.base_frequency_hz,
        measured_frequency_hz: sim.data.measured_frequency_hz,
        features: feats
      });

      const v2res = await axios.post(
        "http://127.0.0.1:8000/classify/v2",
        {
          features: feats,
          threshold_hz: Number(thresholdHz),
          input_frequency_mhz: null
        },
        { params: { token } }
      );

      const v6res = await axios.post(
        "http://127.0.0.1:8000/classify/v6",
        {
          features: feats,
          threshold_hz: Number(thresholdHz),
          input_frequency_mhz: null
        },
        { params: { token } }
      );

      await axios.post(
        "http://127.0.0.1:8000/classify/compare",
        {
          features: feats,
          threshold_hz: Number(thresholdHz)
        },
        { params: { token } }
      );

      setV2(v2res.data);
      setV6(v6res.data);

    } catch (err) {
      console.error("Compare error:", err);
      setError("Invalid token or server error");
    }
  };

  useEffect(() => {
    // ⭐ OFFLINE GUARD — prevents crashes
    if (!v2 || !v6 || !v2.virus_probabilities || !v6.virus_probabilities) return;

    const idsV2 = Object.keys(v2.virus_probabilities)
      .map(Number)
      .filter((id) => id >= idStart && id <= idEnd && id !== 0);

    const idsV6 = Object.keys(v6.virus_probabilities)
      .map(Number)
      .filter((id) => id >= idStart && id <= idEnd && id !== 0);

    if (instV2_ID.current) instV2_ID.current.destroy();
    instV2_ID.current = new Chart(chartV2_ID.current, {
      type: "bar",
      data: {
        labels: idsV2,
        datasets: [
          {
            label: "V2 Probability",
            data: idsV2.map((id) => v2.virus_probabilities[id] ?? 0),
            backgroundColor: "rgba(0, 120, 255, 0.6)"
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Virus ID" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });

    if (instV6_ID.current) instV6_ID.current.destroy();
    instV6_ID.current = new Chart(chartV6_ID.current, {
      type: "bar",
      data: {
        labels: idsV6,
        datasets: [
          {
            label: "V6 Probability",
            data: idsV6.map((id) => v6.virus_probabilities[id] ?? 0),
            backgroundColor: "rgba(255, 136, 0, 0.6)"
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Virus ID" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });

    if (instV2_Mass.current) instV2_Mass.current.destroy();
    instV2_Mass.current = new Chart(chartV2_Mass.current, {
      type: "bar",
      data: {
        labels: idsV2.map((id) => v2.virus_masses_fg[id]),
        datasets: [
          {
            label: "V2 Probability vs Mass",
            data: idsV2.map((id) => v2.virus_probabilities[id] ?? 0),
            backgroundColor: "rgba(0, 120, 255, 0.6)"
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Virus Mass (fg)" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });

    if (instV6_Mass.current) instV6_Mass.current.destroy();
    instV6_Mass.current = new Chart(chartV6_Mass.current, {
      type: "bar",
      data: {
        labels: idsV6.map((id) => v6.virus_masses_fg[id]),
        datasets: [
          {
            label: "V6 Probability vs Mass",
            data: idsV6.map((id) => v6.virus_probabilities[id] ?? 0),
            backgroundColor: "rgba(255, 136, 0, 0.6)"
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Virus Mass (fg)" } },
          y: { title: { display: true, text: "Probability" } }
        }
      }
    });

  }, [v2, v6, idStart, idEnd]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>VCE‑100 V2/V6 Compare Dashboard</h2>

      <div
        style={{
          backgroundColor: "#f0f8ff",
          borderLeft: "5px solid #0078ff",
          padding: "15px",
          marginTop: "15px",
          marginBottom: "25px",
          borderRadius: "6px",
          lineHeight: "1.6"
        }}
      >
        <p>
          The V2/V6 comparison shows how physical sensor limitations affect ML detection.
        </p>
        <p style={{ marginTop: "10px" }}>
          Explore the differences using the exposed V2, V6, and combined datasets.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          placeholder="Enter your token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>

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
        onClick={runCompare}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0078ff",
          color: "white",
          borderRadius: "6px",
          marginTop: "20px"
        }}
      >
        RUN COMPARE
      </button>

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* ⭐ OFFLINE GUARD */}
      {!v2 || !v6 || !v2.virus_probabilities || !v6.virus_probabilities ? (
        <div style={{ marginTop: "30px", color: "#555" }}>
          <h3>Compare Models Offline</h3>
          <p>The V2/V6 compare classifier is offline. Charts and tables will appear once models are deployed.</p>
        </div>
      ) : (
        <>
          <h3>V2 Probability vs Virus ID</h3>
          <canvas ref={chartV2_ID} style={{ width: "100%", height: "240px" }} />

          <h3 style={{ marginTop: "40px" }}>V6 Probability vs Virus ID</h3>
          <canvas ref={chartV6_ID} style={{ width: "100%", height: "240px" }} />

          <h3 style={{ marginTop: "40px" }}>V2 Probability vs Virus Mass (fg)</h3>
          <canvas ref={chartV2_Mass} style={{ width: "100%", height: "240px" }} />

          <h3 style={{ marginTop: "40px" }}>V6 Probability vs Virus Mass (fg)</h3>
          <canvas ref={chartV6_Mass} style={{ width: "100%", height: "240px" }} />

          <div style={{ display: "flex", marginTop: "40px", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <h3>V2 Results</h3>
              <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Virus ID</th>
                    <th>Name</th>
                    <th>Probability</th>
                    <th>Mass (fg)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(v2.virus_probabilities)
                    .map(Number)
                    .filter((id) => id >= idStart && id <= idEnd && id !== 0)
                    .map((id) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{v2.virus_names[id]}</td>
                        <td>{v2.virus_probabilities[id]?.toFixed(10) ?? "0.0000000000"}</td>
                        <td>{v2.virus_masses_fg[id]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div style={{ flex: 1 }}>
              <h3>V6 Results</h3>
              <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Virus ID</th>
                    <th>Name</th>
                    <th>Probability</th>
                    <th>Mass (fg)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(v6.virus_probabilities)
                    .map(Number)
                    .filter((id) => id >= idStart && id <= idEnd && id !== 0)
                    .map((id) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{v6.virus_names[id]}</td>
                        <td>{v6.virus_probabilities[id]?.toFixed(10) ?? "0.0000000000"}</td>
                        <td>{v6.virus_masses_fg[id]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
