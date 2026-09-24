const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getReceipts(userId: string) {
  const res = await fetch(`${BASE_URL}/receipts/list?user_id=${userId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.receipts || [];
}

export async function getReceipt(receiptId: string) {
  const res = await fetch(`${BASE_URL}/receipts/${receiptId}`);
  if (!res.ok) return null;
  return await res.json();
}
