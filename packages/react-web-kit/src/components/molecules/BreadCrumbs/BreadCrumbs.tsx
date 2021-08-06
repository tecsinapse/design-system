import React, { ElementType, FC } from 'react';
import { StyledContainerBreadCrumbs } from './styled';
import { BreadCrumbItem } from './BreadCrumbItem';

type BreadCrumb = {
  title: string;
  Component: ElementType;
  componentProps?: any;
};

interface BreadCrumbsProps {
  breadcrumbs: BreadCrumb[];
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ breadcrumbs }) => {
  return (
    <StyledContainerBreadCrumbs>
      {breadcrumbs.map((item, index) => {
        const { componentProps, Component, title } = item;
        return (
          <BreadCrumbItem
            key={index}
            Component={Component}
            props={componentProps}
            index={index}
            breadcrumbsLength={breadcrumbs.length}
            title={title}
          />
        );
      })}
    </StyledContainerBreadCrumbs>
  );
};

export default BreadCrumbs;
