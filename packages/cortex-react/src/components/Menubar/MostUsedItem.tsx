import React from 'react';
import { mostUsedItem } from '../../styles/menubar';
import { Card, CardProps } from '../Card';

export interface MostUsedItemProps extends CardProps {
  title: string;
  category: string;
}

const MostUsedItem = ({ title, category, ...rest }) => {
  const {
    title: titleClass,
    category: categoryClass,
    container,
  } = mostUsedItem();
  return (
    <Card {...rest} className={container()}>
      <p className={titleClass()}>{title}</p>
      <p className={categoryClass()}>{category}</p>
    </Card>
  );
};

export default MostUsedItem;
