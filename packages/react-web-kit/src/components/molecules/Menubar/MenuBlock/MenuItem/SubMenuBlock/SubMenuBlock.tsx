import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { StyledRightComponent, StyledText } from '../../styled';
import { ItemsOptions } from '../../../types';
import { DummyBorder, StyledContainerItem } from './styled';

interface SubMenuBlockProps {
  data: ItemsOptions;
  toggle: () => void;
}

const SubMenuBlock: React.FC<SubMenuBlockProps> = ({ data, toggle }) => {
  const { Component, props, rightComponents, title } = data;

  const noTextDecoration = { textDecoration: 'none' };

  return (
    <StyledContainerItem>
      <DummyBorder />
      <Component {...props} style={noTextDecoration} onClick={toggle}>
        <Text colorVariant="secondary" colorTone="medium" typography="sub">
          <StyledText>{title}</StyledText>
        </Text>
      </Component>
      {rightComponents && (
        <StyledRightComponent>{rightComponents}</StyledRightComponent>
      )}
    </StyledContainerItem>
  );
};

export default SubMenuBlock;
