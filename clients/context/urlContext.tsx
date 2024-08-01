// /context/UrlContext.js
import { createContext, useContext, useState, ReactNode } from "react";
import { Url } from "@/models/routing";

interface UrlContextType {
  urls: Url[];
  registerUrls: (urls: Url[]) => void;
  getUrlsByStartPath: (startPath: string) => Url[];
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider = ({ children }: { children: ReactNode }) => {
  const [urls, setUrls] = useState<Url[]>([]);

  const registerUrls = (newUrls: Url[]) => {
    setUrls((prevUrls) => [...prevUrls, ...newUrls]);
  };

  const getUrlsByStartPath = (startPath: string) => {
    return urls.filter((url) => url.href.startsWith(startPath));
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