import {
  Hint,
  InputContainer,
  InputContainerProps,
  InputElementProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { StyledWebTextInput } from './styled';

export interface InputWebProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {}

const Input: FC<InputWebProps> = ({
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
  inputContainerStyle,
  variant = 'default',
  hintComponent,
  hint,
  onFocus,
  onBlur,
  value,
  ...rest
}) => {
  const _hint = hintComponent || <Hint text={hint} variant={variant} />;
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const labelComponentStyles = {
    fontSize: focused || !!value ? 10 : 15,
    position: 'absolute',
    transitionDuration: '100ms',
    transitionProperty: 'font-size top',
    transitionTimingFunction: 'ease-in-out',
    top: focused || !!value ? -15 : -4,
  };
  const inputElementStyles: any = {
    opacity: focused || !!value ? 1 : 0,
    position: 'relative',
    transitionDuration: '100ms',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease-out',
    top: -4,
  };

  return (
    <View style={style}>
      <InputContainer
        labelComponentStyles={labelComponentStyles}
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
        inputContainerStyle={inputContainerStyle}
        focused={focused}
        disabled={disabled}
        variant={variant}
      >
        <StyledWebTextInput
          style={inputElementStyles}
          {...rest}
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
