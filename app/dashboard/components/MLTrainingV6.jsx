"use client";

import { useState } from "react";

export default function MLTrainingV6() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function runTraining() {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/ml/train/v6`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        let errMsg = "Error fetching training V6";

        try {
          const err = await res.json();
          errMsg = err.detail || errMsg;
        } catch {
          // ignore JSON parse errors
        }

        setError(errMsg);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("Server unreachable — backend may be offline.");
    }

    setLoading(false);
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

      {loading && (
        <div className="text-gray-700 font-medium mt-4">
          Running training… please wait.
        </div>
      )}

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
          {result.logs?.map((log, idx) => (
            <div key={idx} className="border p-2 rounded bg-gray-100">
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
