import styled from '@emotion/native';
import { Snackbar as SnackbarCore, StyleProps } from '@tecsinapse/react-core';

export const SnackbarStyled = styled(SnackbarCore)<Partial<StyleProps>>`
  left: ${({ theme }) => theme.spacing.deca};
  right: ${({ theme }) => theme.spacing.deca};
`;
