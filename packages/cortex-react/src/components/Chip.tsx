import React, { ReactNode } from 'react';
import clsx from 'clsx';

export const Chip = ({
  children,
  isSelected,
  onSelect,
}: {
  children: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      className={clsx(
        'bg-inherit text-default border p-mili rounded-deca text-sm cursor-pointer shrink-0 flex gap-micro justify-center transition-all duration-300',
        {
          'bg-primary-medium text-inverse hover:bg-primary-xdark': isSelected,
          'hover:bg-surface-base': !isSelected,
        }
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
};
