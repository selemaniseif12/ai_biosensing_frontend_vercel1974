"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "@/services/users/userService";

const SubscriptionContext = createContext(false);

export function SubscriptionProvider({ userId, children }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!userId) return;
    getUserProfile(userId).then((profile) => {
      setActive(profile?.subscription_active || false);
    });
  }, [userId]);

  return (
    <SubscriptionContext.Provider value={active}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  return useContext(SubscriptionContext);
}
