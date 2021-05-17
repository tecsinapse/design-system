import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PaperStyled } from './styled';

export interface PaperProps {
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}

const Paper: FC<PaperProps> = ({
  children,
  style,
  elevated,
  ...rest
}): JSX.Element => (
  <PaperStyled {...rest} style={style} elevated={elevated}>
    {children}
  </PaperStyled>
);

export default Paper;
