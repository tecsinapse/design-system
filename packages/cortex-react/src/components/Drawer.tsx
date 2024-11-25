import { drawer, overlay } from '@tecsinapse/cortex-core';
import React from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  /** child element */
  children?: React.ReactNode;
  className?: string;
}

/** Drawer component */
export const Drawer = ({
  children,
  onClose,
  open,
  position = 'right',
  className,
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
          className,
        })}
      >
        {children}
      </div>
    </>
  );
};
