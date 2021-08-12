import { SearchBarContainer, StyledContainerDropdown } from './styled';
import { Icon, useDebouncedState } from '@tecsinapse/react-native-kit';
import { Input } from '@tecsinapse/react-web-kit';
import { ItemSelect } from '../SelectItem';
import React, { FC } from 'react';
import { SelectProps } from '../Select';

const DropDown: FC<SelectProps<any, any>> = ({
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

export default DropDown;
