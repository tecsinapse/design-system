import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useMenubar } from '../../provider';
import { item } from '../../styles/menubar';
import IconControlSubItem from './IconControlSubItem';
import ItemLink from './ItemLink';
import { ItemProps } from './types';
import { useCategories } from '../../provider/CategoriesContext';

const { container, textBehavior } = item();

const Item = <T,>({
  children,
  subItems,
  renderSubItems,
  className,
  anchorProps,
  title,
  parentCategoryTitle,
  ...rest
}: ItemProps<T>) => {
  const hasSubItems = (subItems ?? []).length > 0; // Verifica se há subitens
  const [, setShow] = useMenubar();
  const { expandedMenus, toggleSubmenu } = useCategories();

  const isExpanded = expandedMenus[parentCategoryTitle] === title;

  const handleClickItemMenubar = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (hasSubItems) {
        e.stopPropagation();
        toggleSubmenu(parentCategoryTitle, title); // Alterna o submenu na categoria correspondente
      } else {
        setShow(false); // Fecha o menu principal se não tiver submenu
      }
    },
    [hasSubItems, parentCategoryTitle, title, toggleSubmenu, setShow]
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
          <IconControlSubItem
            show={isExpanded}
            setShow={() => toggleSubmenu(parentCategoryTitle, title)} // Alterna o submenu
          />
        ) : null}
      </div>
      {isExpanded ? (
        <>{subItems?.map(subItem => renderSubItems?.(subItem))}</>
      ) : null}
    </ItemLink>
  );
};

export default Item;
