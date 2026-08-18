import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  isOptionChecked,
  multiBuilder,
  singleBuilder,
} from '../functions';
import {
  LoadingProps,
  OptionData,
  OverrideModalProps,
  SelectType,
} from '../types';
import Option from '../components/Option';

const useDebouncedState = <T,>(initialValue: T, delay = 300) => {
  const [value, setValue] = useState<T>(initialValue);
  const [debounced, setDebounced] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return [value, setValue, debounced] as const;
};

const useModal = <Data, Type extends SelectType>({
  keyExtractor,
  labelExtractor,
  focused,
  type,
  value,
  onSelect,
  onSearch,
  onClose,
  closeOnPick,
}: OverrideModalProps<Data, Type> &
  LoadingProps & { onClose: () => void }) => {
  const [selectedValues, setSelectedValues] = React.useState<Data[]>([]);
  const [searchArg, setSearchArg, debouncedSearchArg] =
    useDebouncedState<string>('');

  const _closeOnPick = closeOnPick && type === 'single';

  React.useEffect(() => {
    setSelectedValues(
      (value ? (type === 'multi' ? value : [value]) : []) as Data[]
    );
  }, [value, focused, setSelectedValues]);

  React.useEffect(() => {
    onSearch?.(debouncedSearchArg);
  }, [debouncedSearchArg]);

  const getData = React.useCallback(
    (_options: Data[]): OptionData<Data>[] => {
      return (_options ?? []).map((option, index) => {
        return {
          ...option,
          _checked: isOptionChecked(
            type,
            option,
            selectedValues,
            keyExtractor,
            index
          ),
        };
      });
    },
    [type, selectedValues, keyExtractor]
  );

  const handlePressItem = React.useCallback(
    (option: Data) => {
      setSelectedValues(prev =>
        type === 'multi'
          ? multiBuilder(option, prev, keyExtractor)
          : singleBuilder(option, prev, keyExtractor)
      );
    },
    [keyExtractor, type]
  );

  React.useEffect(() => {
    if (_closeOnPick && selectedValues[0] && selectedValues[0] !== value) {
      handleConfirm();
    }
  }, [selectedValues[0], value, closeOnPick]);

  const handleConfirm = React.useCallback(() => {
    type OnSelectArg = Parameters<typeof onSelect>[0];
    onSelect(
      (type === 'single' ? selectedValues[0] : selectedValues) as OnSelectArg
    );
    onClose?.();
  }, [selectedValues]);

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<OptionData<Data>>) => (
      <Option
        item={item}
        type={type}
        handlePressItem={t => {
          handlePressItem(t);
        }}
        labelExtractor={labelExtractor}
      />
    ),
    [type, handlePressItem, labelExtractor]
  );

  return {
    searchArg,
    setSearchArg,
    renderItem,
    getData,
    handleConfirm,
    close: onClose,
    closeOnPick: _closeOnPick,
  };
};

export default useModal;
