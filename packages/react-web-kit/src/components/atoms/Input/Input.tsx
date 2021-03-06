import {
  Hint,
  InputContainer,
  InputContainerProps,
  InputElementProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { StyledWebTextInput } from './styled';

export interface InputWebProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {}

const Input: FC<InputWebProps> = React.forwardRef(
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
      inputContainerStyle,
      variant = 'default',
      hintComponent,
      hint,
      onFocus,
      onBlur,
      placeholder,
      value,
      ...rest
    },
    ref
  ) => {
    const _hint = hintComponent || <Hint text={hint} variant={variant} />;
    const { focused, handleBlur, handleFocus } = useInputFocus(
      onFocus,
      onBlur,
      !disabled
    );

    const onlyLabel = label && !placeholder;

    return (
      <View style={style}>
        <InputContainer
          label={value ? label : undefined}
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
            {...rest}
            placeholder={onlyLabel ? label : placeholder}
            value={value}
            ref={ref}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </InputContainer>
        {hint && _hint}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
