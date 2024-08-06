import { checkbox, option } from '@tecsinapse/cortex-core';
import React, { useCallback, useContext, useMemo } from 'react';
import { SelectContext, SelectMultiOptionsContext } from './context';
import { SelectMultiCheckAllOptionsProps } from './types';

export const SelectMultiCheckAllOptions = <T,>({
  checkAllLabel = 'Select all',
}: SelectMultiCheckAllOptionsProps) => {
  const { keyExtractor, value: currentValue = [] } = useContext(SelectContext);
  const { options, onSelect } = useContext(SelectMultiOptionsContext);

  const isChecked = useMemo(
    () =>
      (options ?? []).filter(it =>
        currentValue.find(value => keyExtractor(value) === keyExtractor(it))
      ).length == (options ?? []).length,
    [keyExtractor, currentValue, options]
  );

  const checkAll = useCallback(() => {
    {
      let updateSelected: T[] = [...currentValue];
      if (!isChecked) {
        updateSelected = [
          ...new Set<T>([...updateSelected, ...(options ?? [])]),
        ];
      } else {
        const optionKeys = new Set(
          options?.map(option => keyExtractor(option))
        );
        updateSelected = updateSelected.filter(
          item => !optionKeys.has(keyExtractor(item))
        );
      }
      onSelect(updateSelected);
    }
  }, [options, onSelect]);

  return options?.length ? (
    <div className={option()} onClick={checkAll}>
      <input
        type="checkbox"
        className={checkbox()}
        onChange={() => undefined}
        checked={isChecked}
      />
      <span>{checkAllLabel}</span>
    </div>
  ) : (
    <></>
  );
};
