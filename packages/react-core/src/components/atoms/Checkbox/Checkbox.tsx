import React, { useState } from 'react';
import { CheckBox as CheckBoxRN } from 'react-native';
import { ViewStyle, TextStyle } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface CheckboxProps {
  label?: string;
  style?: ClassNamesProps;
}

const Checkbox = ({ label, style }: CheckboxProps): JSX.Element => {
  const [selected, setSelected] = useState(false);
  return (
    <ViewStyle style={style}>
      <CheckBoxRN value={selected} onValueChange={setSelected} />
      {label && <TextStyle>{label}</TextStyle>}
    </ViewStyle>
  );
};

export default Checkbox;
