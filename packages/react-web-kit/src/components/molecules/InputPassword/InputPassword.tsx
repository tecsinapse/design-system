import { InputPasswordIcon } from '@tecsinapse/react-core';
import React, { FC, useState } from 'react';
import { Input, InputWebProps } from '../../atoms/Input';

export type InputPasswordWebProps = InputWebProps;

const InputPassword: FC<InputPasswordWebProps> = ({
  rightComponent,
  ...rest
}) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <Input
      {...rest}
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
};

export default InputPassword;
