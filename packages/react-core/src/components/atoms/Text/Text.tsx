import React, { FC } from 'react';
import { StyledText } from './styled';
import { StyleProp, TextStyle } from 'react-native';
import {
  FontColorType,
  FontWeightType,
  TypographyVariationType,
} from '@tecsinapse/react-core';

export interface TextProps {
  style?: StyleProp<TextStyle>;
  color?: FontColorType;
  fontWeight?: FontWeightType;
  typography?: TypographyVariationType;
}

const Text: FC<TextProps> = ({
  children,
  style,
  color = 'dark',
  fontWeight = 'regular',
  typography = 'base',
  ...rest
}): JSX.Element => {
  return (
    <StyledText
      {...rest}
      style={style}
      color={color}
      fontWeight={fontWeight}
      typography={typography}
    >
      {children}
    </StyledText>
  );
};

export default Text;
