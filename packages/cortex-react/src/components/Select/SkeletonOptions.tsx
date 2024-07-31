import React from 'react';
import { Skeleton } from '../Skeleton';

const optionSkeletonStyle = 'w-full px-deca my-nano h-[30px]';

export const SkeletonOptions = () => {
  return (
    <div className="flex flex-col gap-y-nano">
      {Array.from(Array(10).keys()).map(value => (
        <Skeleton key={value}>
          <div className={optionSkeletonStyle}></div>
        </Skeleton>
      ))}
    </div>
  );
};
