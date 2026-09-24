const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPaymentHistory(userId: string) {
  const res = await fetch(`${BASE_URL}/payments/history?user_id=${userId}`);
  if (!res.ok) return [];
  return res.json();
}
