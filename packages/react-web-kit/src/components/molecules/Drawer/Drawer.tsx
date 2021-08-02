import React, { FC } from 'react';
import { StyledContainerDrawer, StyledOverlay } from './styled';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchorPosition: 'left' | 'right' | 'top' | 'bottom';
}

const Drawer: FC<DrawerProps> = ({
  open,
  anchorPosition = 'right',
  onClose,
  children,
}) => {
  return (
    <>
      {open && (
        <>
          <StyledOverlay onClick={onClose} />
          <StyledContainerDrawer anchorPosition={anchorPosition}>
            {children}
          </StyledContainerDrawer>
        </>
      )}
    </>
  );
};

export default Drawer;
