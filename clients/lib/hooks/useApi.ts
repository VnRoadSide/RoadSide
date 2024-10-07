import { environment } from "@/environment";
import { Session } from "next-auth";

// Function to create the HTTP client instance
export const useApi = (session?: Session | null) => {
  const makeRequest = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> => {
    try {
      options.headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };
      if (
        ((options.headers as any)["Content-Type"] as string) ===
        "application/json"
      ) {
        options.body = JSON.stringify(options.body);
      } else {
        delete (options.headers as any)["Content-Type"];
      }

      if (session) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${session.accessToken}`,
        };
        console.log("session: ", session.accessToken);
      }

      const response = await fetch(`${environment.apiUrl}${url}`, options);

      if (!response.ok) {
        throw new Error(
          `API error! Status: ${response.status}. Reason: ${response.statusText}`
        );
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
      body: data as any, // need to handle base on content type
    });

  const put = <T = any, U = any>(
    url: string,
    data?: U,
    config: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> =>
    makeRequest<T>(url, {
      ...config,
      method: "PUT",
      body: data as any,
    });

  const deleteRequest = <T = any>(
    url: string,
    config: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> =>
    makeRequest<T>(url, { ...config, method: "DELETE" });
  return {
    get,
    post,
    put,
    delete: deleteRequest,
  };
};
