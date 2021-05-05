import styled, { css } from '@emotion/native';
import { TextInput, Platform } from 'react-native';
import { InputProps, StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme }: StyleProps) => css`
  padding: 10px;
  border-color: ${theme.colors.primary.medium};
  border-radius: 4px;
  border-width: 1px;
`;

const focusedStyles = ({ focused }: InputProps) =>
  focused &&
  css`
    border-width: 2px;
  `;

const webStyles = ({ theme }: StyleProps) =>
  Platform.OS === 'web' &&
  css`
    &:focus {
      outline-width: 2px;
      outline-color: ${theme.colors.primary.medium};
    }
  `;

export const StyledInput = styled(TextInput)<InputProps & Partial<StyleProps>>(
  baseStyles,
  focusedStyles,
  webStyles
);
