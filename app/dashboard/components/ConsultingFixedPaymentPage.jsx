"use client";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default function ConsultingFixedPaymentPage() {
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

      // 1️⃣ Create PaymentIntent
      const response = await axios.post(`${apiUrl}/payments/consulting/fixed`, {
        user_id: userId
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
      console.error("Consulting fixed payment error:", error);
      setMessage("Payment failed. Check backend logs.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Consulting Payment — Fixed Fee</h2>
      <p>This consulting session costs <strong>$199 CAD</strong>.</p>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        {loading ? "Processing..." : "Pay $199"}
      </button>

      {message && (
        <p style={{ marginTop: "20px", color: "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
