import { useAuth } from "@/contexts/AuthProvider";
import { useCallback, useState } from "react";

const useMutation = <TData>(
  path: string,
  onSuccess?: (data: TData) => void,
  onFailed?: (error: unknown) => void
) => {
  const [data, setData] = useState<TData | null>(null);
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
        setData(dataFetch);
        if (onSuccess) {
          onSuccess(dataFetch);
        }
      } catch (err) {
        setError(true);
        setData(null);
        if (onFailed) {
          onFailed(err);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user?.token, path, onSuccess, onFailed]
  );

  return { data, isLoading, error, mutateData: fetchWithAuth };
};

export default useMutation;
