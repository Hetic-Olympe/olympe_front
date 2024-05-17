import { useAuth } from "@/contexts/AuthProvider";
import { useCallback, useState } from "react";

const useFetch = (path: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { auth } = useAuth();
  const baseUrl = "http://localhost:5001/api";

  const fetchWithAuth = useCallback(
    async (options: RequestInit = {}) => {
      setIsLoading(true);
      setError(false);
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
        return { data };
      } catch (err) {
        setError(true);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.token, path]
  );

  return { isLoading, error, fetchData: fetchWithAuth };
};

export default useFetch;
