import React, { ReactNode } from 'react';

import { Popover } from '../Popover';
import { Content } from './Content';
import { SelectContext } from './context';
export interface SelectRootProps<T> {
  children: ReactNode;
  value?: T | T[];
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
}

export const SelectRoot = <T,>({
  children,
  value,
  keyExtractor,
  labelExtractor,
}: SelectRootProps<T>) => {
  return (
    <Popover.Provider>
      <Popover.Root placement="bottom" trigger="click">
        <SelectContext.Provider value={{ value, keyExtractor, labelExtractor }}>
          <Content>{children}</Content>
        </SelectContext.Provider>
      </Popover.Root>
    </Popover.Provider>
  );
};
