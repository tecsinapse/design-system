import { Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { ColorGradationType, ColorType, Icon } from '@tecsinapse/react-core';
import { IconViewStyled, ViewStyled, IconWrapper, ScaledView } from './styled';

export interface RadioButtonProps {
  /** Element is checked */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Position of children */
  labelPosition?: 'left' | 'right';
  /** Element is not clickable */
  disabled?: boolean;
  /** Color definition from theme */
  color?: ColorType;
  /** Color gradation from theme */
  colorTone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
}

const RadioButton: FC<RadioButtonProps> = ({
  children,
  onChange,
  checked,
  labelPosition = 'right',
  disabled = false,
  color = 'primary',
  colorTone = 'medium',
  ...rest
}): JSX.Element => {
  const handleChange = () => {
    onChange && onChange(!checked);
  };

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={handleChange}
      accessibilityRole="radio"
    >
      <ViewStyled>
        {labelPosition === 'left' && children}
        {checked && (
          <IconViewStyled>
            <IconWrapper>
              <ScaledView>
                <Icon
                  name="circle"
                  colorVariant={color}
                  colorTone={colorTone}
                  type="material-community"
                  size="centi"
                />
              </ScaledView>
            </IconWrapper>
          </IconViewStyled>
        )}
        {!checked && (
          <IconViewStyled>
            <IconWrapper>
              <ScaledView>
                <Icon
                  name="circle"
                  fontColor="light"
                  type="material-community"
                  size="centi"
                />
              </ScaledView>
            </IconWrapper>
          </IconViewStyled>
        )}
        {labelPosition === 'right' && children}
      </ViewStyled>
    </Pressable>
  );
};

export default RadioButton;
