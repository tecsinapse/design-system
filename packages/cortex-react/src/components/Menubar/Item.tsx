import React from 'react';
interface ItemProps<T> {
  children?: React.ReactNode;
  subItems?: boolean;
  renderSubItems?: (prop: T) => React.ReactNode;
}

const Item = <T,>(props: ItemProps<T>) => {
  return <div></div>;
};

export default Item;
