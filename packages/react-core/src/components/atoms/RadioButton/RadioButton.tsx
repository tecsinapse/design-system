import React, { FC } from 'react';
import {
  TextStyle,
  ButtonStyle,
  InnerCircle,
  OutlineCircle,
  ViewOrientation,
} from './styled';
import { StyleProp, ViewProps } from 'react-native';

export interface RadioButtonProps {
  options?: string[];
  onChangeSelect: (opt: string, i: number) => void;
  selected?: number;
}

export interface OrientationProps {
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewProps>;
}

const RadioButton: FC<RadioButtonProps & OrientationProps> = ({
  options = [],
  onChangeSelect,
  selected,
  orientation = 'vertical',
  style,
}): JSX.Element => {
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
