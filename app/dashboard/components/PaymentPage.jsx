"use client";

import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function PaymentPage() {
  const userId = 1; // temporary

  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!courseId) {
      setMessage("Please enter a Course ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_BASE}/create-checkout-session`, {
        course_id: Number(courseId),
        user_id: userId,
      });

      if (response.data.id) {
        // Stripe session ID returned
        window.location.href = `https://checkout.stripe.com/pay/${response.data.id}`;
      } else if (response.data.checkout_url) {
        // If you return a full URL instead
        window.location.href = response.data.checkout_url;
      } else {
        setMessage("Failed to create checkout session.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Payment failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Stripe Payment</h2>
      <p>Enter Course ID to generate a Stripe Checkout session.</p>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          style={btnStyle}
        >
          {loading ? "Processing..." : "Pay with Stripe"}
        </button>
      </div>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
  width: "300px",
};

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
