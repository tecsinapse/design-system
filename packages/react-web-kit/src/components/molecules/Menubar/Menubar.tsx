import React, { useRef } from 'react';
import { Icon, Text, useDebouncedState } from '@tecsinapse/react-core';
import { Transition } from 'react-transition-group';
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
import { MostUsedType, OptionsType } from './types';
import { MostUsed } from './MostUsed';
import { MenuBlock } from './MenuBlock';
import { SearchResultItem } from './SearchResultItem';
import { filterAndTransform } from './utils';
import {
  getContainerOpenMenuStyles,
  getInputContainerStyles,
} from './animations';
import { useClickAwayListener } from '../../../hooks';

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  options: OptionsType[];
  leftComponents?: React.ReactNode;
  rightComponents?: React.ReactNode;
  /** Limited to first 4 elements */
  mostUsed?: MostUsedType[];
  mostUsedLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchResultsLabel?: string;
}

const Menubar: React.FC<MenubarProps> = ({
  leftComponents,
  rightComponents,
  searchPlaceholder = 'O quê você deseja buscar?',
  options,
  mostUsed,
  mostUsedLabel = 'Mais acessados',
  searchResultsLabel = 'Resultados da busca',
  searchable = true,
  ...rest
}) => {
  const [search, setSearch] = React.useState<string>('');
  const [results, setResults] = React.useState<MostUsedType[]>([]);
  const [input, setInput] = useDebouncedState<string>('', setSearch);
  const [open, setOpen] = React.useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickAwayListener(menuRef, setOpen, 'mouseup');

  const toggleOpen = React.useCallback(() => setOpen(state => !state), [
    setOpen,
  ]);

  React.useEffect(() => {
    if (search === '') return;
    setResults(filterAndTransform(options, search));
  }, [search]);

  return (
    <div ref={ref => (menuRef.current = ref)} {...rest}>
      <StyledMenuBar>
        <StyledMenuButton variant="filled" color="primary" onPress={toggleOpen}>
          {!open ? (
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
        <Transition in={open} timeout={250}>
          {state => (
            <StyledInputContainer style={getInputContainerStyles(state)}>
              {searchable && (
                <StyledInput
                  placeholder={searchPlaceholder}
                  leftComponent={
                    <StyledIconInput>
                      <Icon name="magnify" type="material-community" />
                    </StyledIconInput>
                  }
                  value={input}
                  onChange={setInput}
                />
              )}
            </StyledInputContainer>
          )}
        </Transition>
        {rightComponents}
      </StyledMenuBar>
      <Transition in={open} timeout={250}>
        {state => (
          <StyledContainerOpenMenu style={getContainerOpenMenuStyles(state)}>
            {!search ? (
              <>
                {mostUsed && (
                  <MostUsed
                    label={mostUsedLabel}
                    data={mostUsed}
                    toggle={toggleOpen}
                  />
                )}
                <MenuBlock options={options} toggle={toggleOpen} />
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
                    toggle={toggleOpen}
                  />
                ))}
              </StyledSearchResultsContainer>
            )}
          </StyledContainerOpenMenu>
        )}
      </Transition>
    </div>
  );
};

export default Menubar;
