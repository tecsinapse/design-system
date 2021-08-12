import * as React from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { InputContainer, InputContainerProps } from '..';
import { StyledPressableSurface } from './styled';

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
