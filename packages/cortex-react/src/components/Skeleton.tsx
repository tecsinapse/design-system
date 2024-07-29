import clsx from 'clsx';
import React, { ReactNode } from 'react';

/** Skeleton component*/
export const Skeleton = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
}) => {
  return (
    <div
      {...rest}
      data-testid={'skeleton'}
      className={clsx('animate-pulse bg-secondary-light', className)}
    >
      {children}
    </div>
  );
};
