"use client";
import { useState } from "react";

export default function MLTrainingV6() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function runTraining() {
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/dashboard/ml/train/v6");

      if (!res.ok) {
        const err = await res.json();
        setError(err.detail || "Error fetching training V6");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("Server unreachable");
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">ML Training V6</h2>

      <button
        onClick={runTraining}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Execute
      </button>

      {error && (
        <div className="text-red-600 font-semibold mt-4">{error}</div>
      )}

      {result && (
        <div className="border p-4 rounded mt-4 space-y-2">
          <div><strong>Model Name:</strong> {result.model_name}</div>
          <div><strong>Dataset Size:</strong> {result.dataset_size}</div>
          <div><strong>Status:</strong> {result.status}</div>
          <div><strong>Accuracy:</strong> {result.accuracy}%</div>
          <div><strong>Loss:</strong> {result.loss}</div>
          <div><strong>Last Trained:</strong> {result.last_trained}</div>
          <div><strong>Epochs:</strong> {result.epochs}</div>
          <div><strong>Training Time (min):</strong> {result.training_time_minutes}</div>

          <h3 className="font-semibold text-xl mt-4">Logs</h3>
          {result.logs.map((log, idx) => (
            <div key={idx} className="border p-2 rounded bg-gray-100">
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
