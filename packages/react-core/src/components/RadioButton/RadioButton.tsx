import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { View, TouchableOpacity } from 'react-native';
import styled, { css } from '@emotion/native';
import { borderRadius, lightTheme, spacings } from '../styles/definitions';

export interface RadioButtonProps {
  options: Array<string>;
  onChangeSelect: (opt: string, i: number) => void;
  selected: number;
  orientation: string;
}

export const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { options, onChangeSelect, selected } = props;

  return (
    <View>
      {options.map((option, index) => (
        <ButtonStyle onPress={() => onChangeSelect(option, index)}>
          <OutlineCircle>{selected === index && <InnerCircle />}</OutlineCircle>
          <TextStyle>{option}</TextStyle>
        </ButtonStyle>
      ))}
    </View>
  );
};

const InnerCircle = styled(View)`
  width: 10px;
  height: 10px;
  border-radius: ${borderRadius.circle};
  background-color: ${lightTheme.primary.main};
`;

const TextStyle = styled(Text)`
  margin-left: 50%;
`;

const ButtonStyle = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const OutlineCircle = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: ${borderRadius.circle};
  border-color: ${lightTheme.primary.main};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

/// FINALIZAR ESSA VIEW PARA FUNCIONAMENTO CORRETO DA ORIENTAÇÃO
const ViewOrientation = styled(View)`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      flex-direction: row;
    `},
`;
