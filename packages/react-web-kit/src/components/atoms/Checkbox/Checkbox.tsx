import React, { CSSProperties, FC } from 'react';
import { DivStyled } from './styled';

export interface CheckboxProps {
  style?: CSSProperties;
  labelPosition?: 'left' | 'right';
  id?: string;
  name?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  style,
  children,
  labelPosition = 'right',
  id,
  name,
  ...rest
}): JSX.Element => {
  return (
    <DivStyled style={style}>
      {labelPosition === 'left' && children}
      <input {...rest} type="checkbox" id={id} name={name} />
      {labelPosition === 'right' && children}
    </DivStyled>
  );
};

export default Checkbox;
