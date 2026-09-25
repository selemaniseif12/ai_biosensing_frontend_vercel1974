"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  item_id: number;
  item_name: string;
  price_usd: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

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
        setCart(Array.isArray(data) ? data : []);
      } catch {
        setError("Backend unreachable — cannot load cart.");
      }

      setLoading(false);
    }

    loadCart();
  }, []);

  async function deleteItem(itemId: number) {
    try {
      const res = await fetch(
        `${API_BASE}/cart/delete?user_id=${USER_ID}&item_id=${itemId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        console.error("Delete failed");
        return;
      }

      setCart((prev) => prev.filter((item) => item.item_id !== itemId));
    } catch {
      console.error("Delete error");
    }
  }

  function goToCheckout() {
    router.push("/dashboard/admin/checkout");
  }

  if (loading) return <div style={{ padding: 20 }}>Loading cart...</div>;
  if (error)
    return (
      <div style={{ padding: 20, color: "red", fontWeight: "bold" }}>
        {error}
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "600px",
          }}
        >
          {cart.map((item) => (
            <div
              key={item.item_id}
              style={{
                padding: "15px",
                borderRadius: "8px",
                background: "#f8f9fa",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "6px" }}>{item.item_name}</h3>

              <p style={{ margin: "4px 0" }}>
                <strong>Item ID:</strong> {item.item_id}
              </p>

              <p style={{ margin: "4px 0" }}>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <p style={{ margin: "4px 0", fontWeight: "bold" }}>
                ${Number(item.price_usd).toFixed(2)}
              </p>

              <button
                onClick={() => deleteItem(item.item_id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete Item
              </button>
            </div>
          ))}

          <button
            onClick={goToCheckout}
            style={{
              marginTop: "20px",
              padding: "12px 18px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
