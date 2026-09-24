import { useEffect, useState } from "react";
import { getPaymentHistory } from "@/services/payments/paymentService";

export function usePayments(userId: string) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!userId) return;
    getPaymentHistory(userId).then(setPayments);
  }, [userId]);

  return payments;
}
