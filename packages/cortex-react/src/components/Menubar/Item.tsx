import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useMenubar } from '../../provider';
import { item } from '../../styles/menubar';
import IconControlSubItem from './IconControlSubItem';
import ItemLink from './ItemLink';
import { ItemProps } from './types';

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

  const handleClickItemMenubar = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (hasSubItems) {
        e.stopPropagation();
        setShowSubItem(prev => !prev);
      } else {
        setShow(false);
      }
    },
    []
  );

  return (
    <ItemLink anchorProps={anchorProps}>
      <div
        data-testid="item-menubar"
        {...rest}
        onClick={handleClickItemMenubar}
        className={clsx(
          container({ className }),
          (!hasSubItems || anchorProps) && textBehavior()
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
