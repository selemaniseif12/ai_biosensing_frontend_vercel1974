"use client";
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

export default function MlDrift() {
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(100);
  const [threshold, setThreshold] = useState(0.1);

  const [timeData, setTimeData] = useState([]);
  const [freqData, setFreqData] = useState([]);
  const [driftData, setDriftData] = useState([]);

  const [baseFreq, setBaseFreq] = useState(null);
  const [currentFreq, setCurrentFreq] = useState(null);

  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const initSweep = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/sensor/live_init?start_time=${startTime}&stop_time=${stopTime}`
    );
    const data = await res.json();
    setBaseFreq(data.base_frequency_hz);
  };

  const startLiveSweep = async () => {
    await initSweep();
    setTimeData([]);
    setFreqData([]);
    setDriftData([]);
    setCurrentFreq(null);
    setRunning(true);
  };

  const stopLiveSweep = () => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!running) return;

    const fetchTick = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/sensor/live_tick?threshold=${threshold}`
      );
      const data = await res.json();

      if (data.done) {
        setCurrentFreq(data.measured_frequency_hz);
        stopLiveSweep();
        return;
      }

      setTimeData((prev) => [...prev, data.time_s]);
      setFreqData((prev) => [...prev, data.measured_frequency_hz]);
      setDriftData((prev) => [...prev, data.drift_hz]);
      setCurrentFreq(data.measured_frequency_hz);

      if (baseFreq === null) {
        setBaseFreq(data.base_frequency_hz);
      }
    };

    fetchTick();
    intervalRef.current = setInterval(fetchTick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, threshold]);

  return (
    <div style={{ padding: "20px" }}>
      {/* EDUCATIONAL BLOCK */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          lineHeight: "1.6"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          ML Drift Demonstration: Understanding the Base Frequency 1693999.683456560131
        </h2>

        <p>
          Our machine-learning drift demonstration experiment highlights one of the
          foundational principles behind our patented Piezo-Pico-Femtotechnology™ sensor
          platform...
        </p>

        <p
          style={{
            backgroundColor: "#fff3cd",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          <strong>Demo Note (V2/V6 Comparison):</strong> In the V2/V6 comparison
          demonstration dashboard, the user must click <strong>Run Comparison</strong>{" "}
          twice — first loads tables, second loads charts.
        </p>

        <p>
          Classification begins the moment the measured frequency drops below the integer
          portion of the base frequency (1693999)...
        </p>

        <h3 style={{ marginTop: "25px" }}>Threshold Adjustment Guidance</h3>

        <p>Experiment with threshold values:</p>

        <p style={{ fontFamily: "monospace", marginLeft: "20px" }}>
          0.1<br />
          0.01<br />
          0.001<br />
          0.0001<br />
          0.00001<br />
          0.000001<br />
          0.0000001<br />
          0.00000001<br />
          0.000000001<br />
          0.0000000001
        </p>

        <p>
          Each reduction reveals deeper drift behavior and exposes subtle mass-based
          perturbations...
        </p>
      </div>

      {/* LIVE SWEEP CONTROLS */}
      <h2>Live Frequency vs Time</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Start Time (s):</label>
        <input
          type="number"
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stop Time (s):</label>
        <input
          type="number"
          value={stopTime}
          onChange={(e) => setStopTime(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Threshold (Hz):</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "6px" }}
        />
      </div>

      <button
        onClick={startLiveSweep}
        disabled={running}
        style={{
          padding: "10px 20px",
          backgroundColor: running ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: running ? "default" : "pointer",
          marginTop: "10px",
          marginRight: "10px"
        }}
      >
        Start Live Sweep
      </button>

      <button
        onClick={stopLiveSweep}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Stop
      </button>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <p>
          <strong>Base Frequency (Hz):</strong>{" "}
          {baseFreq !== null ? baseFreq.toFixed(12) : "-"}
        </p>

        <p>
          <strong>Measured Frequency (Hz):</strong>{" "}
          {currentFreq !== null ? currentFreq.toFixed(12) : "-"}
        </p>
      </div>

      {/* CHARTS */}
      {freqData.length > 0 && (
        <>
          <h3>Frequency Samples (Hz)</h3>
          <Line
            data={{
              labels: timeData,
              datasets: [
                {
                  label: `Frequency (Hz) - threshold ${threshold}`,
                  data: freqData,
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.3)",
                  borderWidth: 2,
                  tension: 0.3,
                  pointRadius: 0
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: { title: { display: true, text: "Frequency (Hz)" } },
                x: { title: { display: true, text: "Time (s)" } }
              }
            }}
          />

          <h3 style={{ marginTop: "40px" }}>Drifted Frequency (Hz)</h3>

          <Line
            data={{
              labels: timeData,
              datasets: [
                {
                  label: "Drift (Hz)",
                  data: driftData,
                  borderColor: "orange",
                  backgroundColor: "rgba(255, 159, 64, 0.3)",
                  borderWidth: 2,
                  tension: 0.3,
                  pointRadius: 0
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: { title: { display: true, text: "Drift (Hz)" } },
                x: { title: { display: true, text: "Time (s)" } }
              }
            }}
          />

          {/* ⭐ SIDE-BY-SIDE TABLES */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px"
            }}
          >
            {/* LEFT TABLE — MEASURED FREQUENCY */}
            <div style={{ flex: 1 }}>
              <h3>Time vs Measured Frequency</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px"
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Time (s)
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Measured Frequency (Hz)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeData.map((t, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {t}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {freqData[i].toFixed(12)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT TABLE — DRIFT FREQUENCY */}
            <div style={{ flex: 1 }}>
              <h3>Time vs Drift Frequency</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px"
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Time (s)
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Drift Frequency (Hz)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeData.map((t, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {t}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {driftData[i].toFixed(12)}
                      </td>
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
