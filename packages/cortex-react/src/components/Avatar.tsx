import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import { getInitialsName } from './utils';

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
        />
      ) : (
        <p className={'font-bold text-white text-base'}>
          {getInitialsName(name)}
        </p>
      )}
    </div>
  );
};
