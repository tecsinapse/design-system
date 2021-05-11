import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { ViewStyled } from './styled';

export interface CheckboxProps {
  style?: ViewStyle;
  children?: JSX.Element;
  labelPosition: 'left' | 'right';
}

const Checkbox: FC<CheckboxProps> = ({
  style,
  children,
  labelPosition,
}): JSX.Element => {
  return (
    <ViewStyled style={style}>
      {labelPosition === 'left' && children}
      <input type="checkbox" id="checkbox" name="checkbox" />
      {labelPosition === 'right' && children}
    </ViewStyled>
  );
};

export default Checkbox;
