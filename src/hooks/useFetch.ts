import { useEffect, useState } from "react";

interface FetchError {
  message: string;
}

export function useFetch<T>(url: string): {
  error: FetchError | null;
  isLoading: boolean;
  data: null | T;
} {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("data fetched");
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError(error as FetchError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { isLoading, error, data };
}
