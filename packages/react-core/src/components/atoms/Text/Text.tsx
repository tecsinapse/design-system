import React, { FC } from 'react';
import { StyledText } from './styled';
import { StyleProp, TextStyle } from 'react-native';

export interface TextProps {
  contrast?: boolean;
  style?: StyleProp<TextStyle>;
}

const Text: FC<TextProps> = ({
  children,
  contrast = false,
  style,
}): JSX.Element => {
  return (
    <StyledText contrast={contrast} style={style}>
      {children}
    </StyledText>
  );
};

export default Text;
