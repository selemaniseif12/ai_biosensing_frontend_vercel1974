"use client";
export default function EnrollmentStatus() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Full Stack API Engineer — Enrollment Status</h2>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #ddd",
          maxWidth: "500px"
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#dc3545" }}>
          Enrollment is currently FULL
        </p>

        <ul style={{ marginTop: "15px", lineHeight: "1.8" }}>
          <li><strong>Fall 2026:</strong> Enrollment FULL</li>
          <li><strong>Spring/Summer 2027:</strong> Enrollment FULL</li>
          <li><strong>Next Enrollment:</strong> September 1, 2027</li>
          <li><strong>Fall 2027 Enrollment Opens:</strong> Early June 2027</li>
        </ul>

        <button
          disabled
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "not-allowed",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Enrollment Full
        </button>
      </div>
    </div>
  );
}
