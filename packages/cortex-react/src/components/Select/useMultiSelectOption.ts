import { useCallback, useContext, useMemo, useRef } from 'react';
import { SelectContext } from './context';
import { handleSelectMulti } from './utils';

export const useMultiSelectOption = <T>(
  option: T,
  onSelect?: (option: T[]) => void
) => {
  const { keyExtractor, value, labelExtractor } = useContext(SelectContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectOption = (option: T) =>
    handleSelectMulti(option, value, keyExtractor, onSelect);

  const isChecked = useMemo(
    () =>
      value?.length > 0 &&
      value.find((it: T) => keyExtractor(it) === keyExtractor(option)) !==
        undefined,
    [value, option]
  );

  const onClickOption = useCallback(() => {
    onSelectOption(option);
    inputRef.current?.click();
  }, [onSelectOption, inputRef]);
  return {
    keyExtractor,
    value,
    isChecked,
    onClickOption,
    inputRef,
    labelExtractor,
  };
};
