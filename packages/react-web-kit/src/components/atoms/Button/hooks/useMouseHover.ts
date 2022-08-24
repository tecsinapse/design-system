import { useCallback, useState } from 'react';

export const useMouseHover = (
  active: boolean,
  onMouseOver?: () => void,
  onMouseOut?: () => void
) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseOver = useCallback(() => {
    if (active) {
      setMouseOver(true);
      onMouseOver?.();
    }
  }, [active, setMouseOver]);

  const handleMouseOut = useCallback(() => {
    if (active) {
      setMouseOver(false);
      onMouseOut?.();
    }
  }, [active, setMouseOver]);

  return {
    mouseOver,
    handleMouseOver,
    handleMouseOut,
  };
};
