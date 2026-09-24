"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SubscriptionStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatus({ active: false, reason: "Not logged in" });
        setLoading(false);
        return;
      }

      const res = await axios.get("http://127.0.0.1:8000/subscription/status", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStatus(res.data);
    } catch (err) {
      console.error("Subscription status error:", err);
      setStatus({ active: false, reason: "Unable to fetch subscription" });
    }

    setLoading(false);
  };

  const activateSubscription = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to activate a subscription.");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/subscription/activate",
        {
          plan_name: "premium",
          duration_days: 30,
          payment_reference: "web-activation"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Subscription activated!");
      fetchStatus();
    } catch (err) {
      console.error("Activation error:", err);
      alert("Failed to activate subscription.");
    }
  };

  const renewSubscription = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to renew.");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/subscription/renew",
        { duration_days: 30 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Subscription renewed!");
      fetchStatus();
    } catch (err) {
      console.error("Renew error:", err);
      alert("Failed to renew subscription.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      fetchStatus();
    } else {
      setStatus({ active: false, reason: "Not logged in" });
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading subscription...</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Subscription Status</h2>

      {status.active ? (
        <div>
          <p><strong>Plan:</strong> {status.plan}</p>
          <p><strong>Expires:</strong> {new Date(status.expires).toLocaleString()}</p>
          <p style={{ color: "green" }}>Your subscription is active.</p>

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#0078ff",
              color: "white",
              borderRadius: "6px",
              marginTop: "10px"
            }}
            onClick={renewSubscription}
          >
            Renew Subscription
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: "red" }}>Subscription inactive.</p>
          <p>{status.reason}</p>

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "6px",
              marginTop: "10px"
            }}
            onClick={activateSubscription}
          >
            Activate Subscription
          </button>

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#555",
              color: "white",
              borderRadius: "6px",
              marginTop: "10px",
              marginLeft: "10px"
            }}
            onClick={() => window.location.href = "/dashboard/admin/store"}
          >
            Go to Store
          </button>
        </div>
      )}
    </div>
  );
}
