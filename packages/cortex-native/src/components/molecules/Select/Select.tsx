import React from 'react';
import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  const { bottom } = useSafeAreaInsets();

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
        <View className="flex-1 justify-end" style={{ paddingBottom: bottom }}>
          <View className="h-3/4 bg-surface-overlay rounded-t-deca">
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
        </View>
      </Modal>
    </>
  );
}

export default Select;
