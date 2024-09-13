import React, { ReactNode } from 'react';
import { MenubarProvider } from '../../provider';

export interface RootProps {
  /** child element */
  children?: ReactNode;
}

/** Menubar component */
const Root = ({ children }: RootProps) => {
  return <MenubarProvider>{children}</MenubarProvider>;
};

export default Root;
