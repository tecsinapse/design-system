import React from 'react';

import { Popover } from '../Popover';
import { Content } from './Content';
import { SelectContext } from './context';
import { SelectRootProps } from './types';

/** Select component */
export const SelectRoot = <T,>({
  children,
  value,
  keyExtractor,
  labelExtractor,
}: SelectRootProps<T>) => {
  return (
    <Popover.Root placement="bottom" trigger="click">
      <SelectContext.Provider value={{ value, keyExtractor, labelExtractor }}>
        <Content>{children}</Content>
      </SelectContext.Provider>
    </Popover.Root>
  );
};
