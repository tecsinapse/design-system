import { Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import {
  ColorGradationType,
  ColorType,
  Icon,
  IconSizeType,
} from '@tecsinapse/react-core';
import { IconViewStyled, ViewStyled } from './styled';

export interface RadioButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  color?: ColorType;
  colorTone?: ColorGradationType;
  size?: IconSizeType;
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
  size = 'deca',
  ...rest
}): JSX.Element => {
  const handleChange = () => {
    onChange && onChange(!checked);
  };

  return (
    <Pressable {...rest} disabled={disabled} onPress={handleChange}>
      <ViewStyled>
        {labelPosition === 'left' && children}
        {checked && (
          <IconViewStyled>
            <Icon
              name="radiobox-marked"
              colorVariant={color}
              colorTone={colorTone}
              type="material-community"
              size={size}
            />
          </IconViewStyled>
        )}
        {!checked && (
          <IconViewStyled>
            <Icon
              name="radiobox-blank"
              colorVariant={color}
              colorTone={colorTone}
              type="material-community"
              size={size}
            />
          </IconViewStyled>
        )}
        {labelPosition === 'right' && children}
      </ViewStyled>
    </Pressable>
  );
};

export default RadioButton;
