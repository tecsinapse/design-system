import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const StyledContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  position: relative;
`;

export const StyledInputContainer = styled('div')<Partial<StyleProps>>`
  width: 100%;
`;
