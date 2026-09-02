import React from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import Hint from './Hint';
import InputContainer, {
  InputContainerProps,
} from './InputContainer';
import InputElement, { InputElementProps } from './InputElement';
import { useInputFocus } from './useInputFocus';
import Text from '../Text/Text';

export interface InputNativeProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: 'default' | 'mono';
  inputFontWeight?: 'bold' | 'regular' | 'medium';
  ref?: React.Ref<TextInput>;
  style?: StyleProp<ViewStyle>;
}

const Input = ({
  label,
  labelColor,
  labelColorVariant,
  labelColorTone,
  labelTypography,
  labelStack,
  labelWeight,
  leftComponent,
  rightComponent,
  disabled,
  borderColor,
  borderColorGradation,
  inputContainerStyle,
  variant = 'default',
  hintComponent,
  hint,
  onFocus,
  onBlur,
  value,
  placeholder,
  style,
  ref,
  ...rest
}: InputNativeProps) => {
  const _hint = hintComponent || <Hint text={hint} variant={variant} />;
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const internalStyle: StyleProp<ViewStyle> = {
    minHeight: 50,
    ...(inputContainerStyle as object),
  };
  const onlyLabel = label && !placeholder;

  return (
    <View style={style}>
      <InputContainer
        label={value ? label : undefined}
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
        inputContainerStyle={internalStyle}
        focused={focused}
        disabled={disabled}
        variant={variant}
      >
        <InputElement
          {...rest}
          placeholder={onlyLabel ? label : placeholder}
          value={value}
          ref={ref}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputContainer>
      {hint && _hint}
    </View>
  );
};

export default Input;
