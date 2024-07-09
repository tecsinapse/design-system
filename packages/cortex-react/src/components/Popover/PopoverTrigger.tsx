import React from 'react';
import { usePopoverContext } from './PopoverContext';

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext();

  return React.cloneElement(children, triggerProps);
};

export default PopoverTrigger;
