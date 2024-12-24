import React from 'react';
import { cloneWithProps } from '../../utils';
import { usePopoverContext } from './Context';

export interface PopoverTriggerProps {
  /** child element */
  children: React.ReactElement;
  disabled?: boolean;
}

export const PopoverTrigger = ({
  children,
  disabled = false,
}: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext();
  const isDisabled = disabled ?? children.props?.disabled;

  return cloneWithProps(children, isDisabled ? {} : triggerProps);
};
