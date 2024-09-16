import React from 'react';
import { SubItemProps } from './types';
import { subItem } from '../../styles/menubar';
import ItemLink from './ItemLink';

const { container } = subItem();

const SubItem = ({
  children,
  anchorProps,
  className,
  ...rest
}: SubItemProps) => {
  return (
    <ItemLink anchorProps={anchorProps}>
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
