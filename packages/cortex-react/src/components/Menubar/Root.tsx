import React, { ReactNode } from 'react';
import { MenubarProvider } from '../../provider/MenubarProvider';

export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: ReactNode;
}

/** Menubar component */
const Root = ({ children, ...rest }: RootProps) => {
  return (
    <MenubarProvider>
      <div {...rest}>{children}</div>
    </MenubarProvider>
  );
};

export default Root;
