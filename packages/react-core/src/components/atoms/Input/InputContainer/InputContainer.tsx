import {
  ColorGradationType,
  ColorType,
  FontColorType,
  FontStackType,
  FontWeightType,
  InputElementProps,
  Text,
  TypographyVariationType,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledInputContainer, StyledLabelContainer } from '../styled';

export interface InputContainerProps {
  label?: string;
  labelColor?: FontColorType;
  labelColorVariant?: ColorType;
  labelColorTone?: ColorGradationType;
  labelTypography?: TypographyVariationType;
  labelStack?: FontStackType;
  labelWeight?: FontWeightType;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  borderColor?: ColorType;
  borderColorGradation?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  focused?: boolean;
  disabled?: boolean;
}

const InputContainer: FC<InputContainerProps & Partial<InputElementProps>> = ({
  label,
  labelColor = 'medium',
  labelColorTone,
  labelColorVariant,
  labelTypography = 'label',
  labelStack = 'default',
  labelWeight = 'bold',
  leftComponent,
  rightComponent,
  disabled,
  children,
  ...rest
}): JSX.Element => {
  const _labelColorVariant = disabled ? 'secondary' : labelColorVariant;
  const _labelColorTone = disabled ? 'light' : labelColorTone;

  return (
    <StyledInputContainer
      {...rest}
      disabled={disabled}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
    >
      {leftComponent}

      <StyledLabelContainer>
        {label && (
          <Text
            fontColor={labelColor}
            colorTone={_labelColorTone}
            colorVariant={_labelColorVariant}
            typography={labelTypography}
            fontWeight={labelWeight}
            fontStack={labelStack}
          >
            {label}
          </Text>
        )}
        {children}
      </StyledLabelContainer>

      {rightComponent}
    </StyledInputContainer>
  );
};

export default InputContainer;
