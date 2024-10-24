import React from 'react';

import { Placement } from '@floating-ui/react';
import { ControlledProps, PopoverProvider } from './Provider';

export interface UncontrolledPopoverProps {
  /** child element */
  children: React.ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  controlled?: false;
}

export interface ControlledPopoverProps
  extends Omit<UncontrolledPopoverProps, 'controlled'>,
    ControlledProps {}

export type PopoverRootProps =
  | UncontrolledPopoverProps
  | ControlledPopoverProps;

/** Popover component */
export const PopoverRoot = ({
  children,
  placement,
  trigger,
  ...props
}: PopoverRootProps) => {
  return (
    <PopoverProvider placement={placement} trigger={trigger} {...props}>
      {children}
    </PopoverProvider>
  );
};
