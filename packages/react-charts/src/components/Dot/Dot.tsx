import React from 'react';
import { Circle, CircleDot } from './styled';

const Dot = ({ color }: { color: string }): React.ReactElement => {
  return (
    <Circle color={color}>
      <CircleDot />
    </Circle>
  );
};

export default Dot;
