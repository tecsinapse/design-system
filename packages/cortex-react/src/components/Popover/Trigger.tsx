import React from 'react';
import { cloneWithProps } from '../../utils';
import { usePopoverContext } from './Context';

export interface PopoverTriggerProps {
  /** child element */
  children: React.ReactElement;
  disabled?: boolean;
}

const isDisabledProps = {
  onClick: () => undefined,
  onKeyDown: () => undefined,
  onMouseDown: () => undefined,
  onKeyUp: () => undefined,
  onPointerDown: () => undefined,
};

export const PopoverTrigger = ({ children, disabled }: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext();
  const isDisabled = disabled ?? (children as any)?.props?.disabled;

  return cloneWithProps(children, {
    ...triggerProps,
    ...(isDisabled ? isDisabledProps : {}),
  });
};
