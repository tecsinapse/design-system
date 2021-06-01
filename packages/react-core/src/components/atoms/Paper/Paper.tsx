import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledPaper } from './styled';

export interface PaperProps {
  /** Creates elevation shadow */
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Paper: FC<PaperProps> = ({
  children,
  elevated = false,
  ...rest
}): JSX.Element => (
  <StyledPaper {...rest} elevated={elevated}>
    {children}
  </StyledPaper>
);

export default Paper;
