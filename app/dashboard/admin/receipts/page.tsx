"use client";

import { useEffect, useState } from "react";

interface Receipt {
  id?: number;
  receipt_id?: number;
  total_usd: number;
  created_at: string;
}

const API = `${process.env.NEXT_PUBLIC_API_URL}/store`;
const USER_ID = 1;

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadReceipts() {
    try {
      const res = await fetch(`${API}/receipts?user_id=${USER_ID}`);

      if (!res.ok) {
        let msg = "Error loading receipts";
        try {
          const err = await res.json();
          msg = err.detail || msg;
        } catch {}
        setError(msg);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setReceipts(Array.isArray(data) ? data : []);
    } catch {
      setError("Backend unreachable — cannot load receipts.");
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReceipts();
  }, []);

  if (loading) return <div className="p-6">Loading receipts...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Receipts History</h1>

      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id ?? receipt.receipt_id}
              className="border p-4 rounded shadow bg-white hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                alert(
                  `Receipt #${receipt.id ?? receipt.receipt_id}\nTotal: $${receipt.total_usd}\nDate: ${new Date(
                    receipt.created_at
                  ).toLocaleString()}`
                )
              }
            >
              <h2 className="text-lg font-semibold">
                Receipt #{receipt.id ?? receipt.receipt_id}
              </h2>
              <p>Total: ${receipt.total_usd}</p>
              <p>Date: {new Date(receipt.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
