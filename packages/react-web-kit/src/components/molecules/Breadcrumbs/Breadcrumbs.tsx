import React, { ElementType, FC } from 'react';
import { StyledContainerBreadcrumbs } from './styled';
import { BreadcrumbItem } from './BreadcrumbItem';

export type BreadcrumbType = {
  title: string;
  Component: ElementType;
  props?: any;
};

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbType[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <StyledContainerBreadcrumbs>
      {breadcrumbs.map((item, index) => {
        const { props, Component = 'a', title } = item;
        return (
          <BreadcrumbItem
            key={index}
            Component={Component}
            props={props}
            isLast={breadcrumbs.length - 1 === index}
            title={title}
          />
        );
      })}
    </StyledContainerBreadcrumbs>
  );
};

export default Breadcrumbs;
