import {
  PressableInputContainer,
  Text,
  TextProps,
} from '@tecsinapse/react-core';
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useClickAwayListener } from '../../../hooks';
import { defaultStyles, transition } from './animations';
import { Dropdown } from './Dropdown';
import { getDisplayValue } from './functions';
import {
  RightComponent,
  StyledContainer,
  StyledInputContainer,
} from './styled';

export interface SelectProps<Data, Type extends 'single' | 'multi'>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  options: ((searchInput?: string) => Promise<Data[]>) | Data[];
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | undefined : Data[];
  type: Type;
  keyExtractor: (t: Data, index?: number) => string;
  labelExtractor: (t: Data) => string;
  placeholder?: string;
  onSearch?:
    | ((searchArg: string) => void)
    | ((searchInput?: string) => Promise<Data[]>)
    | never;
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
  const [selectOptions, setSelectOptions] = useState<Data[]>([]);
  const refDropDown = React.useRef(null);
  useClickAwayListener(refDropDown, setDropDownVisible);

  useEffect(() => {
    if (typeof options !== 'function') {
      setSelectOptions(options);
    }
  }, [options]);

  // TODO: Add Skeleton to modal height when loading is true

  const onlyLabel = label && !placeholder;
  const hasValue =
    type === 'single' ? !!value : ((value || []) as []).length > 0;
  const _placeholder = onlyLabel ? label : placeholder;
  const _label = hasValue ? label : undefined;

  const displayValue = getDisplayValue<Data>(
    type,
    value,
    selectOptions,
    _placeholder,
    keyExtractor,
    labelExtractor
  );

  useEffect(() => {
    if (typeof options !== 'function') {
      setSelectOptions(options);
    }
  }, [options]);

  const handleLazyFocus = React.useCallback(async () => {
    if (!dropDownVisible && typeof options === 'function') {
      try {
        const result = await options();
        if (result) {
          setSelectOptions(result);
        }
      } catch (e) {
        // TODO: Catch error
      }
    }
  }, [options, value, setSelectOptions, dropDownVisible]);

  const handleOnSearch = React.useCallback(
    async (searchInput: string | undefined) => {
      if (searchInput !== undefined && onSearch) {
        try {
          //TODO: Remove code duplicated below (Select in react-native-kit)
          const result = await onSearch(searchInput);
          if (result) {
            if (type === 'single') {
              if (
                value &&
                !result.find(
                  v => keyExtractor(value as Data) === keyExtractor(v)
                )
              ) {
                setSelectOptions([value as Data, ...result]);
              } else setSelectOptions(result);
            } else {
              if ((value as Data[]).length > 0) {
                const selectedValues =
                  (value as Data[]).filter(
                    v =>
                      !result.find(
                        current =>
                          keyExtractor(v as Data) === keyExtractor(current)
                      )
                  ) || [];
                setSelectOptions([...selectedValues, ...result]);
              } else {
                setSelectOptions(result);
              }
            }
          }
        } catch (e) {
          // TODO: Catch error
        }
      }
    },
    [options, value, keyExtractor]
  );

  const handlePressInput = async () => {
    await handleLazyFocus();
  };

  const onPress = React.useCallback(
    () => setDropDownVisible(prev => !prev),
    [setDropDownVisible]
  );

  return (
    <StyledContainer ref={refDropDown} {...rest}>
      <StyledInputContainer onFocus={handlePressInput}>
        <PressableInputContainer
          label={_label}
          onPress={onPress}
          disabled={disabled}
          rightComponent={RightComponent}
        >
          <Text
            {...displayTextProps}
            ellipsizeMode="tail"
            numberOfLines={1}
            fontWeight={'bold'}
          >
            {displayValue}
          </Text>
        </PressableInputContainer>
      </StyledInputContainer>
      <Transition in={dropDownVisible} timeout={300}>
        {state => (
          <Dropdown
            options={selectOptions ?? []}
            onSelect={onSelect}
            value={value}
            type={type}
            keyExtractor={keyExtractor}
            labelExtractor={labelExtractor}
            hideSearchBar={hideSearchBar}
            searchBarPlaceholder={searchBarPlaceholder}
            onSearch={handleOnSearch}
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
