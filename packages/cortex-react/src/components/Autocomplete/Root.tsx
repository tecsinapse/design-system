import React, { useState } from 'react';
import { Popover } from '../Popover';
import { AutocompleteContext } from './context';
import { AutocompleteRootProps } from './types';

export const AutocompleteRoot = ({ children }: AutocompleteRootProps) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AutocompleteContext.Provider
      value={{
        open,
        setOpen,
        triggerWidth,
        setTriggerWidth,
      }}
    >
      <Popover.Root
        placement="bottom-start"
        controlled
        isOpen={open}
        setIsOpen={setOpen}
      >
        <div className="relative w-full h-full">{children}</div>
      </Popover.Root>
    </AutocompleteContext.Provider>
  );
};
