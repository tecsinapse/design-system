import React, { FC } from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import Hint from '../../atoms/Input/Hint';
import InputContainer, {
  InputContainerProps,
} from '../../atoms/Input/InputContainer';
import InputMaskElement, {
  InputMaskElementProps,
} from '../../atoms/Input/InputMaskElement';
import { useInputFocus } from '../../atoms/Input/useInputFocus';
import Text from '../../atoms/Text/Text';

export interface InputMaskNativeProps
  extends Omit<InputMaskElementProps, 'style'>,
    InputContainerProps {
  inputFontStack?: 'default' | 'mono';
  inputFontWeight?: 'bold' | 'regular' | 'medium';
  ref?: React.Ref<TextInput>;
  style?: StyleProp<ViewStyle>;
}

const InputMask: FC<InputMaskNativeProps> = ({
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
  ref,
  ...rest
}) => {
  const _hint = hintComponent || (
    <Hint text={hint} variant={variant} />
  );
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
        LabelComponent={Text}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        borderColor={borderColor}
        borderColorGradation={borderColorGradation}
        inputContainerStyle={[inputContainerStyle, { minHeight: 50 }]}
        focused={focused}
        disabled={disabled}
        variant={variant}
      >
        <InputMaskElement
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
};

export default InputMask;
