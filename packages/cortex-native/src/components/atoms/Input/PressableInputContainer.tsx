import * as React from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import InputContainer, {
  InputContainerProps,
} from './InputContainer';

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
  children?: React.ReactNode;
}

const PressableInputContainer = ({
  onPress,
  disabled,
  style,
  children,
  ...rest
}: PressableInputContainerProps): React.ReactElement => {
  return (
    <Pressable
      className="w-full"
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={style}
    >
      <InputContainer disabled={disabled} {...rest}>
        {children}
      </InputContainer>
    </Pressable>
  );
};

export default PressableInputContainer;