// /context/UrlContext.js
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Url } from "@/models/routing";

interface UrlContextType {
  urls: Record<string, Url[]>;
  registerUrls: (urls: Record<string, Url[]>) => void;
  getUrlsByStartPath: (startPath: string) => Url[];
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider = ({ children }: { children: ReactNode }) => {
  const [urls, setUrls] = useState<Record<string, Url[]>>({});

  const registerUrls = (newUrlRecord: Record<string, Url[]>) => {
    setUrls((prevUrls) => {
      const newUrls = { ...prevUrls, ...newUrlRecord };
      return newUrls;
    });
  };

  const getUrlsByStartPath = (startPath: string) => {
    return urls[startPath] || [];
  };

  return (
    <UrlContext.Provider value={{ urls, registerUrls, getUrlsByStartPath }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrlContext must be used within a UrlProvider");
  }
  return context;
};