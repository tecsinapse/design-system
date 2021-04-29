import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled, { css } from '@emotion/native';
import { borderRadius, spacings } from '@tecsinapse/react-core';

export interface RadioButtonProps {
  options: Array<string>;
  onChangeSelect: (opt: string, i: number) => void;
  selected: number;
  orientation: string;
}

export const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { options, onChangeSelect, selected, orientation } = props;

  return (
    <ViewOrientation orientation={orientation}>
      {options.map((option, index) => (
        <ButtonStyle
          key={index}
          onPress={() => onChangeSelect(option, index)}
          accessibilityRole="radio"
        >
          <OutlineCircle>{selected === index && <InnerCircle />}</OutlineCircle>
          <TextStyle>{option}</TextStyle>
        </ButtonStyle>
      ))}
    </ViewOrientation>
  );
};

const InnerCircle = styled(View)`
  width: 10px;
  height: 10px;
  border-radius: ${borderRadius.circle};
  background-color: ${({ theme }) => theme.primary.main};
`;

const TextStyle = styled(Text)`
  margin-left: ${spacings.mili};
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
  border-color: ${({ theme }) => theme.primary.main};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;
/// ajustar espaçamento quando for horizontal
const ViewOrientation = styled(View)`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      flex-direction: row;
    `},
`;
