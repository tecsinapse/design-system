import React, { Fragment } from 'react';
import { DropdownRootProps } from './DropdownRoot';
import MostUsedItem from './MostUsedItem';

const MostUsedList = ({ mostUsed }: Pick<DropdownRootProps, 'mostUsed'>) => {
  return (
    <>
      {(mostUsed ?? []).map((item, index) => {
        const { title, category, ...rest } = item;
        if (index > 3)
          return <Fragment key={`${title}-${category}`}></Fragment>;
        return (
          <MostUsedItem
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
