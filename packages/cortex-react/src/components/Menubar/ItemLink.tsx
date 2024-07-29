import React from 'react';

interface ItemLinkProps {
  href?: string;
  /** child element */
  children?: React.ReactNode;
  classNameAnchor?: string;
}

const ItemLink = ({ href, children, classNameAnchor }: ItemLinkProps) => {
  return (
    <>
      {href ? (
        <a
          href={href}
          target={'_blank'}
          rel={'noopener noreferrer'}
          className={classNameAnchor}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </>
  );
};

export default ItemLink;
