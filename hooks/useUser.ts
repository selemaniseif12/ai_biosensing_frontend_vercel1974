import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/users/userService";

export function useUser(userId: string) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;
    getUserProfile(userId).then(setUser);
  }, [userId]);

  return user;
}
