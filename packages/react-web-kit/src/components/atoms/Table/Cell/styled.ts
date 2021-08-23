import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const TCell = styled('td')<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};

  color: ${({ theme }) => theme.font.color.dark};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.typography.base.fontSize};
  line-height: ${({ theme }) => theme.typography.base.lineHeight};
  font-family: ${({ theme }) => theme.font.stack.default};
`;
