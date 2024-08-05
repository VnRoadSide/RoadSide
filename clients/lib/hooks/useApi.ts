import { auth } from "@/auth";
import { environment } from "@/environment";

// Function to create the HTTP client instance
export const useApi = () => {
  const makeRequest = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: any }> => {
    try {
      options.headers = {
        "Content-Type": "application/json",
        ...options.headers,
      }
      const session = await auth();
      if (session) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${session.accessToken}`,
        }
      }
      const response = await fetch(`${environment.apiUrl}${url}`, options);

      if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}. Reason: ${response.statusText}`);
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
    get,
    post,
    put,
    delete: deleteRequest,
  };
};
