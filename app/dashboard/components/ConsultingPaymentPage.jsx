"use client";
import { useState } from "react";
import axios from "axios";

export default function ConsultingPaymentPage() {
  const [consultingFee, setConsultingFee] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handlePayment = async () => {
    setMessage("");

    if (!consultingFee || isNaN(consultingFee)) {
      setMessage("Please enter a valid consulting fee.");
      return;
    }

    setLoading(true);

    try {
      const userId = localStorage.getItem("user_id");

      const response = await axios.post(`${apiUrl}/payments/consulting/custom`, {
        user_id: Number(userId),
        consulting_fee: Number(consultingFee)
      });

      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        setMessage("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Consulting payment error:", error);
      setMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Consulting Payment</h2>

      <label>Enter Consulting Fee (CAD):</label>
      <input
        type="number"
        value={consultingFee}
        onChange={(e) => setConsultingFee(e.target.value)}
        placeholder="Enter amount"
        style={{
          display: "block",
          marginTop: "10px",
          marginBottom: "20px",
          padding: "10px",
          width: "250px"
        }}
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>

      {message && (
        <p style={{ marginTop: "20px", color: "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
