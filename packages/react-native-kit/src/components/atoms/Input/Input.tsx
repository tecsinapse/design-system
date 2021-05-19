import { Input as InputCore, InputProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';

export interface InputPropsNative extends InputProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

const Input: FC<InputPropsNative> = ({
  onFocus: onFocusExternal,
  onBlur: onBlurExternal,
  ...rest
}): JSX.Element => {
  const [onFocus, setOnFocus] = React.useState<boolean>(false);

  const handleFocus = () => {
    setOnFocus(true);
    if (onFocusExternal) {
      onFocusExternal();
    }
  };

  const handleBlur = () => {
    setOnFocus(false);
    if (onBlurExternal) {
      onBlurExternal();
    }
  };

  return (
    <InputCore
      {...rest}
      onBlur={handleBlur}
      onFocus={handleFocus}
      focused={onFocus}
    />
  );
};

export default Input;
