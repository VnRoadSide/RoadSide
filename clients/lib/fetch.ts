import { environment } from "@/environment";

export async function fetchData<T extends any>(url: string) {
  try {
    const response = await fetch(`${environment.appUrl}/api/${url}`);
    
    // Check if the response is not JSON
    if (!response.ok || response.headers.get('content-type') !== 'application/json') {
      throw new Error('Received non-JSON response');
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    // Additional error handling logic
    return null;
  }
}
