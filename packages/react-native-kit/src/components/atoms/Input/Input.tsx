import { InputProps, Input as InputCore } from '@tecsinapse/react-core';
import React from 'react';

export interface InputPropsNative extends InputProps {
  onBlur?: () => void;
  onFocus?: () => void;
  focused?: boolean;
}
const Input = (props: InputPropsNative): JSX.Element => {
  const { onFocus: onFocusExternal } = props;
  const [onFocus, setOnFocus] = React.useState<boolean>(false);

  const handleFocus = () => {
    setOnFocus(true);
    if (onFocusExternal) {
      onFocusExternal();
    }
  };
  return (
    <InputCore
      onBlur={() => setOnFocus(false)}
      onFocus={handleFocus}
      focused={onFocus}
      {...props}
    />
  );
};

export default Input;
