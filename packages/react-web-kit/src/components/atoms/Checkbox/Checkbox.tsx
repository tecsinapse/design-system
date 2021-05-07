import React from 'react';
import { ViewStyle } from 'react-native';
import { ViewStyled } from './styled';

export interface CheckboxProps {
  label?: string;
  style?: ViewStyle;
}

const Checkbox = ({ label, style }: CheckboxProps): JSX.Element => {
  return (
    <ViewStyled style={style}>
      <input type="checkbox" id={label} name={label} />
      <label htmlFor={label}>{label}</label>
    </ViewStyled>
  );
};

export default Checkbox;
