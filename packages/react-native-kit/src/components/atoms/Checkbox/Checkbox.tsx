import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyledCheckbox, ViewStyled, TextStyle } from './styled';
import { Ionicons } from '@expo/vector-icons';

export interface CheckboxProps {
  style?: StyleProp<ViewStyle>;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, style, children }) => {
  const handleChange = () => {
    onChange(!checked);
  };
  return (
    <ViewStyled style={style}>
      <StyledCheckbox checked={checked} onChange={handleChange}>
        {checked && <Ionicons name="checkmark" />}
      </StyledCheckbox>
      {children}
    </ViewStyled>
  );
};

export default Checkbox;
