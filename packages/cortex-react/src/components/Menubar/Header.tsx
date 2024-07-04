import React, { ReactNode } from 'react';
import { clsx } from 'clsx';
import { menubar } from './style';
import { Button } from '../Button';
import { IoMenu } from 'react-icons/io5';
import { useMenubar } from './Context';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Header = ({ children, className, ...rest }: HeaderProps) => {
  const { root } = menubar();
  const { show, setShow } = useMenubar();

  return (
    <div className={clsx(root(), className)} {...rest}>
      <Button variants={{ size: 'square' }} onClick={() => setShow(!show)}>
        <IoMenu size={16} />
      </Button>
      {children}
    </div>
  );
};

export default Header;
