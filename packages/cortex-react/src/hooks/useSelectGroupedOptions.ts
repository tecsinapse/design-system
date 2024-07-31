import { useEffect, useState } from 'react';

interface useSelectGroupedOptionsProps<T> {
  options?: Map<string, T[]> | (() => Promise<Map<string, T[]>>);
}

export const useSelectGroupedOptions = <T>({
  options: _options,
}: useSelectGroupedOptionsProps<T>) => {
  const [options, setOptions] = useState<Map<string, T[]> | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const initData = async (fetch: () => Promise<Map<string, T[]>>) => {
    setIsLoading(true);
    try {
      const result = await fetch();
      if (result) {
        setOptions(result ?? []);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setIsLoading(false);
    }
  };

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
