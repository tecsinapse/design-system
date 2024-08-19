import React from 'react';
import { clsx } from 'clsx';

interface KanbanProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** Container Kanban Component .*/
const Root = ({ children, className, ...rest }: KanbanProps) => {
  return (
    <div
      {...rest}
      className={clsx(
        'border border-dashed border-secondary-medium rounded-mili bg-secondary-xlight overflow-hidden',
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
