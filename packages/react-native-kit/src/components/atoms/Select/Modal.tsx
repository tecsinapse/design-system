import * as React from 'react';
import {
  FloatingButton,
  ListFooter,
  ListItem,
  SearchBarContainer,
  StyledModal,
} from './styled';
import { FlatList, Modal as RNModal, ModalProps, View } from 'react-native';
import { SelectNativeProps } from './Select';
import { Text } from '../Text';
import {
  Checkbox,
  RadioButton,
  useDebouncedState,
} from '@tecsinapse/react-core';
import { Input } from '../Input';
import { Header } from '../Header';

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
  onRequestClose,
  selectModalTitle,
  selectModalTitleComponent,
  confirmButtonText,
  ...modalProps
}: SelectNativeProps<Data, Type> & ModalProps) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);

  // Resets the temporary state to the initial state whenever the
  // modal is reopened or the value changes
  React.useEffect(() => {
    setSelectedValues(
      (value ? (type === 'multi' ? value : [value]) : []) as string[]
    );
  }, [value, focused, setSelectedValues]);

  const data = options.map((option, index) => ({
    ...option,
    _checked:
      type === 'multi'
        ? !!selectedValues.find(value => keyExtractor(option, index) == value)
        : selectedValues[0] === keyExtractor(option, index),
  }));

  const handlePressItem = (key: string) => () => {
    setSelectedValues(selectedValues => {
      if (type === 'multi') {
        const newArr: string[] = [];
        let found = false;
        for (const value of selectedValues) {
          if (value !== key) newArr.push(value);
          else found = true;
        }
        if (!found) newArr.push(key);
        return newArr;
      }
      return selectedValues[0] === key ? [] : [key];
    });
  };

  const handleConfirm = () => {
    // TS Workaround since TS won't infer the ternary operator's result type correctly
    type OnSelectArg = Parameters<typeof onSelect>[0];
    onSelect(
      (type === 'single' ? selectedValues[0] : selectedValues) as OnSelectArg
    );
    onRequestClose && onRequestClose();
  };

  const headerContent = selectModalTitleComponent ? (
    selectModalTitleComponent
  ) : selectModalTitle ? (
    <Text>{selectModalTitle}</Text>
  ) : null;

  return (
    <RNModal {...modalProps} onRequestClose={onRequestClose}>
      <StyledModal>
        <Header
          rightButton={{
            onPress: onRequestClose,
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
            />
          </SearchBarContainer>
        )}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          ListFooterComponent={<ListFooter />}
          renderItem={({ item, index }) => (
            <ListItem onPress={handlePressItem(keyExtractor(item, index))}>
              <View pointerEvents={'none'}>
                {type === 'multi' ? (
                  <Checkbox
                    color={'primary'}
                    labelPosition={'right'}
                    checked={item._checked}
                  >
                    <Text>{labelExtractor(item)}</Text>
                  </Checkbox>
                ) : (
                  <RadioButton
                    color={'primary'}
                    labelPosition={'right'}
                    checked={item._checked}
                  >
                    <Text>{labelExtractor(item)}</Text>
                  </RadioButton>
                )}
              </View>
            </ListItem>
          )}
        />
        <FloatingButton
          variant={'filled'}
          color={'primary'}
          onPress={handleConfirm}
        >
          <Text fontColor={'light'}>{confirmButtonText}</Text>
        </FloatingButton>
      </StyledModal>
    </RNModal>
  );
};

export const Modal = Component;
