"use client";
export default function ActivityDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Activity Dashboard</h2>
      <p>This dashboard will display activity data from the backend.</p>

      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
      }}>
        <p>Backend endpoint: <strong>/activity/status</strong></p>
      </div>
    </div>
  );
}
