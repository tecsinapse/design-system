import { MutableRefObject, useCallback, useEffect } from 'react';

interface useOutsideClickListenerProps {
  ref: MutableRefObject<any>;
  onClickOutside?: () => void;
}

export const useOutsideClickListener = ({
  ref,
  onClickOutside,
}: useOutsideClickListenerProps) => {
  const handleClickOutside = useCallback((event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setTimeout(() => {
        onClickOutside?.();
      }, 10);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);
};
