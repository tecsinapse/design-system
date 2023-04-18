import * as React from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import InputContainer, {
  InputContainerProps,
} from '../InputContainer/InputContainer';
import { StyledPressableSurface } from './styled';
import { ReactNode } from 'react';

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
  children?: ReactNode;
}

const PressableInputContainer = ({
  onPress,
  disabled,
  style,
  children,
  ...rest
}: PressableInputContainerProps): JSX.Element => {
  return (
    <StyledPressableSurface onPress={onPress} disabled={disabled} style={style}>
      <InputContainer disabled={disabled} {...rest}>
        {children}
      </InputContainer>
    </StyledPressableSurface>
  );
};

export default PressableInputContainer;
