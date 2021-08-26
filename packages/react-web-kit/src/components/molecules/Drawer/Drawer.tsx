import React, { FC } from 'react';
import { StyledContainerDrawer, StyledOverlay } from './styled';
import { Transition } from 'react-transition-group';
import {
  transitionStylesTopBottom,
  defaultStylesTopBottom,
  defaultStylesLeftRight,
  transitionStylesOverlay,
  transitionStylesLeftRight,
  defaultStyleOverlay,
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
      <Transition in={open} timeout={300}>
        {state => (
          <div
            style={{
              ...defaultStyleOverlay,
              ...transitionStylesOverlay[state],
            }}
          >
            <StyledOverlay onClick={open ? onClose : undefined} show={open} />
          </div>
        )}
      </Transition>
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
