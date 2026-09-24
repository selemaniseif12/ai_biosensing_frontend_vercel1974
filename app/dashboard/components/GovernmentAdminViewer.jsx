"use client";
import React, { useEffect, useState } from "react";

export default function GovernmentAdminViewer() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecords() {
      try {
        const res = await fetch("/api/government/all");
        const data = await res.json();

        if (data.success) {
          setRecords(data.data);
        }
      } catch (err) {
        console.error("Error loading government records:", err);
      }

      setLoading(false);
    }

    loadRecords();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
        Government Communication Records
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        View all incoming messages submitted by government agencies.
      </p>

      {loading && <p>Loading records...</p>}

      {!loading && records.length === 0 && (
        <p>No government messages found.</p>
      )}

      {!loading && records.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {records.map((rec) => (
            <div
              key={rec.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>{rec.organization}</h3>
              <p><strong>Department:</strong> {rec.department || "N/A"}</p>
              <p><strong>Contact:</strong> {rec.contactName}</p>
              <p><strong>Email:</strong> {rec.email}</p>
              <p><strong>Phone:</strong> {rec.phone || "N/A"}</p>
              <p><strong>Country:</strong> {rec.country || "N/A"}</p>
              <p><strong>Priority:</strong> {rec.priority}</p>
              <p style={{ marginTop: "10px" }}>
                <strong>Message:</strong><br />
                {rec.message}
              </p>
              <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
                Submitted: {new Date(rec.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
