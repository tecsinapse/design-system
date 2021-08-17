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

const useOutside = (ref, setDropDownVisible) => {
  React.useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropDownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

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
  const displayValue = getDisplayValue(
    type,
    value,
    options,
    placeholder,
    keyExtractor,
    labelExtractor
  );
  useOutside(refDropDown, setDropDownVisible);

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
        <DropDown
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
