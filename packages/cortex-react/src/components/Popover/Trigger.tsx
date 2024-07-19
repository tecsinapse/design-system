import React from 'react';
import { usePopoverContext } from './Context';
import { cloneWithProps } from '../utils';

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext();

  return cloneWithProps(children, triggerProps);
};
