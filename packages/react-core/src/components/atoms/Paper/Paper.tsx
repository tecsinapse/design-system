import React, { FC } from 'react';
import {
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { StyledPaper } from './styled';

export interface PaperProps {
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  elevated?: boolean;
  onClick?: null | ((event: GestureResponderEvent) => void);
  disabled?: boolean;
}

const Paper: FC<PaperProps> = ({
  children,
  style,
  elevated = false,
  disabled = true,
  onClick,
  ...rest
}): JSX.Element => (
  <StyledPaper
    {...rest}
    style={style}
    elevated={elevated}
    disabled={disabled}
    onPress={onClick}
  >
    {children}
  </StyledPaper>
);

export default Paper;
