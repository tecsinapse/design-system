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
import { cn } from '@tecsinapse/cortex-core';

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
  className,
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
      <InputContainer disabled={disabled} className={cn(className)} {...rest}>
        {children}
      </InputContainer>
    </Pressable>
  );
};

export default PressableInputContainer;
