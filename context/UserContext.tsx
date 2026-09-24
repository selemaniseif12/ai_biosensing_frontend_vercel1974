"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "@/services/users/userService";

const UserContext = createContext(null);

export function UserProvider({ userId, children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId) return;
    getUserProfile(userId).then(setProfile);
  }, [userId]);

  return (
    <UserContext.Provider value={profile}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
