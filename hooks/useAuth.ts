import { useState } from "react";
import { login } from "@/services/auth/authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    return result;
  }

  return { signIn, loading };
}
