import styled from '@emotion/native';
import { Paper } from '../Paper/index';
import { CardProps, StyleProps } from '@tecsinapse/react-core';

export const CardStyle = styled(Paper)<CardProps & Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  padding: ${({ theme }) => theme.spacing.mili};
`;
