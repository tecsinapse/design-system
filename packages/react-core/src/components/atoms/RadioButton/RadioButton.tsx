import React from 'react';
import {
  TextStyle,
  ButtonStyle,
  InnerCircle,
  OutlineCircle,
  ViewOrientation,
} from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface RadioButtonProps {
  options: Array<string>;
  onChangeSelect: (opt: string, i: number) => void;
  selected: number;
  orientation: string;
  style?: ClassNamesProps;
}

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { options, onChangeSelect, selected, orientation, style } = props;

  return (
    <ViewOrientation orientation={orientation} style={style}>
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

export default RadioButton;
