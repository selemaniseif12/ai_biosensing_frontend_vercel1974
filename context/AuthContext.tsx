import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any | null;
  signIn: (email: string, password: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  const signIn = async (email: string, password: string) => {
    // your login logic here
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
