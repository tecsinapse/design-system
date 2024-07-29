import clsx from 'clsx';
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: React.ReactNode;
}

/** Skeleton component*/
export const Skeleton = ({ className, children, ...rest }: SkeletonProps) => {
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
