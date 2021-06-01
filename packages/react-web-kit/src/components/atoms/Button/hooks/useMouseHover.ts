import { useCallback, useState } from 'react';

export const useMouseHover = (active: boolean) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseOver = useCallback(() => active && setMouseOver(true), [
    active,
  ]);

  const handleMouseOut = useCallback(() => active && setMouseOver(false), [
    active,
  ]);

  return {
    mouseOver,
    handleMouseOver,
    handleMouseOut,
  };
};
