import React from 'react';
import { cloneWithProps } from '../utils';
import { usePopoverContext } from './Context';

export interface PopoverTriggerProps {
  /** child element */
  children: React.ReactElement;
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext();

  return cloneWithProps(children, triggerProps);
};
