"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function CoursePaymentPage({ courseId, price }) {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  async function pay() {
    try {
      setLoading(true);

      if (!apiUrl || !stripePk) {
        alert("Missing API URL or Stripe publishable key.");
        return;
      }

      const storedId = localStorage.getItem("user_id");
      const userId = Number(storedId);

      if (!userId || userId <= 0) {
        alert("Invalid user ID. Please log in again.");
        return;
      }

      const cid = Number(courseId);
      if (!cid || cid <= 0) {
        alert("Invalid course ID.");
        return;
      }

      const coursePrice = Number(price);
      if (!coursePrice || coursePrice <= 0) {
        alert("Invalid course price.");
        return;
      }

      // 1️⃣ Create PaymentIntent
      const res = await fetch(`${apiUrl}/payments/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          course_id: cid,
          price: coursePrice,
        }),
      });

      const data = await res.json();

      const clientSecret = data.client_secret;

      if (!clientSecret) {
        alert("Backend did not return client_secret.");
        return;
      }

      // 2️⃣ Load Stripe.js
      const stripe = await loadStripe(stripePk);

      // 3️⃣ Confirm payment using Stripe.js
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // Your card element goes here
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        alert("Payment successful!");
      }

    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Course Payment</h3>
      <p>Course ID: {courseId}</p>
      <p>Price: ${price}</p>

      <button
        onClick={pay}
        disabled={loading}
        style={{
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
