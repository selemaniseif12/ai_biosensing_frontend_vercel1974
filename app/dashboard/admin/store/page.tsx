"use client";

import { useEffect, useState } from "react";

export default function StorePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [addedItemId, setAddedItemId] = useState<number | null>(null);
  const [comingSoonId, setComingSoonId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/store`;
  const USER_ID = 1;

  const allowedNames = [
    "Fixed Consulting Package",
    "Custom Consulting Package",
    "Low-Grade Patented Biosensing Device",
  ];

  const categories = [
    { id: "all", label: "All", color: "#444" },
    { id: "service", label: "Services", color: "#007bff" },
    { id: "course", label: "Courses", color: "#28a745" },
    { id: "digital", label: "Digital", color: "#6f42c1" },
    { id: "physical", label: "Devices", color: "#e83e8c" },
  ];

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${API_BASE}/products`);

        if (!res.ok) {
          let msg = "Error loading products";
          try {
            const err = await res.json();
            msg = err.detail || msg;
          } catch {}
          setError(msg);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError("Backend unreachable — cannot load products.");
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.type === filter);

  async function addToCart(item: any) {
    if (!allowedNames.includes(item.name)) {
      setComingSoonId(item.item_id);
      setTimeout(() => setComingSoonId(null), 2000);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add?user_id=${USER_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item_id: item.item_id }),
        }
      );

      if (res.ok) {
        setAddedItemId(item.item_id);
        setTimeout(() => setAddedItemId(null), 2000);
      }
    } catch {
      console.error("Cart error");
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading store...</div>;
  if (error)
    return (
      <div style={{ padding: 20, color: "red", fontWeight: "bold" }}>
        {error}
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Store Products</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: cat.color,
              color: "white",
              cursor: "pointer",
              opacity: filter === cat.id ? 1 : 0.6,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((item) => {
          const isAllowed = allowedNames.includes(item.name);

          return (
            <div
              key={item.item_id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f8f9fa, #eef3ff)",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                {item.name}
              </h3>
              <p>Type: {item.type}</p>
              <p>Billing: {item.billing_period}</p>

              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                ${Number(item.price_usd).toFixed(2)}
              </p>

              {isAllowed ? (
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    marginTop: "10px",
                    padding: "10px 14px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px",
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div
                  onClick={() => setComingSoonId(item.item_id)}
                  style={{
                    marginTop: "10px",
                    padding: "10px 14px",
                    backgroundColor: "#ffc107",
                    color: "#333",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontWeight: "700",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px",
                  }}
                >
                  Coming Soon!
                </div>
              )}

              {addedItemId === item.item_id && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    background: "#d4edda",
                    color: "#155724",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Added to cart
                </div>
              )}

              {comingSoonId === item.item_id && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    background: "#ffe8a1",
                    color: "#8a6d3b",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Coming Soon!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
