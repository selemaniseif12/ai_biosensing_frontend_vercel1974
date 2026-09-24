import { useEffect, useState } from "react";
import { getReceipts, getReceipt } from "@/services/receipts/receiptService";

export function useReceipts(userId: string) {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    if (!userId) return;
    getReceipts(userId).then(setReceipts);
  }, [userId]);

  return receipts;
}

export function useReceipt(receiptId: string) {
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (!receiptId) return;
    getReceipt(receiptId).then(setReceipt);
  }, [receiptId]);

  return receipt;
}
