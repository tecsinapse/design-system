import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyledCheckbox } from './styled';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@tecsinapse/react-core';

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
    <View style={style}>
      <StyledCheckbox checked={checked} onPress={handleChange}>
        {checked && <Ionicons name="checkmark" />}
        <Text>{label}</Text>
      </StyledCheckbox>
    </View>
  );
};

export default Checkbox;
