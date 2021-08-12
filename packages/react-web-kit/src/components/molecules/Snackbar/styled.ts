import styled, { css } from '@emotion/native';
import { Snackbar as SnackbarCore, StyleProps } from '@tecsinapse/react-core';

export const SnackbarStyled = styled(SnackbarCore)<Partial<StyleProps>>(() => [
  css({
    left: '50%',
    maxWidth: '600px',
    transform: [{ translateX: '-50%' as any }],
  }),
]);
