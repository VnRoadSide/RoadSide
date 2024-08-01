"use client"
import { OrderItem } from "@/models";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
type CartHook = {
  value: OrderItem[];
  isClient: boolean;
  counter: number;
}

type CartAction = (val: OrderItem[] | ((prevState: OrderItem[]) => OrderItem[])) => void

function useCart(initial: OrderItem[] = []): [CartHook, CartAction] {
  const [value, setValue] = useLocalStorage<OrderItem[]>({
    key: 'cart',
    defaultValue: initial,
    serialize: JSON.stringify,
    deserialize: (str) =>
      str === undefined ? [] : JSON.parse(str),
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return [{value, isClient, counter: value.length}, setValue]
}

export default useCart