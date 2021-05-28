import { useCallback, useState } from 'react';

export const useInputFocus = (
  onFocus?: () => void,
  onBlur?: () => void,
  focusEnabled = true
) => {
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    if (focusEnabled) {
      setFocused(true);
      onFocus && onFocus();
    }
  }, [focusEnabled, setFocused, onFocus]);

  const handleBlur = useCallback(() => {
    if (focusEnabled) {
      setFocused(false);
      onBlur && onBlur();
    }
  }, [focusEnabled, setFocused, onBlur]);

  return {
    focused,
    handleBlur,
    handleFocus,
  };
};
