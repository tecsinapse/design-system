import React, { ReactNode } from 'react';
import { PopoverProvider } from '../Popover/PopoverContext';
import { Popover } from '../Popover/Popover';
import Content from './Content';

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
    <PopoverProvider>
      <Popover.Root placement="bottom" trigger="click">
        <Content
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
          value={value}
        >
          {children}
        </Content>
      </Popover.Root>
    </PopoverProvider>
  );
};
