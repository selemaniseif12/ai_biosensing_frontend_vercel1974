"use client"
import React, { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000"; // Adjust if your backend runs elsewhere

export default function ConsultationDashboard() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/consultations/dashboard/upcoming`)
      .then((res) => res.json())
      .then((data) => {
        setConsultations(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading consultations...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Consultation Dashboard</h2>
      <p>All pending and scheduled consultations appear here.</p>

      {consultations.length === 0 && (
        <p>No consultations found.</p>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={cell}>ID</th>
            <th style={cell}>Topic</th>
            <th style={cell}>Client Email</th>
            <th style={cell}>Status</th>
            <th style={cell}>Scheduled Time</th>
            <th style={cell}>Meeting Link</th>
          </tr>
        </thead>

        <tbody>
          {consultations.map((c) => (
            <tr key={c.id}>
              <td style={cell}>{c.id}</td>
              <td style={cell}>{c.topic}</td>
              <td style={cell}>{c.email}</td>
              <td style={cell}>{c.status || "pending"}</td>
              <td style={cell}>
                {c.scheduled_time
                  ? new Date(c.scheduled_time).toLocaleString()
                  : "Not scheduled"}
              </td>
              <td style={cell}>
                {c.meeting_link ? (
                  <a href={c.meeting_link} target="_blank" rel="noreferrer">
                    Join Meeting
                  </a>
                ) : (
                  "No meeting link"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cell = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};
