import React, { FC } from 'react';
import { StyledContainerDrawer, StyledOverlay } from './styled';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchorPosition: 'left' | 'right' | 'top' | 'bottom';
}
export interface OverlayProps {
  active: boolean;
}

const Drawer: FC<DrawerProps> = ({
  open,
  anchorPosition = 'right',
  onClose,
  children,
}) => {
  return (
    <>
      <StyledOverlay onClick={open ? onClose : undefined} active={open} />
      <StyledContainerDrawer
        anchorPosition={anchorPosition}
        onClose={onClose}
        open={open}
      >
        {children}
      </StyledContainerDrawer>
    </>
  );
};

export default Drawer;
