"use client";
import { useEffect, useState } from "react";

export default function ConsultingPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/payments/history/consulting")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.payments || []);
        setLoading(false);
      })
      .catch(() => {
        setPayments([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Consulting Payment History</h1>

      {loading && <p>Loading payment history...</p>}

      {!loading && payments.length === 0 && (
        <p style={{ color: "gray" }}>No consulting payments found.</p>
      )}

      {!loading && payments.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={cellStyle}>Payment ID</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Currency</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td style={cellStyle}>{p.id}</td>
                <td style={cellStyle}>${(p.amount / 100).toFixed(2)}</td>
                <td style={cellStyle}>{p.currency.toUpperCase()}</td>
                <td style={cellStyle}>{new Date(p.created * 1000).toLocaleString()}</td>
                <td style={cellStyle}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};
