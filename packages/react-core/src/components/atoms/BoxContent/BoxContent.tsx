import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { StyledBoxContent } from './styled';

export interface BoxContentProps extends ViewProps {
  variant: 'top' | 'bottom' | 'left' | 'right';
}

const BoxContent: FC<BoxContentProps> = ({ children, ...rest }) => {
  return <StyledBoxContent {...rest}>{children}</StyledBoxContent>;
};

export default BoxContent;
