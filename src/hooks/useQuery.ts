import { useAuth } from "@/contexts/AuthProvider";
import { useCallback, useEffect, useState } from "react";

interface QueryOptions {
  onSuccess?: () => void;
  onFailed?: (err: unknown) => void;
}

const useQuery = <TData>(path: string, queryOptions?: QueryOptions) => {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const baseUrl = "http://localhost:5001";

  const fetchWithAuth = useCallback(
    async (options: RequestInit = {}) => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(`${baseUrl}${path}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
            ...options.headers,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const dataFetch = await response.json();
        console.log("Data Fetch", dataFetch);
        setData(() => dataFetch);
        queryOptions?.onSuccess && queryOptions.onSuccess();
      } catch (err) {
        setError(true);
        queryOptions?.onFailed && queryOptions.onFailed(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user?.token, path, queryOptions]
  );

  useEffect(() => {
    console.log("Useeffect");

    fetchWithAuth();
  });

  console.log("DATA AFTER FETCH", data);
  return {
    data,
    isLoading,
    error,
    refetch: fetchWithAuth,
  } as {
    data: TData;
    isLoading: boolean;
    error: boolean;
    refetch: (options?: RequestInit) => Promise<void>;
  };
};

export default useQuery;
