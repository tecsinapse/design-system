import React from 'react';
import { BreadcrumbType } from '../components';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

interface BreadcrumbItemProps extends BreadcrumbType {
  isLast: boolean;
}
export const BreadcrumbItem = ({
  isLast,
  Component,
  componentProps,
  title,
}: BreadcrumbItemProps) => {
  return (
    <Component {...componentProps} key={title}>
      <div className={'flex gap-x-mili items-center'}>
        <p
          className={isLast ? 'text-secondary-medium' : 'text-secondary-xdark'}
        >
          {title}
        </p>
        {!isLast ? (
          <MdOutlineKeyboardDoubleArrowRight
            className={'mt-[0.125rem] text-primary-medium'}
          />
        ) : (
          <></>
        )}
      </div>
    </Component>
  );
};
