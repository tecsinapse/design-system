import { useEffect, useState } from 'react';
import { Option } from '../components/Autocomplete/types';

interface useAutocompleteGroupedOptionsProps {
  options?: Map<string, Option[]> | (() => Promise<Map<string, Option[]>>);
}

export const useAutocompleteGroupedOptions = ({
  options: _options,
}: useAutocompleteGroupedOptionsProps) => {
  const [options, setOptions] = useState<Map<string, Option[]> | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const initData = async (fetch: () => Promise<Map<string, Option[]>>) => {
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
