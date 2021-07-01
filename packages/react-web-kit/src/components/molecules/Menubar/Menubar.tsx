import React from 'react';
import { ButtonProps, Icon } from '@tecsinapse/react-core';
import {
  StyledIconInput,
  StyledMenuBar,
  StyledMenuButton,
  StyledContainerOpenMenu,
  StyledInput,
} from './styled';

export interface MenubarProps {
  leftComponents?: React.ReactNode;
  inputPlaceholder?: string;
  menuButtonProps?: ButtonProps;
}

const Menubar: React.FC<MenubarProps> = ({
  leftComponents,
  inputPlaceholder = 'O quê você deseja buscar?',
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
      {menuExpanded && <StyledContainerOpenMenu />}
    </>
  );
};

export default Menubar;
