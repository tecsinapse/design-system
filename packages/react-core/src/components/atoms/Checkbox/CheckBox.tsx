import React, { useState } from 'react';
import { CheckBox as CheckBoxRN } from 'react-native';
import { ViewStyle, TextStyle } from './styled';
export interface CheckBoxProps {
  label?: string;
}

const CheckBox = ({ label }: CheckBoxProps): JSX.Element => {
  const [selected, setSelected] = useState(false);
  return (
    <ViewStyle>
      <CheckBoxRN value={selected} onValueChange={setSelected} />
      {label && <TextStyle>{label}</TextStyle>}
    </ViewStyle>
  );
};

export default CheckBox;
