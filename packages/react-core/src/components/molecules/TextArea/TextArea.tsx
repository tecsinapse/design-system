import React, { FC } from 'react';
import { View } from 'react-native';
import { FontStackType, FontWeightType } from '../../../types/defaults';
import {
  Hint,
  InputContainerProps,
  InputElementProps,
} from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import { StyledInputContainer } from './styled';

export interface TextAreaProps
  extends Omit<InputElementProps, 'style' | 'multiline' | 'value'>,
    InputContainerProps {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
  maxCharCount?: number;
  value: string;
  // Omit below
  TextComponent?: FC<TextProps>;
  focused?: boolean;
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
  inputContainerStyle,
  variant = 'default',
  hintComponent,
  hint,
  TextComponent = Text,
  focused,
  children,
  maxLength: _maxLenght,
  value: _value,
}) => {
  let length = _value.length;
  const maxLength = _maxLenght;
  if (maxLength && length > maxLength) {
    length = maxLength;
  }

  const _hint = hintComponent || (
    <Hint TextComponent={TextComponent} text={hint} variant={variant} />
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
        LabelComponent={TextComponent}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        borderColor={borderColor}
        borderColorGradation={borderColorGradation}
        inputContainerStyle={inputContainerStyle}
        focused={focused}
        disabled={disabled}
        variant={variant}
      >
        {children}
        {maxLength && (
          <TextComponent
            colorVariant={'secondary'}
            colorTone={'medium'}
            typography={'label'}
            fontStack={'default'}
            fontWeight={'bold'}
            style={{ textAlign: 'right' }}
          >
            {`${length}/${maxLength}`}
          </TextComponent>
        )}
      </StyledInputContainer>
      {hint && _hint}
    </View>
  );
};

export default TextArea;
