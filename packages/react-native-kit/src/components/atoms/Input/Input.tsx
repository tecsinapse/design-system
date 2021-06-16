import {
  FontStackType,
  FontWeightType,
  InputContainerProps,
  InputElementProps,
  StyledBorderKeeper,
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

export const Input: FC<InputNativebProps> = ({
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
  onFocus,
  onBlur,
  ...rest
}) => {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  return (
    <View>
      <StyledBorderKeeper focused={focused} disabled={disabled} />
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
        style={style}
        focused={focused}
        disabled={disabled}
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
    </View>
  );
};

export default Input;
