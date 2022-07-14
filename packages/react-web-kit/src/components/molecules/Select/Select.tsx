import {
  PressableInputContainer,
  Text,
  TextProps
} from '@tecsinapse/react-core';
import React from 'react';
import { Transition } from 'react-transition-group';
import { useClickAwayListener } from '../../../hooks';
import { defaultStyles, transition } from './animations';
import { Dropdown } from './Dropdown';
import { getDisplayValue } from './functions';
import {
  RightComponent,
  StyledContainer,
  StyledInputContainer
} from './styled';

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
  selectAllLabel?: string;
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
  searchBarPlaceholder = 'Busque a opção desejada',
  hideSearchBar = true,
  label,
  disabled = false,
  anchor = 'bottom',
  displayTextProps,
  selectAllLabel = 'Selecionar todos',
  ...rest
}: SelectProps<Data, Type>): JSX.Element => {
  const [dropDownVisible, setDropDownVisible] = React.useState<boolean>(false);
  const refDropDown = React.useRef(null);
  useClickAwayListener(refDropDown, setDropDownVisible);

  const onlyLabel = label && !placeholder;
  const hasValue = type === 'single' ? !!value : ((value || []) as []).length > 0
  const _placeholder = onlyLabel ? label : placeholder
  const _label = hasValue ? label : undefined

  const displayValue = getDisplayValue<Data>(
    type,
    value,
    options,
    _placeholder,
    keyExtractor,
    labelExtractor
  );

  const onPress = React.useCallback(() => setDropDownVisible(prev => !prev), [
    setDropDownVisible,
  ]);

  return (
    <StyledContainer ref={refDropDown} {...rest}>
      <StyledInputContainer>
        <PressableInputContainer
          label={_label}
          onPress={onPress}
          disabled={disabled}
          rightComponent={RightComponent}
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
            selectAllLabel={selectAllLabel}
          />
        )}
      </Transition>
    </StyledContainer>
  );
};

export default Select;
