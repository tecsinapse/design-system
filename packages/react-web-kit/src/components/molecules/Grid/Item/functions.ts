import { Span } from './Item';

export const getSpan = (
  value: Span,
  sm: boolean,
  md: boolean,
  lg: boolean
): number => {
  if (sm) return value.sm;
  if (md) return value?.md ?? value.sm;
  if (lg) return value?.lg ?? value?.md ?? value.sm;
  return 0;
};
