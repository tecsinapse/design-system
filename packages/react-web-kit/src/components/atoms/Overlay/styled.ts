import styled from '@emotion/styled';
import { hex2rgba, StyleProps, ZIndex } from '@tecsinapse/react-core';

type InjectedProps = { show: boolean; zIndex: keyof ZIndex };

export const StyledOverlay = styled('div')<Partial<StyleProps> & InjectedProps>`
  background: ${({ theme }: StyleProps) =>
    hex2rgba(theme.miscellaneous.overlay, 0.5)};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: ${({ theme, show, zIndex }: StyleProps & InjectedProps) =>
    show ? theme.zIndex[zIndex] - 1 : -1};
  cursor: ${({ show }) => (show ? 'pointer' : 'default')};
  position: fixed;
  align-items: center;
  justify-content: center;
`;
