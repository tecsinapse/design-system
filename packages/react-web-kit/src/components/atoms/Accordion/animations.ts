import { ThemeProp, extractNumbersFromString } from '@tecsinapse/react-core';

export const contentStyle = (
  open: boolean,
  transition: number,
  value: number,
  theme: ThemeProp
) => ({
  transition: `padding-bottom ${transition * 2}ms linear, height ${
    transition * 2
  }ms linear`,
  paddingBottom: open ? extractNumbersFromString(theme.spacing.kilo) : 0,
  height: open ? value : 0,
});

export const contentTransition = (value: number, theme: ThemeProp) => {
  const paddingBottom = extractNumbersFromString(theme.spacing.kilo);
  return {
    entering: {
      paddingBottom,
      height: value,
    },
    entered: {
      paddingBottom,
      height: value,
    },
    exiting: {
      paddingBottom,
      height: value,
    },
    exited: { paddingBottom: 0, height: 0 },
  };
};

export const titleStyle = (transition: number, theme: ThemeProp) => ({
  transition: `color ${transition * 2}ms linear`,
  color: theme.font.color.dark,
});

export const titleTransition = (theme: ThemeProp) => ({
  entering: {
    color: theme.font.color.orange,
  },
  entered: {
    color: theme.font.color.orange,
  },
  exiting: {
    color: theme.font.color.orange,
  },
  exited: { color: theme.font.color.dark },
});
