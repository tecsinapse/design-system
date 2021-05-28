import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core/src';

export const StyledBoard = styled.View<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  padding: ${({ theme }) => theme.spacing.deca};
  flex: 1;
`;
