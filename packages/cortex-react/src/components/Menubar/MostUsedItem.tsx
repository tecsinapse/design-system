import React from 'react';
import { mostUsedItem } from '../../styles/menubar';
import { Card, CardProps } from '../Card';
import ItemLink from './ItemLink';

export interface MostUsedItemProps extends CardProps {
  title: string;
  category: string;
  href?: string;
}

const {
  title: titleClass,
  category: categoryClass,
  container,
} = mostUsedItem();

const MostUsedItem = ({
  title,
  category,
  href,
  ...rest
}: MostUsedItemProps) => {
  return (
    <ItemLink href={href} classNameAnchor={'w-full'}>
      <Card
        {...rest}
        data-testid="most-used-item-menubar"
        className={container()}
      >
        <p className={titleClass()}>{title}</p>
        <p className={categoryClass()}>{category}</p>
      </Card>
    </ItemLink>
  );
};

export default MostUsedItem;
