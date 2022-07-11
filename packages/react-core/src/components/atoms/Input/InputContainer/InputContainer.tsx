import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { InputElementProps } from '..';
import {
  ColorGradationType,
  ColorType,
  FontColorType,
  FontStackType,
  FontWeightType,
  TypographyVariationType
} from '../../../../types/defaults';
import { Text, TextProps } from '../../Text';
import {
  StyledBorderKeeper,
  StyledIconContent,
  StyledInputContainer,
  StyledLabelContainer
} from '../styled';

export type InputVariantType = 'default' | 'error' | 'success';

export interface InputContainerProps {
  label?: string;
  labelColor?: FontColorType;
  labelColorVariant?: ColorType;
  labelColorTone?: ColorGradationType;
  labelTypography?: TypographyVariationType;
  labelStack?: FontStackType;
  LabelComponent?: FC<TextProps>;
  labelWeight?: FontWeightType;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  borderColor?: ColorType;
  borderColorGradation?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  focused?: boolean;
  disabled?: boolean;
  variant?: InputVariantType;
  hint?: string;
  hintComponent?: JSX.Element;
}

const InputContainer: FC<InputContainerProps & Partial<InputElementProps>> = ({
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
  variant,
  children,
  ...rest
}): JSX.Element => {
  let _defaultLabelColor = labelColorVariant;
  if (variant === 'error') _defaultLabelColor = 'error';
  if (variant === 'success') _defaultLabelColor = 'success';
  const _labelColorVariant = disabled ? 'secondary' : _defaultLabelColor;
  const _labelColorTone = disabled ? 'light' : labelColorTone;

  return (
    <StyledInputContainer
      {...rest}
      style={inputContainerStyle}
      focused={focused}
      disabled={disabled}
    >
      <StyledBorderKeeper
        focused={focused}
        disabled={disabled}
        borderColor={_defaultLabelColor}
      />

      {leftComponent && <StyledIconContent>{leftComponent}</StyledIconContent>}

      <StyledLabelContainer
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      >
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
      </StyledLabelContainer>

      {rightComponent && (
        <StyledIconContent>{rightComponent}</StyledIconContent>
      )}
    </StyledInputContainer>
  );
};

export default InputContainer;
