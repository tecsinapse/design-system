import { InputPasswordIcon } from '@tecsinapse/react-core';
import React, { FC, useState } from 'react';
import { Input, InputNativeProps } from '../../atoms/Input';

export type InputPasswordNativeProps = InputNativeProps;

const InputPassword: FC<InputPasswordNativeProps> = ({
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
          <InputPasswordIcon onChangeState={setRevealed} revealed={revealed} />
          {rightComponent}
        </>
      }
    />
  );
};

export default InputPassword;
