import { SearchBarContainer, StyledContainerDropdown } from './styled';
import { Icon, useDebouncedState } from '@tecsinapse/react-native-kit';
import { Input } from '@tecsinapse/react-web-kit';
import { ItemSelect } from '../SelectItem';
import React from 'react';
import { SelectProps } from '../Select';

const DropDown = <Data, Type extends 'single' | 'multi'>({
  options,
  onSearch,
  type,
  hideSearchBar,
  onSelect,
  value,
  keyExtractor,
  labelExtractor,
}: SelectProps<Data, Type>): JSX.Element => {
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
          key={index}
          item={item}
          onSelect={onSelect}
          value={value}
          keyExtractor={keyExtractor}
          index={index}
          labelExtractor={labelExtractor}
        />
      ))}
    </StyledContainerDropdown>
  );
};

export default DropDown;
