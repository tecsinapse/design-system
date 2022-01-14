import {
  HintInputContainer, InputContainerProps,
  useInputFocus
} from '@tecsinapse/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLazyModalManager } from '../Modal';
import { Text } from '../Text';
import { Modal } from './Modal';
import { SelectIcon, StyledSelectionText } from './styled';

export interface SelectNativeProps<Data, Type extends 'single' | 'multi'>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options: ((searchInput?: string) => Promise<Data[]>) | Data[];
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | undefined : Data[];
  type: Type;

  keyExtractor: (t: Data, index?: number) => string;
  labelExtractor: (t: Data) => string;
  groupKeyExtractor?: (t: Data) => string;

  hideSearchBar?: boolean;
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  onSearch?:
    | ((searchArg: string) => void)
    | ((searchInput?: string) => Promise<Data[]>)
    | never;
  searchBarPlaceholder?: string;
  confirmButtonText?: string;
  selectModalTitle?: string;
  selectModalTitleComponent?: JSX.Element;
}

function Select<Data, Type extends 'single' | 'multi'>({
  /** Select props */
  value,
  options,
  keyExtractor,
  groupKeyExtractor,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onFocus,
  onBlur,
  disabled,
  onSearch,
  selectModalTitle,
  selectModalTitleComponent,
  searchBarPlaceholder,
  hideSearchBar,
  confirmButtonText,
  rightComponent,
  variant = 'default',
  hintComponent,
  hint,
  style,
  ...rest
}: SelectNativeProps<Data, Type>): JSX.Element {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const [selectOptions, setSelectOptions] = useState<Data[]>([]);
  const modal = useLazyModalManager()

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

  const handleLazyFocus = async () => {
    if (typeof options === 'function') {
      setLoading(true);
      try {
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
  };

  const handleOnSearch = React.useCallback(
    async (searchInput: string | undefined) => {
      if (searchInput !== undefined && onSearch) {
        setLoading(true);
        try {
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
          modal.requestUpdate()
          setLoading(false);
        }
      }
    },
    [options, value, keyExtractor]
  );

  const getDisplayValue = () => {
    if (Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      else {
        return selectOptions
          ?.reduce(
            (acc, option, index) =>
              value.find(
                key => keyExtractor(option, index) == keyExtractor(key, index)
              )
                ? acc + labelExtractor(option) + ', '
                : acc,
            ''
          )
          .slice(0, -2);
      }
    } else {
      if (value === undefined) return placeholder;
      const selectedOption = selectOptions?.find(
        (option, index) =>
          keyExtractor(option, index) == keyExtractor(value as Data, index)
      );
      return selectedOption ? labelExtractor(selectedOption) : placeholder;
    }
  };

  modal.sync(
    <Modal
      options={selectOptions || []}
      focused={true}
      keyExtractor={keyExtractor}
      labelExtractor={labelExtractor}
      groupKeyExtractor={groupKeyExtractor}
      searchBarPlaceholder={searchBarPlaceholder}
      type={type}
      onSelect={onSelect}
      value={value}
      hideSearchBar={hideSearchBar}
      onSearch={handleOnSearch}
      selectModalTitle={selectModalTitle}
      selectModalTitleComponent={selectModalTitleComponent}
      confirmButtonText={confirmButtonText}
      loading={loading}
      onClose={handleBlur}
    />
  )

  const handlePressInput = async () => {
    modal.show()
    handleFocus();
    await handleLazyFocus();
  };

  return (
    <>
      <HintInputContainer
        viewStyle={style}
        onPress={handlePressInput}
        focused={focused}
        disabled={disabled}
        LabelComponent={Text}
        variant={variant}
        hint={hint}
        hintComponent={hintComponent}
        rightComponent={
          <>
            <SelectIcon name="chevron-down" type="ionicon" size="centi" />
            {rightComponent}
          </>
        }
        {...rest}
      >
        <StyledSelectionText fontWeight="bold" disabled={disabled}>
          {getDisplayValue() || ' '}
        </StyledSelectionText>
      </HintInputContainer>

      {/* <Modal
        visible={modalVisible}
        options={selectOptions || []}
        focused={modalVisible}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        groupKeyExtractor={groupKeyExtractor}
        searchBarPlaceholder={searchBarPlaceholder}
        type={type}
        onSelect={onSelect}
        value={value}
        hideSearchBar={hideSearchBar}
        onRequestClose={handleCloseModal}
        animated
        animationType={'slide'}
        onSearch={handleOnSearch}
        selectModalTitle={selectModalTitle}
        selectModalTitleComponent={selectModalTitleComponent}
        confirmButtonText={confirmButtonText}
        loading={loading}
      /> */}
    </>
  );
}

export default Select;
