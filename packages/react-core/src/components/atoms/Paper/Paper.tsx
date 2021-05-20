import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledPaper } from './styled';

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
  <StyledPaper {...rest} style={style} elevated={elevated}>
    {children}
  </StyledPaper>
);

export default Paper;
