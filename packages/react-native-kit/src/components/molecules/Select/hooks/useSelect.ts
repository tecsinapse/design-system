import React, { useEffect, useState } from 'react';
import { useLazyModalManager } from '../../../atoms/Modal';
import { useInputFocus } from '@tecsinapse/react-core';
import { SelectNativeProps, SelectType } from '../types';
import { findValue, getMultiLabel, getSingleLabel } from '../functions';

const useSelect = <Data, Type extends SelectType>({
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
    type === 'single' ? !!value : ((value ?? []) as []).length > 0;
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
          const _value = value as Data;
          if (
            _value &&
            !(result instanceof Map) &&
            !findValue(result, _value, keyExtractor)
          ) {
            setSelectOptions([_value, ...result]);
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
              const _value = value as Data;
              if (
                _value &&
                !(result instanceof Map) &&
                !findValue(result, _value, keyExtractor)
              ) {
                setSelectOptions([_value, ...result]);
              } else setSelectOptions(result);
            } else {
              const _value = value as Data[];
              if (_value?.length && !(result instanceof Map)) {
                const selected =
                  _value.filter(it => !findValue(result, it, keyExtractor)) ??
                  [];
                setSelectOptions([...selected, ...result]);
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
    // Here we handle multi select
    if (Array.isArray(value)) {
      return getMultiLabel(
        value,
        String(_placeholder),
        selectOptions,
        keyExtractor,
        labelExtractor
      );
    } else {
      return getSingleLabel(
        value as Data,
        String(_placeholder),
        selectOptions,
        keyExtractor,
        labelExtractor
      );
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
