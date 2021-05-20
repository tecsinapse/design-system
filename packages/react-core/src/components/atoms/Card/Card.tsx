import React, { FC } from 'react';
import {
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { StyledCard } from './styled';

export interface CardProps {
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  elevated?: boolean;
  onClick?: null | ((event: GestureResponderEvent) => void);
}

const Card: FC<CardProps> = ({
  children,
  style,
  elevated = false,
  onClick,
  ...rest
}): JSX.Element => (
  <StyledCard
    {...rest}
    elevated={elevated}
    onPress={onClick}
    disabled={!onClick}
    style={style}
  >
    {children}
  </StyledCard>
);

export default Card;
