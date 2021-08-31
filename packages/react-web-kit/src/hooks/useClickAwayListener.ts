import React from 'react';

export const useClickAwayListener = (
  ref: React.MutableRefObject<any>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  React.useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
