import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { clsx } from 'clsx';
import Text, { TextProps } from '../Text/Text';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
} from '../../../styles/types';
import {
  inputContainerDisabledClasses,
  inputContainerStyles,
  inputFocusedBorder,
  InputIntent,
} from '../../../styles/input';

export type InputVariantType = 'default' | 'error' | 'success';

export type FontStackType = 'default' | 'mono';
export type FontWeightType =
  | 'thin'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';
export type TypographyVariationType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'base'
  | 'sub'
  | 'label';

export interface InputContainerProps {
  label?: string;
  labelColor?: FontColorType;
  labelColorVariant?: ColorType;
  labelColorTone?: ColorGradationType;
  labelTypography?: TypographyVariationType;
  labelStack?: FontStackType;
  LabelComponent?: FC<TextProps>;
  labelWeight?: FontWeightType;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  borderColor?: ColorType;
  borderColorGradation?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  focused?: boolean;
  disabled?: boolean;
  variant?: InputVariantType;
  hint?: string;
  hintComponent?: React.ReactNode;
  testID?: string;
  children?: React.ReactNode;
}

const variantToIntent: Record<InputVariantType, InputIntent> = {
  default: 'default',
  error: 'error',
  success: 'success',
};

const InputContainer: FC<InputContainerProps> = ({
  label,
  labelColor = 'medium',
  labelColorTone,
  labelColorVariant,
  labelTypography = 'label',
  labelStack = 'default',
  labelWeight = 'bold',
  LabelComponent = Text,
  leftComponent,
  rightComponent,
  inputContainerStyle,
  disabled,
  focused,
  variant = 'default',
  children,
  testID,
  ...rest
}): React.ReactElement => {
  let _defaultLabelColor = labelColorVariant;
  if (variant === 'error') _defaultLabelColor = 'error';
  if (variant === 'success') _defaultLabelColor = 'success';
  const _labelColorVariant = disabled ? 'secondary' : _defaultLabelColor;
  const _labelColorTone = disabled ? 'light' : labelColorTone;

  const intent = variantToIntent[variant];
  const className = clsx(
    inputContainerStyles({ intent }),
    focused && inputFocusedBorder[intent],
    disabled && inputContainerDisabledClasses,
  );

  return (
    <View
      {...rest}
      testID={testID}
      className={className}
      style={[focused && { borderWidth: 2 }, inputContainerStyle]}
    >
      {leftComponent && <View className="flex-row items-center">{leftComponent}</View>}

      <View className="flex-1 py-micro pl-centi pr-centi">
        {label && (
          <LabelComponent
            fontColor={labelColor}
            colorTone={_labelColorTone}
            colorVariant={_labelColorVariant}
            typography={labelTypography}
            fontWeight={labelWeight}
            fontStack={labelStack}
          >
            {label}
          </LabelComponent>
        )}
        {children}
      </View>

      {rightComponent && (
        <View className="flex-row items-center">{rightComponent}</View>
      )}
    </View>
  );
};

export default InputContainer;