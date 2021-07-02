import React, { ElementType } from 'react';
import { ButtonProps, Card, Icon, Text } from '@tecsinapse/react-core';
import {
  StyledIconInput,
  StyledMenuBar,
  StyledMenuButton,
  StyledContainerOpenMenu,
  StyledInput,
  StyledLeftComponent,
  StyledContainerMenu,
  StyledContainerItems,
  StyledContainerItemText,
  StyledRightComponent,
  StyledText,
  StyledCardContainer,
} from './styled';
import Masonry from '../Masonry/Masonry';

type MostUsed = {
  title: string;
  category: string;
};

type ItemsOptions = {
  title: string;
  Component: ElementType;
  props: any;
  rightComponents?: React.ReactNode;
  items?: ItemsOptions[];
};

type OptionsType = {
  title: string;
  items: ItemsOptions[];
  leftComponents?: React.ReactNode;
};

export interface MenubarProps {
  leftComponents?: React.ReactNode;
  inputPlaceholder?: string;
  menuButtonProps?: ButtonProps;
  options: OptionsType[];
  mostUsed?: MostUsed[];
}

// TODO: Add redirect click from most used cards, add hover on menu items, add search
const Menubar: React.FC<MenubarProps> = ({
  leftComponents,
  inputPlaceholder = 'O quê você deseja buscar?',
  options,
  mostUsed,
}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(true);

  const noTextDecoration = { textDecoration: 'none' };

  return (
    <>
      <StyledMenuBar>
        <StyledMenuButton
          variant="filled"
          color="primary"
          onPress={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? (
            <Icon
              size="deca"
              name="menu"
              type="material-community"
              fontColor="light"
            />
          ) : (
            <Icon
              size="deca"
              name="close"
              type="material-community"
              fontColor="light"
            />
          )}
        </StyledMenuButton>
        {leftComponents}
        {menuOpen && (
          <div style={{ display: 'flex', flex: 1 }}>
            <StyledInput
              placeholder={inputPlaceholder}
              leftComponent={
                <StyledIconInput>
                  <Icon name="magnify" type="material-community" />
                </StyledIconInput>
              }
            />
          </div>
        )}
      </StyledMenuBar>
      {menuOpen && (
        <StyledContainerOpenMenu>
          {mostUsed && (
            <>
              <Text fontWeight="bold">Mais acessados</Text>
              <StyledCardContainer>
                {mostUsed.map(item => (
                  <Card elevated key={`${item.title}-${item.category}`}>
                    <Text fontWeight="bold" colorVariant="primary">
                      {item.title}
                    </Text>
                    <Text
                      fontWeight="bold"
                      colorVariant="secondary"
                      typography="label"
                    >
                      {item.category}
                    </Text>
                  </Card>
                ))}
              </StyledCardContainer>
            </>
          )}
          <Masonry columns={4} spacingTop={'kilo'} spacingLeft={'mega'}>
            {options.map(item => (
              <div key={item.title}>
                <StyledContainerMenu>
                  {item.leftComponents && (
                    <StyledLeftComponent>
                      {item.leftComponents}
                    </StyledLeftComponent>
                  )}
                  <Text fontWeight="bold">{item.title}</Text>
                </StyledContainerMenu>
                <StyledContainerItems>
                  {item.items.map(
                    ({ title, Component = 'a', props, rightComponents }) => (
                      <StyledContainerItemText key={title}>
                        <Component {...props} style={noTextDecoration}>
                          <StyledText colorVariant="secondary" colorTone="dark">
                            {title}
                          </StyledText>
                        </Component>
                        {rightComponents && (
                          <StyledRightComponent>
                            {rightComponents}
                          </StyledRightComponent>
                        )}
                      </StyledContainerItemText>
                    )
                  )}
                </StyledContainerItems>
              </div>
            ))}
          </Masonry>
        </StyledContainerOpenMenu>
      )}
    </>
  );
};

export default Menubar;
