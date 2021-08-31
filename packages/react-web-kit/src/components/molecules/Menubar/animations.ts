import { CSSProperties } from 'react';
import { TransitionStatus } from 'react-transition-group';
import { ThemeProp } from '@tecsinapse/react-core';

const getDefaultInputContainerStyles = (theme: ThemeProp) => ({
  display: 'flex',
  flex: 1,
  transitionDuration: '250ms',
  transitionProperty: 'opacity scale transform',
  transitionTimingFunction: 'ease-in-out',
  zIndex: theme.zIndex.default,
});

const getDefaultContainerOpenMenuStyles = (theme: ThemeProp) => ({
  transitionDuration: '250ms',
  transitionProperty: 'opacity scale transform',
  transitionTimingFunction: 'ease-in-out',
  zIndex: theme.zIndex.default,
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
  state: TransitionStatus,
  theme: ThemeProp
): CSSProperties => ({
  ...getDefaultInputContainerStyles(theme),
  ...getInputContainerTransform()[state],
});

export const getContainerOpenMenuStyles = (
  state: TransitionStatus,
  theme: ThemeProp
): CSSProperties => ({
  ...getDefaultContainerOpenMenuStyles(theme),
  ...getContainerOpenMenuTransform()[state],
});
