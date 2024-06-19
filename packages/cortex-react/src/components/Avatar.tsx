import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import { getNameInitials } from './utils';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
}

export const Avatar = ({ src, name, className, ...rest }: AvatarProps) => {
  const [hasError, setHasError] = React.useState<boolean>(false);

  // If the source changes in runtime, this prevents error from being true always (fallback)
  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div
      {...rest}
      className={clsx(
        'rounded-pill bg-secondary-dark w-mega h-mega flex items-center justify-center cursor-pointer',
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          className={'rounded-pill'}
          onError={() => setHasError(true)}
          data-testid="avatar-img"
        />
      ) : (
        <p className={'font-bold text-white text-base'} data-testid="avatar-p">
          {getNameInitials(name)}
        </p>
      )}
    </div>
  );
};
