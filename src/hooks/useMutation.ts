import { useAuth } from "@/contexts/AuthProvider";
import { useCallback, useState } from "react";

export enum Method {
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface MutationOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  onFailed?: (err: unknown) => void;
}

const useMutation = (
  path: string,
  method: Method,
  mutationOptions?: MutationOptions
) => {
  const [data, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const baseUrl = "http://localhost:5001";

  const mutateWithAuth = useCallback(
    async (body = {}) => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch(`${baseUrl}${path}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const result = await response.json();
        setDate(result);
        mutationOptions?.onSuccess && mutationOptions.onSuccess(result);
      } catch (err) {
        setError(true);
        mutationOptions?.onFailed && mutationOptions.onFailed(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user?.token, path, method, mutationOptions]
  );

  return { data, isLoading, error, mutate: mutateWithAuth };
};

export default useMutation;
