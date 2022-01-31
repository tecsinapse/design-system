import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { MenuItem } from './MenuItem';
import {
  StyledContainerItems,
  StyledContainerMenu,
  StyledLeftComponent,
} from './styled';
import { ItemsOptions, OptionsType } from '../types';
import { Masonry } from '../../Masonry';

interface MenuBlockProps {
  toggle: () => void;
  options: OptionsType[];
}

const MenuBlock: React.FC<MenuBlockProps> = ({ options, toggle }) => {
  return (
    <Masonry columns={4} spacingTop="kilo" spacingLeft="mega">
      {options.map(data => (
        <React.Fragment key={`${data.title}`}>
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
                  toggle={toggle}
                />
              )
            )}
          </StyledContainerItems>
        </React.Fragment>
      ))}
    </Masonry>
  );
};

export default React.memo(MenuBlock);
