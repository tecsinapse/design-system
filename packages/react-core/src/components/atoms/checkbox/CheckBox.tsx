import { CheckBox as CheckBoxRN } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { View } from 'react-native';
import styled from '@emotion/native';

export interface CheckBoxProps {
  label?: string;
}

export const CheckBox = ({ label }) => {
  const [selected, setSelected] = useState(false);
  return (
    <ViewStyle>
      <CheckBoxRN value={selected} onValueChange={setSelected} />
      {label && <Text>{label}</Text>}
    </ViewStyle>
  );
};

const ViewStyle = styled(View)`
  flex-direction: row;
`;
