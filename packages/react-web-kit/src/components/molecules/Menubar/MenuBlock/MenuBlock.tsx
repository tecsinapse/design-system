import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { MenuItem } from './MenuItem';
import {
  StyledContainerItems,
  StyledContainerMenu,
  StyledLeftComponent,
} from './styled';
import { ItemsOptions, OptionsType } from '../types';

interface MenuBlockProps {
  data: OptionsType;
}

const MenuBlock: React.FC<MenuBlockProps> = ({ data }) => {
  return (
    <>
      <StyledContainerMenu>
        {data.leftComponents && (
          <StyledLeftComponent>{data.leftComponents}</StyledLeftComponent>
        )}
        <Text fontWeight="bold">{data.title}</Text>
      </StyledContainerMenu>
      <StyledContainerItems>
        {data.items.map(
          ({
            title,
            Component,
            props,
            rightComponents,
            items,
          }: ItemsOptions) => (
            <MenuItem
              items={items}
              key={title}
              title={title}
              Component={Component}
              rightComponents={rightComponents}
              props={props}
            />
          )
        )}
      </StyledContainerItems>
    </>
  );
};

export default MenuBlock;
