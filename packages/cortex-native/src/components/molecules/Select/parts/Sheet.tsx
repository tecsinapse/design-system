import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  StatusBar,
  View,
  ViewProps,
} from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { useBottomSafeAreaInset } from '../../../../hooks/useBottomSafeAreaInset';
import Icon from '../../../atoms/Icon/Icon';
import Text from '../../../atoms/Text/Text';
import { SelectModal } from '../components/Modal';
import { useSelectContext } from '../SelectContext';

export interface SelectSheetProps extends ViewProps {}

const getKeyboardHeight = (keyboard: number): number => {
  if (keyboard === 0) return 0;

  const wHeight = Math.ceil(Dimensions.get('window').height);
  const sHeight = Math.ceil(Dimensions.get('screen').height);
  if (wHeight !== sHeight) {
    return keyboard + (sHeight - wHeight - (StatusBar.currentHeight || 0));
  }
  return keyboard;
};

const Sheet = ({
  className,
  testID,
  style,
  ...rest
}: SelectSheetProps): React.ReactElement => {
  const {
    modalVisible,
    handleClose,
    selectModalTitle,
    selectModalTitleComponent,
    selectOptions,
    keyExtractor,
    labelExtractor,
    groupLabelExtractor,
    searchBarPlaceholder,
    type,
    onSelect,
    value,
    hideSearchBar,
    handleOnSearch,
    confirmButtonText,
    loading,
    closeOnPick,
  } = useSelectContext();

  const bottomInset = useBottomSafeAreaInset();
  const [keyboardOpened, setKeyboardOpened] = useState(0);

  useEffect(() => {
    const showEvent = Keyboard.addListener('keyboardDidShow', e =>
      setKeyboardOpened(e.endCoordinates.height)
    );
    const hideEvent = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardOpened(0)
    );
    return () => {
      showEvent.remove();
      hideEvent.remove();
    };
  }, []);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable
        testID="select-backdrop"
        className="flex-1 bg-black/50"
        onPress={handleClose}
      >
        <View
          testID={testID ?? 'select-sheet'}
          className="flex-1 justify-end"
          style={{ paddingBottom: getKeyboardHeight(keyboardOpened) }}
        >
          <Pressable
            onPress={event => event.stopPropagation()}
            className="h-[88%]"
          >
            <View
              {...rest}
              className={cn('bg-surface-overlay rounded-t-deca flex-1', className)}
              style={[{ paddingBottom: bottomInset }, style]}
            >
              <View className="flex-row items-center justify-between px-deca py-centi">
                {selectModalTitleComponent ? (
                  selectModalTitleComponent
                ) : (
                  <Text typography="h4" fontWeight="bold" numberOfLines={3}>
                    {selectModalTitle ?? ''}
                  </Text>
                )}
                <Pressable
                  onPress={handleClose}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  testID="select-close-button"
                  className="bg-primary-medium items-center justify-center p-[14px] rounded-mili active:opacity-80"
                >
                  <Icon name="close" type="material-community" fontColor="light" />
                </Pressable>
              </View>

              <SelectModal
                options={selectOptions ?? []}
                focused={true}
                keyExtractor={keyExtractor}
                labelExtractor={labelExtractor}
                groupLabelExtractor={groupLabelExtractor}
                searchBarPlaceholder={searchBarPlaceholder}
                type={type}
                onSelect={onSelect}
                value={value}
                hideSearchBar={hideSearchBar}
                onSearch={handleOnSearch}
                confirmButtonText={confirmButtonText}
                loading={loading}
                onClose={handleClose}
                closeOnPick={closeOnPick}
              />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

Sheet.displayName = 'Select.Sheet';

export default Sheet;
