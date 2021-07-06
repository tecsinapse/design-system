import React from 'react';
import { Icon } from '@tecsinapse/react-core';
import {
  StyledIconInput,
  StyledMenuBar,
  StyledMenuButton,
  StyledContainerOpenMenu,
  StyledInput,
  StyledInputContainer,
} from './styled';
import { Masonry } from '../Masonry';
import { MostUsedType, OptionsType } from './types';
import { MostUsed } from './MostUsed';
import { MenuBlock } from './MenuBlock';

export interface MenubarProps {
  leftComponents?: React.ReactNode;
  rightComponents?: React.ReactNode;
  inputPlaceholder?: string;
  options: OptionsType[];
  /** Limited to first 4 elements */
  mostUsed?: MostUsedType[];
  mostUsedLabel?: string;
}

// TODO: add search
const Menubar: React.FC<MenubarProps> = ({
  leftComponents,
  rightComponents,
  inputPlaceholder = 'O quê você deseja buscar?',
  options,
  mostUsed,
  mostUsedLabel = 'Mais acessados',
}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(true);

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
          <StyledInputContainer>
            <StyledInput
              placeholder={inputPlaceholder}
              leftComponent={
                <StyledIconInput>
                  <Icon name="magnify" type="material-community" />
                </StyledIconInput>
              }
            />
          </StyledInputContainer>
        )}
        {rightComponents}
      </StyledMenuBar>
      {menuOpen && (
        <StyledContainerOpenMenu>
          {mostUsed && <MostUsed label={mostUsedLabel} data={mostUsed} />}
          <Masonry columns={4} spacingTop="kilo" spacingLeft="mega">
            {options.map(option => (
              <MenuBlock data={option} key={option.title} />
            ))}
          </Masonry>
        </StyledContainerOpenMenu>
      )}
    </>
  );
};

export default Menubar;
