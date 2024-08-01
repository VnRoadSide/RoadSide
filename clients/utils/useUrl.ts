// /hooks/useUrl.js

import { useUrlContext } from "@/context/urlContext";

export function useUrl() {
  const { urls, registerUrls, getUrlsByStartPath } = useUrlContext();

  return { urls, registerUrls, getUrlsByStartPath };
}
