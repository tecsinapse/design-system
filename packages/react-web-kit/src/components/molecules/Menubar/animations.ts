import { TransitionStatus } from 'react-transition-group';
import { CSSProperties } from 'react';

const getDefaultInputContainerStyles = () => ({
  display: 'flex',
  flex: 1,
  transitionDuration: '250ms',
  transitionProperty: 'opacity scale transform',
  transitionTimingFunction: 'ease-in-out',
  zIndex: ({ theme }) => theme.zIndex('default'),
});

const getDefaultContainerOpenMenuStyles = () => ({
  transitionDuration: '250ms',
  transitionProperty: 'opacity scale transform',
  transitionTimingFunction: 'ease-in-out',
  zIndex: ({ theme }) => theme.zIndex('default'),
});

const getInputContainerTransform = () => ({
  entered: {
    transform: 'scale(1, 1) translateY(0px)',
  },
  entering: {
    opacity: 0.5,
    transform: 'scale(0.99, 0.99) translateY(-5px)',
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.99, 0.99) translateY(-50px)',
  },
  exiting: {
    opacity: 0.5,
    transform: 'scale(0.99, 0.99) translateY(-5px)',
  },
});

const getContainerOpenMenuTransform = () => ({
  entered: {
    transform: 'scale(1, 1) translateY(0px) ',
  },
  entering: {
    opacity: 0.95,
    transform: 'scale(0.99, 0.99) translateY(0px)',
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.99, 0.99) translateY(-600px)',
  },
  exiting: {
    opacity: 0.95,
    transform: 'scale(0.99, 0.99) translateY(0px)',
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
