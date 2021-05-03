import React from 'react';
import {
  TextStyle,
  ButtonStyle,
  InnerCircle,
  OutlineCircle,
  ViewOrientation,
} from './styled';

export interface RadioButtonProps {
  options: Array<string>;
  onChangeSelect: (opt: string, i: number) => void;
  selected: number;
  orientation: string;
}

const RadioButton = (props: RadioButtonProps): JSX.Element => {
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

export default RadioButton;
