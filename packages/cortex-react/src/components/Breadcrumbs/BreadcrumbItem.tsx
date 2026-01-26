import clsx from 'clsx';
import React, { ElementType } from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

export interface BreadcrumbType {
  title: string;
  Component: ElementType;
  componentProps?: any;
}

export interface BreadcrumbItemProps extends BreadcrumbType {
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
          className={clsx(
            'no-underline',
            isLast
              ? 'text-content-low cursor-default'
              : 'text-content-medium cursor-pointer'
          )}
        >
          {title}
        </p>
        {!isLast ? (
          <MdOutlineKeyboardDoubleArrowRight
            className={'mt-[0.125rem] text-primary-medium'}
            data-testid="breadcrumb-item-icon"
          />
        ) : (
          <></>
        )}
      </div>
    </Component>
  );
};
