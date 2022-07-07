import {
  Checkbox,
  getStatusBarHeight,
  RadioButton,
  RFValue,
  useDebouncedState,
} from '@tecsinapse/react-core';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Header } from '../../atoms/Header';
import { Input } from '../../atoms/Input';
import { IBaseModal, ModalView } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { SelectNativeProps } from './Select';
import {
  FetchIndicator,
  getStyledModal,
  ListItem,
  ModalFooter,
  SearchBarContainer,
  SelectIcon,
  TextTitleModal,
} from './styled';

interface LoadingProps {
  loading?: boolean;
}

const Component = <Data, Type extends 'single' | 'multi'>({
  options,
  keyExtractor,
  labelExtractor,
  groupKeyExtractor,
  hideSearchBar,
  searchBarPlaceholder,
  focused,
  type,
  value,
  onSelect,
  onSearch,
  selectModalTitle,
  selectModalTitleComponent,
  confirmButtonText,
  loading,
  close,
  closeOnPick,
  ...others
}: SelectNativeProps<Data, Type> & LoadingProps & IBaseModal): JSX.Element => {
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

  const getData = (options: Data[]) => {
    return options?.map((option, index) => ({
      ...option,
      _checked:
        type === 'multi'
          ? !!selectedValues.find(
              value => keyExtractor(option, index) == keyExtractor(value, index)
            )
          : keyExtractor((selectedValues[0] || {}) as Data, index) ==
            keyExtractor(option, index),
    }));
  };

  const data = typeof options !== 'function' ? getData(options) : [];

  const handlePressItem = (option: Data) => () => {
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
  };

  React.useEffect(() => {
    if (_closeOnPick && selectedValues[0] && selectedValues[0] !== value) {
      handleConfirm();
    }
  }, [selectedValues[0], value, closeOnPick]);

  const handleConfirm = () => {
    // TS Workaround since TS won't infer the ternary operator's result type correctly
    type OnSelectArg = Parameters<typeof onSelect>[0];
    onSelect(
      (type === 'single' ? selectedValues[0] : selectedValues) as OnSelectArg
    );
    close?.();
  };

  const titleTextModal = selectModalTitle ? (
    <TextTitleModal
      typography="h4"
      fontWeight="bold"
      numberOfLines={3}
      style={{ maxWidth: RFValue(250) }}
    >
      {selectModalTitle}
    </TextTitleModal>
  ) : null;

  const headerContent = selectModalTitleComponent
    ? selectModalTitleComponent
    : titleTextModal;

  return (
    <ModalView {...others} BoxComponent={ModalComponent} showCloseBar={false}>
      <Header
        rightButton={{
          onPress: close,
          icon: {
            name: 'close',
            type: 'material-community',
            fontColor: 'light',
          },
        }}
      >
        {headerContent}
      </Header>

      {!hideSearchBar && (
        <SearchBarContainer>
          <Input
            placeholder={searchBarPlaceholder}
            value={searchArg}
            onChange={text => setSearchArg(text)}
            leftComponent={
              <SelectIcon name="search" type="ionicon" size="centi" />
            }
          />
        </SearchBarContainer>
      )}

      {loading && (
        <FetchIndicator animating={true} color={'grey'} size={'large'} />
      )}

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        fadingEdgeLength={200}
        renderItem={({ item }) => (
          <ListItem onPress={handlePressItem(item)}>
            <View pointerEvents={'none'}>
              {type === 'multi' ? (
                <Checkbox
                  color={'primary'}
                  labelPosition={'right'}
                  checked={item._checked}
                >
                  <Text fontWeight={item._checked ? 'bold' : 'regular'}>
                    {labelExtractor(item)}
                  </Text>
                </Checkbox>
              ) : (
                <RadioButton
                  color={'primary'}
                  labelPosition={'right'}
                  checked={item._checked}
                >
                  <Text fontWeight={item._checked ? 'bold' : 'regular'}>
                    {labelExtractor(item)}
                  </Text>
                </RadioButton>
              )}
            </View>
          </ListItem>
        )}
      />

      {!_closeOnPick && (
        <ModalFooter>
          <Button
            variant={'filled'}
            color={'primary'}
            onPress={handleConfirm}
            disabled={loading}
          >
            <Text fontColor={'light'} fontWeight="bold">
              {confirmButtonText}
            </Text>
          </Button>
        </ModalFooter>
      )}
    </ModalView>
  );
};

export const Modal = Component;
