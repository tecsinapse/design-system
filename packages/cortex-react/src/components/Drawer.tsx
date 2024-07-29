import { drawer, overlay } from '@tecsinapse/cortex-core';
import React from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  children?: React.ReactNode;
}

/** Drawer component */
export const Drawer = ({
  children,
  onClose,
  open,
  position = 'right',
}: DrawerProps) => {
  return (
    <>
      <div
        data-testid="overlay"
        className={overlay({ show: open })}
        onClick={onClose}
      />
      <div
        data-testid="drawer"
        className={drawer({
          position,
          open,
        })}
      >
        {children}
      </div>
    </>
  );
};
