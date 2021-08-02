import React, { FC } from 'react';
import { StyledContainerDrawer, StyledOverlay } from './styled';
import { Transition } from 'react-transition-group';

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
  const defaultStyleDrawer = {
    transition: `width 1000ms`,
    width: 0,
    height: 0,
  };

  const defaultStyle = {
    transition: `opacity 1000ms ease-in-out`,
    opacity: 0,
  };

  const transitionStylesDrawer = {
    entering: { width: 0 },
    entered: { width: '100%' },
    exiting: { width: '100%' },
    exited: { width: 0 },
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <>
      <Transition in={open} timeout={10000}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <StyledOverlay onClick={onClose} />
          </div>
        )}
      </Transition>
      <Transition in={open} timeout={10000}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <StyledContainerDrawer
              anchorPosition={anchorPosition}
              onClose={onClose}
              open={open}
            >
              {children}
            </StyledContainerDrawer>
          </div>
        )}
      </Transition>
    </>
  );
};

export default Drawer;
