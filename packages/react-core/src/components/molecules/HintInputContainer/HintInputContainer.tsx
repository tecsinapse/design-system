import {
  Hint,
  PressableInputContainer,
  PressableInputContainerProps,
  TextProps,
} from '@tecsinapse/react-core';
import { StyleProp, View, ViewStyle } from 'react-native';
import * as React from 'react';
import { FC } from 'react';

export interface HintInputContainerProps extends PressableInputContainerProps {
  viewStyle?: StyleProp<ViewStyle>;
  focused: boolean;
  LabelComponent?: React.FC<TextProps>;
  onPress?: () => void | never;
  disabled?: boolean;
  hint: string | undefined;
  hintComponent: JSX.Element | undefined;
  variant: any;
  rightComponent: any;
}

const HintInputContainer: FC<HintInputContainerProps> = ({
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
