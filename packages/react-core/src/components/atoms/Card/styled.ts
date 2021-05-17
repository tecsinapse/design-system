import styled from '@emotion/native';
import { Paper } from '../Paper/index';
import { CardProps, StyleProps } from '@tecsinapse/react-core';

export const CardStyle = styled(Paper)<CardProps & Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.mili};
  border-radius: ${({ theme }) => theme.borderRadius.micro};
`;
