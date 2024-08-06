import React from 'react';
import { DefaultProps } from './interface';
import { animate, menubar } from '../../styles/menubar';
import clsx from 'clsx';
import { useMenubar } from '../../provider';

const { dropdown } = menubar();

const Dropdown = ({ children, ...rest }: DefaultProps) => {
  const [show] = useMenubar();

  return (
    <div
      className={clsx(dropdown({ show }), animate({ show }))}
      data-testid={'dropdown-menubar'}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Dropdown;
