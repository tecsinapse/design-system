import React, { useEffect, useRef, useState } from 'react';
import { Popover } from '../Popover';
import { AutocompleteContext } from './context';
import { AutocompleteRootProps } from './types';

export const AutocompleteRoot = <T,>({
  keyExtractor,
  labelExtractor,
  children,
  onOpenChange,
}: AutocompleteRootProps<T>) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onOpenChangeRef.current?.(open);
  }, [open]);

  return (
    <AutocompleteContext.Provider
      value={{
        open,
        setOpen,
        triggerWidth,
        setTriggerWidth,
        keyExtractor,
        labelExtractor,
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
