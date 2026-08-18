import React, { FC, useState } from 'react';
import { Pressable, StyleProp, TextInput, ViewStyle } from 'react-native';
import Input, { InputNativeProps } from '../../atoms/Input/Input';
import Icon from '../../atoms/Icon/Icon';

export type InputPasswordNativeProps = InputNativeProps;

export interface InputPasswordIconProps {
  revealed: boolean;
  onChangeState: (revealed: boolean) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const InputPasswordIcon: FC<InputPasswordIconProps> = ({
  revealed,
  onChangeState,
  style,
  testID,
}) => {
  const icon = revealed ? 'eye-outline' : 'eye-off-outline';
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      onPress={() => onChangeState(!revealed)}
      style={[style, { padding: 12 }]}
    >
      <Icon name={icon} type="ionicon" size="centi" fontColor="medium" />
    </Pressable>
  );
};

const InputPassword = React.forwardRef<TextInput, InputPasswordNativeProps>(
  ({ rightComponent, ...rest }, ref) => {
    const [revealed, setRevealed] = useState(false);
    return (
      <Input
        {...rest}
        ref={ref}
        secureTextEntry={!revealed}
        rightComponent={
          <>
            <InputPasswordIcon onChangeState={setRevealed} revealed={revealed} />
            {rightComponent}
          </>
        }
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';

export default InputPassword;