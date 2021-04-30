import React, { useState } from 'react';
import { View, CheckBox as CheckBoxRN } from 'react-native';
import styled from '@emotion/native';
import { spacings, Text } from '@tecsinapse/react-core';

export interface CheckBoxProps {
  label?: string;
}

export const CheckBox = ({ label }: CheckBoxProps): JSX.Element => {
  const [selected, setSelected] = useState(false);
  return (
    <ViewStyle>
      <CheckBoxRN value={selected} onValueChange={setSelected} />
      {label && <TextStyle>{label}</TextStyle>}
    </ViewStyle>
  );
};

const ViewStyle = styled(View)`
  flex-direction: row;
`;

const TextStyle = styled(Text)`
  margin-left: ${spacings.mili};
`;
