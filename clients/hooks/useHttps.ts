"use client";

import useSWR, { SWRResponse } from "swr";
import { environment } from "../environment";
import defineLocalStorage from "./useLocalStorage";

// Custom fetcher that accepts a URL and handles token
const fetcher = async (url: string): Promise<any> => {
  const token = localStorage.getItem("token"); // Adjust as needed for your token storage strategy
  const response = await fetch(`${environment.apiUrl}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const useApi = <T = any>(url: string): SWRResponse<T, any> =>
  useSWR(url, fetcher);
// Function to create the HTTP client instance
export const defineApi = () => {
  let token: string | null = null;
  const [getStoredToken, setStoredToken] = defineLocalStorage<string | null>(
    "token",
    null
  );

  // Initialize token from localStorage
  token = getStoredToken();

  const setAuthToken = (newToken: string | null) => {
    token = newToken;
    setStoredToken(newToken);
  };

  const makeRequest = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> => {
    try {
      const response = await fetch(`${environment.apiUrl}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: T = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const get = <T = any>(
    url: string,
    config: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> =>
    makeRequest<T>(url, { ...config, method: "GET" });

  const post = <T = any, U = any>(
    url: string,
    data?: U,
    config: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> =>
    makeRequest<T>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });

  const put = <T = any, U = any>(
    url: string,
    data?: U,
    config: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> =>
    makeRequest<T>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    });

  const deleteRequest = <T = any>(
    url: string,
    config: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> =>
    makeRequest<T>(url, { ...config, method: "DELETE" });
  return {
    setAuthToken,
    token,
    get,
    post,
    put,
    delete: deleteRequest,
  };
};
