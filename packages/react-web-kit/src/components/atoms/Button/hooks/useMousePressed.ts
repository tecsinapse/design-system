import { useCallback, useState } from 'react';

export const useMousePressed = (
  active: boolean,
  onPressIn?: () => void,
  onPressOut?: () => void
) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const handlePressIn = useCallback(() => {
    if (active) {
      setPressed(true);
      onPressIn?.();
    }
  }, [active, setPressed]);

  const handlePressOut = useCallback(() => {
    if (active) {
      setPressed(false);
      onPressOut?.();
    }
  }, [active, setPressed]);

  return {
    pressed,
    handlePressIn,
    handlePressOut,
  };
};
