import React, { ReactNode } from 'react';
import { MenubarProvider } from '../../provider';

export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Root = ({ children, ...rest }: RootProps) => {
  return (
    <MenubarProvider>
      <div {...rest}>{children}</div>
    </MenubarProvider>
  );
};

export default Root;
