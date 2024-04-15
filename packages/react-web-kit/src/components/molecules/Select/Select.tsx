import {
  Hint,
  InputVariantType,
  PressableInputContainer,
  Text,
  TextProps,
} from '@tecsinapse/react-core';
import React, { useEffect, useId, useMemo, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useClickAwayListener } from '../../../hooks';
import { defaultStyles, transition } from './animations';
import { Dropdown } from './Dropdown';
import { getDisplayValue } from './functions';
import {
  StyledContainer,
  StyledHintContainer,
  StyledIconComponent,
  StyledInputContainer,
} from './styled';
import { MultiLabels } from './types';

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
  multiLabels?: MultiLabels;
  variant?: InputVariantType
  hint?: string
  hintComponent?: JSX.Element
}

/** NOTE: For better performance, you should memoize options and handlers */
const Select = <Data, Type extends 'single' | 'multi'>({
  value,
  options,
  keyExtractor,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onSearch,
  searchBarPlaceholder = 'Search for option',
  hideSearchBar = true,
  label,
  disabled = false,
  anchor = 'bottom',
  displayTextProps,
  selectAllLabel = 'Select all',
  multiLabels,
  variant = 'default',
  hint,
  hintComponent,
  ...rest
}: SelectProps<Data, Type>): JSX.Element => {
  const [dropDownVisible, setDropDownVisible] = React.useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<Data[]>([]);
  const refDropDown = React.useRef(null);
  const transitionRef = React.useRef(null);
  useClickAwayListener(refDropDown, setDropDownVisible);
  const _hint = hintComponent || <Hint text={hint} variant={variant} />;
  const instanceid = useId();

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

  const _valueColorVariant = disabled
    ? 'secondary'
    : displayTextProps?.colorVariant;
  const _valueColorTone = disabled ? 'light' : displayTextProps?.colorTone;

  const displayValue = getDisplayValue<Data>(
    type,
    value,
    selectOptions,
    _placeholder,
    keyExtractor,
    labelExtractor,
    multiLabels
  );

  const handleLazyFocus = React.useCallback(async () => {
    if (!dropDownVisible && typeof options === 'function') {
      try {
        const result = await options();
        if (result) {
          setSelectOptions(result ?? []);
        }
      } catch (e) {
        // TODO: Catch error
      }
    }
  }, [options, setSelectOptions, dropDownVisible]);

  const handleOnSearch = React.useCallback(
    async (searchInput: string | undefined) => {
      if (searchInput !== undefined && onSearch && dropDownVisible) {
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
    [onSearch, value, keyExtractor, dropDownVisible, setSelectOptions]
  );

  const handlePressInput = async () => {
    await handleLazyFocus();
  };

  const onPress = React.useCallback(
    () => setDropDownVisible(prev => !prev),
    [setDropDownVisible]
  );

  const RightComponent = useMemo(
    () => (
      <StyledIconComponent
        name="chevron-down"
        type="material-community"
        size="centi"
        disabled={disabled}
      />
    ),
    [disabled]
  );
  //TODO: when component is wrapper by GridITem and Text of label has prop "numberOfLines={1}", this component incresing witht based on options selects, breaking layout of Grid, we must fix this problem.
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
            colorTone={_valueColorTone}
            colorVariant={_valueColorVariant}
            fontWeight={'bold'}
          >
            {displayValue}
          </Text>
        </PressableInputContainer>
      </StyledInputContainer>
      <StyledHintContainer>
        {_hint}
      </StyledHintContainer>
      <Transition
        in={dropDownVisible}
        timeout={300}
        nodeRef={transitionRef}
        key={instanceid}
      >
        {state => (
          <Dropdown
            ref={transitionRef}
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
