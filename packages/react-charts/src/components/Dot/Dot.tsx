import React from 'react';
import { Circle, CircleDot } from './styled';

const Dot = ({ color }: { color: string }): JSX.Element => {
  return (
    <Circle color={color}>
      <CircleDot />
    </Circle>
  );
};

export default Dot;
