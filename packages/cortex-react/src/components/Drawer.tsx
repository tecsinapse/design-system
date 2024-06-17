import React from 'react';
import { drawer, overlay } from '@tecsinapse/cortex-core';

interface DrawerProps {
  open: boolean;
  onClose: (open: boolean) => void;
  position?: 'left' | 'right';
  children?: React.ReactNode;
}
export const Drawer = ({
  children,
  onClose,
  open,
  position = 'right',
}: DrawerProps) => {
  return (
    <>
      <div
        className={overlay({ show: open })}
        onClick={() => onClose(false)}
      ></div>
      <div
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
