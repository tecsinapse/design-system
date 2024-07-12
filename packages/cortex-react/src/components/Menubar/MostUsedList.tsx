import React, { Fragment } from 'react';
import { DropdownRootProps } from './DropdownRoot';
import { Menubar } from '..';

const MostUsedList = ({ mostUsed }: Pick<DropdownRootProps, 'mostUsed'>) => {
  return (
    <>
      {(mostUsed ?? []).map((item, index) => {
        const { title, category, ...rest } = item;
        if (index > 3)
          return <Fragment key={`${title}-${category}`}></Fragment>;
        return (
          <Menubar.MostUsedItem
            key={`${title}-${category}`}
            title={title}
            category={category}
            {...rest}
          />
        );
      })}
    </>
  );
};

export default MostUsedList;
