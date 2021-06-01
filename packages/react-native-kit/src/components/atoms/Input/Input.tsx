import {
  FontStackType,
  FontWeightType,
  InputContainer,
  InputContainerProps,
  InputElementProps,
  StyledBorderKeeper,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { TextInputProps } from 'react-native';
import { StyledNativeInput } from './styled';

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
    <StyledBorderKeeper focused={focused}>
      <InputContainer
        label={label}
        labelColor={labelColor}
        labelColorVariant={labelColorVariant}
        labelColorTone={labelColorTone}
        labelTypography={labelTypography}
        labelStack={labelStack}
        labelWeight={labelWeight}
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
      </InputContainer>
    </StyledBorderKeeper>
  );
};

export default Input;
