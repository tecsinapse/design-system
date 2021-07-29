import {
  InputContainerProps,
  PressableInputContainer,
  useInputFocus
} from '@tecsinapse/react-core';
import * as React from 'react';
import { Text } from '../Text';
import { Modal } from './Modal';

export interface SelectNativeProps<Data, Type extends 'single' | 'multi'>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options: Data[];
  onSelect: (
    key: Type extends 'single' ? string | undefined : string[]
  ) => never | void;
  value: Type extends 'single' ? string | undefined : string[];
  type: Type;

  keyExtractor: (t: Data, index: number) => string;
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
  ...rest
}: SelectNativeProps<Data, Type>): JSX.Element {
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
              value.find(key => keyExtractor(option, index) == key)
                ? acc + labelExtractor(option) + ', '
                : acc,
            ''
          )
          .slice(0, -2);
      }
    } else {
      if (value === undefined) return placeholder;
      const selectedOption = options.find(
        (option, index) => keyExtractor(option, index) === value
      );
      return selectedOption ? labelExtractor(selectedOption) : placeholder;
    }
  };

  return (
    <>
      
      <PressableInputContainer
        onPress={handlePressInput}
        focused={focused}
        disabled={disabled}
        {...rest}
      >
        <Text>{getDisplayValue()}</Text>
      </PressableInputContainer>
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
