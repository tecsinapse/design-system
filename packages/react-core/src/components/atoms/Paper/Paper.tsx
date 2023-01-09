import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledPaper } from './styled';

export interface PaperProps {
  /** Creates elevation shadow */
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const Paper = ({
  children,
  elevated = false,
  ...rest
}: PaperProps): JSX.Element => (
  <StyledPaper {...rest} elevated={elevated}>
    {children}
  </StyledPaper>
);

export default Paper;
