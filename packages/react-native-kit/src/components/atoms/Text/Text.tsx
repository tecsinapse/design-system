import { TextProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyledNativeText } from './styled';

export type TextNativeProps = TextProps;

const Text: FC<TextNativeProps> = ({ children, ...rest }): React.ReactElement => {
  return <StyledNativeText {...rest}>{children}</StyledNativeText>;
};

export default Text;
