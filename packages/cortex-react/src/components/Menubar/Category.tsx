import React from 'react';
import { category } from '../../styles/menubar';
import { CategoryType } from './types';

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
