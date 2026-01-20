import React from 'react';
import * as Flags from 'country-flag-icons/react/3x2';

interface FlagIconProps {
  countryCode: string;
  className?: string;
  title?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({
  countryCode,
  className = 'w-[25px]',
  title,
}) => {
  if (!countryCode) return null;

  const upperCode = countryCode.toUpperCase();

  const FlagComponent = (Flags as Record<
    string,
    React.ComponentType<{ className?: string; title?: string; 'aria-label'?: string }>
  >)[upperCode];

  if (!FlagComponent) {
    return null;
  }

  return (
    <FlagComponent
      className={className}
      title={title || upperCode}
      aria-label={`Flag of ${upperCode}`}
    />
  );
};
