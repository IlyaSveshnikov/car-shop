import { useEffect, useState } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Загружает данные асинхронной функцией и отслеживает loading/error.
 * Игнорирует результат, если компонент размонтирован или deps изменились.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });

    fn()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof Error ? error.message : "Не удалось загрузить данные",
          });
        }
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
