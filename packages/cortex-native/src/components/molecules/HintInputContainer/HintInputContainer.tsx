import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Input from '../../atoms/Input/Input';
import PressableInputContainer, {
  PressableInputContainerProps,
} from '../../atoms/Input/PressableInputContainer';
import { TextProps } from '../../atoms/Text/Text';
import { InputVariantType } from '../../atoms/Input/InputContainer';

export interface HintInputContainerProps extends PressableInputContainerProps {
  viewStyle?: StyleProp<ViewStyle>;
  focused: boolean;
  LabelComponent?: React.FC<TextProps>;
  onPress?: () => void | never;
  disabled?: boolean;
  hint?: string;
  hintComponent?: React.ReactNode;
  variant?: InputVariantType;
  rightComponent?: React.ReactNode;
  className?: string;
}

const HintInputContainer: React.FC<HintInputContainerProps> = ({
  viewStyle,
  onPress,
  focused,
  disabled,
  LabelComponent,
  variant = 'default',
  rightComponent,
  children,
  hint,
  hintComponent,
  className,
  testID,
  ...rest
}) => {
  const _hint = hintComponent || (
    <Input.Hint TextComponent={LabelComponent} text={hint} variant={variant} />
  );

  return (
    <View style={viewStyle} testID={testID} className={cn(className)}>
      <PressableInputContainer
        onPress={onPress}
        focused={focused}
        disabled={disabled}
        LabelComponent={LabelComponent}
        variant={variant}
        rightComponent={rightComponent}
        {...rest}
      >
        {children}
      </PressableInputContainer>
      {hint && _hint}
    </View>
  );
};

export default HintInputContainer;
