import React, { useEffect, useState } from 'react';
import {
  PressableInputContainer,
  Text,
  TextProps,
} from '@tecsinapse/react-core';
import { useClickAwayListener } from '../../../hooks';
import {
  RightComponent,
  StyledContainer,
  StyledInputContainer,
} from './styled';
import { Dropdown } from './Dropdown';
import { getDisplayValue } from './functions';
import { Transition } from 'react-transition-group';
import { defaultStyles, transition } from './animations';

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
  const refDropDown = React.useRef(null);
  useClickAwayListener(refDropDown, setDropDownVisible);

  const [selectOptions, setSelectOptions] = useState<Data[]>([]);

  // TODO: Add Skeleton to modal height when loading is true
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof options !== 'function') {
      setSelectOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (typeof options === 'function') {
      if (value) {
        if (type === 'single') setSelectOptions([value as Data]);
        else setSelectOptions([...(value as Data[])]);
      } else setSelectOptions([]);
    }
  }, [value]);

  const displayValue = getDisplayValue<Data>(
    type,
    value,
    selectOptions,
    placeholder,
    keyExtractor,
    labelExtractor
  );

  const onPress = React.useCallback(async () => {
    if (typeof options === 'function') {
      try {
        setLoading(true);
        const result = await options();
        if (result) {
          if (
            value &&
            !result.find(v => keyExtractor(value as Data) === keyExtractor(v))
          ) {
            setSelectOptions([value as Data, ...result]);
          } else setSelectOptions(result);
        }
      } catch (e) {
        // TODO: Catch error
      } finally {
        setLoading(false);
      }
    }
    setDropDownVisible(prev => !prev);
  }, [setDropDownVisible]);

  const handleOnSearch = React.useCallback(
    async (searchInput: string | undefined) => {
      if (searchInput !== undefined && onSearch) {
        try {
          setLoading(true);
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
        } finally {
          setLoading(false);
        }
      }
    },
    [options, value, keyExtractor]
  );

  return (
    <StyledContainer ref={refDropDown} {...rest}>
      <StyledInputContainer>
        <PressableInputContainer
          label={label}
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
            options={selectOptions}
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
            loading={loading}
          />
        )}
      </Transition>
    </StyledContainer>
  );
};

export default Select;
