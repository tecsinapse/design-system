import styled, { css } from '@emotion/native';
import { InputProps, StyleProps } from '@tecsinapse/react-core';
import { TextInput } from 'react-native';

const focusedStyles = ({ focused, theme }: { focused: boolean} & InputProps & StyleProps) =>
  focused &&
  css`
    border-width: ${theme.borderWidth.nano}; 
  `;

const StyledBaseInput = styled(TextInput)<InputProps & Partial<StyleProps>>`
  background-color: ${({theme}) => theme.miscellaneous.surfaceColor};
  border-color: ${({theme, color = 'secondary'}) => theme.color[color].medium};
  border-radius: ${({theme}) => theme.borderRadius.mili};
  border-width: ${({theme}) => theme.borderWidth.pico};
  padding: ${({theme}) => theme.spacing.mili};
`

export const StyledInput = styled(StyledBaseInput)<{ focused: boolean} & InputProps & Partial<StyleProps>>(
  focusedStyles
)