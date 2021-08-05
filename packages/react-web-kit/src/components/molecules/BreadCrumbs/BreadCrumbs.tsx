import React, { FC } from 'react';
import {
  StyledContainerBreadCrumbs,
  StyledContainerItem,
  StyledText,
} from './styled';
import { Icon, Text } from '@tecsinapse/react-core';

type BreadCrumb = {
  title: string;
  component: any;
  componentProps: {
    href: string;
  };
};

interface BreadCrumbsProps {
  breadcrumbs: BreadCrumb[];
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ breadcrumbs }) => {
  return (
    <StyledContainerBreadCrumbs>
      {breadcrumbs.map(item => (
        <StyledContainerItem key={item.title}>
          <StyledText href="/">
            <Text colorVariant="secondary" colorTone="xdark">
              {item.title}
            </Text>
            <Icon name="circle" type="material-community" size="centi" />
          </StyledText>
        </StyledContainerItem>
      ))}
    </StyledContainerBreadCrumbs>
  );
};

export default BreadCrumbs;
