import { TextProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyledNativeText } from './styled';

export interface TextNativeProps extends TextProps {}

const Text: FC<TextNativeProps> = ({ children, ...rest }): JSX.Element => {
  return <StyledNativeText {...rest}>{children}</StyledNativeText>;
};

export default Text;
