import React, { FC } from 'react';
import { StyledContainerDrawer, StyledOverlay } from './styled';

export type Position = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchorPosition: Position;
}

const Drawer: FC<DrawerProps> = ({
  open,
  anchorPosition = 'left',
  onClose,
  children,
}) => {
  return (
    <>
      {open && (
        <>
          <StyledOverlay onClick={onClose} />
          <StyledContainerDrawer anchorPosition={anchorPosition} open={open}>
            {children}
          </StyledContainerDrawer>
        </>
      )}
    </>
  );
};

export default Drawer;
