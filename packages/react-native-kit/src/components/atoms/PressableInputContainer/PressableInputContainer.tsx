import { InputContainer, InputContainerProps } from '@tecsinapse/react-core';
import { Text } from '@tecsinapse/react-native-kit';
import { StyledPressableSurface } from './styled';
import * as React from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

export interface PressableInputContainerProps
  extends Omit<
    InputContainerProps,
    'value' | 'onChange' | 'onChangeText' | 'disabled' | 'style'
  > {
  onPress?: () => void | never;
  disabled?: boolean;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}

const PressableInputContainer: React.FC<PressableInputContainerProps> = ({
  onPress,
  disabled,
  style,
  children,
  ...rest
}) => {
  return (
    <StyledPressableSurface onPress={onPress} disabled={disabled} style={style}>
      <InputContainer disabled={disabled} {...rest}>
        {children}
      </InputContainer>
    </StyledPressableSurface>
  );
};

export default PressableInputContainer;
