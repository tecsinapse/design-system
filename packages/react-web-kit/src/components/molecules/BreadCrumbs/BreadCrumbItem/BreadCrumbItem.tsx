import React, { ElementType, FC } from 'react';
import { Icon, Text } from '@tecsinapse/react-core';
import { StyledContainerItem, StyledContainerIcon } from './styled';

export interface BreadCrumbItemProps {
  Component: ElementType;
  props: any;
  index: number;
  breadcrumbsLength: number;
  title: string;
}

const BreadCrumbItem: FC<BreadCrumbItemProps> = ({
  props,
  Component,
  index,
  breadcrumbsLength,
  title,
}) => {
  const noTextDecoration = { textDecoration: 'none' };
  return (
    <StyledContainerItem>
      <Component {...props} style={noTextDecoration}>
        <Text
          colorVariant="secondary"
          colorTone={index === breadcrumbsLength - 1 ? 'medium' : 'xdark'}
        >
          {title}
        </Text>
      </Component>
      {index !== breadcrumbsLength - 1 && (
        <StyledContainerIcon>
          <Icon
            name="chevron-double-right"
            type="material-community"
            size="centi"
            fontColor="orange"
          />
        </StyledContainerIcon>
      )}
    </StyledContainerItem>
  );
};

export default BreadCrumbItem;
