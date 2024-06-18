import { useCallback, useEffect, useState } from "react";
import { defineApi } from "./useHttps";
import { CurrentUser } from "@/models/users";

export const useFetchUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { get } = defineApi();

  const fetchUser = useCallback(async () => {
    const { data, error } = await get<CurrentUser>("/auth/me");
    if (error || !data) {
      setLoggedIn(false);
      setUser(null);
      return;
    }

    setUser(data);
    setLoggedIn(true);
  }, [get]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loggedIn, refresh: fetchUser };
};
