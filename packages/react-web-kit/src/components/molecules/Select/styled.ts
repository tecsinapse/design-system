import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const StyledInputContainer = styled('div')<Partial<StyleProps>>`
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.input};
`;
