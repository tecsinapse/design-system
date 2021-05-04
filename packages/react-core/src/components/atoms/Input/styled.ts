import styled, { css } from '@emotion/native';
import { TextInput, Platform } from 'react-native';

export const baseStyled = ({ theme }) => css`
  padding: 10px;
  border-color: ${theme.colors.primary.medium};
  border-radius: 4px;
`;

const StyledInput = styled(TextInput)`
  ${props => baseStyled(props)};
  border-width: 1px;
  padding: 10px;
  border-color: ${({ theme }) => theme.colors.primary.medium};
  border-radius: 4px;
  ${({ theme }) =>
    Platform.OS === 'web' &&
    css`
      &:focus {
        outline-width: 2px;
        outline-color: ${theme.colors.primary.medium};
      }
    `},
  ${({ focused, theme }) =>
    focused &&
    css`
      border-width: 2px;
      ${baseStyled({ theme })};
    `},
  ${({ style }) => style}
`;

export default StyledInput;
