import {
  Hint,
  InputContainer,
  InputContainerProps,
  InputMaskElementProps,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { StyledWebTextInputMask } from './styled';

export interface InputMaskWebProps
  extends Omit<InputMaskElementProps, 'style'>,
    InputContainerProps {}

const InputMask: FC<InputMaskWebProps> = React.forwardRef(
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
      value,
      placeholder,
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
          label={String(value) ? label : undefined}
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
          <StyledWebTextInputMask
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

InputMask.displayName = 'InputMask';

export default InputMask;
