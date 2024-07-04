import React, { ReactNode } from 'react';

export type CategoryType<T> = {
  title: string;
  options: T[];
  render: (prop: T) => ReactNode;
};

const Category = <T,>({ title, options, render }: CategoryType<T>) => {
  return (
    <>
      <p className={'mb-mili font-bold'}>{title}</p>
      <hr className={'mb-mili'} />
      <div className={'flex flex-col gap-y-mili'}>
        {options.map(i => {
          return render(i);
        })}
      </div>
    </>
  );
};

export default Category;
