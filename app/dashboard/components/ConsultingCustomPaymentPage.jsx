"use client";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default function ConsultingCustomPaymentPage() {
  const [consultingFee, setConsultingFee] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const handlePayment = async () => {
    setMessage("");
    setLoading(true);

    try {
      if (!apiUrl || !stripePk) {
        setMessage("Missing API URL or Stripe publishable key.");
        setLoading(false);
        return;
      }

      const storedId = localStorage.getItem("user_id");
      const userId = Number(storedId);

      if (!userId || userId <= 0) {
        setMessage("Invalid user ID. Please log in again.");
        setLoading(false);
        return;
      }

      const fee = Number(consultingFee);

      if (!fee || fee <= 0) {
        setMessage("Please enter a valid consulting fee greater than 0.");
        setLoading(false);
        return;
      }

      // 1️⃣ Create PaymentIntent
      const response = await axios.post(`${apiUrl}/payments/consulting/custom`, {
        user_id: userId,
        consulting_fee: fee
      });

      const clientSecret = response.data.client_secret;

      if (!clientSecret) {
        setMessage("Backend did not return client_secret.");
        setLoading(false);
        return;
      }

      // 2️⃣ Load Stripe.js
      const stripe = await loadStripe(stripePk);

      // 3️⃣ Confirm payment using Stripe.js
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // Your card element goes here
          }
        }
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage("Payment successful!");
      }

    } catch (error) {
      console.error("Consulting custom payment error:", error);
      setMessage("Payment failed. Check backend logs.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Consulting Payment</h2>
      <p>Enter the consulting fee you want to pay.</p>

      <label>Consulting Fee (CAD):</label>
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
