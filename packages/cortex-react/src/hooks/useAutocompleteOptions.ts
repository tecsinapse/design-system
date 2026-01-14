import { useCallback, useEffect, useState } from 'react';
import { Option } from '../components/Autocomplete/types';

interface useAutocompleteOptionsProps {
  options?: Option[] | (() => Promise<Option[]>);
}

export const useAutocompleteOptions = ({
  options: _options,
}: useAutocompleteOptionsProps) => {
  const [options, setOptions] = useState<Option[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const initData = useCallback(async (fetch: () => Promise<Option[]>) => {
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
