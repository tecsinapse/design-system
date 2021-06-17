import {
  InputContainer,
  InputContainerProps,
  InputElementProps,
  StyledBorderKeeper,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { StyledWebTextInput } from './styled';

export interface InputWebProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {}

export const Input: FC<InputWebProps> = ({
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
      <StyledWebTextInput
        {...rest}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </InputContainer>
  );
};

export default Input;
