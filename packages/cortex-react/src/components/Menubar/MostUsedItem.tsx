import React from 'react';
import { mostUsedItem } from './style';
import { Card } from '../Card';

interface MostUsedItemProps {
  title: string;
  category: string;
}

const MostUsedItem = ({ title, category }: MostUsedItemProps) => {
  const {
    title: titleClass,
    category: categoryClass,
    container,
  } = mostUsedItem();
  return (
    // TODO: Verificar se essa div deve ficar aqui ou no MostUsed
    <Card className={container()}>
      <p className={titleClass()}>{title}</p>
      <p className={categoryClass()}>{category}</p>
    </Card>
    // <div className={mostUsedItem()}>
    //   {/*<div className={'gap-x-kilo flex flex-row'}>*/}
    //   {/*  {[].map(item => (*/}
    //   {/*    <a>*/}
    //   {/*      <Card />*/}
    //   {/*    </a>*/}
    //   {/*  ))}*/}
    //   {/*</div>*/}
    //   {children}
    // </div>
  );
};

export default MostUsedItem;
