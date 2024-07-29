import { checkbox, option as styleOption } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { SelectContext } from './context';
import { SelectMultiOptionProps } from './types';

export const SelectMultiOption = <T,>({
  onSelectOption,
  option,
  grouped = false,
}: SelectMultiOptionProps<T>) => {
  const { keyExtractor, labelExtractor, value } = useContext(SelectContext);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <li
      onClick={onClickOption}
      className={styleOption({ grouped })}
      role={'option'}
    >
      <input
        type="checkbox"
        checked={isChecked}
        className={checkbox({ className: 'pointer-events-none' })}
        onChange={() => false}
        ref={inputRef}
      />
      {labelExtractor(option)}
    </li>
  );
};
