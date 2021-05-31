import React, { FC } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import {
  ColorGradationType,
  ColorType,
  IconSizeType,
} from '@tecsinapse/react-core';
import {
  IconUncheckedStyled,
  IconCheckedStyled,
  ViewStyled,
  IconViewStyled,
} from './styled';
import { Icon } from '../Icon';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelPosition?: 'left' | 'right';
  color?: ColorType;
  colorTone?: ColorGradationType;
  size?: IconSizeType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Checkbox: FC<CheckboxProps> = ({
  children,
  checked,
  onChange,
  size = 'centi',
  color = 'primary',
  colorTone = 'medium',
  labelPosition = 'left',
  disabled = false,
  ...rest
}) => {
  const handleChange = () => {
    onChange && onChange(!checked);
  };

  return (
    <Pressable {...rest} disabled={disabled} onPress={handleChange}>
      <ViewStyled>
        {labelPosition === 'left' && children}
        {checked && (
          <IconViewStyled>
            <IconCheckedStyled color={color} colorTone={colorTone}>
              <Icon
                name="check"
                fontColor="light"
                type="material-community"
                size={size}
              />
            </IconCheckedStyled>
          </IconViewStyled>
        )}
        {!checked && (
          <IconViewStyled>
            <IconUncheckedStyled color={color} colorTone={colorTone}>
              <Icon
                name="checkbox-blank"
                fontColor="light"
                type="material-community"
                size={size}
              />
            </IconUncheckedStyled>
          </IconViewStyled>
        )}
        {labelPosition === 'right' && children}
      </ViewStyled>
    </Pressable>
  );
};

export default Checkbox;
