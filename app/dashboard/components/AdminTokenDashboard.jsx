"use client";
import React, { useState, useEffect } from "react";

export default function AdminTokenDashboard() {
  const [tokens, setTokens] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchTokens() {
    try {
      const response = await fetch("http://127.0.0.1:8000/tokens/list");
      const data = await response.json();
      setTokens(data.tokens || []);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }

  async function issueToken() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/tokens/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_name: serviceName,
          user_id: userId
        })
      });

      const data = await response.json();

      if (data.token) {
        setMessage(`Token issued: ${data.token}`);
        fetchTokens();
      } else {
        setMessage("Token issue failed");
      }
    } catch (error) {
      console.error("Error issuing token:", error);
      setMessage("Error issuing token");
    }

    setLoading(false);
  }

  async function revokeToken(token) {
    try {
      const response = await fetch("http://127.0.0.1:8000/tokens/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Token revoked");
        fetchTokens();
      } else {
        setMessage("Failed to revoke token");
      }
    } catch (error) {
      console.error("Error revoking token:", error);
      setMessage("Error revoking token");
    }
  }

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Token Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Issue New Token</h3>

        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button onClick={issueToken} disabled={loading}>
          {loading ? "Issuing..." : "Issue Token"}
        </button>

        {message && <p>{message}</p>}
      </div>

      <div>
        <h3>All Tokens</h3>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Token</th>
              <th>Service</th>
              <th>User</th>
              <th>Issued At</th>
              <th>Expires At</th>
              <th>Revoked</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tokens.map((t, index) => (
              <tr key={index}>
                <td>{t.token}</td>
                <td>{t.service_name}</td>
                <td>{t.user_id}</td>
                <td>{t.issued_at}</td>
                <td>{t.expires_at}</td>
                <td>{t.revoked ? "Yes" : "No"}</td>
                <td>
                  {!t.revoked && (
                    <button onClick={() => revokeToken(t.token)}>
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
