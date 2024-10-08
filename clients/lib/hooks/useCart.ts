"use client"
import { OrderItem } from "@/models";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { createCheckoutSession } from "../checkout";

type CartValue = {
  items: OrderItem[];
  session: string | null;
}

type CartHook = CartValue & {
  isClient: boolean;
  counter: number;
}

type CartAction = (val: CartValue | ((prevState: CartValue) => CartValue)) => void

function useCart(initial: OrderItem[] = []): [CartHook, CartAction, () => Promise<string| null>] {
  const [value, setValue] = useLocalStorage<{ items: OrderItem[], session: string | null }>({
    key: 'cart',
    defaultValue: { items: initial, session: null },
    serialize: JSON.stringify,
    deserialize: (str) =>
      str === undefined ? [] : JSON.parse(str),
  });

  const [isClient, setIsClient] = useState(false);

  const getSession = async () => {
    if (value.items.some(p => p.selected)) {
      const session = await createCheckoutSession(value.items.filter(p => p.selected));
      setValue({ ...value, session });
      return session
    }
    return value.session
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return [{ items: value.items, session: value.session, isClient, counter: value.items.length }, setValue, getSession]
}

export default useCart
