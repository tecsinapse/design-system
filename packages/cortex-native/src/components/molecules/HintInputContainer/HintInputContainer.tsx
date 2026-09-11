import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Hint from '../../atoms/Input/Hint';
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
  ...rest
}) => {
  const _hint = hintComponent || (
    <Hint TextComponent={LabelComponent} text={hint} variant={variant} />
  );

  return (
    <View style={viewStyle}>
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
