import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { MasonryProps } from './Masonry';

export const StyledColumnItem = styled('div')<
  Partial<StyleProps> & { index: number } & Partial<MasonryProps>
>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  flex: 1;
  width: 0;
  margin-left: ${({ theme, index, spacingLeft = 'nano' }) =>
    index > 0 ? theme.spacing[spacingLeft] : 'initial'};
`;

export const StyledMasonry = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: stretch;
  box-sizing: border-box;
  width: 100%;
`;

export const StyledRowItem = styled('div')<
  Partial<StyleProps> & { index: number } & Partial<MasonryProps>
>`
  margin-top: ${({ theme, index, spacingTop = 'nano' }) =>
    index > 0 ? theme.spacing[spacingTop] : 'initial'};
`;
