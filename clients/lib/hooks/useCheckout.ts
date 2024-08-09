import { useLocalStorage } from "@mantine/hooks";
import { CreateCheckoutSession, GetCheckoutSession, OrderItem } from "../checkout";
import { useEffect, useState } from "react";

interface UseCheckoutResult {
  sessionId: string | null;
  items: OrderItem[];
  setSessionId: (id: string) => void;
  setItems: (items: OrderItem[]) => void;
  initializeCheckout: (items: OrderItem[]) => Promise<void>;
}

export function useCheckout(): UseCheckoutResult {
  const [sessionId, setSessionId] = useLocalStorage<string | null>({
    key: 'checkoutSession',
    defaultValue: null,
  });

  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (sessionId) {
      (async () => {
        const order = await GetCheckoutSession(sessionId);
        if (order && order.length > 0) {
          setItems(order[0].items || []);
        }
      })();
    }
  }, [sessionId]);

  const initializeCheckout = async (initialItems: OrderItem[]) => {
    const sessionId = await CreateCheckoutSession(initialItems);
    setSessionId(sessionId);
    setItems(initialItems);
  };

  return {
    sessionId,
    items,
    setSessionId,
    setItems,
    initializeCheckout,
  };
}