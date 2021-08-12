import React, { ElementType, FC } from 'react';
import { Icon, Text } from '@tecsinapse/react-core';
import { StyledContainerItem, StyledContainerIcon } from './styled';

export interface BreadcrumbItemProps {
  Component: ElementType;
  props: any;
  isLast: boolean;
  title: string;
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  props,
  Component,
  isLast,
  title,
}) => {
  const noTextDecoration = { textDecoration: 'none' };
  return (
    <StyledContainerItem>
      <Component {...props} style={noTextDecoration}>
        <Text colorVariant="secondary" colorTone={isLast ? 'medium' : 'xdark'}>
          {title}
        </Text>
      </Component>
      {isLast && (
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

export default BreadcrumbItem;
