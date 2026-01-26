import {
  FloatingFocusManager,
  type FloatingFocusManagerProps,
} from '@floating-ui/react';
import clsx from 'clsx';
import React from 'react';
import { usePopoverContext } from './Context';

/**
 * To extend the behavior, look at docs https://floating-ui.com/docs/FloatingFocusManager#props
 */
export interface PopoverContentProps
  extends Omit<FloatingFocusManagerProps, 'children' | 'context'> {
  /** child element */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PopoverContent = ({
  children,
  className,
  modal = false,
  style,
  ...rest
}: PopoverContentProps) => {
  const {
    isOpen,
    x,
    y,
    strategy,
    floatingStyles,
    refs,
    getFloatingProps,
    context,
  } = usePopoverContext();

  return (
    <>
      {isOpen && (
        <FloatingFocusManager {...rest} context={context} modal={modal}>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            className={clsx(
              'border border-content-minimal bg-surface-inverse p-[0px] rounded-md shadow-default z-popover',
              className
            )}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              ...style,
              ...floatingStyles,
            }}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
