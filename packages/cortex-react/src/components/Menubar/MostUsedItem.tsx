import React from 'react';
import { mostUsedItem } from '../../styles/menubar';
import { Card, CardProps } from '../Card';

export interface MostUsedItemProps extends CardProps {
  title: string;
  category: string;
  href?: string;
}

const MostUsedItem = ({
  title,
  category,
  href,
  ...rest
}: MostUsedItemProps) => {
  const {
    title: titleClass,
    category: categoryClass,
    container,
  } = mostUsedItem();

  const Content = (
    <Card
      {...rest}
      data-testid="most-used-item-menubar"
      className={container()}
    >
      <p className={titleClass()}>{title}</p>
      <p className={categoryClass()}>{category}</p>
    </Card>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={'w-full'}
    >
      {Content}
    </a>
  ) : (
    Content
  );
};

export default MostUsedItem;
