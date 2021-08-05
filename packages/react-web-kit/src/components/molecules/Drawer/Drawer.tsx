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
  const transformLeftRigthClose =
    anchorPosition === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
  const transformLeftRigthOpen = 'translateX(0)';

  const transformTopBottomClose =
    anchorPosition === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
  const transformTopBottomOpen = 'translateY(0%)';

  const defaultStyleDrawerLeftRight = {
    transition: 'transform 300ms ease-in-out',
    transform: transformLeftRigthClose,
    overflow: 'hidden',
  };

  const transitionStylesLeftRight = {
    entering: { transform: transformLeftRigthClose },
    entered: {
      transform: transformLeftRigthOpen,
    },
    exiting: {
      transform: transformLeftRigthOpen,
    },
    exited: { transform: transformLeftRigthClose },
  };

  const defaultStyleDrawerTopBottom = {
    transition: 'transform 300ms ease-in-out',
    transform: transformTopBottomClose,
    overflow: 'hidden',
  };
  const transitionStylesDrawerTopBottom = {
    entering: { transform: transformTopBottomClose },
    entered: {
      transform: transformTopBottomOpen,
    },
    exiting: {
      transform: transformTopBottomOpen,
    },
    exited: { transform: transformTopBottomClose },
  };

  const defaultStyle = {
    transition: `opacity 300ms ease-in-out`,
    opacity: 0,
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const getStyles = (anchorPosition: string, state: any) => {
    if (['left', 'right'].includes(anchorPosition)) {
      return {
        ...defaultStyleDrawerLeftRight,
        ...transitionStylesLeftRight[state],
      };
    } else {
      return {
        ...defaultStyleDrawerTopBottom,
        ...transitionStylesDrawerTopBottom[state],
      };
    }
  };

  return (
    <>
      <Transition in={open} timeout={300} unmountOnExit>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {open && <StyledOverlay onClick={onClose} />}
          </div>
        )}
      </Transition>
      <Transition in={open} timeout={500} unmountOnExit>
        {state => (
          <>
            {open && (
              <StyledContainerDrawer
                style={getStyles(anchorPosition, state)}
                anchorPosition={anchorPosition}
                onClose={onClose}
                open={open}
              >
                {children}
              </StyledContainerDrawer>
            )}
          </>
        )}
      </Transition>
    </>
  );
};

export default Drawer;
