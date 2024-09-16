import React from 'react';
import { ItemLinkProps } from './types';
import clsx from 'clsx';

const ItemLink = ({ anchorProps, children }: ItemLinkProps) => {
  return (
    <>
      {anchorProps ? (
        <a {...anchorProps} className={clsx('w-full', anchorProps?.className)}>
          {children}
        </a>
      ) : (
        children
      )}
    </>
  );
};

export default ItemLink;
