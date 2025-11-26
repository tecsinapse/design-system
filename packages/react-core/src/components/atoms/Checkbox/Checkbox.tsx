import React, { ReactNode } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { Icon } from '../Icon';
import {
  IconCheckedStyled,
  IconUncheckedStyled,
  IconViewStyled,
  ViewStyled,
} from './styled';

export interface CheckboxProps {
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
  children?: ReactNode;
}

const Checkbox = ({
  children,
  checked,
  onChange,
  color = 'primary',
  colorTone = 'medium',
  labelPosition = 'left',
  disabled = false,
  ...rest
}: CheckboxProps): React.ReactElement => {
  const handleChange = () => {
    onChange?.(!checked);
  };

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={handleChange}
      accessibilityRole="checkbox"
    >
      <ViewStyled>
        {labelPosition === 'left' && children}
        {checked && (
          <IconViewStyled>
            <IconCheckedStyled color={color} colorTone={colorTone}>
              <Icon
                name="check"
                fontColor="light"
                type="material-community"
                size="centi"
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
                size="centi"
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
