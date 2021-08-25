import { TransitionStatus } from 'react-transition-group';
import { CSSProperties } from 'react';

const getDefaultInputContainerStyles = () => ({
  display: 'flex',
  flex: 1,
  transitionDuration: '250ms',
  transitionProperty: 'opacity scale transform',
  transitionTimingFunction: 'ease-in-out',
});

const getDefaultContainerOpenMenuStyles = () => ({
  transitionDuration: '250ms',
  transitionProperty: 'opacity scale transform',
  transitionTimingFunction: 'ease-in-out',
  zIndex: 0,
});

const getInputContainerTransform = () => ({
  entered: {
    transform: 'scale(1, 1) translateY(0px)',
    zIndex: 0,
  },
  entering: {
    opacity: 0.5,
    transform: 'scale(0.98, 0.98) translateY(-5px)',
    zIndex: 0,
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.98, 0.98) translateY(-50px)',
    zIndex: 0,
  },
  exiting: {
    opacity: 0.5,
    transform: 'scale(0.98, 0.98) translateY(-5px)',
    zIndex: 0,
  },
});

const getContainerOpenMenuTransform = () => ({
  entered: {
    transform: 'scale(1, 1) translateY(0px) ',
    zIndex: 0,
  },
  entering: {
    opacity: 0.75,
    transform: 'scale(0.98, 0.98) translateY(0px)',
    zIndex: 0,
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.98, 0.98) translateY(-600px)',
    zIndex: 0,
  },
  exiting: {
    opacity: 0.75,
    transform: 'scale(0.98, 0.98) translateY(0px)',
    zIndex: 0,
  },
});

export const getInputContainerStyles = (
  state: TransitionStatus
): CSSProperties => ({
  ...getDefaultInputContainerStyles(),
  ...getInputContainerTransform()[state],
});

export const getContainerOpenMenuStyles = (
  state: TransitionStatus
): CSSProperties => ({
  ...getDefaultContainerOpenMenuStyles(),
  ...getContainerOpenMenuTransform()[state],
});
