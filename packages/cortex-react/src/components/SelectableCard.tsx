import React from 'react';
import { card } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import { FiTrash } from 'react-icons/fi';

export const SelectableCard = ({
  label,
  onSelect,
  onRemove,
  isSelected,
}: {
  label: string;
  onSelect?: () => void;
  onRemove?: () => void;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={card({
        className: clsx(
          'bg-inherit border cursor-pointer shadow-none hover:shadow-sm duration-300 transition-all flex items-center justify-between',
          {
            'border-primary-medium': isSelected,
          }
        ),
      })}
      onClick={() => onSelect?.()}
    >
      {label}
      {onRemove ? (
        <FiTrash
          className="cursor-pointer hover:text-primary-medium transition-all duration-300 text-deca"
          onClick={e => {
            e.stopPropagation();
            onRemove?.();
          }}
        />
      ) : null}
    </div>
  );
};
