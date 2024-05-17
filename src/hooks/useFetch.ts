import { useAuth } from "@/contexts/AuthProvider";
import { useCallback } from "react";

const useFetch = (path: string) => {
  const { auth } = useAuth();
  const baseUrl = "http://localhost:5001/api";

  const fetchWithAuth = useCallback(
    async (options: RequestInit = {}) => {
      try {
        const response = await fetch(`${baseUrl}${path}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
            ...options.headers,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        return data;
      } catch (err) {
        console.error("err", err);
        throw err;
      }
    },
    [auth?.token, path]
  );

  return fetchWithAuth;
};

export default useFetch;
