import React from 'react';
import { usePopoverContext } from './Context';

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext();

  return React.cloneElement(children, triggerProps);
};
