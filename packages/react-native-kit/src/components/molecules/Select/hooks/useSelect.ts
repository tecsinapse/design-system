import React, { useEffect, useState } from 'react';
import { useLazyModalManager } from '../../../atoms/Modal';
import { useInputFocus } from '@tecsinapse/react-core';
import { SelectNativeProps } from '../types';

const useSelect = <Data, Type extends 'single' | 'multi'>({
  value,
  options,
  keyExtractor,
  type,
  labelExtractor,
  placeholder,
  onFocus,
  onBlur,
  disabled,
  onSearch,
  label,
  ...rest
}: SelectNativeProps<Data, Type>) => {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );
  const [selectOptions, setSelectOptions] = useState<
    Data[] | Map<string, Data[]>
  >([]);
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
    if (typeof options === 'function' && !onSearch) {
      setLoading(true);
      try {
        const result = await options();
        if (result) {
          if (
            value &&
            !(result instanceof Map) &&
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
        modal.requestUpdate();
        try {
          const result = await onSearch(searchInput);
          if (result) {
            if (type === 'single') {
              if (
                value &&
                !(result instanceof Map) &&
                !result.find(
                  v => keyExtractor(value as Data) === keyExtractor(v)
                )
              ) {
                setSelectOptions([value as Data, ...result]);
              } else setSelectOptions(result);
            } else {
              if ((value as Data[])?.length) {
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
    // This handles multiselect, here I'm ignoring groups
    if (Array.isArray(value)) {
      if (value.length === 0) return _placeholder;
      else {
        const _options: Data[] =
          selectOptions instanceof Map
            ? [...selectOptions.values()].flatMap(v => v)
            : selectOptions;
        const options = _options.length > 0 ? _options : (value as Data[]);
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
      // This handles single select
    } else {
      // Handle placeholder for groups
      if (!value) return _placeholder;
      const _selectedOption: Data[] =
        selectOptions instanceof Map
          ? [...selectOptions.values()].flatMap(v => v)
          : selectOptions;
      const selectedOption = _selectedOption?.find(
        (option, index) =>
          keyExtractor(option, index) == keyExtractor(value as Data, index)
      );
      return labelExtractor(selectedOption ?? (value as Data));
    }
  }, [_placeholder, value, selectOptions]);

  const handlePressInput = async () => {
    modal.show();
    handleFocus();
    await handleLazyFocus();
  };

  return {
    /**
     * Hook props
     */
    focused,
    handleBlur,
    handlePressInput,
    getDisplayValue,
    handleOnSearch,
    _label,
    loading,
    modal,
    selectOptions,
    setSelectOptions,
    /**
     * Component props
     */
    value,
    options,
    keyExtractor,
    type,
    labelExtractor,
    placeholder,
    onFocus,
    onBlur,
    disabled,
    onSearch,
    label,
    ...rest,
  };
};

export default useSelect;
