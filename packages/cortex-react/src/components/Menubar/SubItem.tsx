import React from 'react';
import { SubItemProps } from './types';
import { subItem } from '../../styles/menubar';
import ItemLink from './ItemLink';
import { useMenubar } from '../../provider';

const { container } = subItem();

const SubItem = ({
  children,
  anchorProps,
  className,
  ...rest
}: SubItemProps) => {
  const [, setShow] = useMenubar();

  return (
    <ItemLink anchorProps={anchorProps}>
      <div
        {...rest}
        data-testid="sub-item-menubar"
        className={container({ className })}
        onClick={() => {
          setShow(false);
        }}
      >
        {children}
      </div>
    </ItemLink>
  );
};

export default SubItem;
