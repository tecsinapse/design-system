import React, { ReactNode, useEffect, useRef } from 'react';
import { useOutsideClickListener } from '../hooks';
import { MenubarContext } from './MenubarContext';

export const MenubarProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = React.useState(false);
  const ref = useRef(null);
  const showRef = useRef(false);

  useEffect(() => {
    showRef.current = show;
  }, [show]);

  const onClickOutside = () => {
    if (showRef.current === true) {
      setShow(false);
    }
  };

  useOutsideClickListener({
    ref,
    onClickOutside,
  });

  return (
    <MenubarContext.Provider value={{ show, setShow }}>
      <div ref={ref}>{children}</div>
    </MenubarContext.Provider>
  );
};
