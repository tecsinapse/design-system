import clsx from 'clsx';
import React from 'react';
import { ItemLinkProps } from './types';

const ItemLink = ({ anchorProps, children, ...rest }: ItemLinkProps) => {
  return (
    <div {...rest}>
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
