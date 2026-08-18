import React, { FC } from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { clsx } from 'clsx';
import { useCSSVariable } from 'uniwind';
import { inputElementClasses, inputElementDisabledClasses } from '../../../styles/input';
import Hint from '../../atoms/Input/Hint';
import InputContainer, {
  InputContainerProps,
} from '../../atoms/Input/InputContainer';
import Text, { TextProps } from '../../atoms/Text/Text';
import { useInputFocus } from '../../atoms/Input/useInputFocus';

export interface TextAreaProps
  extends Omit<
      React.ComponentProps<typeof TextInput>,
      'style' | 'multiline' | 'value'
    >,
    InputContainerProps {
  inputFontStack?: 'default' | 'mono';
  inputFontWeight?: 'bold' | 'regular' | 'medium';
  maxCharCount?: number;
  numberOfLines?: number;
  value: string;
  TextComponent?: FC<TextProps>;
  focused?: boolean;
  style?: StyleProp<ViewStyle>;
}

const LINE_HEIGHT = 24;

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
  value,
  maxLength,
  numberOfLines = 1,
  placeholder,
  onFocus,
  onBlur,
  testID,
  ...rest
}) => {
  const { focused: _focused, handleBlur, handleFocus } = useInputFocus(
    () => onFocus?.({} as never),
    () => onBlur?.({} as never),
    !disabled
  );

  let length = value.length;
  if (maxLength && length > maxLength) {
    length = maxLength;
  }

  const _hint = hintComponent || (
    <Hint TextComponent={TextComponent} text={hint} variant={variant} />
  );

  const contentHigh = useCSSVariable('--color-content-high') as string;

  return (
    <View style={style}>
      <InputContainer
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
        inputContainerStyle={[inputContainerStyle, { minHeight: 50 }]}
        focused={focused ?? _focused}
        disabled={disabled}
        variant={variant}
        testID={testID}
      >
        <TextInput
          {...rest}
          className={clsx(
            inputElementClasses,
            disabled && inputElementDisabledClasses,
          )}
          placeholder={placeholder}
          placeholderTextColor={contentHigh}
          value={value}
          multiline
          textAlignVertical="top"
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          style={{ maxHeight: LINE_HEIGHT * numberOfLines }}
        />
        {maxLength ? (
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
        ) : null}
      </InputContainer>
      {hint && _hint}
    </View>
  );
};

export default TextArea;