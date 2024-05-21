import React from 'react';
import { Button } from '../../../atoms/Button';
import { Header } from '../../../atoms/Header';
import { Input } from '../../../atoms/Input';
import { IBaseModal, ModalView } from '../../../atoms/Modal';
import { Text } from '../../../atoms/Text';
import {
  FetchIndicator,
  ModalFooter,
  SearchBarContainer,
  SelectIcon,
  TextTitleModal,
} from '../styled';
import Section from './Section';
import Flat from './Flat';
import useModal from '../hooks/useModal';
import { LoadingProps, SelectNativeProps } from '../types';
import { RFValue } from '@tecsinapse/react-core';

const ModalTitle = ({ title }: { title?: string }) =>
  title ? (
    <TextTitleModal
      typography="h4"
      fontWeight="bold"
      numberOfLines={3}
      style={{ maxWidth: RFValue(250) }}
    >
      {title}
    </TextTitleModal>
  ) : null;

const Component = <Data, Type extends 'single' | 'multi'>(
  props: SelectNativeProps<Data, Type> & LoadingProps & IBaseModal
): JSX.Element => {
  const {
    ModalComponent,
    selectModalTitleComponent,
    selectModalTitle,
    hideSearchBar,
    searchBarPlaceholder,
    searchArg,
    setSearchArg,
    loading,
    options,
    getData,
    renderItem,
    keyExtractor,
    closeOnPick,
    confirmButtonText,
    handleConfirm,
    close,
    ...others
  } = useModal(props);

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
        {selectModalTitleComponent ? (
          selectModalTitleComponent
        ) : (
          <ModalTitle title={selectModalTitle} />
        )}
      </Header>

      {!hideSearchBar && (
        <SearchBarContainer>
          <Input
            placeholder={searchBarPlaceholder}
            value={searchArg}
            onChange={setSearchArg}
            leftComponent={
              <SelectIcon name="search" type="ionicon" size="centi" />
            }
          />
        </SearchBarContainer>
      )}

      {loading && (
        <FetchIndicator animating={true} color={'grey'} size={'large'} />
      )}

      {options instanceof Map ? (
        <Section
          options={options}
          getData={getData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Flat
          renderItem={renderItem}
          getData={getData}
          options={options}
          keyExtractor={keyExtractor}
        />
      )}

      {!closeOnPick && (
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
