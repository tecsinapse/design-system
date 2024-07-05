import React from 'react';
import { DefaultProps } from './interface';

const SubItem = ({ children, ...rest }: DefaultProps) => {
  return (
    <div
      {...rest}
      className={
        'pl-deca text-sub border-l-[1px] border-primary-medium text-secondary-dark hover:text-primary-medium cursor-pointer'
      }
    >
      {children}
    </div>
  );
};

export default SubItem;
