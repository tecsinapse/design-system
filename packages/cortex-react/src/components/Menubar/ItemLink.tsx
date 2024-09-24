import React from 'react';
import { ItemLinkProps } from './types';
import clsx from 'clsx';
import { useMenubar } from '../../provider';

const ItemLink = ({ anchorProps, children }: ItemLinkProps) => {
  const [, setShow] = useMenubar();
  return (
    <div
      onClick={() => {
        setShow(false);
      }}
    >
      {anchorProps ? (
        <a
          {...anchorProps}
          target={'_blank'}
          rel={'noopener noreferrer'}
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
