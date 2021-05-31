import { useCallback, useState } from 'react';

export const useMouseHover = () => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseOver = useCallback(() => setMouseOver(true), []);

  const handleMouseOut = useCallback(() => setMouseOver(false), []);

  return {
    mouseOver,
    handleMouseOver,
    handleMouseOut,
  };
};
