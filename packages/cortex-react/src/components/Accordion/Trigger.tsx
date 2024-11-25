import clsx from 'clsx';
import React from 'react';
import { LiaAngleDownSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { useAccordionContext } from './context';
import { AccordionProps } from './types';

export const AccordionTrigger = ({
  label,
  floating = false,
  /**
   * Only applied to trigger arrow
   */
  className,
  onOpen,
  onClose,
  invertedArrow = false,
  direction = 'horizontal',
}: Pick<
  AccordionProps,
  'floating' | 'label' | 'onOpen' | 'onClose' | 'invertedArrow' | 'direction'
> & {
  /**
   * Only applied to trigger arrow
   */
  className?: string;
}) => {
  const { open, toggle } = useAccordionContext();
  if (!floating && !label) {
    throw new Error(
      'A label must be specified if the trigger is not floating variant'
    );
  }

  const action = () => {
    if (!open) {
      onOpen?.();
    } else {
      onClose?.();
    }
    toggle?.();
  };

  return (
    <div
      className={clsx(
        'flex justify-between align-center border-secondary-light cursor-pointer',
        { 'mr-deca': floating && direction === 'horizontal' },
        { 'mb-deca': floating && direction === 'vertical' },
        { 'border-r flex-col px-mili': direction === 'horizontal' },
        { 'border-b py-mili': direction === 'vertical' }
      )}
      onClick={action}
    >
      <div
        className={clsx(
          'rounded-mili border border-secondary-light flex align-center justify-center p-micro',
          {
            'absolute -translate-x-micro translate-y-deca bg-white':
              floating && direction === 'horizontal',
          },
          {
            'absolute -translate-y-micro translate-x-deca bg-white':
              floating && direction === 'vertical',
          },
          className
        )}
      >
        {direction === 'horizontal' ? (
          <LiaAngleRightSolid
            className={clsx(
              'text-secondary-medium transition-transform duration-200',
              {
                'rotate-180': invertedArrow ? !open : open,
              }
            )}
          />
        ) : (
          <LiaAngleDownSolid
            className={clsx(
              'text-secondary-medium transition-transform duration-200',
              {
                'rotate-180': invertedArrow ? !open : open,
              }
            )}
          />
        )}
      </div>
      {!floating ? (
        <span
          className={clsx({
            '-rotate-180 [writing-mode:vertical-lr]':
              direction === 'horizontal',
          })}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};
