import React from 'react';
import { mostUsedItem } from '../../styles/menubar';
import { Card } from '../Card';
import ItemLink from './ItemLink';
import { MostUsedItemProps } from './types';

const {
  title: titleClass,
  category: categoryClass,
  container,
} = mostUsedItem();

const MostUsedItem = ({
  title,
  category,
  anchorProps,
  ...rest
}: MostUsedItemProps) => {
  return (
    <ItemLink anchorProps={anchorProps}>
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
