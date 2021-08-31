import React from 'react';
import { Icon, PressableInputContainer, Text } from '@tecsinapse/react-core';
import { useClickAwayListener } from '../../../hooks';
import { StyledContainer, StyledInputContainer } from './styled';
import { Dropdown } from './Dropdown';
import { getDisplayValue } from './functions';

export interface SelectProps<Data, Type extends 'single' | 'multi'> {
  options: Data[];
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | undefined : Data[];
  type: Type;
  keyExtractor: (t: Data, index?: number) => string;
  labelExtractor: (t: Data) => string;
  placeholder?: string;
  onSearch?: (searchArg: string) => void | never;
  searchBarPlaceholder?: string;
  hideSearchBar?: boolean;
  label?: string;
}

export const Select = <Data, Type extends 'single' | 'multi'>({
  value,
  options,
  keyExtractor,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onSearch,
  hideSearchBar = true,
  label,
  ...rest
}: SelectProps<Data, Type>): JSX.Element => {
  const [dropDownVisible, setDropDownVisible] = React.useState<boolean>(false);
  const refDropDown = React.useRef(null);
  useClickAwayListener(refDropDown, setDropDownVisible);

  const displayValue = getDisplayValue<Data>(
    type,
    value,
    options,
    placeholder,
    keyExtractor,
    labelExtractor
  );

  return (
    <StyledContainer ref={refDropDown}>
      <StyledInputContainer>
        <PressableInputContainer
          label={label}
          {...rest}
          onPress={() => setDropDownVisible(!dropDownVisible)}
          rightComponent={
            <Icon
              name="chevron-down"
              type="material-community"
              size="centi"
              style={{ marginRight: 12 }}
            />
          }
        >
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {displayValue}
          </Text>
        </PressableInputContainer>
      </StyledInputContainer>
      {dropDownVisible && (
        <Dropdown
          options={options}
          onSelect={onSelect}
          value={value}
          type={type}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
          hideSearchBar={hideSearchBar}
          setDropDownVisible={setDropDownVisible}
        />
      )}
    </StyledContainer>
  );
};

export default Select;
