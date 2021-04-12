import React from 'react';
import { Text as RNText } from 'react-native';

export interface TextProps {
  children?: JSX.Element | string;
}

const Text = (props: TextProps): JSX.Element => {
  const { children } = props;
  return <RNText style={{ color: '#fff' }}>{children}</RNText>;
};

export default Text;
