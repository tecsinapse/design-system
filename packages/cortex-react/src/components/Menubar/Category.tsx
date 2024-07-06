import React, { ReactNode } from 'react';
import { category } from '../../styles/menubar';

export type CategoryType<T> = {
  title: string;
  options: T[];
  render: (prop: T) => ReactNode;
};

const Category = <T,>({ title, options, render }: CategoryType<T>) => {
  const { text, hr, container } = category();
  return (
    <>
      <p className={text()}>{title}</p>
      <hr className={hr()} />
      <div className={container()}>{options.map(i => render(i))}</div>
    </>
  );
};

export default Category;
