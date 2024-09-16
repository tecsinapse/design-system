import React from 'react';
import { MenubarProvider } from '../../provider';
import { RootProps } from './types';

/** Menubar component */
const Root = ({ children }: RootProps) => {
  return <MenubarProvider>{children}</MenubarProvider>;
};

export default Root;
