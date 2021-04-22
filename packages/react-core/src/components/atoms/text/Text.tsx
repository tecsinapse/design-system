import React from 'react';
import { Text as RNText } from 'react-native';
import styled from '@emotion/native';
import { ThemeProp } from '../../styles/ThemeProvider';

export interface TextProps {
  children: JSX.Element | string;
  contrast?: boolean;
}

const Text = (props: TextProps): JSX.Element => {
  const { children, contrast = false } = props;
  return <StyledText contrast={contrast}>{children}</StyledText>;
};

const StyledText = styled(RNText)`
  color: ${(props: StyledProps) =>
    props.contrast ? props.theme.text.contrast : props.theme.text.main};
`;

type StyledProps = {
  contrast?: boolean;
  theme: ThemeProp;
};

export default Text;
