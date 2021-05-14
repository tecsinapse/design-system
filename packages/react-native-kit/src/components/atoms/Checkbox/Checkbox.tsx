import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledCheckbox, ViewStyled } from './styled';
import { Ionicons } from '@expo/vector-icons';

export interface CheckboxProps {
  style?: StyleProp<ViewStyle>;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  labelPosition: 'left' | 'right';
}

const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  style,
  children,
  labelPosition,
}) => {
  const handleChange = () => {
    onChange(!checked);
  };
  return (
    <ViewStyled style={style}>
      {labelPosition === 'left' && children}
      <StyledCheckbox
        checked={checked}
        onChange={handleChange}
        labelPosition={labelPosition}
      >
        {checked && <Ionicons name="checkmark" />}
      </StyledCheckbox>
      {labelPosition === 'right' && children}
    </ViewStyled>
  );
};

export default Checkbox;
