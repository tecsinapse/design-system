import React, { ReactNode, useRef } from 'react';

export interface ContentProps {
  /** child element */
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  const ref = useRef(null);

  return <div ref={ref}>{children}</div>;
};
