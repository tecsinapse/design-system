import { InputPasswordIcon } from '@tecsinapse/react-core';
import React, { useState } from 'react';
import { Input, InputWebProps } from '../../atoms/Input';

export type InputPasswordWebProps = InputWebProps;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordWebProps>(
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
