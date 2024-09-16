import React, { useState } from 'react';
import { item } from '../../styles/menubar';
import IconControlSubItem from './IconControlSubItem';
import ItemLink from './ItemLink';
import { ItemProps } from './types';

const { container, text } = item();

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

  return (
    <ItemLink anchorProps={anchorProps}>
      <div data-testid="item-menubar" {...rest} className={container()}>
        <div className={text({ className })}>{children}</div>
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
