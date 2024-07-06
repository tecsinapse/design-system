import React from 'react';
import { DefaultProps } from './interface';
import { subItem } from '../../styles/menubar';

interface SubItemProps extends DefaultProps {
  href?: string;
}

const SubItem = ({ children, href, className, ...rest }: SubItemProps) => {
  const { container } = subItem();

  const Content = (
    <div {...rest} className={container({ className })}>
      {children}
    </div>
  );

  return (
    <>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {Content}
        </a>
      ) : (
        Content
      )}
    </>
  );
};

export default SubItem;
