import {
  FontStackType,
  FontWeightType,
  Hint,
  InputContainerProps,
  InputElementProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { TextInputProps, View } from 'react-native';
import { Text } from '../Text';
import { StyledInputContainer, StyledNativeInput } from './styled';

export interface InputNativebProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps,
    Omit<
      TextInputProps,
      'style' | 'onBlur' | 'onChange' | 'onFocus' | 'value'
    > {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
}

const Input: FC<InputNativebProps> = ({
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
  style,
  borderColor,
  borderColorGradation,
  inputFontStack = 'default',
  inputFontWeight = 'bold',
  inputContainerStyle,
  variant = 'default',
  hintComponent,
  hint,
  onFocus,
  onBlur,
  ...rest
}) => {
  const _hint = hintComponent || (
    <Hint TextComponent={Text} text={hint} variant={variant} />
  );
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  return (
    <View style={style}>
      <StyledInputContainer
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
        inputContainerStyle={inputContainerStyle}
        focused={focused}
        disabled={disabled}
        variant={variant}
      >
        <StyledNativeInput
          {...rest}
          fontStack={inputFontStack}
          fontWeight={inputFontWeight}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </StyledInputContainer>
      {hint && _hint}
    </View>
  );
};

export default Input;
