import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { Context } from './context';
import { AccordionProps } from './types';

export const AccordionFace = ({
  children,
  defaultOpen = false,
  direction = 'horizontal',
}: Pick<AccordionProps, 'children' | 'defaultOpen' | 'direction'>) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => setOpen(prev => !prev), []);

  return (
    <Context.Provider value={{ open, toggle }}>
      <div
        className={clsx('flex', {
          'flex flex-col': direction === 'vertical',
        })}
      >
        {children}
      </div>
    </Context.Provider>
  );
};
