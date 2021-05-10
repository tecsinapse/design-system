import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { ViewStyled } from './styled';

export interface CheckboxProps {
  style?: ViewStyle;
  children?: JSX.Element;
}

const Checkbox: FC<CheckboxProps> = ({ style, children }): JSX.Element => {
  return (
    <ViewStyled style={style}>
      <input type="checkbox" id="checkbox" name="checkbox" />
      {children}
    </ViewStyled>
  );
};

export default Checkbox;
