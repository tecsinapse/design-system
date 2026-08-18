import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Button from '../../../atoms/Button/Button';
import Icon from '../../../atoms/Icon/Icon';
import InputElement from '../../../atoms/Input/InputElement';
import Text from '../../../atoms/Text/Text';
import useModal from '../hooks/useModal';
import { LoadingProps, OverrideModalProps, SelectType } from '../types';
import Section from './Section';
import Flat from './Flat';

const Modal = <Data, Type extends SelectType>(
  props: OverrideModalProps<Data, Type> & LoadingProps & { onClose: () => void }
): React.ReactElement => {
  const {
    selectModalTitle,
    selectModalTitleComponent,
    hideSearchBar,
    searchBarPlaceholder,
    loading,
    options,
    groupLabelExtractor,
    keyExtractor,
    confirmButtonText,
  } = props;

  const { searchArg, setSearchArg, getData, renderItem, closeOnPick, handleConfirm, close } = useModal(props);

  return (
    <View className="w-full flex-col">
      <View className="flex-row items-center justify-between px-deca py-centi">
        {selectModalTitleComponent ? (
          selectModalTitleComponent
        ) : (
          <Text typography="h4" fontWeight="bold" numberOfLines={3}>
            {selectModalTitle ?? ''}
          </Text>
        )}
        <Pressable onPress={close} accessibilityRole="button">
          <Icon name="close" type="material-community" fontColor="light" />
        </Pressable>
      </View>

      {!hideSearchBar ? (
        <View className="px-deca py-centi">
          <InputElement
            placeholder={searchBarPlaceholder}
            value={searchArg}
            onChange={setSearchArg}
          />
        </View>
      ) : null}

      {loading ? <ActivityIndicator color="grey" size="large" /> : null}

      <View className="flex-1">
        {options instanceof Map ? (
          <Section
            options={options}
            getData={getData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            groupLabelExtractor={groupLabelExtractor}
          />
        ) : (
          <Flat
            renderItem={renderItem}
            getData={getData}
            options={options}
            keyExtractor={keyExtractor}
          />
        )}
      </View>

      {!closeOnPick ? (
        <View className="w-full px-deca py-centi">
          <Button
            variant="filled"
            intent="primary"
            title={confirmButtonText ?? 'Confirm'}
            onPress={handleConfirm}
            disabled={loading}
          />
        </View>
      ) : null}
    </View>
  );
};

export const SelectModal = Modal;
