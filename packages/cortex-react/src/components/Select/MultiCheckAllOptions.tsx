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
      const updateSelected: T[] = Array.from(currentValue);
      if (!isChecked) {
        const notSelected = options?.filter(
          option =>
            !updateSelected.find(
              it => keyExtractor(it) === keyExtractor(option)
            )
        );
        updateSelected.push(...(notSelected ?? []));
      } else {
        const elementsToDelete = updateSelected
          .map(it =>
            options?.find(option => keyExtractor(option) === keyExtractor(it))
          )
          .filter(it => it) as T[];

        elementsToDelete.map(it => {
          updateSelected.splice(updateSelected.indexOf(it), 1);
        });
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
