import React from 'react';
import { StyledText } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface TextProps {
  children: JSX.Element | string;
  contrast?: boolean;
  style?: ClassNamesProps;
}

const Text = (props: TextProps): JSX.Element => {
  const { children, contrast = false, style = {} } = props;
  return (
    <StyledText contrast={contrast} style={style}>
      {children}
    </StyledText>
  );
};

export default Text;
