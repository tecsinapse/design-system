import React, { FC, useRef } from 'react';
import { StyledContainerDrawer } from './styled';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Overlay } from '../../atoms/Overlay';
import {
  transitionStylesTopBottom,
  defaultStylesTopBottom,
  defaultStylesLeftRight,
  transitionStylesLeftRight,
} from './animations';

type AnchorPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  anchorPosition: AnchorPosition;
}

const Drawer: FC<DrawerProps> = ({
  open,
  anchorPosition = 'right',
  onClose,
  children,
  style,
  ...rest
}) => {
  const transitionRef = useRef(null);
  const getStyles = (
    anchorPosition: AnchorPosition,
    state: TransitionStatus
  ) => {
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
      <Transition in={open} timeout={300} nodeRef={transitionRef}>
        {state => (
          <StyledContainerDrawer
            ref={transitionRef}
            style={{ ...style, ...getStyles(anchorPosition, state) }}
            anchorPosition={anchorPosition}
            onClose={onClose}
            open={open}
            {...rest}
          >
            {children}
          </StyledContainerDrawer>
        )}
      </Transition>
    </>
  );
};

export default Drawer;
