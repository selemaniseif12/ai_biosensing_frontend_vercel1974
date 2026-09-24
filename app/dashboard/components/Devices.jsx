"use client";
export default function Devices({ devices }) {
  if (!devices || devices.length === 0) {
    return (
      <div style={{ padding: "10px", fontStyle: "italic" }}>
        No devices loaded yet. Click the Devices tab.
      </div>
    );
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Device ID</th>
          <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Sensitivity (fg)</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{device.id}</td>
            <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>
              {device.sensitivity_fg}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
