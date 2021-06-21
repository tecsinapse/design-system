import * as React from 'react';
import {
  CloseButton,
  Dummy,
  Header,
  ListItem,
  SearchBarContainer,
  StyledModal,
} from './styled';
import { FlatList, Modal as RNModal, ModalProps, View } from 'react-native';
import { SelectNativeProps } from './Select';
import { Text } from '../Text';
import { Checkbox, Icon, RadioButton } from '@tecsinapse/react-core';

interface Props<Data, Type extends 'single' | 'multi'> {
  options: (SelectNativeProps<Data, Type>['options'][0] & {
    _checked: boolean;
  })[];
}

const Component = <Data, Type extends 'single' | 'multi'>({
  options,
  keyExtractor,
  labelExtractor,
  groupKeyExtractor,
  searchBar,
  type,
  onSelect,
  onRequestClose,
  selectModalTitle,
  selectModalTitleComponent,
  ...modalProps
}: Omit<SelectNativeProps<Data, Type>, 'options'> &
  Props<Data, Type> &
  ModalProps) => {
  return (
    <RNModal {...modalProps} onRequestClose={onRequestClose}>
      <StyledModal>
        <Header>
          <Dummy />
          {selectModalTitleComponent ? (
            selectModalTitleComponent
          ) : selectModalTitle ? (
            <Text>{selectModalTitle}</Text>
          ) : null}
          <CloseButton
            variant={'filled'}
            color={'primary'}
            size={'small'}
            onPress={onRequestClose}
          >
            <Icon
              name={'close'}
              type={'material-community'}
              fontColor={'light'}
            />
          </CloseButton>
        </Header>
        {searchBar && <SearchBarContainer>{searchBar}</SearchBarContainer>}
        <FlatList
          data={options}
          renderItem={item => (
            <ListItem
              onPress={() => onSelect(keyExtractor(item.item, item.index))}
            >
              <View pointerEvents={'none'}>
                {type === 'multi' ? (
                  <Checkbox
                    color={'primary'}
                    labelPosition={'right'}
                    checked={item.item._checked}
                  >
                    <Text>{labelExtractor(item.item)}</Text>
                  </Checkbox>
                ) : (
                  <RadioButton
                    color={'primary'}
                    labelPosition={'right'}
                    checked={item.item._checked}
                  >
                    <Text>{labelExtractor(item.item)}</Text>
                  </RadioButton>
                )}
              </View>
            </ListItem>
          )}
          keyExtractor={keyExtractor}
        />
      </StyledModal>
    </RNModal>
  );
};

export const Modal = Component;
