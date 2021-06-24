import * as React from 'react';
import {
  InputContainer,
  InputContainerProps,
  useInputFocus,
} from '@tecsinapse/react-native-kit';
import { Text } from '../Text';
import { StyledPressableSurface } from './styled';
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

  searchBar?: JSX.Element;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  selectModalTitle?: string;
  selectModalTitleComponent?: JSX.Element;
}

function Select<Data, Type extends 'single' | 'multi'>({
  label,
  labelColor,
  labelColorVariant,
  labelColorTone,
  labelTypography,
  labelStack,
  labelWeight,
  leftComponent,
  rightComponent,
  style,
  borderColor,
  borderColorGradation,

  /** Select props */
  value,
  options,
  keyExtractor,
  groupKeyExtractor,
  searchBar,
  onSelect,
  type,
  labelExtractor,
  placeholder,
  onFocus,
  onBlur,
  disabled,
  selectModalTitle,
  selectModalTitleComponent,

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
      <StyledPressableSurface
        onPress={handlePressInput}
        disabled={disabled}
        style={style}
      >
        <InputContainer
          label={label}
          labelColor={labelColor}
          labelColorVariant={labelColorVariant}
          labelColorTone={labelColorTone}
          labelTypography={labelTypography}
          labelStack={labelStack}
          labelWeight={labelWeight}
          LabelComponent={Text}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
          borderColor={borderColor}
          borderColorGradation={borderColorGradation}
          focused={focused}
          disabled={disabled}
          {...rest}
        >
          <Text>{getDisplayValue()}</Text>
        </InputContainer>
      </StyledPressableSurface>
      <Modal
        visible={modalVisible}
        options={options}
        focused={modalVisible}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        groupKeyExtractor={groupKeyExtractor}
        searchBar={searchBar}
        type={type}
        onSelect={onSelect}
        value={value}
        onRequestClose={handleCloseModal}
        animated
        animationType={'slide'}
        selectModalTitle={selectModalTitle}
        selectModalTitleComponent={selectModalTitleComponent}
      />
    </>
  );
}

export default Select;
