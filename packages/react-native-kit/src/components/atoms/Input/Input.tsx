import {
  FontStackType,
  FontWeightType,
  Hint,
  InputContainerProps,
  InputElementProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { StyledInputContainer, StyledNativeInput } from './styled';

export interface InputNativeProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
}

const Input: FC<InputNativeProps> = React.forwardRef(
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

    const onlyLabel = label && !placeholder;

    return (
      <View style={style}>
        <StyledInputContainer
          label={value && label}
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
            placeholder={onlyLabel ? label : placeholder}
            value={value}
            ref={ref}
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
  }
);

Input.displayName = 'Input';

export default Input;
