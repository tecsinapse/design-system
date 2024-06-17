import clsx from 'clsx';
import React from 'react';

/**
 * Represents the Skeleton Components.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the Skeleton component.
 * @param {string=} [props.className] - Width, height, border radius and others styles should be passed to className.
 */

export const Skeleton = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...rest}
      className={clsx('animate-pulse bg-secondary-light', className)}
    />
  );
};
