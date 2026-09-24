const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserProfile(userId: string) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) return null;
  return res.json();
}
