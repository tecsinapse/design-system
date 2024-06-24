import clsx from 'clsx';
import React, { ReactNode } from 'react';

/**
 * Represents the Skeleton Components.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the Skeleton component.
 * @param {string=} [props.className] - Width, height, border radius and others styles should be passed to className.
 */

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
