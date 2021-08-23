import {
  Hint,
  InputContainerProps,
  PressableInputContainer,
  useInputFocus,
} from '@tecsinapse/react-core';
import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { Modal } from './Modal';
import { SelectIcon, StyledSelectionText } from './styled';

export interface SelectNativeProps<Data, Type extends 'single' | 'multi'>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options: Data[];
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | undefined : Data[];
  type: Type;

  keyExtractor: (t: Data, index?: number) => string;
  labelExtractor: (t: Data) => string;
  groupKeyExtractor?: (t: Data) => string;

  hideSearchBar?: boolean;
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  onSearch?: (searchArg: string) => void | never;
  searchBarPlaceholder?: string;
  confirmButtonText?: string;
  selectModalTitle?: string;
  selectModalTitleComponent?: JSX.Element;
}

function Select<Data, Type extends 'single' | 'multi'>({
  /** Select props */
  value,
  options,
  keyExtractor,
  groupKeyExtractor,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onFocus,
  onBlur,
  disabled,
  onSearch,
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
  ...rest
}: SelectNativeProps<Data, Type>): JSX.Element {
  const _hint = hintComponent || (
    <Hint TextComponent={Text} text={hint} variant={variant} />
  );

  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const [modalVisible, setModalVisible] = React.useState(false);

  const handlePressInput = () => {
    setModalVisible(true);
    handleFocus();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    handleBlur();
  };

  const getDisplayValue = () => {
    if (Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      else {
        return options
          .reduce(
            (acc, option, index) =>
              value.find(
                key => keyExtractor(option, index) == keyExtractor(key, index)
              )
                ? acc + labelExtractor(option) + ', '
                : acc,
            ''
          )
          .slice(0, -2);
      }
    } else {
      if (value === undefined) return placeholder;
      const selectedOption = options.find(
        (option, index) =>
          keyExtractor(option, index) == keyExtractor(value as Data, index)
      );
      return selectedOption ? labelExtractor(selectedOption) : placeholder;
    }
  };

  return (
    <>
      <View style={style}>
        <PressableInputContainer
          onPress={handlePressInput}
          focused={focused}
          disabled={disabled}
          LabelComponent={Text}
          variant={variant}
          rightComponent={
            <>
              <SelectIcon name="chevron-down" type="ionicon" size="centi" />
              {rightComponent}
            </>
          }
          {...rest}
        >
          <StyledSelectionText fontWeight="bold" disabled={disabled}>
            {getDisplayValue() || ' '}
          </StyledSelectionText>
        </PressableInputContainer>
        {hint && _hint}
      </View>
      <Modal
        visible={modalVisible}
        options={options}
        focused={modalVisible}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        groupKeyExtractor={groupKeyExtractor}
        searchBarPlaceholder={searchBarPlaceholder}
        type={type}
        onSelect={onSelect}
        value={value}
        hideSearchBar={hideSearchBar}
        onRequestClose={handleCloseModal}
        animated
        animationType={'slide'}
        onSearch={onSearch}
        selectModalTitle={selectModalTitle}
        selectModalTitleComponent={selectModalTitleComponent}
        confirmButtonText={confirmButtonText}
      />
    </>
  );
}

export default Select;
