import React from 'react';
import { Icon, Text } from '@tecsinapse/react-core';
import {
  StyledContainerItems,
  StyledContainerItemText,
  StyledContainerMenu,
  StyledLeftComponent,
  StyledRightComponent,
  StyledSubButton,
  StyledText,
} from './styled';
import { ItemsOptions, OptionsType } from '../types';
import SubMenuBlock from './SubMenuBlock/SubMenuBlock';

interface MenuBlockProps {
  data: OptionsType;
}

const MenuBlock: React.FC<MenuBlockProps> = ({ data }) => {
  const [subMenuSelected, setSubMenuSelected] = React.useState<string>('');

  const noTextDecoration = { textDecoration: 'none' };

  const getIconName = title =>
    subMenuSelected === `${data.title}-${title}`
      ? 'arrow-up-drop-circle-outline'
      : 'arrow-down-drop-circle-outline';

  const handleMenuAction = title =>
    setSubMenuSelected(
      subMenuSelected === `${data.title}-${title}`
        ? ''
        : `${data.title}-${title}`
    );

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
            Component = 'a',
            props = {},
            rightComponents,
            items,
          }: ItemsOptions) => (
            <>
              <StyledContainerItemText key={title}>
                <Component {...props} style={noTextDecoration}>
                  <Text colorVariant="secondary" colorTone="dark">
                    <StyledText>{title}</StyledText>
                  </Text>
                </Component>
                {rightComponents && !items && (
                  <StyledRightComponent>{rightComponents}</StyledRightComponent>
                )}
                {items && (
                  <StyledSubButton onClick={() => handleMenuAction(title)}>
                    <Icon
                      name={getIconName(title)}
                      type="material-community"
                      fontColor="orange"
                    />
                  </StyledSubButton>
                )}
              </StyledContainerItemText>
              {subMenuSelected === `${data.title}-${title}` &&
                items?.map(subItem => <SubMenuBlock data={subItem} />)}
            </>
          )
        )}
      </StyledContainerItems>
    </>
  );
};

export default MenuBlock;
