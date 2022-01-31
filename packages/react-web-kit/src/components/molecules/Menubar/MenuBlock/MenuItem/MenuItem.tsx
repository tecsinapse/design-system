import React, { ElementType } from 'react';
import { Icon, Text } from '@tecsinapse/react-core';
import { SubMenuBlock } from './SubMenuBlock';
import { StyledRightComponent, StyledText } from '../styled';
import { StyledContainerItemText, StyledSubButton } from './styled';
import { ItemsOptions } from '../../types';

interface MenuItemProps {
  title: string;
  /** Wrapping component for element. This is used for navigation */
  Component: ElementType;
  /** Properties spread to wrapping Component */
  props: any;
  toggle: () => void;
  rightComponents?: React.ReactNode;
  items?: ItemsOptions[];
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  Component = 'a',
  props = {},
  rightComponents,
  items,
  toggle,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const noTextDecoration = { textDecoration: 'none' };

  const getIconName = () =>
    open ? 'arrow-up-drop-circle-outline' : 'arrow-down-drop-circle-outline';

  const handleMenuAction = () => setOpen(!open);

  return (
    <>
      <StyledContainerItemText key={title}>
        <Component {...props} style={noTextDecoration} onClick={toggle}>
          <Text
            colorVariant={open ? 'primary' : 'secondary'}
            colorTone={open ? 'medium' : 'dark'}
          >
            <StyledText>{title}</StyledText>
          </Text>
        </Component>
        {rightComponents && !items && (
          <StyledRightComponent>{rightComponents}</StyledRightComponent>
        )}
        {items && (
          <StyledSubButton onClick={handleMenuAction}>
            <Icon
              name={getIconName()}
              type="material-community"
              fontColor="orange"
            />
          </StyledSubButton>
        )}
      </StyledContainerItemText>
      {open &&
        items?.map(subItem => (
          <SubMenuBlock key={subItem.title} data={subItem} toggle={toggle} />
        ))}
    </>
  );
};

export default MenuItem;
