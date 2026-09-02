import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import { useBottomSafeAreaInset } from '../../../hooks/useBottomSafeAreaInset';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import HintInputContainer from '../HintInputContainer/HintInputContainer';
import { SelectModal } from './components/Modal';
import useSelect from './hooks/useSelect';
import { SelectNativeProps, SelectType } from './types';

function Select<Data, Type extends SelectType>(
  props: SelectNativeProps<Data, Type>
): React.ReactElement {
  const {
    groupLabelExtractor,
    onSelect,
    selectModalTitle,
    selectModalTitleComponent,
    searchBarPlaceholder,
    hideSearchBar,
    confirmButtonText,
    rightComponent,
    variant = 'default',
    hintComponent,
    hint,
    style,
    controlComponent,
    type,
    numberOfLines,
    closeOnPick = type === 'single',
    selectOptions,
    keyExtractor,
    labelExtractor,
    value,
    handleOnSearch,
    loading,
    modalVisible,
    handleClose,
    handlePressInput,
    getDisplayValue,
    focused,
    disabled,
    _label,
    ...rest
  } = useSelect(props);

  const bottomInset = useBottomSafeAreaInset();
  const [keyboardOpened, setKeyboardOpened] = useState(0);

  const getKeyboardHeight = (keyboard: number) => {
    if (keyboard === 0) return 0;

    const wHeight = Math.ceil(Dimensions.get('window').height);
    const sHeight = Math.ceil(Dimensions.get('screen').height);
    if (wHeight !== sHeight) {
      return keyboard + (sHeight - wHeight - (StatusBar.currentHeight || 0));
    }
    return keyboard;
  };

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
    <>
      {controlComponent ? (
        controlComponent(handlePressInput, getDisplayValue() ?? '')
      ) : (
        <HintInputContainer
          {...rest}
          viewStyle={style}
          onPress={handlePressInput}
          focused={focused}
          disabled={disabled}
          LabelComponent={Text}
          variant={variant}
          hint={hint}
          hintComponent={hintComponent}
          label={_label}
          rightComponent={
            <>
              <Icon name="chevron-down" type="ionicon" size="centi" />
              {rightComponent}
            </>
          }
        >
          <Text numberOfLines={numberOfLines} fontWeight="bold">
            {getDisplayValue() ?? ' '}
          </Text>
        </HintInputContainer>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <Pressable
          testID="select-backdrop"
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={handleClose}
        >
          <View
            testID="select-sheet"
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: getKeyboardHeight(keyboardOpened),
            }}
          >
            <Pressable
              onPress={event => event.stopPropagation()}
              style={{ height: '88%' }}
            >
              <View
                className="bg-surface-overlay rounded-t-deca"
                style={{ flex: 1, paddingBottom: bottomInset }}
              >
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
                  selectModalTitle={selectModalTitle}
                  selectModalTitleComponent={selectModalTitleComponent}
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
    </>
  );
}

export default Select;
