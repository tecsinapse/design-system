import styled from '@emotion/native';
import { Paper } from '../Paper/index';
import { CardProps, StyleProps } from '@tecsinapse/react-core';

export const CardStyle = styled(Paper)<CardProps & Partial<StyleProps>>`
  width: 400px;
  min-height: 120px;
  max-width: 90vw;
  max-height: 90vh;
  margin-bottom: 1rem;
  padding-top: ${({ theme }) => theme.spacing.centi};
  padding-left: ${({ theme }) => theme.spacing.deca};
`;
