import styled, { css } from '@emotion/native';
import { Snackbar as SnackbarCore, StyleProps } from '@tecsinapse/react-core';

const baseStyles = () => [
  css({
    left: '50%',
    maxWidth: 600,
    transform: [{ translateX: '-50%' as any }],
  }),
];

const webStyles = () => [
  css`
    position: fixed;
  `,
];

export const SnackbarStyled = styled(SnackbarCore)<Partial<StyleProps>>(
  () => css`
    ${baseStyles()}
    ${webStyles()}
  `
);
