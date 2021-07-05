import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { StyledRightComponent, StyledText } from '../styled';
import { ItemsOptions } from '../../types';

interface SubMenuBlockProps {
  data: ItemsOptions;
}

const SubMenuBlock: React.FC<SubMenuBlockProps> = ({ data }) => {
  const { Component, props, rightComponents, title } = data;

  const noTextDecoration = { textDecoration: 'none' };

  return (
    <>
      <Component {...props} style={noTextDecoration}>
        <Text colorVariant="secondary" colorTone="dark">
          <StyledText>{title}</StyledText>
        </Text>
      </Component>
      {rightComponents && (
        <StyledRightComponent>{rightComponents}</StyledRightComponent>
      )}
    </>
  );
};

export default SubMenuBlock;
