import { CheckBox as CheckBoxRN } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { Text as T } from '@tecsinapse/react-core';
import { View, Text } from 'react-native';
import styled from '@emotion/native';
import { spacings } from '@tecsinapse/react-core';

export interface CheckBoxProps {
  label?: string;
}

export const CheckBox = ({ label }) => {
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
