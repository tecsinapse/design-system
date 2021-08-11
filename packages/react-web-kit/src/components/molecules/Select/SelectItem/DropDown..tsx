import { SearchBarContainer, StyledContainerDropdown } from '../styled';
import { Icon, Input, useDebouncedState } from '@tecsinapse/react-native-kit';
import { ItemSelect } from './index';
import React, { FC } from 'react';
import { SelectProps } from '../Select';

export const DropDown: FC<SelectProps<any, any>> = ({
  options,
  onSearch,
  type,
  hideSearchBar,
  onSelect,
  value,
  keyExtractor,
}) => {
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);

  return (
    <StyledContainerDropdown>
      {!hideSearchBar && (
        <SearchBarContainer>
          <Input
            placeholder="Busque a opção desejada"
            value={searchArg}
            leftComponent={
              <Icon
                name="magnify"
                type="material-community"
                size="centi"
                style={{ marginHorizontal: 12 }}
              />
            }
            onChange={text => setSearchArg(text)}
          />
        </SearchBarContainer>
      )}
      {options.map((item, index) => (
        <ItemSelect
          type={type}
          key={item.value}
          item={item}
          onClick={onSelect}
          value={value}
          keyExtractor={keyExtractor}
          index={index}
        />
      ))}
    </StyledContainerDropdown>
  );
};
