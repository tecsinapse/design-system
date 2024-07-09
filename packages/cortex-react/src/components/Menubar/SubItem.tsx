import React from 'react';
import { DefaultProps } from './interface';
import { subItem } from '../../styles/menubar';

export interface SubItemProps extends DefaultProps {
  href?: string;
}

const { container } = subItem();

const SubItem = ({ children, href, className, ...rest }: SubItemProps) => {
  const Content = (
    <div
      {...rest}
      data-testid="sub-item-menubar"
      className={container({ className })}
    >
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
