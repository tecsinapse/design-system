import React from 'react';
import { Text as RNText } from 'react-native';
import styled from '@emotion/native';
import { ThemeProp } from '../../styles/ThemeProvider';

export interface TextProps {
  children: JSX.Element | string;
  contrast?: boolean;
  style?: any;
}

const Text = (props: TextProps): JSX.Element => {
  const { children, contrast = false, style = {} } = props;
  return (
    <StyledText contrast={contrast} style={style}>
      {children}
    </StyledText>
  );
};

const StyledText = styled(RNText)`
  color: ${(props: StyledProps) =>
    props.contrast ? props.theme.text.contrast : props.theme.text.main};
  ${({ style }) => style}
`;

type StyledProps = {
  contrast?: boolean;
  theme: ThemeProp;
  style?: any;
};

export default Text;
