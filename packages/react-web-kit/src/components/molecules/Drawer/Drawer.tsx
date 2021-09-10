import React, { FC } from 'react';
import { StyledContainerDrawer } from './styled';
import { Transition } from 'react-transition-group';
import { Overlay } from '../../atoms/Overlay';
import {
  transitionStylesTopBottom,
  defaultStylesTopBottom,
  defaultStylesLeftRight,
  transitionStylesLeftRight,
} from './animations';

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
  const getStyles = (anchorPosition: string, state: any) => {
    const stylesLeftRight = defaultStylesLeftRight(anchorPosition);
    const transitionLeftRight = transitionStylesLeftRight(anchorPosition);
    const stylesTopBottom = defaultStylesTopBottom(anchorPosition);
    const transitionTopBottom = transitionStylesTopBottom(anchorPosition);

    if (['left', 'right'].includes(anchorPosition)) {
      return {
        ...stylesLeftRight,
        ...transitionLeftRight[state],
      };
    } else {
      return {
        ...stylesTopBottom,
        ...transitionTopBottom[state],
      };
    }
  };

  return (
    <>
      <Overlay timeout={300} open={open} onClose={onClose} zIndex="drawer" />
      <Transition in={open} timeout={300}>
        {state => (
          <StyledContainerDrawer
            style={getStyles(anchorPosition, state)}
            anchorPosition={anchorPosition}
            onClose={onClose}
            open={open}
          >
            {children}
          </StyledContainerDrawer>
        )}
      </Transition>
    </>
  );
};

export default Drawer;
