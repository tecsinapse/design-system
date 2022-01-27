import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';

export const StyledContainerDropdown = styled('div')<Partial<StyleProps>>`
  width: auto;
  background-color: ${({ theme }: StyleProps) =>
    theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.mili};
  box-shadow: 0 2px 8px
    ${({ theme }: StyleProps) => hex2rgba(theme.miscellaneous.shadow, 0.05)};
  position: absolute;
  padding-bottom: ${({ theme }: StyleProps) => theme.spacing.mili};
  margin-top: 8px;
  z-index: ${({ theme }: StyleProps) => theme.zIndex.select};
`;
