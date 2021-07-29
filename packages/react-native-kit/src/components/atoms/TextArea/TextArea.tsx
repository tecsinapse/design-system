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
import {
  StyledInputContainer,
  StyledNativeInput,
  CharCountText,
} from './styled';
import { Text } from '../Text';

export interface TextAreaProps
  extends Omit<InputElementProps, 'style' | 'multiline' | 'value'>,
    InputContainerProps {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
  maxCharCount?: number;
  value: string;
}

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
  ...rest
}) => {
  let length = rest.value.length;
  const maxLength = rest.maxLength;
  if (maxLength && length > maxLength) {
    length = maxLength;
  }

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
          textAlignVertical={'top'}
          multiline
        />
        {maxLength && (
          <CharCountText
            colorVariant={'secondary'}
            colorTone={'medium'}
            typography={'label'}
            fontStack={'default'}
            fontWeight={'bold'}
          >
            {`${length}/${maxLength}`}
          </CharCountText>
        )}
      </StyledInputContainer>
      {hint && _hint}
    </View>
  );
};

export default TextArea;
