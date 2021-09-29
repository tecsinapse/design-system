import React from 'react';
import {
  Icon,
  PressableInputContainer,
  Text,
  TextProps,
} from '@tecsinapse/react-core';
import { useClickAwayListener } from '../../../hooks';
import { StyledContainer, StyledInputContainer } from './styled';
import { Dropdown } from './Dropdown';
import { getDisplayValue } from './functions';
import { Transition } from 'react-transition-group';
import { defaultStyles, transition } from './animations';

export interface SelectProps<Data, Type extends 'single' | 'multi'>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
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
  disabled?: boolean;
  label?: string;
  anchor?: 'top' | 'bottom';
  displayTextProps?: TextProps;
}

/** NOTE: For better performance, you should memoize options and handlers */
export const Select = <Data, Type extends 'single' | 'multi'>({
  value,
  options,
  keyExtractor,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onSearch,
  searchBarPlaceholder,
  hideSearchBar = true,
  label,
  disabled = false,
  anchor = 'bottom',
  displayTextProps,
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
    <StyledContainer ref={refDropDown} {...rest}>
      <StyledInputContainer>
        <PressableInputContainer
          label={label}
          onPress={() => setDropDownVisible(!dropDownVisible)}
          disabled={disabled}
          rightComponent={
            <Icon
              name="chevron-down"
              type="material-community"
              size="centi"
              style={{ marginRight: 12 }}
            />
          }
        >
          <Text {...displayTextProps} ellipsizeMode="tail" numberOfLines={1}>
            {displayValue}
          </Text>
        </PressableInputContainer>
      </StyledInputContainer>
      <Transition in={dropDownVisible} timeout={300}>
        {state => (
          <Dropdown
            options={options}
            onSelect={onSelect}
            value={value}
            type={type}
            keyExtractor={keyExtractor}
            labelExtractor={labelExtractor}
            hideSearchBar={hideSearchBar}
            searchBarPlaceholder={searchBarPlaceholder}
            onSearch={onSearch}
            style={{ ...defaultStyles, ...transition[anchor][state] }}
            setDropDownVisible={setDropDownVisible}
            anchor={anchor}
          />
        )}
      </Transition>
    </StyledContainer>
  );
};

export default Select;
