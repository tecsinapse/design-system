import { InputPasswordIcon } from '@tecsinapse/react-core';
import React, { useState } from 'react';
import { Input, InputNativeProps } from '../../atoms/Input';
import { TextInput } from 'react-native';

export type InputPasswordNativeProps = InputNativeProps;

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
            <InputPasswordIcon
              onChangeState={setRevealed}
              revealed={revealed}
              effect="none"
            />
            {rightComponent}
          </>
        }
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';

export default InputPassword;
