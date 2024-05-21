import React from 'react';
import { getStyledModal } from '../styled';
import { LoadingProps, OptionData, SelectNativeProps } from '../types';
import { ListRenderItemInfo } from 'react-native';
import Option from '../components/Option';
import { getStatusBarHeight, useDebouncedState } from '@tecsinapse/react-core';
import { IBaseModal } from '../../../atoms/Modal';

const useModal = <Data, Type extends 'single' | 'multi'>({
  keyExtractor,
  labelExtractor,
  focused,
  type,
  value,
  onSelect,
  onSearch,
  close,
  closeOnPick,
  ...others
}: SelectNativeProps<Data, Type> & LoadingProps & IBaseModal) => {
  const [selectedValues, setSelectedValues] = React.useState<Data[]>([]);
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);
  const ModalComponent = React.useMemo(
    () => getStyledModal(getStatusBarHeight(true)),
    []
  );
  const _closeOnPick = closeOnPick && type === 'single';

  // Resets the temporary state to the initial state whenever the
  // modal is reopened or the value changes
  React.useEffect(() => {
    setSelectedValues(
      (value ? (type === 'multi' ? value : [value]) : []) as Data[]
    );
  }, [value, focused, setSelectedValues]);

  const getData = React.useCallback(
    (_options: Data[]): OptionData<Data>[] => {
      return _options.map((option, index) => {
        return {
          ...option,
          _checked:
            type === 'multi'
              ? !!selectedValues.find(
                  value =>
                    keyExtractor(option, index) == keyExtractor(value, index)
                )
              : keyExtractor((selectedValues[0] || {}) as Data, index) ==
                keyExtractor(option, index),
        };
      });
    },
    [type, selectedValues, keyExtractor]
  );

  const handlePressItem = React.useCallback(
    (option: Data) => {
      setSelectedValues(selectedValues => {
        if (type === 'multi') {
          const newArr: Data[] = [];
          let found = false;
          for (const value of selectedValues) {
            if (keyExtractor(value) != keyExtractor(option)) newArr.push(value);
            else found = true;
          }
          if (!found) newArr.push(option);
          return newArr;
        }
        return keyExtractor((selectedValues[0] || {}) as Data) ===
          keyExtractor(option)
          ? []
          : [option];
      });
    },
    [keyExtractor, type]
  );

  React.useEffect(() => {
    if (_closeOnPick && selectedValues[0] && selectedValues[0] !== value) {
      handleConfirm();
    }
  }, [selectedValues[0], value, closeOnPick]);

  const handleConfirm = React.useCallback(() => {
    // TS Workaround since TS won't infer the ternary operator's result type correctly
    type OnSelectArg = Parameters<typeof onSelect>[0];
    onSelect(
      (type === 'single' ? selectedValues[0] : selectedValues) as OnSelectArg
    );
    close?.();
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
    /**
     * Hook props
     */
    searchArg,
    setSearchArg,
    ModalComponent,
    renderItem,
    getData,
    handleConfirm,
    /**
     * Component props
     */
    keyExtractor,
    labelExtractor,
    focused,
    type,
    value,
    onSelect,
    onSearch,
    close,
    closeOnPick: _closeOnPick,
    ...others,
  };
};

export default useModal;
