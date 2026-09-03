import React, { FC } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

import { InputContext } from './InputContext';
import Left from './Left';
import Right from './Right';
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

export interface InputContainerProps extends Omit<ViewProps, 'onBlur' | 'onFocus'> {
  label?: string;
  labelColor?: FontColorType;
  labelColorVariant?: ColorType;
  labelColorTone?: ColorGradationType;
  labelTypography?: TypographyVariationType;
  labelStack?: FontStackType;
  /** @see Input.Label — composition alternative: `<Input.Face><Input.Label>…` */
  LabelComponent?: FC<TextProps>;
  labelWeight?: FontWeightType;
  /** @see Input.Left — composition alternative: `<Input.Face><Input.Left>…` */
  leftComponent?: React.ReactNode;
  /** @see Input.Right — composition alternative: `<Input.Face><Input.Right>…` */
  rightComponent?: React.ReactNode;
  borderColor?: ColorType;
  borderColorGradation?: ColorGradationType;
  inputContainerStyle?: StyleProp<ViewStyle>;
  focused?: boolean;
  disabled?: boolean;
  variant?: InputVariantType;
  hint?: string;
  /** @see Input.Hint — composition alternative: `<Input.Face><Input.Hint>…` */
  hintComponent?: React.ReactNode;
  /** testID applied to the container `View`, addressable independently of the consumer's own `testID`. */
  inputContainerTestID?: string;
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
  inputContainerTestID,
  className,
  style,
  ...rest
}): React.ReactElement => {
  const contentChildren: React.ReactNode[] = [];
  const leftChildren: React.ReactNode[] = [];
  const rightChildren: React.ReactNode[] = [];

  React.Children.toArray(children).forEach(child => {
    if (React.isValidElement(child) && child.type === Left) {
      leftChildren.push(child);
    } else if (React.isValidElement(child) && child.type === Right) {
      rightChildren.push(child);
    } else {
      contentChildren.push(child);
    }
  });

  let _defaultLabelColor = labelColorVariant;
  if (variant === 'error') _defaultLabelColor = 'error';
  if (variant === 'success') _defaultLabelColor = 'success';
  const _labelColorVariant = disabled ? 'secondary' : _defaultLabelColor;
  const _labelColorTone = disabled ? 'light' : labelColorTone;

  const intent = variantToIntent[variant];
  const containerClassName = cn(
    inputContainerStyles({ intent }),
    focused && inputFocusedBorder[intent],
    disabled && inputContainerDisabledClasses,
    className,
  );

  return (
    <InputContext.Provider
      value={{ focused: !!focused, disabled, variant }}
    >
      <View
        {...rest}
        testID={inputContainerTestID ?? testID}
        className={containerClassName}
        style={[focused && { borderWidth: 2 }, inputContainerStyle, style]}
      >
        {(leftComponent || leftChildren.length > 0) && (
          <View className="flex-row items-center">
            {leftChildren}
            {leftComponent}
          </View>
        )}

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
          {contentChildren}
        </View>

        {(rightComponent || rightChildren.length > 0) && (
          <View className="flex-row items-center">
            {rightChildren}
            {rightComponent}
          </View>
        )}
      </View>
    </InputContext.Provider>
  );
};

export default InputContainer;
