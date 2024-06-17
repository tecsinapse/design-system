import React, { ElementType } from 'react';
import { Card } from './Card';
import { BreadcrumbItem } from './BreadcrumbItem';

export interface BreadcrumbType {
  title: string;
  Component: ElementType;
  componentProps?: any;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  breadcrumbs: BreadcrumbType[];
}
export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs, ...rest } = props;
  return (
    <Card className={'flex gap-x-mili w-full items-center py-mili'} {...rest}>
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <BreadcrumbItem
            key={`${item.title}-${index}`}
            {...item}
            isLast={isLast}
          />
        );
      })}
    </Card>
  );
};
