import React from 'react';
import { DefaultProps } from './interface';
import { subItem } from '../../styles/menubar';
import ItemLink from './ItemLink';

export interface SubItemProps extends DefaultProps {
  href?: string;
}

const { container } = subItem();

const SubItem = ({ children, href, className, ...rest }: SubItemProps) => {
  return (
    <ItemLink href={href}>
      <div
        {...rest}
        data-testid="sub-item-menubar"
        className={container({ className })}
      >
        {children}
      </div>
    </ItemLink>
  );
};

export default SubItem;
