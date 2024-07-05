import React from 'react';
import { DefaultProps } from './interface';
import { animate, menubar } from '../../styles/menubar';
import clsx from 'clsx';
import { useMenubar } from '../../provider';

const Dropdown = ({ children, ...rest }: DefaultProps) => {
  const { dropdown } = menubar();
  const [show] = useMenubar();

  return (
    <div className={clsx(dropdown(), animate({ show }))} {...rest}>
      {children}
    </div>
  );
};

export default Dropdown;
