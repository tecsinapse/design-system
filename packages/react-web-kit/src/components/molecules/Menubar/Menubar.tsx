import React from 'react';
import { ButtonProps, Icon, Text } from '@tecsinapse/react-core';
import {
  StyledIconInput,
  StyledMenuBar,
  StyledMenuButton,
  StyledContainerOpenMenu,
  StyledInput,
  StyledGridContainer,
  StyledLeftComponent,
  StyledContainerMenu,
  StyledContainerItems,
  StyledContainerItemText,
} from './styled';

export interface MenubarProps {
  leftComponents?: React.ReactNode;
  inputPlaceholder?: string;
  menuButtonProps?: ButtonProps;
  options: OptionsType[];
}

type MostUsed = {
  title: string;
  category: string;
};

type ItemsOptions = {
  title: string;
  Component: React.ReactNode;
  props: any;
  rightComponents?: React.ReactNode;
  items?: ItemsOptions[];
};

type OptionsType = {
  title: string;
  items: ItemsOptions[];
  leftComponents?: React.ReactNode;
};

const Menubar: React.FC<MenubarProps> = ({
  leftComponents,
  inputPlaceholder = 'O quê você deseja buscar?',
  options,
}) => {
  const [menuExpanded, setMenuExpanded] = React.useState<boolean>(true);

  return (
    <>
      <StyledMenuBar>
        <StyledMenuButton
          variant="filled"
          color="primary"
          onPress={() => setMenuExpanded(!menuExpanded)}
        >
          {!menuExpanded ? (
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
        {menuExpanded && (
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
      {menuExpanded && (
        <StyledContainerOpenMenu>
          <>
            <StyledGridContainer>
              {options.map(item => (
                <div
                  style={{
                    width: 'calc((84vw - 72px)/4)',
                    minHeight: 0,
                    alignItems: 'flex-start',
                  }}
                >
                  <StyledContainerMenu>
                    {item.leftComponents && (
                      <StyledLeftComponent>
                        {item.leftComponents}
                      </StyledLeftComponent>
                    )}
                    <Text fontWeight="bold">{item.title}</Text>
                  </StyledContainerMenu>
                  <StyledContainerItems>
                    {item.items.map(item => (
                      <StyledContainerItemText>
                        <Text colorVariant="secondary" colorTone="dark">
                          {item.title}
                        </Text>
                      </StyledContainerItemText>
                    ))}
                  </StyledContainerItems>
                </div>
              ))}
            </StyledGridContainer>
          </>
        </StyledContainerOpenMenu>
      )}
    </>
  );
};

export default Menubar;
