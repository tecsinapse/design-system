import clsx from 'clsx';
import React from 'react';
import { LiaAngleDownSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { useAccordionContext } from './context';
import { AccordionProps } from './types';

export const AccordionTrigger = ({
  label,
  children,
  floating = false,
  left = true,
  showDivider = true,
  showArrowBorder = true,
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
  | 'floating'
  | 'left'
  | 'showDivider'
  | 'showArrowBorder'
  | 'label'
  | 'children'
  | 'onOpen'
  | 'onClose'
  | 'invertedArrow'
  | 'direction'
> & {
  /**
   * Only applied to trigger arrow
   */
  className?: string;
}) => {
  const { open, toggle } = useAccordionContext();
  if (!floating && !label && !children) {
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
        'flex justify-between align-center cursor-pointer',
        { 'mr-deca': floating && direction === 'horizontal' },
        { 'mb-deca': floating && direction === 'vertical' },
        {
          'border-r border-secondary-light flex-col px-mili':
            direction === 'horizontal',
        },
        {
          'border-b border-secondary-light py-mili':
            showDivider && direction === 'vertical',
        }
      )}
      onClick={action}
    >
      {!floating && left === false && (
        <span
          className={clsx({
            '-rotate-180 [writing-mode:vertical-lr]':
              direction === 'horizontal',
          })}
        >
          {children ?? label}
        </span>
      )}

      <div
        className={clsx(
          'rounded-mili flex align-center justify-center p-micro',
          {
            'absolute -translate-x-micro translate-y-deca bg-white':
              floating && direction === 'horizontal',
          },
          {
            'absolute -translate-y-micro translate-x-deca bg-white':
              floating && direction === 'vertical',
          },
          {
            'border border-secondary-light': showArrowBorder,
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
      {!floating && left === true && (
        <span
          className={clsx({
            '-rotate-180 [writing-mode:vertical-lr]':
              direction === 'horizontal',
          })}
        >
          {children ?? label}
        </span>
      )}
    </div>
  );
};
