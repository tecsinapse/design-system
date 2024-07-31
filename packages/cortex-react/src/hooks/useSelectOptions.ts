import { useCallback, useEffect, useState } from 'react';

interface useSelectOptionsProps<T> {
  options?: T[] | (() => Promise<T[]>);
}

export const useSelectOptions = <T>({
  options: _options,
}: useSelectOptionsProps<T>) => {
  const [options, setOptions] = useState<T[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const initData = useCallback(async (fetch: () => Promise<T[]>) => {
    setIsLoading(true);
    try {
      const result = await fetch();
      if (result) {
        setOptions(result ?? []);
      }
    } catch (e) {
      //  Handle error
      setError(String(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof _options === 'function') initData(_options);
    else setOptions(_options);
  }, [_options]);

  return {
    isLoading,
    options,
    error,
  };
};
