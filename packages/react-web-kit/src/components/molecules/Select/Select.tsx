import React, { FC } from 'react';
import { StyledContainer, StyledInputContainer } from './styled';
import { Icon, PressableInputContainer, Text } from '@tecsinapse/react-core';
import { DropDown } from './DropDown';
import { getDisplayValue } from './functions';

export interface SelectProps<Data, Type extends 'single' | 'multi'> {
  options: Data[];
  onSelect: (
    key: Type extends 'single' ? string | undefined : string[]
  ) => never | void;
  value: Type extends 'single' ? string | undefined : string[];
  type: Type;
  keyExtractor: (t: Data, index: number) => string;
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
  const displayValue = getDisplayValue(
    type,
    value,
    options,
    placeholder,
    keyExtractor,
    labelExtractor
  );

  React.useEffect(() => {
    if (type === 'single' && value) {
      setDropDownVisible(false);
    }
  }, [value]);

  return (
    <StyledContainer>
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
        <DropDown
          options={options}
          onSelect={onSelect}
          value={value}
          type={type}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
          hideSearchBar={hideSearchBar}
        />
      )}
    </StyledContainer>
  );
};

export default Select;
