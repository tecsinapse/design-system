import React from 'react';
import { StyledPressableBackDrop, StyledViewBackDrop } from './styled';

const BackDrop = ({ onPress, children }) => {
  if (onPress) {
    return (
      <StyledPressableBackDrop onPress={onPress}>
        {children}
      </StyledPressableBackDrop>
    );
  }
  return <StyledViewBackDrop>{children}</StyledViewBackDrop>;
};

export default BackDrop;
