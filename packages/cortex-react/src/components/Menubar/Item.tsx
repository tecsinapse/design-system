import React, { useState } from 'react';
import { item } from '../../styles/menubar';
import IconControlSubItem from './IconControlSubItem';
import ItemLink from './ItemLink';
import { ItemProps } from './types';
import clsx from 'clsx';
import { useMenubar } from '../../provider';

const { container, textBehavior } = item();

const Item = <T,>({
  children,
  subItems,
  renderSubItems,
  className,
  anchorProps,
  ...rest
}: ItemProps<T>) => {
  const [showSubItem, setShowSubItem] = useState(false);
  const hasSubItems = (subItems ?? []).length > 0;
  const [, setShow] = useMenubar();

  return (
    <ItemLink anchorProps={anchorProps}>
      <div
        data-testid="item-menubar"
        {...rest}
        onClick={e => {
          if (hasSubItems) e.stopPropagation();
          else {
            setShow(false);
          }
        }}
        className={clsx(
          container({ className }),
          !hasSubItems && textBehavior()
        )}
      >
        {children}
        {hasSubItems ? (
          <IconControlSubItem show={showSubItem} setShow={setShowSubItem} />
        ) : (
          <></>
        )}
      </div>
      {showSubItem ? (
        <>{subItems?.map(subItem => renderSubItems?.(subItem))}</>
      ) : (
        <></>
      )}
    </ItemLink>
  );
};

export default Item;
