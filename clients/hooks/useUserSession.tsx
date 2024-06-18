"use client";
import { createContext, useContext, ReactNode } from "react";
import { useFetchUser } from "./useFetchUser";
import { CurrentUser } from "../models/users";

type SessionContextType = {
  user: CurrentUser | null;
  loggedIn: boolean;
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { user, loggedIn, refresh } = useFetchUser();

  return (
    <SessionContext.Provider value={{ user, loggedIn, refresh }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useUserSession must be used within a SessionProvider");
  }
  return context;
};
