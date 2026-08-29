import React, { useContext } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import { Popover } from '../Popover';
import { AutocompleteContext } from './context';
import { AutocompletePopoverProps } from './types';
import clsx from 'clsx';
import { useResolvedPortalRoot } from '../../provider';

export const AutocompletePopover = ({
  children,
  className,
  root,
}: AutocompletePopoverProps) => {
  const context = useContext(AutocompleteContext);
  if (!context)
    throw new Error('AutocompletePopover must be used within AutocompleteRoot');
  const portalRoot = useResolvedPortalRoot(root);

  const { triggerWidth } = context;

  return (
    <FloatingPortal root={portalRoot}>
      <Popover.Content
        className={clsx(
          'bg-white shadow-md rounded-md overflow-y-auto max-h-[30vh] outline-none z-9999',
          className
        )}
        style={{
          width: triggerWidth ? `${triggerWidth}px` : 'auto',
        }}
        initialFocus={-1}
      >
        {children}
      </Popover.Content>
    </FloatingPortal>
  );
};
