import {
  FontStackType,
  FontWeightType,
  Hint,
  InputContainer,
  InputContainerProps,
  InputElementProps,
  RFValue,
  useInputFocus,
} from '@tecsinapse/react-core';
import React from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { StyledNativeInput } from './styled';

export interface InputNativeProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
}

const Input = React.forwardRef<TextInput, InputNativeProps>(
  (
    {
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
      inputFontStack = 'default',
      inputFontWeight = 'bold',
      inputContainerStyle,
      variant = 'default',
      hintComponent,
      hint,
      onFocus,
      onBlur,
      value,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const _hint = hintComponent || (
      <Hint TextComponent={Text} text={hint} variant={variant} />
    );
    const { focused, handleBlur, handleFocus } = useInputFocus(
      onFocus,
      onBlur,
      !disabled
    );

    const internalStyle: StyleProp<ViewStyle> = {
      minHeight: RFValue(50),
      ...{ inputContainerStyle },
    };
    const onlyLabel = label && !placeholder;

    return (
      <View>
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
          <StyledNativeInput
            {...rest}
            placeholder={onlyLabel ? label : placeholder}
            value={value}
            ref={ref}
            fontStack={inputFontStack}
            fontWeight={inputFontWeight}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </InputContainer>
        {hint && _hint}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
