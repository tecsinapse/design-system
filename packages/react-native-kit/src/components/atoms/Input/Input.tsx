import {
  FontStackType,
  FontWeightType,
  Hint,
  InputContainerProps,
  InputElementProps,
  TextProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, TextInput, View } from 'react-native';
import { Text } from '../Text';
import { StyledInputContainer, StyledNativeInput } from './styled';

export interface InputNativeProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
}

const Input: FC<InputNativeProps> = ({
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

  const fontSize = useRef<Animated.Value>(
    new Animated.Value(focused || value ? 1 : 0)
  ).current;
  const opacity = useRef<Animated.Value>(
    new Animated.Value(focused || value ? 1 : 0)
  ).current;
  const top = useRef<Animated.Value>(
    new Animated.Value(focused || value ? 1 : 0)
  ).current;

  useEffect(() => {
    if (focused || value) {
      Animated.timing(fontSize, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontSize, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fontSize, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(top, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, value]);

  fontSize.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 10],
  });
  opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  top.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -5],
  });

  const labelComponentStyles: any = {
    /*fontSize: focused || value ? 10 : 15,*/
    fontSize: fontSize,
    position: 'relative',
    paddingTop: 5,
    /*top: focused || value ? -5 : 12,*/
    top: top,
  };
  const inputElementStyles: any = {
    /*opacity: focused || value ? 1 : 0,*/
    opacity: opacity,
    top: -5,
  };

  return (
    <Animated.View style={style}>
      <StyledInputContainer
        labelComponentStyles={labelComponentStyles}
        label={label}
        labelColor={labelColor}
        labelColorVariant={labelColorVariant}
        labelColorTone={labelColorTone}
        labelTypography={labelTypography}
        labelStack={labelStack}
        labelWeight={labelWeight}
        // LabelComponent={Text}
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
          inputElementStyles={inputElementStyles}
          {...rest}
          fontStack={inputFontStack}
          fontWeight={inputFontWeight}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
        />
      </StyledInputContainer>
      {hint && _hint}
    </Animated.View>
  );
};

export default Input;
