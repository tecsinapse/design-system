import { clsx } from 'clsx';
import React from 'react';

export interface KanbanProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: React.ReactNode;
}

/** Container Kanban Component .*/
const Root = ({ children, className, ...rest }: KanbanProps) => {
  return (
    <div
      {...rest}
      className={clsx(
        'border border-dashed border-content-low rounded-mili bg-content-inverse overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

const Header = ({ children, className, ...rest }: KanbanProps) => {
  return (
    <div {...rest} className={clsx('p-deca', className)}>
      {children}
    </div>
  );
};

const Body = ({ children, className, ...rest }: KanbanProps) => {
  return (
    <div {...rest} className={clsx('overflow-y-scroll', className)}>
      {children}
    </div>
  );
};

const ContainerList = ({ children, className, ...rest }: KanbanProps) => {
  return (
    <div {...rest} className={clsx('px-deca', className)}>
      {children}
    </div>
  );
};

export const Kanban = {
  Root,
  Header,
  Body,
  ContainerList,
};
