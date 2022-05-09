import {
  FontStackType,
  FontWeightType,
  Hint,
  InputContainerProps,
  InputMaskElementProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { StyledInputContainer, StyledNativeInputMask } from './styled';
import { Text } from '../Text';

export interface InputMaskNativeProps
  extends Omit<InputMaskElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: FontStackType;
  inputFontWeight?: FontWeightType;
}

const InputMask: FC<InputMaskNativeProps> = React.forwardRef(
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
          <StyledNativeInputMask
            {...rest}
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

InputMask.displayName = 'InputMask';

export default InputMask;
