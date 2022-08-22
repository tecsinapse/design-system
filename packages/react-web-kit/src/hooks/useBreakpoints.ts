import { useTheme } from '@tecsinapse/react-core';
import { useWindowSize } from './useWindowSize';

export type UseBreakpointsReturn = {
  sm: boolean;
  md: boolean;
  lg: boolean;
};

export const useBreakpoints = (): UseBreakpointsReturn => {
  const { width } = useWindowSize();
  const { breakpoints } = useTheme();
  return {
    sm: Number(width) >= 0 && Number(width) <= breakpoints.sm,
    md: Number(width) > breakpoints.sm && Number(width) <= breakpoints.md,
    lg: Number(width) > breakpoints.md,
  };
};
