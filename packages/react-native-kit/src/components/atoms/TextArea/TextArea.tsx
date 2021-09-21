import React, { FC } from 'react';
import {
  useInputFocus,
  TextAreaProps as ITACore,
  TextArea as TACore,
} from '@tecsinapse/react-core';
import { Text } from '../Text';
import { StyledNativeInput } from './styled';

export interface TextAreaProps
  extends Omit<ITACore, 'TextComponent' | 'focused'> {}

const TextArea: FC<TextAreaProps> = ({
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
  maxLength,
  ...rest
}) => {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  return (
    <TACore
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
      value={value}
      hintComponent={hintComponent}
      hint={hint}
      style={style}
      TextComponent={Text}
      maxLength={maxLength}
    >
      <StyledNativeInput
        {...rest}
        fontStack={inputFontStack}
        fontWeight={inputFontWeight}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textAlignVertical={'top'}
        multiline
      />
    </TACore>
  );
};

export default TextArea;
