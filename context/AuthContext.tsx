"use client";

import { createContext, useContext, useState } from "react";
import { login } from "@/services/auth/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    const result = await login(email, password);
    if (result) setUser(result.user);
    return result;
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
