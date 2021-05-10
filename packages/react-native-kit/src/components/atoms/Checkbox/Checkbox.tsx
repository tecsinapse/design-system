import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyledCheckbox, ViewStyled, TextStyle } from './styled';
import { Ionicons } from '@expo/vector-icons';

export interface CheckboxProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  checked?: boolean;
  onPress: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onPress, label, style }) => {
  const handleChange = () => {
    onPress(!checked);
  };
  return (
    <ViewStyled style={style}>
      <StyledCheckbox checked={checked} onPress={handleChange}>
        {checked && <Ionicons name="checkmark" />}
      </StyledCheckbox>
      <TextStyle>{label}</TextStyle>
    </ViewStyled>
  );
};

export default Checkbox;
