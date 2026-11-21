import { useEffect, useState, type DependencyList } from 'react';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface Settled<T> {
  key: string;
  data: T | null;
  error: string | null;
}

/**
 * Runs an API call when the component mounts and again whenever deps change.
 * Results that arrive after the component unmounted or the deps changed are
 * ignored, and the state reads as loading until the current call settles.
 */
export function useApi<T>(load: () => Promise<T>, deps: DependencyList = []): ApiState<T> {
  const key = JSON.stringify(deps);
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    let active = true;

    load()
      .then((data) => {
        if (active) setSettled({ key, data, error: null });
      })
      .catch((err: unknown) => {
        if (active) {
          setSettled({ key, data: null, error: err instanceof Error ? err.message : 'An error occurred' });
        }
      });

    return () => {
      active = false;
    };
    // load is recreated on every render; the call is keyed by deps instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (settled === null || settled.key !== key) {
    return { data: null, isLoading: true, error: null };
  }

  return { data: settled.data, isLoading: false, error: settled.error };
}
