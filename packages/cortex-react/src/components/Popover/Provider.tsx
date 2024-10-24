import { Placement } from '@floating-ui/react';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { useFloatingElement } from '../../hooks';
import { Context } from './Context';

export interface ControlledProps {
  controlled: true;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface UncontrolledProviderProps {
  /** child element */
  children: ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  controlled?: false;
}

export interface ControlledPopoverProviderProps
  extends Omit<UncontrolledProviderProps, 'controlled'>,
    ControlledProps {}

export type PopoverProviderProps =
  | UncontrolledProviderProps
  | ControlledPopoverProviderProps;

export const PopoverProvider = ({
  children,
  placement,
  trigger,
  ...props
}: PopoverProviderProps) => {
  const floatingLogic = useFloatingElement({
    placement,
    trigger,
    ...props,
  });

  return (
    <Context.Provider value={{ ...floatingLogic }}>{children}</Context.Provider>
  );
};
