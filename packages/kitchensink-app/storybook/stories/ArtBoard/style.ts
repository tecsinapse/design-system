import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core/src';
import { ArtBoardProps } from './ArtBoard'

export const StyledBoard = styled.View<ArtBoardProps & Partial<StyleProps>>`
  background-color: ${({ theme, backgroundColor }) => backgroundColor ?? theme.miscellaneous.bodyColor};
  padding: ${({ theme }) => theme.spacing.deca};
  flex: 1;
`;
