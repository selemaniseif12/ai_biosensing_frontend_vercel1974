import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/users/userService";

export function useSubscription(userId: string) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!userId) return;

    getUserProfile(userId).then((profile) => {
      setActive(profile?.subscription_active || false);
    });
  }, [userId]);

  return active;
}
