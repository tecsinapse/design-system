import React from 'react';
import { ItemLinkProps } from './types';
import clsx from 'clsx';

const ItemLink = ({ anchorProps, children }: ItemLinkProps) => {
  return (
    <div>
      {anchorProps ? (
        <a
          target={'_blank'}
          rel={'noopener noreferrer'}
          {...anchorProps}
          className={clsx('w-full', anchorProps?.className)}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );
};

export default ItemLink;
