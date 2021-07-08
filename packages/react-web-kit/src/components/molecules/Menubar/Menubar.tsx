import React from 'react';
import { Icon, Text, useDebouncedState } from '@tecsinapse/react-core';
import {
  StyledIconInput,
  StyledMenuBar,
  StyledMenuButton,
  StyledContainerOpenMenu,
  StyledInput,
  StyledInputContainer,
  StyledSearchResultsContainer,
  StyledSearchTextContainer,
} from './styled';
import { Masonry } from '../Masonry';
import { MostUsedType, OptionsType } from './types';
import { MostUsed } from './MostUsed';
import { MenuBlock } from './MenuBlock';
import { SearchResultItem } from './SearchResultItem';
import { filterAndTransform } from './utils';

export interface MenubarProps {
  leftComponents?: React.ReactNode;
  rightComponents?: React.ReactNode;
  inputPlaceholder?: string;
  options: OptionsType[];
  /** Limited to first 4 elements */
  mostUsed?: MostUsedType[];
  mostUsedLabel?: string;
  searchResultsLabel?: string;
}

const Menubar: React.FC<MenubarProps> = ({
  leftComponents,
  rightComponents,
  inputPlaceholder = 'O quê você deseja buscar?',
  options,
  mostUsed,
  mostUsedLabel = 'Mais acessados',
  searchResultsLabel = 'Resultados da busca',
}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState<string>('');
  const [results, setResults] = React.useState<MostUsedType[]>([]);
  const [input, setInput] = useDebouncedState('', state => setSearch(state));

  React.useEffect(() => {
    if (search === '') return;
    setResults(filterAndTransform(options, search));
  }, [search]);

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
              value={input}
              onChange={setInput}
            />
          </StyledInputContainer>
        )}
        {rightComponents}
      </StyledMenuBar>
      {menuOpen && (
        <StyledContainerOpenMenu>
          {!search ? (
            <>
              {mostUsed && <MostUsed label={mostUsedLabel} data={mostUsed} />}
              <Masonry columns={4} spacingTop="kilo" spacingLeft="mega">
                {options.map(option => (
                  <MenuBlock data={option} key={option.title} />
                ))}
              </Masonry>
            </>
          ) : (
            <StyledSearchResultsContainer>
              <StyledSearchTextContainer>
                <Text fontWeight="bold">{searchResultsLabel}</Text>
              </StyledSearchTextContainer>
              {results.map(result => (
                <SearchResultItem
                  key={`${result.title}-${result.category}`}
                  data={result}
                  searchTerm={search}
                />
              ))}
            </StyledSearchResultsContainer>
          )}
        </StyledContainerOpenMenu>
      )}
    </>
  );
};

export default Menubar;
