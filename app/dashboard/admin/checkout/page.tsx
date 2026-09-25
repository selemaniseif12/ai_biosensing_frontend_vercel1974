"use client";

import { useEffect, useState } from "react";

interface CartItem {
  item_id: number;
  item_name: string;
  price_usd: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const USER_ID = 1;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch(`${API_BASE}/cart?user_id=${USER_ID}`);

        if (!res.ok) {
          let msg = "Error loading cart";
          try {
            const err = await res.json();
            msg = err.detail || msg;
          } catch {}
          setError(msg);
          setLoading(false);
          return;
        }

        const data = await res.json();
        const items = Array.isArray(data) ? data : [];

        setCart(items);

        const sum = items.reduce(
          (acc, item) => acc + item.price_usd * item.quantity,
          0
        );
        setTotal(sum);
      } catch {
        setError("Backend unreachable — cannot load cart.");
      }

      setLoading(false);
    }

    loadCart();
  }, []);

  async function finalizePurchase() {
    try {
      const res = await fetch(`${API_BASE}/checkout?user_id=${USER_ID}`, {
        method: "POST",
      });

      if (!res.ok) {
        setStatus("Checkout failed. Try again.");
        return;
      }

      await res.json();
      setStatus("Purchase successful! Receipt generated.");
    } catch {
      setStatus("Checkout error.");
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading checkout...</div>;
  if (error)
    return (
      <div style={{ padding: 20, color: "red", fontWeight: "bold" }}>
        {error}
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ maxWidth: "600px" }}>
          <h2>Receipt</h2>

          <div
            style={{
              padding: "15px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              marginBottom: "20px",
            }}
          >
            {cart.map((item) => (
              <div
                key={item.item_id}
                style={{
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f0f8ff, #e6f7ff)",
                  border: "1px solid #cce7ff",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                }}
              >
                <h3
                  style={{
                    color: "#007bff",
                    marginBottom: "6px",
                    fontWeight: "600",
                  }}
                >
                  {item.item_name}
                </h3>

                <p style={{ margin: "4px 0", color: "#333" }}>
                  <strong>Quantity:</strong> {item.quantity}
                </p>

                <p style={{ margin: "4px 0", color: "#333" }}>
                  <strong>Price:</strong> ${item.price_usd.toFixed(2)}
                </p>
              </div>
            ))}

            <h3
              style={{
                marginTop: "20px",
                fontSize: "22px",
                color: "#222",
                fontWeight: "700",
              }}
            >
              Total: ${total.toFixed(2)}
            </h3>
          </div>

          <button
            onClick={finalizePurchase}
            style={{
              padding: "12px 18px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
          >
            Confirm Purchase
          </button>

          {status && (
            <p
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                color: status.includes("successful") ? "green" : "red",
              }}
            >
              {status}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
