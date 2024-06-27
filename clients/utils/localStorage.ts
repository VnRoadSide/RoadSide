"use client";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Initialize localStorage with initial value if it's not already set
  const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  if (item === null && typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(initialValue));
  }

  // Function to get the current value from localStorage
  const getStoredValue = (): T | null => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return initialValue;
    }
  };

  // Function to update the value in localStorage
  const setStoredValue = (newValue: T): void => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error storing to localStorage:", error);
    }
  };

  return [getStoredValue, setStoredValue] as const;
};

export default useLocalStorage;
