import React, { ReactNode } from 'react';
import { IoCloseOutline, IoMenu } from 'react-icons/io5';
import { useMenubar } from '../../provider';
import { menubar } from '../../styles/menubar';
import { Button } from '../Button';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: ReactNode;
}

const { header } = menubar();

const Header = ({ children, className, ...rest }: HeaderProps) => {
  const [show, setShow] = useMenubar();

  return (
    <div
      className={header({ className })}
      data-testid={'header-menubar'}
      {...rest}
    >
      <Button variants={{ size: 'square' }} onClick={() => setShow(!show)}>
        {show ? <IoCloseOutline size={16} /> : <IoMenu size={16} />}
      </Button>
      {children}
    </div>
  );
};

export default Header;
