import React, { ReactNode } from 'react';

import Content from './Content';
import { Popover } from '../Popover';

export interface SelectRootProps<T> {
  children: ReactNode;
  value?: T;
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
        <Content
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
          value={value}
        >
          {children}
        </Content>
      </Popover.Root>
    </Popover.Provider>
  );
};
