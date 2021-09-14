import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';

export const ModalContainer = styled('div')<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  margin: auto;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.borderRadius.micro};
  padding: ${({ theme }) => theme.spacing.kilo};
  display: flex;
  box-shadow: 0 2px 8px
    ${({ theme }) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
`;
