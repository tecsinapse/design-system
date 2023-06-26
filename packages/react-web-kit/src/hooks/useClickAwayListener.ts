import React from 'react';

export const useClickAwayListener = (
  ref: React.MutableRefObject<any>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onClickAway?: () => void,
  event: 'mouseup' | 'mousedown' | undefined = 'mousedown',
): void => {
  React.useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway?.()
        setVisible(false);
      }
    };
    document.addEventListener(event, handleClickOutside);
    return () => {
      document.removeEventListener(event, handleClickOutside);
    };
  }, [ref, onClickAway]);
};
