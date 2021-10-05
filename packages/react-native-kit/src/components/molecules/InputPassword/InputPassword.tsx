import { InputPasswordIcon } from '@tecsinapse/react-core';
import React, { FC, useState } from 'react';
import { Input, InputNativeProps } from '../../atoms/Input';

export type InputPasswordNativeProps = InputNativeProps;

const InputPassword: FC<InputPasswordNativeProps> = React.forwardRef(
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
