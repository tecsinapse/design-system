import React from 'react';
import { PopoverProvider } from './PopoverContext';

interface PopoverRootProps {
  children: React.ReactNode;
}

const PopoverRoot = ({ children }: PopoverRootProps) => {
  return <PopoverProvider>{children}</PopoverProvider>;
};

export default PopoverRoot;
