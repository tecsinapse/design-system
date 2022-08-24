import { fontColorVC, VariantType } from '@tecsinapse/react-core';
import { useCallback, useState } from 'react';

const useIconTextButton = (variant: VariantType) => {
  const [hover, setHover] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const defaultFontColor = !pressed && hover ? 'light' : fontColorVC[variant];

  const handleHover = useCallback(
    (value: boolean) => {
      setHover(value);
    },
    [setHover]
  );

  const handlePressed = useCallback(
    (value: boolean) => {
      setPressed(value);
    },
    [setPressed]
  );

  return {
    handleHover,
    handlePressed,
    defaultFontColor,
  };
};

export default useIconTextButton;
