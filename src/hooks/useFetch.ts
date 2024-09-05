import { useEffect, useState } from "react";

interface FetchError {
  message: string;
}

export function useFetch<T>(url: string): {
  error: FetchError | null;
  loading: boolean;
  data: null | T;
} {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError((error) => error as FetchError);
        }
        console.log("data fetched");
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((error) => error as FetchError);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { loading, error, data };
}
