import React, { FC } from 'react';
import { StyledContainerContainer, StyledInputContainer } from './styled';
import { Icon, PressableInputContainer, Text } from '@tecsinapse/react-core';
import { DropDown } from './SelectItem/DropDown.';

export interface SelectProps<Data, Type extends 'single' | 'multi'> {
  options: Data[];
  onSelect: (
    key: Type extends 'single' ? string | undefined : string[]
  ) => never | void;
  value: /**Type extends 'single' ? string | undefined : */ string[];
  type: Type;
  keyExtractor: (t: Data, index: number) => string;
  labelExtractor: (t: Data) => string;
  placeholder?: string;
  onSearch?: (searchArg: string) => void | never;
  searchBarPlaceholder?: string;
  hideSearchBar?: boolean;
}

const Select: FC<SelectProps<any, any>> = ({
  value,
  options,
  keyExtractor,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onSearch,
  hideSearchBar = true,
  ...rest
}) => {
  const [dropDownVisible, setDropDownVisible] = React.useState(false);

  const getDisplayValue = () => {
    // console.log(value, 'displayvalue');
    if (type === 'multi') {
      if (value.length === 0) return placeholder;
      else {
        return options
          .reduce(
            (acc, option, index) =>
              value.find(key => keyExtractor(option, index) === key)
                ? acc + labelExtractor(option) + ', '
                : acc,
            ''
          )
          .slice(0, -2);
      }
    } else {
      if (value === undefined) return placeholder;
      const selectedOption = options.find(
        (option, index) => keyExtractor(option, index) === value[0]
      );
      return selectedOption ? labelExtractor(selectedOption) : placeholder;
    }
  };
  return (
    <StyledContainerContainer>
      <StyledInputContainer>
        <PressableInputContainer
          label={placeholder}
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
          <Text>{getDisplayValue()}</Text>
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
    </StyledContainerContainer>
  );
};

export default Select;
