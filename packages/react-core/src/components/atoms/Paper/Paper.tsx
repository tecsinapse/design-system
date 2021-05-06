import React, { FC } from 'react';
import { PaperStyled } from './styled';
import { StyleProp, ViewProps } from 'react-native';

export interface PaperProps {
  children?: JSX.Element;
  style?: StyleProp<ViewProps>;
}
const Paper: FC<PaperProps> = ({ children, style }): JSX.Element => {
  return <PaperStyled style={style}>{children}</PaperStyled>;
};

export default Paper;
