import {
  HintInputContainer,
  InputContainerProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { Modal } from './Modal';
import { SelectIcon, StyledSelectionText } from './styled';

export interface SelectNativeProps<Data, Type extends 'single' | 'multi'>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options: ((searchInput?: string) => Promise<Data[]>) | Data[];
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | null | undefined : Data[];
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
  closeOnPick?: boolean;
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => JSX.Element;
  numberOfLines?: number;
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
  controlComponent,
  closeOnPick = type === 'single',
  label,
  numberOfLines,
  ...rest
}: SelectNativeProps<Data, Type>): JSX.Element {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const [selectOptions, setSelectOptions] = useState<Data[]>([]);
  const modal = useLazyModalManager();

  // TODO: Add Skeleton to modal height when loading is true
  const [loading, setLoading] = useState<boolean>(false);

  const onlyLabel = label && !placeholder;
  const hasValue =
    type === 'single' ? !!value : ((value || []) as []).length > 0;
  const _placeholder = onlyLabel ? label : placeholder;
  const _label = hasValue ? label : undefined;

  useEffect(() => {
    if (typeof options !== 'function') {
      setSelectOptions(options);
    }
  }, [options]);

  const handleLazyFocus = React.useCallback(async () => {
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
  }, [options, value, setSelectOptions]);

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
          modal.requestUpdate();
          setLoading(false);
        }
      }
    },
    [options, value, keyExtractor]
  );

  const getDisplayValue = React.useCallback(() => {
    if (Array.isArray(value)) {
      if (value.length === 0) return _placeholder;
      else {
        let options =
          selectOptions.length > 0 ? selectOptions : (value as Data[]);
        return options
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
      if (!value) return _placeholder;
      const selectedOption = selectOptions?.find(
        (option, index) =>
          keyExtractor(option, index) == keyExtractor(value as Data, index)
      );
      return labelExtractor(selectedOption ?? (value as Data));
    }
  }, [_placeholder, value, selectOptions]);

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
      closeOnPick={closeOnPick}
    />
  );

  const handlePressInput = async () => {
    modal.show();
    handleFocus();
    await handleLazyFocus();
  };

  return (
    <>
      {controlComponent ? (
        controlComponent(handlePressInput, getDisplayValue() || '')
      ) : (
        <HintInputContainer
          viewStyle={style}
          onPress={handlePressInput}
          focused={focused}
          disabled={disabled}
          LabelComponent={Text}
          variant={variant}
          hint={hint}
          hintComponent={hintComponent}
          label={_label}
          rightComponent={
            <>
              <SelectIcon name="chevron-down" type="ionicon" size="centi" />
              {rightComponent}
            </>
          }
          {...rest}
        >
          <StyledSelectionText
            numberOfLines={numberOfLines}
            fontWeight="bold"
            disabled={disabled}
          >
            {getDisplayValue() || ' '}
          </StyledSelectionText>
        </HintInputContainer>
      )}
    </>
  );
}

export default Select;
