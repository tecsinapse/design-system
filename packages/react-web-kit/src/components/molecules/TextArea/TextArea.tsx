import React, { FC } from 'react';
import {
  useInputFocus,
  TextAreaProps as ITACore,
  TextArea as TACore,
  Text,
} from '@tecsinapse/react-core';
import { StyledWebInput } from './styled';

export type TextAreaProps = Omit<ITACore, 'TextComponent' | 'focused'>;

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
      <StyledWebInput
        {...rest}
        fontStack={inputFontStack}
        fontWeight={inputFontWeight}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textAlignVertical={'top'}
        multiline
        value={value}
        maxLength={maxLength}
      />
    </TACore>
  );
};

export default TextArea;
