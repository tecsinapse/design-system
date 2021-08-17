import React, { ElementType, FC } from 'react';
import { StyledContainerBreadcrumbs } from './styled';
import { BreadcrumbItem } from './BreadcrumbItem';

type Breadcrumb = {
  title: string;
  Component: ElementType;
  componentProps?: any;
};

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <StyledContainerBreadcrumbs>
      {breadcrumbs.map((item, index) => {
        const { componentProps, Component, title } = item;
        return (
          <BreadcrumbItem
            key={index}
            Component={Component}
            props={componentProps}
            isLast={breadcrumbs.length - 1 === index}
            title={title}
          />
        );
      })}
    </StyledContainerBreadcrumbs>
  );
};

export default Breadcrumbs;
